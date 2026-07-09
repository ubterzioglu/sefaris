package site.sefaris.common;

import org.springframework.data.domain.Page;

import java.util.List;

/** Sayfalı liste yanıtı (rehber bölüm 4 — ?page=&limit=). */
public record PageResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
    public static <T> PageResponse<T> of(Page<T> page) {
        return new PageResponse<>(page.getContent(), page.getNumber(), page.getSize(),
                page.getTotalElements(), page.getTotalPages());
    }

    public static <T> PageResponse<T> of(List<T> content) {
        return new PageResponse<>(content, 0, content.size(), content.size(), 1);
    }
}
