package site.sefaris.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import site.sefaris.dto.document.DocumentDtos.DocumentResponse;
import site.sefaris.dto.document.DocumentDtos.DownloadResponse;
import site.sefaris.service.DocumentService;

import java.util.List;
import java.util.UUID;

/** /api/v1/documents (rehber bölüm 4.7). */
@RestController
@RequestMapping("/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public List<DocumentResponse> list(@RequestParam(required = false) String folder_path,
                                       @RequestParam(required = false) String search) {
        return documentService.list(folder_path, search);
    }

    @PostMapping(consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','DEVELOPER','DESIGNER','SEO_SPECIALIST')")
    public DocumentResponse upload(@RequestParam("file") MultipartFile file,
                                   @RequestParam String folderPath,
                                   @RequestParam(required = false) String accessLevel) {
        return documentService.upload(file, folderPath, accessLevel);
    }

    @GetMapping("/{id}/download")
    public DownloadResponse download(@PathVariable UUID id) {
        return documentService.download(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public void delete(@PathVariable UUID id) {
        documentService.delete(id);
    }
}
