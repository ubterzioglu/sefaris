package site.sefaris.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sefaris.domain.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    Optional<User> findByGoogleId(String googleId);
    boolean existsByEmail(String email);
}
