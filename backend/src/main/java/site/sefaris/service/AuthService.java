package site.sefaris.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sefaris.common.ApiException;
import site.sefaris.common.ErrorCode;
import site.sefaris.domain.User;
import site.sefaris.domain.enums.Role;
import site.sefaris.domain.enums.UserStatus;
import site.sefaris.dto.UserResponse;
import site.sefaris.dto.auth.AuthDtos.*;
import site.sefaris.repository.UserRepository;
import site.sefaris.security.JwtService;

import java.time.Instant;
import java.util.Map;

/** Kimlik doğrulama iş mantığı (rehber bölüm 4.1). */
@Service
public class AuthService {

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;
    private final EmailService email;

    /** Admin panel tek-şifre girişi (application.yml sefaris.admin.*). */
    @Value("${sefaris.admin.email}")
    private String adminEmail;
    @Value("${sefaris.admin.password}")
    private String adminPassword;

    public AuthService(UserRepository users, PasswordEncoder encoder, JwtService jwt, EmailService email) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
        this.email = email;
    }

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (users.existsByEmail(req.email())) {
            throw new ApiException(ErrorCode.USER_ALREADY_EXISTS, "email");
        }
        User u = new User();
        u.setEmail(req.email());
        u.setFullName(req.fullName());
        u.setPasswordHash(encoder.encode(req.password()));
        u.setRole(Role.VIEWER); // yeni kayıtlar varsayılan viewer; admin rol yükseltir
        u.setStatus(UserStatus.ACTIVE);
        users.save(u);
        return tokens(u);
    }

    @Transactional
    public AuthResponse login(LoginRequest req) {
        User u = users.findByEmail(req.email())
                .orElseThrow(() -> new ApiException(ErrorCode.INVALID_CREDENTIALS));
        if (u.getPasswordHash() == null || !encoder.matches(req.password(), u.getPasswordHash())) {
            throw new ApiException(ErrorCode.INVALID_CREDENTIALS);
        }
        u.setLastLoginAt(Instant.now());
        return tokens(u);
    }

    /**
     * Admin panel — tek şifreyle giriş. E-posta istemez; yapılandırılmış admin
     * şifresi eşleşirse admin kullanıcısına token verilir (bölüm 4.1).
     */
    @Transactional
    public AuthResponse adminLogin(AdminLoginRequest req) {
        // Sabit-zamanlı karşılaştırma (timing attack önleme).
        boolean ok = adminPassword != null
                && java.security.MessageDigest.isEqual(
                        adminPassword.getBytes(java.nio.charset.StandardCharsets.UTF_8),
                        req.password().getBytes(java.nio.charset.StandardCharsets.UTF_8));
        if (!ok) {
            throw new ApiException(ErrorCode.INVALID_CREDENTIALS);
        }
        User u = users.findByEmail(adminEmail)
                .orElseThrow(() -> new ApiException(ErrorCode.INVALID_CREDENTIALS));
        u.setLastLoginAt(Instant.now());
        return tokens(u);
    }

    @Transactional
    public AuthResponse refresh(RefreshRequest req) {
        String subject = jwt.extractSubject(req.refreshToken());
        User u = users.findById(java.util.UUID.fromString(subject))
                .orElseThrow(() -> new ApiException(ErrorCode.INVALID_CREDENTIALS));
        return tokens(u);
    }

    public void forgotPassword(ForgotPasswordRequest req) {
        users.findByEmail(req.email()).ifPresent(u -> {
            String token = jwt.generateToken(u); // basit: JWT tabanlı sıfırlama token'ı
            email.sendTemplate("password_reset", u.getEmail(),
                    Map.of("reset_link", "https://sefaris.site/reset-password?token=" + token));
        });
        // Güvenlik: kullanıcı yoksa da aynı yanıt (enumeration önleme)
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest req) {
        String subject = jwt.extractSubject(req.token());
        User u = users.findById(java.util.UUID.fromString(subject))
                .orElseThrow(() -> new ApiException(ErrorCode.INVALID_CREDENTIALS));
        u.setPasswordHash(encoder.encode(req.newPassword()));
    }

    /** Google OAuth — Faz 2'de id_token doğrulaması eklenecek (scaffold). */
    @Transactional
    public AuthResponse google(GoogleLoginRequest req) {
        throw new ApiException(ErrorCode.INVALID_CREDENTIALS);
    }

    public UserResponse me(User u) {
        return UserResponse.from(u);
    }

    private AuthResponse tokens(User u) {
        return new AuthResponse(UserResponse.from(u), jwt.generateToken(u),
                jwt.generateRefreshToken(u), jwt.accessTokenExpiry());
    }
}
