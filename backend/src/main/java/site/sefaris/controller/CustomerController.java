package site.sefaris.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.sefaris.dto.customer.CustomerDtos.*;
import site.sefaris.service.CustomerService;

import java.util.List;
import java.util.UUID;

/** /api/v1/customers (rehber bölüm 4.3). RBAC: bölüm 5. */
@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<CustomerResponse> list(@RequestParam(required = false) String country,
                                       @RequestParam(required = false) String search) {
        return customerService.list(country, search);
    }

    @GetMapping("/{id}")
    public CustomerDetailResponse get(@PathVariable UUID id) {
        return customerService.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public CustomerResponse create(@Valid @RequestBody CreateCustomerRequest req) {
        return customerService.create(req);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public CustomerResponse update(@PathVariable UUID id, @Valid @RequestBody UpdateCustomerRequest req) {
        return customerService.update(id, req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public void delete(@PathVariable UUID id) {
        customerService.delete(id);
    }
}
