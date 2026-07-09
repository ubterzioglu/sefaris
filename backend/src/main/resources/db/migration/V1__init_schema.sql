-- Sefaris — İlk şema (rehber bölüm 3)
-- Taşınabilir SQL: hem PostgreSQL hem H2 (MODE=PostgreSQL) üzerinde çalışır.
-- UUID'ler uygulama katmanında üretilir; ENUM'lar VARCHAR + @Enumerated(STRING);
-- JSONB alanları TEXT (JSON string) olarak saklanır.

-- ========================= users =========================
CREATE TABLE users (
    id                 UUID PRIMARY KEY,
    email              VARCHAR(255) NOT NULL UNIQUE,
    password_hash      VARCHAR(255),
    full_name          VARCHAR(150) NOT NULL,
    role               VARCHAR(30)  NOT NULL,
    status             VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    avatar_url         VARCHAR(500),
    hourly_rate        DECIMAL(10,2),
    expertise_tags     TEXT,
    google_id          VARCHAR(255) UNIQUE,
    preferred_language VARCHAR(5)   NOT NULL DEFAULT 'tr',
    timezone           VARCHAR(50)  NOT NULL DEFAULT 'Europe/Istanbul',
    created_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login_at      TIMESTAMP
);

-- ========================= customers =========================
CREATE TABLE customers (
    id             UUID PRIMARY KEY,
    company_name   VARCHAR(200) NOT NULL,
    tax_number     VARCHAR(50),
    contact_person VARCHAR(150),
    email          VARCHAR(255),
    phone          VARCHAR(50),
    country        VARCHAR(10),
    city           VARCHAR(100),
    address        TEXT,
    website        VARCHAR(255),
    notes          TEXT,
    created_by     UUID REFERENCES users(id),
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================= projects =========================
CREATE TABLE projects (
    id                   UUID PRIMARY KEY,
    name                 VARCHAR(200) NOT NULL,
    customer_id          UUID REFERENCES customers(id),
    description          TEXT,
    status               VARCHAR(20) NOT NULL DEFAULT 'PROPOSAL',
    budget_amount        DECIMAL(12,2),
    budget_currency      VARCHAR(5)  NOT NULL DEFAULT 'EUR',
    start_date           DATE,
    end_date             DATE,
    profit_share_dev     DECIMAL(5,2) NOT NULL DEFAULT 40,
    profit_share_design  DECIMAL(5,2) NOT NULL DEFAULT 20,
    profit_share_pm      DECIMAL(5,2) NOT NULL DEFAULT 20,
    profit_share_company DECIMAL(5,2) NOT NULL DEFAULT 20,
    created_by           UUID REFERENCES users(id),
    created_at           TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_members (
    id              UUID PRIMARY KEY,
    project_id      UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(id),
    role_in_project VARCHAR(100),
    joined_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================= tasks =========================
CREATE TABLE tasks (
    id              UUID PRIMARY KEY,
    title           VARCHAR(300) NOT NULL,
    description     TEXT,
    status          VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    priority        VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    assignee_id     UUID REFERENCES users(id),
    project_id      UUID REFERENCES projects(id),
    due_date        DATE,
    completed_at    TIMESTAMP,
    created_by      UUID NOT NULL REFERENCES users(id),
    tags            TEXT,
    estimated_hours DECIMAL(5,2),
    actual_hours    DECIMAL(5,2),
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE task_comments (
    id         UUID PRIMARY KEY,
    task_id    UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    user_id    UUID NOT NULL REFERENCES users(id),
    content    TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE task_files (
    id              UUID PRIMARY KEY,
    task_id         UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    file_name       VARCHAR(255) NOT NULL,
    file_url        VARCHAR(500) NOT NULL,
    file_size_bytes BIGINT,
    uploaded_by     UUID REFERENCES users(id),
    uploaded_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================= leads =========================
CREATE TABLE leads (
    id             UUID PRIMARY KEY,
    customer_id    UUID REFERENCES customers(id),
    source         VARCHAR(30),
    source_detail  VARCHAR(255),
    status         VARCHAR(30) NOT NULL DEFAULT 'NEW',
    expected_value DECIMAL(12,2),
    currency       VARCHAR(5) NOT NULL DEFAULT 'EUR',
    assigned_to    UUID REFERENCES users(id),
    notes          TEXT,
    contact_name   VARCHAR(150),
    contact_email  VARCHAR(255),
    contact_phone  VARCHAR(50),
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lead_history (
    id         UUID PRIMARY KEY,
    lead_id    UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    old_status VARCHAR(30),
    new_status VARCHAR(30),
    note       TEXT,
    changed_by UUID REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================= finances =========================
CREATE TABLE finances (
    id            UUID PRIMARY KEY,
    type          VARCHAR(20) NOT NULL,
    category      VARCHAR(30),
    project_id    UUID REFERENCES projects(id),
    amount        DECIMAL(12,2) NOT NULL,
    currency      VARCHAR(5) NOT NULL,
    exchange_rate DECIMAL(10,6) NOT NULL DEFAULT 1,
    amount_eur    DECIMAL(12,2),
    description   TEXT,
    date          DATE NOT NULL,
    created_by    UUID REFERENCES users(id),
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================= documents =========================
CREATE TABLE documents (
    id              UUID PRIMARY KEY,
    folder_path     VARCHAR(500) NOT NULL,
    file_name       VARCHAR(255) NOT NULL,
    file_url        VARCHAR(500) NOT NULL,
    file_size_bytes BIGINT,
    access_level    VARCHAR(20) NOT NULL DEFAULT 'TEAM',
    allowed_roles   TEXT,
    uploaded_by     UUID REFERENCES users(id),
    uploaded_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================= seo =========================
CREATE TABLE seo_campaigns (
    id             UUID PRIMARY KEY,
    name           VARCHAR(200) NOT NULL,
    customer_id    UUID REFERENCES customers(id),
    target_country VARCHAR(10),
    status         VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    start_date     DATE,
    end_date       DATE,
    monthly_budget DECIMAL(10,2),
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE seo_keywords (
    id            UUID PRIMARY KEY,
    campaign_id   UUID NOT NULL REFERENCES seo_campaigns(id) ON DELETE CASCADE,
    keyword       VARCHAR(200) NOT NULL,
    target_url    VARCHAR(500),
    current_rank  INT,
    previous_rank INT,
    search_volume INT,
    last_checked  DATE
);

-- ========================= announcements / logs / templates / settings =========================
CREATE TABLE announcements (
    id           UUID PRIMARY KEY,
    title        VARCHAR(200) NOT NULL,
    content      TEXT NOT NULL,
    priority     VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
    active_from  DATE,
    active_until DATE,
    created_by   UUID REFERENCES users(id),
    created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_logs (
    id          UUID PRIMARY KEY,
    user_id     UUID REFERENCES users(id),
    action      VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id   UUID,
    details     TEXT,
    ip_address  VARCHAR(45),
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE email_templates (
    id        UUID PRIMARY KEY,
    name      VARCHAR(100) NOT NULL UNIQUE,
    subject   VARCHAR(255) NOT NULL,
    body_html TEXT NOT NULL,
    body_text TEXT,
    variables TEXT,
    language  VARCHAR(5) NOT NULL DEFAULT 'tr',
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE system_settings (
    id            UUID PRIMARY KEY,
    setting_key   VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type  VARCHAR(20),
    description   VARCHAR(255)
);

-- ========================= indeksler =========================
CREATE INDEX idx_tasks_status       ON tasks(status);
CREATE INDEX idx_tasks_assignee     ON tasks(assignee_id);
CREATE INDEX idx_tasks_project      ON tasks(project_id);
CREATE INDEX idx_projects_customer  ON projects(customer_id);
CREATE INDEX idx_projects_status    ON projects(status);
CREATE INDEX idx_leads_status       ON leads(status);
CREATE INDEX idx_leads_assigned     ON leads(assigned_to);
CREATE INDEX idx_finances_type      ON finances(type);
CREATE INDEX idx_finances_project   ON finances(project_id);
CREATE INDEX idx_activity_user      ON activity_logs(user_id);
