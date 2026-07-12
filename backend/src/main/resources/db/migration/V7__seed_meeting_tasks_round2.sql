-- İkinci CorteQS ekip toplantısından çıkan yeni/ek aksiyon maddeleri
-- (ilk toplantının 4 ana başlığını teyit eden tekrar niteliğindeki maddeler
-- V3/V6'da zaten var — burada sadece yeni ortaya çıkan aksiyonlar eklenir).
-- İdempotent (WHERE NOT EXISTS), V6 ile aynı desen. Sabit UUID literalleri
-- hem PostgreSQL hem H2 (PostgreSQL modu) üzerinde çalışır.

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000312',
       'Kiwi için gerilla pazarlama planı hazırlamak (Şahin)',
       'Ücretli reklam yerine gerilla marketing / kulaktan kulağa / el broşürü + indirim kodu ile Kiwi tanıtımı planlanacak.',
       'OPEN', 'MEDIUM', NULL, u.id, '["kiwi","pazarlama"]'
FROM users u WHERE u.email = 'admin@sefaris.site'
  AND NOT EXISTS (SELECT 1 FROM tasks WHERE id = '00000000-0000-0000-0000-000000000312');

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000313',
       'Referans siteleri (öğretmenplanları.net, yakincampus.com) için bağlantı görüşmesi yapmak',
       'Kiwi için içerik/scraping ortaklığı: öğretmenplanları.net ile görüşülecek; yakincampus.com (30-40 bin üyeli) bağlantısı değerlendirilecek.',
       'OPEN', 'LOW', NULL, u.id, '["kiwi"]'
FROM users u WHERE u.email = 'admin@sefaris.site'
  AND NOT EXISTS (SELECT 1 FROM tasks WHERE id = '00000000-0000-0000-0000-000000000313');

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000314',
       'Rekabetçi fiyat stratejisini yazılı hale getirmek (Umut)',
       'Almanların pahalı web/CRM (SAP) fiyatlarına karşı rekabetçi fiyatlandırma (ör. 5000€ işi 3000€''a) stratejisi dokümante edilecek.',
       'OPEN', 'LOW', NULL, u.id, '["almanya","satış"]'
FROM users u WHERE u.email = 'admin@sefaris.site'
  AND NOT EXISTS (SELECT 1 FROM tasks WHERE id = '00000000-0000-0000-0000-000000000314');

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000315',
       'AB proje fonlarına bel bağlamadan önce dernek kurulumunu araştırmak (Aslı)',
       'Bireysel başvuru şu an mümkün değil; önce dernek kurulması gerekiyor. Şimdilik öncelik değil, sadece ön araştırma yapılacak.',
       'OPEN', 'LOW', NULL, u.id, '["ab-fon"]'
FROM users u WHERE u.email = 'admin@sefaris.site'
  AND NOT EXISTS (SELECT 1 FROM tasks WHERE id = '00000000-0000-0000-0000-000000000315');

INSERT INTO tasks (id, title, description, status, priority, due_date, created_by, tags)
SELECT '00000000-0000-0000-0000-000000000316',
       'Referans örnekleri (nextrise.com.fr, Aria Teknoloji) portföy sayfasına eklemek',
       'Kurumsal kimlik web sitesine referans/örnek çalışma olarak nextrise.com.fr ve otorite örneği Aria Teknoloji eklenecek.',
       'OPEN', 'LOW', NULL, u.id, '["markalaşma","web"]'
FROM users u WHERE u.email = 'admin@sefaris.site'
  AND NOT EXISTS (SELECT 1 FROM tasks WHERE id = '00000000-0000-0000-0000-000000000316');
