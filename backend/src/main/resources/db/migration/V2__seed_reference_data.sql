-- Referans veri seed'i (rehber bölüm 8 e-posta şablonları + sistem ayarları).
-- Kullanıcılar ve örnek iş verisi Java DataInitializer içinde (şifre hash'i için).
-- Sabit UUID literalleri → hem PostgreSQL hem H2 üzerinde taşınabilir.

INSERT INTO system_settings (id, setting_key, setting_value, setting_type, description) VALUES
    ('00000000-0000-0000-0000-000000000101', 'site_title',        'Sefaris', 'string',  'Site meta başlığı'),
    ('00000000-0000-0000-0000-000000000102', 'maintenance_mode',  'false',   'boolean', 'Bakım modu anahtarı'),
    ('00000000-0000-0000-0000-000000000103', 'contact_email',     'info@sefaris.site', 'string', 'İletişim e-postası'),
    ('00000000-0000-0000-0000-000000000104', 'default_currency',  'EUR',     'string',  'Varsayılan para birimi'),
    ('00000000-0000-0000-0000-000000000105', 'due_reminder_hours','24',      'number',  'Gecikme uyarısı kaç saat önce');

INSERT INTO email_templates (id, name, subject, body_html, body_text, variables, language, is_active) VALUES
    ('00000000-0000-0000-0000-000000000201', 'lead_confirmation_tr', 'Talebiniz alındı — Sefaris',
     '<p>Merhaba {{contact_name}}, talebinizi aldık. En kısa sürede dönüş yapacağız.</p>',
     'Merhaba {{contact_name}}, talebinizi aldık.', '["{{contact_name}}"]', 'tr', TRUE),
    ('00000000-0000-0000-0000-000000000202', 'lead_confirmation_de', 'Ihre Anfrage ist eingegangen — Sefaris',
     '<p>Hallo {{contact_name}}, wir haben Ihre Anfrage erhalten.</p>',
     'Hallo {{contact_name}}, wir haben Ihre Anfrage erhalten.', '["{{contact_name}}"]', 'de', TRUE),
    ('00000000-0000-0000-0000-000000000203', 'new_lead_notification', 'Yeni Lead — {{contact_name}}',
     '<p>Yeni bir lead geldi: {{contact_name}} ({{contact_email}}).</p>',
     'Yeni lead: {{contact_name}}', '["{{contact_name}}","{{contact_email}}"]', 'tr', TRUE),
    ('00000000-0000-0000-0000-000000000204', 'task_assigned', 'Yeni görev atandı: {{task_title}}',
     '<p>{{task_title}} görevine atandınız. Teslim: {{due_date}}.</p>',
     '{{task_title}} görevine atandınız.', '["{{task_title}}","{{due_date}}"]', 'tr', TRUE),
    ('00000000-0000-0000-0000-000000000205', 'password_reset', 'Şifre sıfırlama — Sefaris',
     '<p>Şifrenizi sıfırlamak için: {{reset_link}} (24 saat geçerli).</p>',
     'Şifre sıfırlama linki: {{reset_link}}', '["{{reset_link}}"]', 'tr', TRUE);
