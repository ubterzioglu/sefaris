package site.sefaris.common;

import java.time.Instant;
import java.util.Map;

/** Standart hata gövdesi (rehber bölüm 14). */
public record ApiErrorResponse(
        String code,
        String messageTr,
        String messageDe,
        String field,
        int status,
        Map<String, String> fieldErrors,
        Instant timestamp
) {
    public static ApiErrorResponse of(ErrorCode ec, String field) {
        return new ApiErrorResponse(ec.name(), ec.messageTr, ec.messageDe, field,
                ec.status.value(), null, Instant.now());
    }
}
