package site.sefaris.dto;

import site.sefaris.common.JsonUtil;
import site.sefaris.domain.User;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

/** Kullanıcı yanıtı — password_hash asla dışa verilmez. */
public record UserResponse(
        UUID id,
        String email,
        String fullName,
        String role,
        String status,
        String avatarUrl,
        BigDecimal hourlyRate,
        List<String> expertiseTags,
        String preferredLanguage
) {
    public static UserResponse from(User u) {
        return new UserResponse(
                u.getId(), u.getEmail(), u.getFullName(),
                u.getRole().name().toLowerCase(), u.getStatus().name().toLowerCase(),
                u.getAvatarUrl(), u.getHourlyRate(),
                JsonUtil.toList(u.getExpertiseTags()), u.getPreferredLanguage());
    }
}
