package site.sefaris.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import site.sefaris.common.ApiException;
import site.sefaris.common.ErrorCode;
import site.sefaris.domain.User;

import java.util.Optional;
import java.util.UUID;

/** Giriş yapan kullanıcıya kısayol erişim. */
public final class SecurityUtils {

    private SecurityUtils() {}

    public static Optional<User> currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof CustomUserDetails cud) {
            return Optional.of(cud.getUser());
        }
        return Optional.empty();
    }

    public static User requireUser() {
        return currentUser().orElseThrow(() -> new ApiException(ErrorCode.INSUFFICIENT_PERMISSIONS));
    }

    public static UUID currentUserId() {
        return requireUser().getId();
    }
}
