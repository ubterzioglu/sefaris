package site.sefaris.security;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, CustomUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String path = request.getRequestURI();
        final String method = request.getMethod();

        // OPTIONS preflight — CORS filter'ı halleder, doğrudan geç
        if ("OPTIONS".equalsIgnoreCase(method)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Public path'lerde JWT kontrolü atla — sadece gerçekten public olanlar.
        // /auth/** skip edilmemeli: /auth/login public'tir (token yoksa zaten no-op),
        // /auth/me gibi authenticated endpoint'ler JWT parse edilmelidir.
        // Public kontrolü SecurityConfig.requestMatchers(...).permitAll() tarafından yapılıyor;
        // burada sadece gereksiz parse yükünden kaçınıyoruz.
        if (path.startsWith("/api/v1/v3/api-docs") ||
                path.startsWith("/api/v1/swagger-ui") ||
                path.startsWith("/api/v1/actuator/health")) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                String email = jwtService.parse(token).get("email", String.class);
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                if (SecurityContextHolder.getContext().getAuthentication() == null) {
                    var auth = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (JwtException | IllegalArgumentException ex) {
                // Geçersiz token → auth atanmaz, sonraki katman 401 döndürür
            }
        }

        filterChain.doFilter(request, response);
    }
}