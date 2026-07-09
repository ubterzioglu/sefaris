package site.sefaris.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sefaris.common.ApiException;
import site.sefaris.common.ErrorCode;
import site.sefaris.domain.Customer;
import site.sefaris.domain.enums.Country;
import site.sefaris.dto.customer.CustomerDtos.*;
import site.sefaris.dto.project.ProjectDtos.ProjectResponse;
import site.sefaris.repository.CustomerRepository;
import site.sefaris.repository.ProjectRepository;
import site.sefaris.security.SecurityUtils;

import java.util.List;
import java.util.UUID;

/** Müşteri iş mantığı (rehber bölüm 4.3). */
@Service
public class CustomerService {

    private final CustomerRepository customers;
    private final ProjectRepository projects;
    private final ActivityLogService activity;

    public CustomerService(CustomerRepository customers, ProjectRepository projects, ActivityLogService activity) {
        this.customers = customers;
        this.projects = projects;
        this.activity = activity;
    }

    public List<CustomerResponse> list(String country, String search) {
        return customers.findAll().stream()
                .filter(c -> country == null || (c.getCountry() != null
                        && c.getCountry() == parseCountry(country)))
                .filter(c -> search == null || (c.getCompanyName() != null
                        && c.getCompanyName().toLowerCase().contains(search.toLowerCase())))
                .map(CustomerResponse::from)
                .toList();
    }

    public CustomerDetailResponse get(UUID id) {
        Customer c = find(id);
        List<ProjectResponse> ps = projects.findByCustomerId(id).stream()
                .map(ProjectResponse::from).toList();
        return new CustomerDetailResponse(CustomerResponse.from(c), ps);
    }

    @Transactional
    public CustomerResponse create(CreateCustomerRequest req) {
        Customer c = new Customer();
        c.setCompanyName(req.companyName());
        c.setTaxNumber(req.taxNumber());
        c.setContactPerson(req.contactPerson());
        c.setEmail(req.email());
        c.setPhone(req.phone());
        if (req.country() != null) c.setCountry(parseCountry(req.country()));
        c.setCity(req.city());
        c.setAddress(req.address());
        c.setWebsite(req.website());
        c.setNotes(req.notes());
        c.setCreatedBy(SecurityUtils.currentUserId());
        customers.save(c);
        activity.log("customer_created", "customer", c.getId(), null);
        return CustomerResponse.from(c);
    }

    @Transactional
    public CustomerResponse update(UUID id, UpdateCustomerRequest req) {
        Customer c = find(id);
        if (req.companyName() != null) c.setCompanyName(req.companyName());
        if (req.taxNumber() != null) c.setTaxNumber(req.taxNumber());
        if (req.contactPerson() != null) c.setContactPerson(req.contactPerson());
        if (req.email() != null) c.setEmail(req.email());
        if (req.phone() != null) c.setPhone(req.phone());
        if (req.country() != null) c.setCountry(parseCountry(req.country()));
        if (req.city() != null) c.setCity(req.city());
        if (req.address() != null) c.setAddress(req.address());
        if (req.website() != null) c.setWebsite(req.website());
        if (req.notes() != null) c.setNotes(req.notes());
        customers.save(c);
        activity.log("customer_updated", "customer", c.getId(), null);
        return CustomerResponse.from(c);
    }

    @Transactional
    public void delete(UUID id) {
        customers.delete(find(id));
        activity.log("customer_deleted", "customer", id, null);
    }

    // --- yardımcılar ---

    private Customer find(UUID id) {
        return customers.findById(id).orElseThrow(() -> new ApiException(ErrorCode.NOT_FOUND));
    }

    private Country parseCountry(String s) {
        try {
            return Country.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ApiException(ErrorCode.NOT_FOUND, "country");
        }
    }
}
