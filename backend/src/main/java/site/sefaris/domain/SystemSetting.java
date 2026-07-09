package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import site.sefaris.domain.enums.SettingType;

@Entity
@Table(name = "system_settings")
@Getter
@Setter
public class SystemSetting extends AbstractEntity {

    @Column(nullable = false, unique = true)
    private String settingKey;

    @Column(columnDefinition = "text")
    private String settingValue;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private SettingType settingType;

    private String description;
}
