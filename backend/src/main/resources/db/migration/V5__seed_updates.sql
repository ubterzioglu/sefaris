-- Panel "Duyurular" (Güncellemeler) seed'i. Sabit UUID literalleri →
-- hem PostgreSQL hem H2 üzerinde taşınabilir. created_by NULL bırakıldı
-- (şema nullable); active_until NULL → duyuru kalıcı olarak aktif kalır.
-- active_from CURRENT_DATE: bugünden itibaren görünür.

INSERT INTO announcements (id, title, content, priority, active_from, active_until, created_by, created_at) VALUES
    ('00000000-0000-0000-0000-000000000301',
     'Yeni mimari yayında (v4.0.0)',
     'Sefaris, Spring Boot + PostgreSQL backend ve Next.js (RTK Query, TR/DE/EN) frontend olan monorepo mimarisine taşındı. Yönetim paneli /{dil}/admin altında.',
     'HIGH', CURRENT_DATE, NULL, NULL, CURRENT_TIMESTAMP),

    ('00000000-0000-0000-0000-000000000302',
     'Panelde taze veri düzeltmesi',
     'Sayfalar arası gezerken eski veri görünmesi giderildi: panel artık her açılışta, sekmeye dönüşte ve yeniden bağlanınca güncel veriyi çekiyor (RTK Query cache ayarı).',
     'NORMAL', CURRENT_DATE, NULL, NULL, CURRENT_TIMESTAMP),

    ('00000000-0000-0000-0000-000000000303',
     'Toplantı görevleri panoya işlendi',
     'CorteQS ekip görüşmelerinden çıkan görevler ve bağlam notları görev panosuna eklendi. 4 ana başlık: Kiwi, Markalaşma/Kurumsal Kimlik, Almanya iş alımı, SEO/GEO.',
     'NORMAL', CURRENT_DATE, NULL, NULL, CURRENT_TIMESTAMP);
