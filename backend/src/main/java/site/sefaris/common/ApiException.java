package site.sefaris.common;

/** İş mantığı hatası — GlobalExceptionHandler tarafından ErrorCode'a göre çevrilir. */
public class ApiException extends RuntimeException {

    private final ErrorCode errorCode;
    private final String field;

    public ApiException(ErrorCode errorCode) {
        this(errorCode, null);
    }

    public ApiException(ErrorCode errorCode, String field) {
        super(errorCode.messageTr);
        this.errorCode = errorCode;
        this.field = field;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public String getField() {
        return field;
    }
}
