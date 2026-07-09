package site.sefaris.dto.document;

import site.sefaris.common.JsonUtil;
import site.sefaris.domain.Document;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/** Doküman modülü DTO'ları (rehber bölüm 4.7). */
public final class DocumentDtos {

    private DocumentDtos() {}

    public record DocumentResponse(
            UUID id,
            String folderPath,
            String fileName,
            String fileUrl,
            Long fileSizeBytes,
            String accessLevel,
            List<String> allowedRoles,
            UUID uploadedBy,
            Instant uploadedAt
    ) {
        public static DocumentResponse from(Document d) {
            return new DocumentResponse(
                    d.getId(), d.getFolderPath(), d.getFileName(), d.getFileUrl(),
                    d.getFileSizeBytes(),
                    d.getAccessLevel() == null ? null : d.getAccessLevel().name().toLowerCase(),
                    JsonUtil.toList(d.getAllowedRoles()),
                    d.getUploadedBy(), d.getUploadedAt());
        }
    }

    public record DownloadResponse(String url) {}
}
