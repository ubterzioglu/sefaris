package site.sefaris.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sefaris.domain.Customer;
import site.sefaris.domain.enums.Country;

import java.util.List;
import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    List<Customer> findByCountry(Country country);
    List<Customer> findByCompanyNameContainingIgnoreCase(String q);
}
