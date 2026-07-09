package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "seo_keywords")
@Getter
@Setter
public class SeoKeyword extends AbstractEntity {

    @Column(nullable = false)
    private UUID campaignId;

    @Column(nullable = false)
    private String keyword;

    private String targetUrl;
    private Integer currentRank;
    private Integer previousRank;
    private Integer searchVolume;
    private LocalDate lastChecked;
}
