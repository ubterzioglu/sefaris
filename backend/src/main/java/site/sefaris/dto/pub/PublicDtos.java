package site.sefaris.dto.pub;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Public (auth gerektirmeyen) modül DTO'ları (rehber bölüm 4.11). */
public final class PublicDtos {

    private PublicDtos() {}

    public record ContactRequest(
            @NotBlank @Size(min = 2, max = 100) String name,
            @Email @NotBlank String email,
            @Size(max = 200) String company,
            String projectType,
            String budgetRange,
            @NotBlank @Size(min = 10, max = 5000) String message
    ) {}

    public record ContactResponse(boolean success) {}

    public record CaseStudy(
            String slug,
            String title,
            String sector,
            String tech,
            String metric
    ) {}

    public record BlogPostSummary(
            String slug,
            String title,
            String excerpt
    ) {}

    public record Testimonial(
            String name,
            String title,
            String company,
            String quote
    ) {}
}
