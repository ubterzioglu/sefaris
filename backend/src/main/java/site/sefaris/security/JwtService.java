package site.sefaris.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import site.sefaris.domain.User;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

/** JWT üretme/doğrulama (rehber bölüm 2, stateless auth). */
@Service
public class JwtService {

    private final SecretKey key;
    private final long expirationSeconds;
    private final long refreshExpirationSeconds;

    public JwtService(
            @Value("${sefaris.jwt.secret}") String secret,
            @Value("${sefaris.jwt.expiration-seconds}") long expirationSeconds,
            @Value("${sefaris.jwt.refresh-expiration-seconds}") long refreshExpirationSeconds) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationSeconds = expirationSeconds;
        this.refreshExpirationSeconds = refreshExpirationSeconds;
    }

    public String generateToken(User user) {
        return build(user, expirationSeconds, "access");
    }

    public String generateRefreshToken(User user) {
        return build(user, refreshExpirationSeconds, "refresh");
    }

    public Instant accessTokenExpiry() {
        return Instant.now().plusSeconds(expirationSeconds);
    }

    private String build(User user, long ttlSeconds, String type) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(user.getId().toString())
                .claim("email", user.getEmail())
                .claim("role", user.getRole().name())
                .claim("type", type)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(ttlSeconds)))
                .signWith(key)
                .compact();
    }

    public Claims parse(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }

    public String extractSubject(String token) {
        return parse(token).getSubject();
    }
}
