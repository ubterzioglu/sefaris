package site.sefaris.dto.auth;

import jakarta.validation.constraints.*;
import site.sefaris.dto.UserResponse;

import java.time.Instant;

/** Auth modülü istek/yanıt DTO'ları (rehber bölüm 4.1 + 11.4). */
public final class AuthDtos {

    private AuthDtos() {}

    public record RegisterRequest(
            @Email(message = "Geçerli e-posta girin") @NotBlank String email,
            @NotBlank @Size(min = 8, message = "En az 8 karakter")
            @Pattern(regexp = ".*[A-Z].*", message = "En az 1 büyük harf")
            @Pattern(regexp = ".*[0-9].*", message = "En az 1 rakam") String password,
            @NotBlank @Size(min = 2, max = 150) String fullName
    ) {}

    public record LoginRequest(
            @Email @NotBlank String email,
            @NotBlank String password
    ) {}

    public record GoogleLoginRequest(
            @NotBlank String idToken
    ) {}

    public record RefreshRequest(
            @NotBlank String refreshToken
    ) {}

    public record ForgotPasswordRequest(
            @Email @NotBlank String email
    ) {}

    public record ResetPasswordRequest(
            @NotBlank String token,
            @NotBlank @Size(min = 8) String newPassword
    ) {}

    public record AuthResponse(
            UserResponse user,
            String token,
            String refreshToken,
            Instant expiresAt
    ) {}
}
