package site.sefaris.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import site.sefaris.domain.*;
import site.sefaris.domain.enums.*;
import site.sefaris.repository.*;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * İlk çalıştırmada seed: kullanıcılar boşsa bir super_admin + örnek veri ekler.
 * Şifreler burada hash'lenir (SQL seed'de değil).
 */
@Configuration
public class DataInitializer {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    CommandLineRunner seed(UserRepository users,
                           CustomerRepository customers,
                           ProjectRepository projects,
                           TaskRepository tasks,
                           AnnouncementRepository announcements,
                           PasswordEncoder encoder) {
        return args -> {
            if (users.count() > 0) return;

            User admin = new User();
            admin.setEmail("admin@sefaris.site");
            admin.setFullName("Sefaris Admin");
            admin.setRole(Role.SUPER_ADMIN);
            admin.setStatus(UserStatus.ACTIVE);
            admin.setPasswordHash(encoder.encode("Sefaris2026!"));
            admin.setExpertiseTags("[\"Spring Boot\",\"Next.js\",\"Yönetim\"]");
            users.save(admin);

            User dev = new User();
            dev.setEmail("dev@sefaris.site");
            dev.setFullName("Örnek Geliştirici");
            dev.setRole(Role.DEVELOPER);
            dev.setPasswordHash(encoder.encode("Sefaris2026!"));
            dev.setExpertiseTags("[\"Next.js\",\"React\"]");
            users.save(dev);

            Customer c = new Customer();
            c.setCompanyName("Örnek GmbH");
            c.setCountry(Country.DE);
            c.setCity("Berlin");
            c.setContactPerson("Max Mustermann");
            c.setCreatedBy(admin.getId());
            customers.save(c);

            Project p = new Project();
            p.setName("Lojistik Platformu — Berlin");
            p.setCustomerId(c.getId());
            p.setStatus(ProjectStatus.IN_PROGRESS);
            p.setBudgetAmount(BigDecimal.valueOf(45000));
            p.setBudgetCurrency(Currency.EUR);
            p.setStartDate(LocalDate.now().minusDays(30));
            p.setCreatedBy(admin.getId());
            projects.save(p);

            Task t1 = new Task();
            t1.setTitle("Ana sayfa hero bölümünü tamamla");
            t1.setStatus(TaskStatus.IN_PROGRESS);
            t1.setPriority(TaskPriority.HIGH);
            t1.setAssigneeId(dev.getId());
            t1.setProjectId(p.getId());
            t1.setDueDate(LocalDate.now().plusDays(5));
            t1.setCreatedBy(admin.getId());
            t1.setTags("[\"frontend\"]");
            tasks.save(t1);

            Task t2 = new Task();
            t2.setTitle("REST API sözleşmesini gözden geçir");
            t2.setStatus(TaskStatus.OPEN);
            t2.setPriority(TaskPriority.MEDIUM);
            t2.setCreatedBy(admin.getId());
            tasks.save(t2);

            Announcement a = new Announcement();
            a.setTitle("Sefaris v4.0.0 mimarisi devrede");
            a.setContent("Yeni Spring Boot + RTK Query mimarisi hayata geçti.");
            a.setPriority(AnnouncementPriority.HIGH);
            a.setActiveFrom(LocalDate.now());
            a.setCreatedBy(admin.getId());
            announcements.save(a);

            log.info("Seed tamam. Giriş: admin@sefaris.site / Sefaris2026!");
        };
    }
}
