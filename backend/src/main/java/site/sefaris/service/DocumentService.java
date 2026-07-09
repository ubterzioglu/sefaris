package site.sefaris.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import site.sefaris.common.ApiException;
import site.sefaris.common.ErrorCode;
import site.sefaris.domain.Document;
import site.sefaris.domain.enums.DocumentAccessLevel;
import site.sefaris.dto.document.DocumentDtos.DocumentResponse;
import site.sefaris.dto.document.DocumentDtos.DownloadResponse;
import site.sefaris.repository.DocumentRepository;
import site.sefaris.security.SecurityUtils;

import java.util.List;
import java.util.UUID;

/** Doküman iş mantığı (rehber bölüm 4.7). */
@Service
public class DocumentService {

    private final DocumentRepository documents;
    private final StorageService storage;
    private final ActivityLogService activity;

    public DocumentService(DocumentRepository documents, StorageService storage, ActivityLogService activity) {
        this.documents = documents;
        this.storage = storage;
        this.activity = activity;
    }

    public List<DocumentResponse> list(String folderPath, String search) {
        List<Document> found = (folderPath != null && !folderPath.isBlank())
                ? documents.findByFolderPathStartingWith(folderPath)
                : documents.findAll();
        return found.stream()
                .filter(d -> search == null || search.isBlank()
                        || (d.getFileName() != null && d.getFileName().toLowerCase().contains(search.toLowerCase())))
                .map(DocumentResponse::from)
                .toList();
    }

    @Transactional
    public DocumentResponse upload(MultipartFile file, String folderPath, String accessLevel) {
        var stored = storage.upload(file, "documents" + folderPath);
        Document d = new Document();
        d.setFolderPath(folderPath);
        d.setFileName(stored.fileName());
        d.setFileUrl(stored.url());
        d.setFileSizeBytes(stored.sizeBytes());
        d.setAccessLevel(parseAccessLevel(accessLevel));
        d.setUploadedBy(SecurityUtils.currentUserId());
        documents.save(d);
        activity.log("document_uploaded", "document", d.getId(), null);
        return DocumentResponse.from(d);
    }

    public DownloadResponse download(UUID id) {
        Document d = find(id);
        return new DownloadResponse(d.getFileUrl());
    }

    @Transactional
    public void delete(UUID id) {
        documents.delete(find(id));
        activity.log("document_deleted", "document", id, null);
    }

    private Document find(UUID id) {
        return documents.findById(id).orElseThrow(() -> new ApiException(ErrorCode.NOT_FOUND));
    }

    private DocumentAccessLevel parseAccessLevel(String s) {
        if (s == null || s.isBlank()) return DocumentAccessLevel.TEAM;
        try {
            return DocumentAccessLevel.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ApiException(ErrorCode.NOT_FOUND, "accessLevel");
        }
    }
}
