package site.sefaris.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import site.sefaris.common.ApiException;
import site.sefaris.common.ErrorCode;
import site.sefaris.domain.User;
import site.sefaris.repository.UserRepository;

import java.util.Optional;
import java.util.UUID;

/** Giriş yapan kullanıcıya kısayol erişim. */
public final class SecurityUtils {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(SecurityUtils.class);

    private SecurityUtils() {}

    public static Optional<User> currentUser(UserRepository users) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            log.info("currentUser: auth=null");
            return Optional.empty();
        }
        log.info("currentUser: principalType={}, name={}, authenticated={}, authorities={}",
                auth.getPrincipal().getClass().getName(), auth.getName(), auth.isAuthenticated(), auth.getAuthorities());
        if (auth.getPrincipal() instanceof CustomUserDetails cud) {
            return Optional.of(cud.getUser());
        }
        // Fallback: principal CustomUserDetails değilse (örn. anonymous veya başka tip),
        // auth.getName() (kullanıcı adı/e-posta) üzerinden DB'den yükle.
        String name = auth.getName();
        if (name != null && !name.isBlank() && !"anonymousUser".equals(name) && users != null) {
            log.info("currentUser: fallback loading by email={}", name);
            return users.findByEmail(name);
        }
        return Optional.empty();
    }

    public static User requireUser(UserRepository users) {
        return currentUser(users).orElseThrow(() -> new ApiException(ErrorCode.INSUFFICIENT_PERMISSIONS));
    }

    public static UUID currentUserId(UserRepository users) {
        return requireUser(users).getId();
    }

    // ----- Eski imzalar (UserRepository inject edilemeyen yerler için geriye uyumlu) -----

    public static Optional<User> currentUser() {
        return currentUser(null);
    }

    public static User requireUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof CustomUserDetails cud) {
            return cud.getUser();
        }
        log.warn("requireUser(): principal CustomUserDetails değil (type={}, name={}). " +
                "DB fallback'i için UserRepository inject edilmiş overload'ı kullanın.",
                auth == null ? "null" : auth.getPrincipal().getClass().getName(),
                auth == null ? "null" : auth.getName());
        throw new ApiException(ErrorCode.INSUFFICIENT_PERMISSIONS);
    }

    public static UUID currentUserId() {
        return requireUser().getId();
    }
}
