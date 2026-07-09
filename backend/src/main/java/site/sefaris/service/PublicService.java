package site.sefaris.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sefaris.common.ApiException;
import site.sefaris.common.ErrorCode;
import site.sefaris.domain.Lead;
import site.sefaris.domain.enums.LeadSource;
import site.sefaris.domain.enums.UserStatus;
import site.sefaris.dto.UserResponse;
import site.sefaris.dto.pub.PublicDtos.*;
import site.sefaris.repository.LeadRepository;
import site.sefaris.repository.UserRepository;

import java.util.List;
import java.util.Map;

/** Public (auth gerektirmeyen) iş mantığı (rehber bölüm 4.11). */
@Service
public class PublicService {

    private static final Logger log = LoggerFactory.getLogger(PublicService.class);

    private final LeadRepository leads;
    private final UserRepository users;
    private final EmailService emailService;

    public PublicService(LeadRepository leads, UserRepository users, EmailService emailService) {
        this.leads = leads;
        this.users = users;
        this.emailService = emailService;
    }

    @Transactional
    public ContactResponse contact(ContactRequest req) {
        Lead lead = new Lead();
        lead.setSource(LeadSource.WEBSITE_FORM);
        lead.setContactName(req.name());
        lead.setContactEmail(req.email());
        lead.setNotes(req.message()
                + " | company:" + req.company()
                + " | type:" + req.projectType()
                + " | budget:" + req.budgetRange());
        leads.save(lead);

        try {
            emailService.sendTemplate("lead_confirmation_tr", req.email(),
                    Map.of("contact_name", req.name()));
            emailService.sendTemplate("new_lead_notification", "info@sefaris.site",
                    Map.of("contact_name", req.name(), "contact_email", req.email()));
        } catch (Exception e) {
            log.warn("İletişim formu e-posta gönderimi başarısız: {}", e.getMessage());
        }

        return new ContactResponse(true);
    }

    public List<CaseStudy> projects() {
        return List.of(
                new CaseStudy("ecommerce-platform", "E-Ticaret Platformu",
                        "Perakende", "Spring Boot, Next.js, PostgreSQL", "%40 dönüşüm artışı"),
                new CaseStudy("saas-dashboard", "SaaS Analitik Paneli",
                        "SaaS", "Java 21, React, TimescaleDB", "2M+ aylık olay")
        );
    }

    public CaseStudy project(String slug) {
        return projects().stream()
                .filter(p -> p.slug().equals(slug))
                .findFirst()
                .orElseThrow(() -> new ApiException(ErrorCode.NOT_FOUND));
    }

    public List<BlogPostSummary> blog() {
        return List.of(
                new BlogPostSummary("spring-boot-3-migration", "Spring Boot 3'e Geçiş",
                        "Spring Boot 3 ve Java 21 ile modern backend mimarisi."),
                new BlogPostSummary("seo-2026-trends", "2026 SEO Trendleri",
                        "Arama motoru optimizasyonunda yeni dönem.")
        );
    }

    public BlogPostSummary blogPost(String slug) {
        return blog().stream()
                .filter(b -> b.slug().equals(slug))
                .findFirst()
                .orElseThrow(() -> new ApiException(ErrorCode.NOT_FOUND));
    }

    public List<Testimonial> testimonials() {
        return List.of(
                new Testimonial("Ayşe Yılmaz", "CTO", "TechCorp",
                        "Sefaris ekibi projemizi zamanında ve kaliteyle teslim etti."),
                new Testimonial("Mehmet Demir", "Kurucu", "StartupX",
                        "Profesyonel ve şeffaf bir çalışma süreci yaşadık.")
        );
    }

    public List<UserResponse> team() {
        return users.findAll().stream()
                .filter(u -> u.getStatus() == UserStatus.ACTIVE)
                .map(UserResponse::from)
                .toList();
    }
}
