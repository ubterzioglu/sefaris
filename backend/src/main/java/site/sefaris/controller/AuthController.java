package site.sefaris.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.sefaris.dto.UserResponse;
import site.sefaris.dto.auth.AuthDtos.*;
import site.sefaris.security.SecurityUtils;
import site.sefaris.service.AuthService;

import java.util.Map;

/** /api/v1/auth (rehber bölüm 4.1). */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest req) {
        return authService.register(req);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @PostMapping("/google")
    public AuthResponse google(@Valid @RequestBody GoogleLoginRequest req) {
        return authService.google(req);
    }

    @PostMapping("/refresh")
    public AuthResponse refresh(@Valid @RequestBody RefreshRequest req) {
        return authService.refresh(req);
    }

    @GetMapping("/me")
    public UserResponse me() {
        return authService.me(SecurityUtils.requireUser());
    }

    @PostMapping("/logout")
    public Map<String, Boolean> logout() {
        // Stateless JWT — sunucu tarafında iptal yok; client token'ı siler.
        return Map.of("success", true);
    }

    @PostMapping("/forgot-password")
    public Map<String, String> forgotPassword(@Valid @RequestBody ForgotPasswordRequest req) {
        authService.forgotPassword(req);
        return Map.of("message", "Şifre sıfırlama e-postası gönderildi (kayıtlıysa).");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, Boolean>> resetPassword(@Valid @RequestBody ResetPasswordRequest req) {
        authService.resetPassword(req);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
