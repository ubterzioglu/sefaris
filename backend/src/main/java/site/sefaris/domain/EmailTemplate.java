package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "email_templates")
@Getter
@Setter
public class EmailTemplate extends AbstractEntity {

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false, columnDefinition = "text")
    private String bodyHtml;

    @Column(columnDefinition = "text")
    private String bodyText;

    @Column(columnDefinition = "text")
    private String variables;

    @Column(nullable = false, length = 5)
    private String language = "tr";

    @Column(nullable = false)
    private boolean isActive = true;
}
