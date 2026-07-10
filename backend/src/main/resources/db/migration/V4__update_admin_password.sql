-- Yönetici hesabının şifresini panelde kullanılan tek şifreye (Sefaris2026**!)
-- hizalar. Hash, Spring BCryptPasswordEncoder ile üretilip doğrulandı (matches=true).
-- Taze DB'de (Flyway, DataInitializer'dan önce çalışır) admin henüz yoktur → 0 satır
-- güncellenir, hata olmaz; o senaryoda DataInitializer zaten yeni şifreyle oluşturur.
-- Zaten seed'lenmiş (canlı) DB'de ise mevcut admin şifresi buradan güncellenir.

UPDATE users
SET password_hash = '$2a$10$NppynMzVbphZv8M0kT8FAe7fi0qqWVILbXpAfNpAk1AdzuhG4wrrK'
WHERE email = 'admin@sefaris.site';
