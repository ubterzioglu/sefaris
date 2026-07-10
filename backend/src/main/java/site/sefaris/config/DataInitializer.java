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
import java.util.List;

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
            admin.setPasswordHash(encoder.encode("Sefaris2026**!"));
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

            // CorteQS ekip toplantısı aksiyon maddeleri (taze DB seed'i).
            // Canlı/dolu DB için aynı görevler Flyway V3__seed_meeting_tasks.sql'de.
            record SeedTask(String title, TaskPriority priority, LocalDate due, String desc, String tags) {}
            List<SeedTask> meetingTasks = List.of(
                    new SeedTask("Kurumsal kimlik + referans web sitesi hazırlamak", TaskPriority.HIGH, null,
                            "Ekibin kurumsal kimliğini ve referans web sitesini hazırlamak — kararlaştırılan ilk somut adım.", "[\"markalaşma\",\"web\"]"),
                    new SeedTask("4 ana konu başlığına not ve soru yazmak (herkes)", TaskPriority.HIGH, LocalDate.of(2026, 7, 13),
                            "Kiwi, markalaşma, Almanya iş alımı ve SEO/GEO başlıkları üzerine chat'e not ve soru yazılacak.", "[\"toplantı\"]"),
                    new SeedTask("Transkriptten protokol ve agenda çıkarmak (Umut)", TaskPriority.HIGH, LocalDate.of(2026, 7, 14),
                            "Toplantı transkriptinden protokol ve haftaya agenda çıkarılacak.", "[\"toplantı\"]"),
                    new SeedTask("Ortak takip tablosu (Drive) açmak (Umut)", TaskPriority.MEDIUM, LocalDate.of(2026, 7, 14),
                            "Görevlerin izleneceği ortak Drive tablosu oluşturulacak.", "[\"toplantı\"]"),
                    new SeedTask("Almanya işlerini ekibe dağıtma kanalını kurmak (Umut/Şahin)", TaskPriority.MEDIUM, null,
                            "Almanya kaynaklı web/yazılım işleri Umut ve Şahin üzerinden ekibe dağıtılacak; Almanca müşteri ilişkileri Umut'ta.", "[\"almanya\",\"satış\"]"),
                    new SeedTask("SEO müşterisi bulup Batuhan'a yönlendirmek (spindora.ai)", TaskPriority.MEDIUM, null,
                            "SEO işi olan müşteriler bulunup komisyon usulü Batuhan'a (spindora.ai) yönlendirilecek.", "[\"seo\"]"),
                    new SeedTask("Web/yazılım veya SEO işi olan müşteri bulmak (herkes)", TaskPriority.MEDIUM, null,
                            "Sürekli görev: ekip üyeleri web, yazılım veya SEO işi olan müşteri arayacak.", "[\"satış\"]"),
                    new SeedTask("Kiwi'yi ayrı kapalı grupta değerlendirmeye taşımak (Sümeyye)", TaskPriority.LOW, null,
                            "Türkiye odaklı olduğu için Kiwi ayrı bir kapalı grupta değerlendirilecek.", "[\"kiwi\"]"),
                    new SeedTask("Kiwi'ye formasyon/danışmanlık desteği sağlamak (Umut ailesi)", TaskPriority.LOW, null,
                            "Umut'un öğretmen ailesinden Kiwi için formasyon ve danışmanlık desteği alınacak.", "[\"kiwi\"]"),
                    new SeedTask("Umut'un 2 dokümantasyonunu incelemek (Süreyya/Sümeyye)", TaskPriority.MEDIUM, null,
                            "Şema entegrasyonu ve içerik dokümantasyonları Süreyya/Sümeyye tarafından incelenecek.", "[\"kiwi\",\"doküman\"]"),
                    new SeedTask("Haftaya 14'ünde aynı saatte tekrar toplanmak", TaskPriority.MEDIUM, LocalDate.of(2026, 7, 14),
                            "Ekip haftaya 14'ünde aynı saatte tekrar buluşacak.", "[\"toplantı\"]")
            );
            for (SeedTask st : meetingTasks) {
                Task t = new Task();
                t.setTitle(st.title());
                t.setStatus(TaskStatus.OPEN);
                t.setPriority(st.priority());
                t.setDueDate(st.due());
                t.setDescription(st.desc());
                t.setTags(st.tags());
                t.setCreatedBy(admin.getId());
                tasks.save(t);
            }

            Announcement a = new Announcement();
            a.setTitle("Sefaris v4.0.0 mimarisi devrede");
            a.setContent("Yeni Spring Boot + RTK Query mimarisi hayata geçti.");
            a.setPriority(AnnouncementPriority.HIGH);
            a.setActiveFrom(LocalDate.now());
            a.setCreatedBy(admin.getId());
            announcements.save(a);

            log.info("Seed tamam. Giriş: admin@sefaris.site / Sefaris2026**!");
        };
    }
}
