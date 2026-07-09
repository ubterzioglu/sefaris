package site.sefaris.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import site.sefaris.repository.EmailTemplateRepository;

import java.util.Map;

/**
 * E-posta gönderimi (rehber bölüm 8). sefaris.mail.enabled=false iken gönderim
 * yapılmaz, sadece loglanır (yerel geliştirme / test).
 */
@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    private final EmailTemplateRepository templateRepository;
    private final boolean enabled;
    private final String from;

    public EmailService(JavaMailSender mailSender,
                        EmailTemplateRepository templateRepository,
                        @Value("${sefaris.mail.enabled}") boolean enabled,
                        @Value("${sefaris.mail.from}") String from) {
        this.mailSender = mailSender;
        this.templateRepository = templateRepository;
        this.enabled = enabled;
        this.from = from;
    }

    /** Şablon adıyla e-posta gönderir; değişkenleri {{key}} → value ile değiştirir. */
    public void sendTemplate(String templateName, String to, Map<String, String> vars) {
        templateRepository.findByName(templateName).ifPresentOrElse(tpl -> {
            String subject = replace(tpl.getSubject(), vars);
            String body = replace(tpl.getBodyText() != null ? tpl.getBodyText() : tpl.getBodyHtml(), vars);
            send(to, subject, body);
        }, () -> log.warn("E-posta şablonu bulunamadı: {}", templateName));
    }

    public void send(String to, String subject, String body) {
        if (!enabled) {
            log.info("[MAIL disabled] to={} subject={}", to, subject);
            return;
        }
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(from);
        msg.setTo(to);
        msg.setSubject(subject);
        msg.setText(body);
        try {
            mailSender.send(msg);
        } catch (Exception e) {
            log.error("E-posta gönderilemedi: {}", e.getMessage());
        }
    }

    private String replace(String template, Map<String, String> vars) {
        if (template == null) return "";
        String out = template;
        if (vars != null) {
            for (var e : vars.entrySet()) {
                out = out.replace("{{" + e.getKey() + "}}", e.getValue() == null ? "" : e.getValue());
            }
        }
        return out;
    }
}
