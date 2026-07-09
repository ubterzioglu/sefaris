package site.sefaris.dto.customer;

import jakarta.validation.constraints.*;
import site.sefaris.domain.Customer;
import site.sefaris.dto.project.ProjectDtos.ProjectResponse;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/** Müşteri modülü DTO'ları (rehber bölüm 4.3). */
public final class CustomerDtos {

    private CustomerDtos() {}

    public record CreateCustomerRequest(
            @NotBlank @Size(max = 200) String companyName,
            @Size(max = 50) String taxNumber,
            @Size(max = 200) String contactPerson,
            @Email String email,
            @Size(max = 50) String phone,
            String country,
            @Size(max = 100) String city,
            String address,
            @Size(max = 300) String website,
            String notes
    ) {}

    public record UpdateCustomerRequest(
            @Size(max = 200) String companyName,
            @Size(max = 50) String taxNumber,
            @Size(max = 200) String contactPerson,
            @Email String email,
            @Size(max = 50) String phone,
            String country,
            @Size(max = 100) String city,
            String address,
            @Size(max = 300) String website,
            String notes
    ) {}

    public record CustomerResponse(
            UUID id, String companyName, String taxNumber, String contactPerson,
            String email, String phone, String country, String city, String address,
            String website, String notes, UUID createdBy, Instant createdAt
    ) {
        public static CustomerResponse from(Customer c) {
            return new CustomerResponse(
                    c.getId(), c.getCompanyName(), c.getTaxNumber(), c.getContactPerson(),
                    c.getEmail(), c.getPhone(),
                    c.getCountry() == null ? null : c.getCountry().name().toLowerCase(),
                    c.getCity(), c.getAddress(), c.getWebsite(), c.getNotes(),
                    c.getCreatedBy(), c.getCreatedAt());
        }
    }

    public record CustomerDetailResponse(
            CustomerResponse customer,
            List<ProjectResponse> projects
    ) {}
}
