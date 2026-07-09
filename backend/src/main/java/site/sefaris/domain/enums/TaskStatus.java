package site.sefaris.domain.enums;

/** Görev durumları (rehber bölüm 3 tasks.status + bölüm 15 state machine). */
public enum TaskStatus {
    OPEN, IN_PROGRESS, IN_REVIEW, COMPLETED, CANCELLED, DELAYED
}
