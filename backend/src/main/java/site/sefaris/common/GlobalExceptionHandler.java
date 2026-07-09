package site.sefaris.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

/** Global hata yakalayıcı (rehber bölüm 14 — HTTP kodları + iş mantığı kodları). */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiErrorResponse> handleApi(ApiException ex) {
        ErrorCode ec = ex.getErrorCode();
        return ResponseEntity.status(ec.status).body(ApiErrorResponse.of(ec, ex.getField()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new LinkedHashMap<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.putIfAbsent(fe.getField(), fe.getDefaultMessage());
        }
        ApiErrorResponse body = new ApiErrorResponse("VALIDATION_ERROR",
                "Doğrulama hatası", "Validierungsfehler", null,
                HttpStatus.UNPROCESSABLE_ENTITY.value(), fieldErrors, Instant.now());
        return ResponseEntity.unprocessableEntity().body(body);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiErrorResponse> handleAccessDenied(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ApiErrorResponse.of(ErrorCode.INSUFFICIENT_PERMISSIONS, null));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiErrorResponse> handleAuth(AuthenticationException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiErrorResponse.of(ErrorCode.INVALID_CREDENTIALS, null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGeneric(Exception ex) {
        ApiErrorResponse body = new ApiErrorResponse("INTERNAL_ERROR",
                "Sunucu hatası: " + ex.getMessage(), "Serverfehler", null,
                HttpStatus.INTERNAL_SERVER_ERROR.value(), null, Instant.now());
        return ResponseEntity.internalServerError().body(body);
    }
}
