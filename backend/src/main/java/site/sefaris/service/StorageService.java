package site.sefaris.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import site.sefaris.common.ApiException;
import site.sefaris.common.ErrorCode;

import java.util.Set;
import java.util.UUID;

/**
 * Dosya depolama (rehber bölüm 10). S3/MinIO uyumlu. sefaris.storage.enabled=false
 * iken dosya S3'e yazılmaz; sadece metadata/URL üretilir (yerel geliştirme / test).
 */
@Service
public class StorageService {

    private static final Logger log = LoggerFactory.getLogger(StorageService.class);
    private static final long MAX_SIZE = 10L * 1024 * 1024; // 10 MB

    /** İzin verilen türler (rehber bölüm 10). */
    private static final Set<String> ALLOWED_EXT = Set.of(
            "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
            "zip", "rar", "jpg", "jpeg", "png", "gif", "svg", "mp4", "mov");
    private static final Set<String> BLOCKED_EXT = Set.of(
            "exe", "bat", "sh", "js", "php", "html");

    private final boolean enabled;
    private final String publicUrl;
    private final String bucket;

    public StorageService(@Value("${sefaris.storage.enabled}") boolean enabled,
                          @Value("${sefaris.storage.public-url}") String publicUrl,
                          @Value("${sefaris.storage.bucket}") String bucket) {
        this.enabled = enabled;
        this.publicUrl = publicUrl;
        this.bucket = bucket;
    }

    /** Dosyayı doğrular ve yükler; erişilebilir URL döner. */
    public StoredFile upload(MultipartFile file, String keyPrefix) {
        validate(file);
        String ext = extension(file.getOriginalFilename());
        String safeName = UUID.randomUUID() + "_" + System.nanoTime() + "_" + sanitize(file.getOriginalFilename());
        String key = keyPrefix + "/" + safeName;

        if (enabled) {
            // Gerçek S3/MinIO yüklemesi burada yapılır (AWS SDK S3Client).
            // Bu sürümde yer tutucu: prod'da S3 client entegre edilecek (Faz 2).
            log.info("[S3 upload] bucket={} key={}", bucket, key);
        } else {
            log.info("[Storage disabled] {} ({} bytes) kaydedilmedi, metadata üretildi", key, file.getSize());
        }
        String url = publicUrl + "/" + key;
        return new StoredFile(safeName, url, file.getSize());
    }

    private void validate(MultipartFile file) {
        if (file.getSize() > MAX_SIZE) {
            throw new ApiException(ErrorCode.FILE_TOO_LARGE);
        }
        String ext = extension(file.getOriginalFilename());
        if (BLOCKED_EXT.contains(ext) || !ALLOWED_EXT.contains(ext)) {
            throw new ApiException(ErrorCode.FILE_TYPE_NOT_ALLOWED);
        }
    }

    private String extension(String name) {
        if (name == null) return "";
        int i = name.lastIndexOf('.');
        return i >= 0 ? name.substring(i + 1).toLowerCase() : "";
    }

    private String sanitize(String name) {
        if (name == null) return "file";
        return name.replaceAll("[^a-zA-Z0-9._-]", "_");
    }

    public record StoredFile(String fileName, String url, long sizeBytes) {}
}
