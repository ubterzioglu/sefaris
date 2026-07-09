package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import site.sefaris.domain.enums.Country;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "customers")
@Getter
@Setter
public class Customer extends AbstractEntity {

    @Column(nullable = false)
    private String companyName;

    private String taxNumber;
    private String contactPerson;
    private String email;
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Country country;

    private String city;

    @Column(columnDefinition = "text")
    private String address;

    private String website;

    @Column(columnDefinition = "text")
    private String notes;

    private UUID createdBy;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}
