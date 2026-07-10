-- CorteQS ekip toplantısı aksiyon maddeleri → görev seed'i.
-- created_by, seed admin kullanıcısından alınır. INSERT ... SELECT kullanımı
-- kasıtlı: taze DB'de (Flyway, DataInitializer'dan önce çalışır) users henüz
-- boş olur → 0 satır eklenir, NOT NULL ihlali olmaz. O senaryoyu DataInitializer
-- besler. Zaten seed'lenmiş (canlı) DB'de ise bu 11 görev buradan eklenir.
-- Sabit UUID literalleri hem PostgreSQL hem H2 (PostgreSQL modu) üzerinde çalışır.

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000301',
       'Kurumsal kimlik + referans web sitesi hazırlamak',
       'Ekibin kurumsal kimliğini ve referans web sitesini hazırlamak — kararlaştırılan ilk somut adım.',
       'OPEN', 'HIGH', NULL, u.id, '["markalaşma","web"]'
FROM users u WHERE u.email = 'admin@sefaris.site';

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000302',
       '4 ana konu başlığına not ve soru yazmak (herkes)',
       'Kiwi, markalaşma, Almanya iş alımı ve SEO/GEO başlıkları üzerine chat''e not ve soru yazılacak.',
       'OPEN', 'HIGH', DATE '2026-07-13', u.id, '["toplantı"]'
FROM users u WHERE u.email = 'admin@sefaris.site';

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000303',
       'Transkriptten protokol ve agenda çıkarmak (Umut)',
       'Toplantı transkriptinden protokol ve haftaya agenda çıkarılacak.',
       'OPEN', 'HIGH', DATE '2026-07-14', u.id, '["toplantı"]'
FROM users u WHERE u.email = 'admin@sefaris.site';

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000304',
       'Ortak takip tablosu (Drive) açmak (Umut)',
       'Görevlerin izleneceği ortak Drive tablosu oluşturulacak.',
       'OPEN', 'MEDIUM', DATE '2026-07-14', u.id, '["toplantı"]'
FROM users u WHERE u.email = 'admin@sefaris.site';

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000305',
       'Almanya işlerini ekibe dağıtma kanalını kurmak (Umut/Şahin)',
       'Almanya kaynaklı web/yazılım işleri Umut ve Şahin üzerinden ekibe dağıtılacak; Almanca müşteri ilişkileri Umut''ta.',
       'OPEN', 'MEDIUM', NULL, u.id, '["almanya","satış"]'
FROM users u WHERE u.email = 'admin@sefaris.site';

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000306',
       'SEO müşterisi bulup Batuhan''a yönlendirmek (spindora.ai)',
       'SEO işi olan müşteriler bulunup komisyon usulü Batuhan''a (spindora.ai) yönlendirilecek.',
       'OPEN', 'MEDIUM', NULL, u.id, '["seo"]'
FROM users u WHERE u.email = 'admin@sefaris.site';

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000307',
       'Web/yazılım veya SEO işi olan müşteri bulmak (herkes)',
       'Sürekli görev: ekip üyeleri web, yazılım veya SEO işi olan müşteri arayacak.',
       'OPEN', 'MEDIUM', NULL, u.id, '["satış"]'
FROM users u WHERE u.email = 'admin@sefaris.site';

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000308',
       'Kiwi''yi ayrı kapalı grupta değerlendirmeye taşımak (Sümeyye)',
       'Türkiye odaklı olduğu için Kiwi ayrı bir kapalı grupta değerlendirilecek.',
       'OPEN', 'LOW', NULL, u.id, '["kiwi"]'
FROM users u WHERE u.email = 'admin@sefaris.site';

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000309',
       'Kiwi''ye formasyon/danışmanlık desteği sağlamak (Umut ailesi)',
       'Umut''un öğretmen ailesinden Kiwi için formasyon ve danışmanlık desteği alınacak.',
       'OPEN', 'LOW', NULL, u.id, '["kiwi"]'
FROM users u WHERE u.email = 'admin@sefaris.site';

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000310',
       'Umut''un 2 dokümantasyonunu incelemek (Süreyya/Sümeyye)',
       'Şema entegrasyonu ve içerik dokümantasyonları Süreyya/Sümeyye tarafından incelenecek.',
       'OPEN', 'MEDIUM', NULL, u.id, '["kiwi","doküman"]'
FROM users u WHERE u.email = 'admin@sefaris.site';

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000311',
       'Haftaya 14''ünde aynı saatte tekrar toplanmak',
       'Ekip haftaya 14''ünde aynı saatte tekrar buluşacak.',
       'OPEN', 'MEDIUM', DATE '2026-07-14', u.id, '["toplantı"]'
FROM users u WHERE u.email = 'admin@sefaris.site';
