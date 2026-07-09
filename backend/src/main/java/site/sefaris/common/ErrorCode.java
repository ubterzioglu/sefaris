package site.sefaris.common;

import org.springframework.http.HttpStatus;

/** İş mantığı hata kodları (rehber bölüm 14.2) + TR/DE mesajlar. */
public enum ErrorCode {
    TASK_DUE_DATE_PAST(HttpStatus.UNPROCESSABLE_ENTITY,
            "Teslim tarihi geçmiş olamaz", "Das Fälligkeitsdatum darf nicht in der Vergangenheit liegen"),
    PROJECT_BUDGET_NEGATIVE(HttpStatus.UNPROCESSABLE_ENTITY,
            "Bütçe negatif olamaz", "Das Budget darf nicht negativ sein"),
    PROFIT_SHARE_NOT_100(HttpStatus.UNPROCESSABLE_ENTITY,
            "Paylaşım toplamı %100 olmalı", "Die Gewinnbeteiligung muss insgesamt 100% betragen"),
    FILE_TOO_LARGE(HttpStatus.UNPROCESSABLE_ENTITY,
            "Dosya 10 MB limitini aşıyor", "Die Datei überschreitet das 10-MB-Limit"),
    FILE_TYPE_NOT_ALLOWED(HttpStatus.UNPROCESSABLE_ENTITY,
            "Dosya türü izin verilenler listesinde değil", "Dateityp ist nicht erlaubt"),
    USER_ALREADY_EXISTS(HttpStatus.CONFLICT,
            "Bu e-posta ile kayıtlı kullanıcı var", "Benutzer mit dieser E-Mail existiert bereits"),
    LEAD_ALREADY_CONVERTED(HttpStatus.CONFLICT,
            "Bu lead zaten müşteriye dönüştürülmüş", "Dieser Lead wurde bereits konvertiert"),
    INVALID_STATUS_TRANSITION(HttpStatus.UNPROCESSABLE_ENTITY,
            "Geçersiz durum geçişi", "Ungültiger Statusübergang"),
    PROJECT_NOT_FOUND(HttpStatus.NOT_FOUND,
            "Proje bulunamadı", "Projekt nicht gefunden"),
    NOT_FOUND(HttpStatus.NOT_FOUND,
            "Kaynak bulunamadı", "Nicht gefunden"),
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED,
            "E-posta veya şifre hatalı", "E-Mail oder Passwort ist falsch"),
    INSUFFICIENT_PERMISSIONS(HttpStatus.FORBIDDEN,
            "Bu işlem için yetki yetersiz", "Unzureichende Berechtigungen");

    public final HttpStatus status;
    public final String messageTr;
    public final String messageDe;

    ErrorCode(HttpStatus status, String messageTr, String messageDe) {
        this.status = status;
        this.messageTr = messageTr;
        this.messageDe = messageDe;
    }
}
