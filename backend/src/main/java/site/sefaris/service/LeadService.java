package site.sefaris.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sefaris.common.ApiException;
import site.sefaris.common.ErrorCode;
import site.sefaris.domain.Lead;
import site.sefaris.domain.LeadHistory;
import site.sefaris.domain.enums.Currency;
import site.sefaris.domain.enums.LeadSource;
import site.sefaris.domain.enums.LeadStatus;
import site.sefaris.dto.lead.LeadDtos.*;
import site.sefaris.repository.LeadHistoryRepository;
import site.sefaris.repository.LeadRepository;
import site.sefaris.security.SecurityUtils;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/** Lead iş mantığı (rehber bölüm 4.5). */
@Service
public class LeadService {

    private final LeadRepository leads;
    private final LeadHistoryRepository histories;
    private final ActivityLogService activity;

    public LeadService(LeadRepository leads, LeadHistoryRepository histories, ActivityLogService activity) {
        this.leads = leads;
        this.histories = histories;
        this.activity = activity;
    }

    public List<LeadResponse> list(String status, String source, UUID assignedTo) {
        return leads.findAll().stream()
                .filter(l -> status == null || (l.getStatus() != null && l.getStatus().name().equalsIgnoreCase(status)))
                .filter(l -> source == null || (l.getSource() != null && l.getSource().name().equalsIgnoreCase(source)))
                .filter(l -> assignedTo == null || assignedTo.equals(l.getAssignedTo()))
                .map(LeadResponse::from)
                .toList();
    }

    public LeadDetailResponse get(UUID id) {
        Lead l = find(id);
        List<LeadHistoryResponse> history = histories.findByLeadIdOrderByCreatedAtDesc(id)
                .stream().map(LeadHistoryResponse::from).toList();
        return new LeadDetailResponse(LeadResponse.from(l), history);
    }

    @Transactional
    public LeadResponse create(CreateLeadRequest req) {
        Lead l = new Lead();
        l.setStatus(LeadStatus.NEW);
        if (req.source() != null) l.setSource(parseSource(req.source()));
        l.setSourceDetail(req.sourceDetail());
        l.setContactName(req.contactName());
        l.setContactEmail(req.contactEmail());
        l.setContactPhone(req.contactPhone());
        l.setExpectedValue(req.expectedValue());
        if (req.currency() != null) l.setCurrency(parseCurrency(req.currency()));
        l.setAssignedTo(req.assignedTo());
        l.setNotes(req.notes());
        l.setCreatedAt(Instant.now());
        l.setUpdatedAt(Instant.now());
        leads.save(l);
        activity.log("lead_created", "lead", l.getId(), null);
        return LeadResponse.from(l);
    }

    @Transactional
    public LeadResponse update(UUID id, UpdateLeadRequest req) {
        Lead l = find(id);
        if (req.source() != null) l.setSource(parseSource(req.source()));
        if (req.sourceDetail() != null) l.setSourceDetail(req.sourceDetail());
        if (req.contactName() != null) l.setContactName(req.contactName());
        if (req.contactEmail() != null) l.setContactEmail(req.contactEmail());
        if (req.contactPhone() != null) l.setContactPhone(req.contactPhone());
        if (req.expectedValue() != null) l.setExpectedValue(req.expectedValue());
        if (req.currency() != null) l.setCurrency(parseCurrency(req.currency()));
        if (req.assignedTo() != null) l.setAssignedTo(req.assignedTo());
        if (req.notes() != null) l.setNotes(req.notes());
        l.setUpdatedAt(Instant.now());
        activity.log("lead_updated", "lead", l.getId(), null);
        return LeadResponse.from(l);
    }

    @Transactional
    public LeadResponse updateStatus(UUID id, UpdateLeadStatusRequest req) {
        Lead l = find(id);
        String oldStatus = l.getStatus() == null ? null : l.getStatus().name().toLowerCase();
        LeadStatus next = parseStatus(req.status());
        l.setStatus(next);
        l.setUpdatedAt(Instant.now());

        LeadHistory h = new LeadHistory();
        h.setLeadId(l.getId());
        h.setOldStatus(oldStatus);
        h.setNewStatus(next.name().toLowerCase());
        h.setNote(req.notes());
        h.setChangedBy(SecurityUtils.currentUserId());
        h.setCreatedAt(Instant.now());
        histories.save(h);

        activity.log("lead_status_changed", "lead", l.getId(),
                "{\"new_status\":\"" + next.name().toLowerCase() + "\"}");
        return LeadResponse.from(l);
    }

    @Transactional
    public void delete(UUID id) {
        leads.delete(find(id));
        activity.log("lead_deleted", "lead", id, null);
    }

    // --- yardımcılar ---

    private Lead find(UUID id) {
        return leads.findById(id).orElseThrow(() -> new ApiException(ErrorCode.NOT_FOUND));
    }

    private LeadStatus parseStatus(String s) {
        try {
            return LeadStatus.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ApiException(ErrorCode.INVALID_STATUS_TRANSITION, "status");
        }
    }

    private LeadSource parseSource(String s) {
        try {
            return LeadSource.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ApiException(ErrorCode.INVALID_STATUS_TRANSITION, "source");
        }
    }

    private Currency parseCurrency(String s) {
        try {
            return Currency.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ApiException(ErrorCode.INVALID_STATUS_TRANSITION, "currency");
        }
    }
}
