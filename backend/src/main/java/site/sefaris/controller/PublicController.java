package site.sefaris.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import site.sefaris.dto.UserResponse;
import site.sefaris.dto.pub.PublicDtos.*;
import site.sefaris.service.PublicService;

import java.util.List;

/** /api/v1/public (rehber bölüm 4.11) — auth gerektirmez. */
@RestController
@RequestMapping("/public")
public class PublicController {

    private final PublicService publicService;

    public PublicController(PublicService publicService) {
        this.publicService = publicService;
    }

    @PostMapping("/contact")
    @ResponseStatus(HttpStatus.CREATED)
    public ContactResponse contact(@Valid @RequestBody ContactRequest req) {
        return publicService.contact(req);
    }

    @GetMapping("/projects")
    public List<CaseStudy> projects() {
        return publicService.projects();
    }

    @GetMapping("/projects/{slug}")
    public CaseStudy project(@PathVariable String slug) {
        return publicService.project(slug);
    }

    @GetMapping("/blog")
    public List<BlogPostSummary> blog() {
        return publicService.blog();
    }

    @GetMapping("/blog/{slug}")
    public BlogPostSummary blogPost(@PathVariable String slug) {
        return publicService.blogPost(slug);
    }

    @GetMapping("/testimonials")
    public List<Testimonial> testimonials() {
        return publicService.testimonials();
    }

    @GetMapping("/team")
    public List<UserResponse> team() {
        return publicService.team();
    }
}
