# Sefaris — Kurumsal Web Sitesi & Yönetim Paneli Tam ve Eksiksiz Mimari Rehberi

**Sürüm:** 4.0.0 (Spring Boot & Next.js/React - Eksiksiz Tam Sürüm)  
**Hedef Kitle:** Yazılım Geliştiriciler, Proje Yöneticileri, Ajans Paydaşları  
**Dil Desteği:** Türkçe (Ana) | Almanca (İkincil - DACH Bölgesi) | İngilizce (Opsiyonel - Küresel)  
**Bağlantılar:** [Ana Sayfa](https://sefaris.site) | [Yönetim Paneli](https://sefaris.site/admin)  

## Önemli Not: Ekip Kararları (WhatsApp Görüşmesi — 9 Temmuz 2026)

Bu rehber, ekip görüşmesi sonucunda alınan aşağıdaki kritik kararlar doğrultusunda revize edilmiştir:

| # | Karar | Gerekçe |
|---|-------|---------|
| 1 | **State Management %100 RTK Query** | Normalized cache, auto-refetching, optimistic updates, Redux DevTools entegrasyonu |
| 2 | **Axios KULLANMA** | RTK Query'nin `fetchBaseQuery`'si yeterli, ekstra bundle eklenmez |
| 3 | **TanStack Query (React Query) KULLANMA** | RTK Query aynı işlevi görür, ekstra bağımlılık gerekmez |
| 4 | **Zustand KULLANMA** | RTK Query + Redux Toolkit client state için yeterli |
| 5 | **useEffect ile derived state YAPMA** | `selectFromResult` veya `createSelector` kullan |
| 6 | **Transform response'ları ayrı component'te yap** | RAM tasarrufu, component sorumluluğu netliği |
| 7 | **Derived State mantığında çalış** | Sanal DOM'da verilerin güncellenebilmesi için state yönetimi gerekli, ama useEffect ile değil |

---


---

## İÇİNDEKİLER

1. [Proje Vizyonu ve Stratejik Konumlandırma](#1-proje-vizyonu-ve-stratejik-konumlandırma)
2. [Sistem Mimarisi & Teknoloji Yığıtı](#2-sistem-mimarisi--teknoloji-yığıtı)
2.5. [RTK Query Mimarisi ve State Yönetimi Prensipleri](#25-rtk-query-mimarisi-ve-state-yönetimi-prensipleri)
3. [Veritabanı Şeması (DB Schema)](#3-veritabanı-şeması-db-schema)
4. [API Endpoint Listesi (REST API Contract)](#4-api-endpoint-listesi-rest-api-contract)
5. [Rol ve Yetki Matrisi (RBAC)](#5-rol-ve-yetki-matrisi-rbac)
6. [Ön Yüz (Public Website) — Sayfa ve İçerik Mimarisi](#6-ön-yüz-public-website--sayfa-ve-içerik-mimarisi)
7. [Yönetim Paneli (Admin Panel) — Modül Mimarisi](#7-yönetim-paneli-admin-panel--modül-mimarisi)
8. [E-posta Akışları](#8-e-posta-akışları)
9. [Bildirim Sistemi](#9-bildirim-sistemi)
10. [Dosya Yükleme Kuralları](#10-dosya-yükleme-kuralları)
11. [Form Validasyon Kuralları (Zod Schemas)](#11-form-validasyon-kuralları-zod-schemas)
12. [UI/UX Tasarım Sistemi](#12-uiux-tasarım-sistemi)
13. [Sayfa Layout Yapısı (Responsive)](#13-sayfa-layout-yapısı-responsive)
14. [Hata Kodları ve Mesajları](#14-hata-kodları-ve-mesajları)
15. [Durum Geçiş Diyagramları (State Machines)](#15-durum-geçiş-diyagramları-state-machines)
16. [Kullanıcı Akış Senaryoları](#16-kullanıcı-akış-senaryoları)
17. [Güvenlik, Veri Gizliliği & Uyumluluk](#17-güvenlik-veri-gizliliği--uyumluluk)
18. [Environment Variables](#18-environment-variables)
19. [Docker Compose Yapısı](#19-docker-compose-yapısı)
20. [CI/CD Pipeline](#20-cicd-pipeline)
21. [SEO Meta Tag Şablonları](#21-seo-meta-tag-şablonları)
22. [Performans Hedefleri](#22-performans-hedefleri)
23. [Yedekleme ve Kurtarma](#23-yedekleme-ve-kurtarma)
24. [Test Stratejisi](#24-test-stratejisi)
25. [Geliştirme Yol Haritası](#25-geliştirme-yol-haritası)
26. [Dokümantasyon Yapısı](#26-dokümantasyon-yapısı)

---

## 1. Proje Vizyonu ve Stratejik Konumlandırma

Sefaris; Türkiye ve Almanya'da (DACH bölgesi) dağıtık (remote) olarak çalışan, yazılım geliştirme, dijital dönüşüm ve IT danışmanlığı sunan bir mühendislik ve proje ortaklığı platformudur. Platform iki temel üzerine inşa edilmiştir:

* **Ön Yüz (Public Website):** Kurumsal güven veren, teknik yetkinlikleri sergileyen, Edvido ve İnksen benzeri nitelikli potansiyel müşteri (lead) toplayan, çok dilli bir vitrin.
* **Yönetim Paneli (Admin Workspace):** Ekip içi çevik (agile) proje yönetimi, görev takibi, Almanya-Türkiye arası proje dağıtımı, gelir paylaşımı (hakediş) ve SEO/GEO lead takibini barındıran modüler bir kurumsal yönetim altyapısı.

---

## 2. Sistem Mimarisi & Teknoloji Yığıtı (Tech Stack)

| Katman | Teknoloji / Araç | Karar Gerekçesi & Özellikler |
| :--- | :--- | :--- |
| **Frontend (Ön Yüz)** | **Next.js 14+ (App Router) / React**, TypeScript | Kurumsal web sitesi için Server-Side Rendering (SSR) ile üstün SEO performansı; Admin paneli için hızlı ve dinamik React bileşen mimarisi. |
| **Backend (Arka Yüz)** | **Spring Boot (Java)** | RESTful API mimarisi, yüksek yük tutma kapasitesi, kurumsal güvenlik ve SOLID prensiplerine uygun modüler/mikroservis altyapısı. |
| **Veritabanı & ORM** | **PostgreSQL**, Hibernate / JPA | İlişkisel veri bütünlüğü, karmaşık finans/hakediş sorgularında yüksek performans ve güvenilir ORM katmanı. |
| **Kimlik Doğrulama** | **Spring Security + OAuth2 / JWT** | Ekip e-postaları için Google OAuth 2.0 entegrasyonu ve rol bazlı (RBAC) stateless JWT kimlik doğrulaması. |
| **Stil / UI Framework** | Tailwind CSS, Shadcn/UI, Lucide Icons | Hızlı, kurumsal, erişilebilir ve özelleştirilebilir arayüz tasarımı (JSX/TSX uyumlu). |
| **Dosya Depolama** | AWS S3 / MinIO (veya Cloud Storage) | Sözleşmeler, teklifler ve görev ekleri için güvenli, izolasyonlu (max 10 MB limitli) döküman arşivi. |
| **State Yönetimi** | **RTK Query** (Redux Toolkit Query) | Sunucu state yönetimi, caching, auto-refetching, optimistic updates. Normalized cache yapısı ile veri tutarlılığı. **Axios KULLANMA** — RTK Query'nin built-in fetchBaseQuery kullan. |
| **Form & Validasyon** | React Hook Form + Zod | Sıfır gereksiz render ile yüksek performanslı formlar ve uçtan uca şema validasyonu. Form state'i RTK Query ile senkronize. |
| **i18n (Çok Dilli)** | `next-intl` | Route bazlı (`/tr`, `/de`, `/en`) dil yönetimi ve SEO meta tag senkronizasyonu. RTK Query ile dil değişiminde cache invalidate. |
| **DevOps & Deployment** | Docker, AWS (EC2, RDS), Vercel | Containerized backend yapısı (Docker + Spring Boot), frontend için Vercel veya bulut CDN entegrasyonu. |

---



## 2.5. RTK Query Mimarisi ve State Yönetimi Prensipleri

> **Karar:** Ekip görüşmesi sonucu state yönetimi %100 RTK Query (Redux Toolkit Query) olarak belirlenmiştir.  
> **Yasaklar:** Axios KULLANMA. TanStack Query (React Query) KULLANMA. Zustand KULLANMA. useEffect ile derived state hesaplama YAPMA.

### 2.5.1 Neden RTK Query?

| Özellik | RTK Query | Axios + useState | TanStack Query |
|---------|-----------|------------------|----------------|
| **Caching** | Otomatik, normalized | Manuel, yok | Otomatik |
| **Auto-refetching** | ✅ (tags, invalidation) | ❌ Manuel | ✅ |
| **Optimistic Updates** | ✅ Built-in | ❌ Manuel | ✅ |
| **DevTools** | ✅ Redux DevTools | ❌ | ✅ React Query DevTools |
| **Bundle Size** | ~20KB (RTK + Query) | ~13KB (axios) | ~12KB |
| **Normalized Cache** | ✅ | ❌ | ❌ |
| **TypeScript** | ✅ First-class | ⚠️ | ✅ |

### 2.5.2 API Slice Yapısı

```typescript
// store/api/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Task', 'Project', 'Customer', 'Lead', 'Finance', 'User', 'Document', 'SEO'],
  endpoints: () => ({}),
});
```

### 2.5.3 Feature Slice'lar (Injected Endpoints)

```typescript
// store/api/taskApi.ts
import { baseApi } from './baseApi';

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], GetTasksParams>({
      query: (params) => ({
        url: '/tasks',
        params,
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Task' as const, id })), 'Task']
          : ['Task'],
    }),

    getTaskById: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: 'Task', id }],
    }),

    createTask: builder.mutation<Task, CreateTaskDto>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation<Task, { id: string; body: UpdateTaskDto }>({
      query: ({ id, body }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),

    updateTaskStatus: builder.mutation<Task, { id: string; status: TaskStatus }>({
      query: ({ id, status }) => ({
        url: `/tasks/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      // Optimistic Update
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData('getTaskById', id, (draft) => {
            draft.status = status;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),

    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} = taskApi;
```

### 2.5.4 Derived State Mantığı (useEffect YASAK)

> **Kural:** Değişen verilerin sanal DOM'da güncellenebilmesi için state yönetimine ihtiyaç var. Ama bu ihtiyaç useEffect ile değil, **RTK Query'nin selectFromResult** veya **createSelector** ile karşılanır.

```typescript
// ❌ YANLIŞ — useEffect ile derived state
const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
const { data: tasks } = useGetTasksQuery();

useEffect(() => {
  if (tasks) {
    setFilteredTasks(tasks.filter(t => t.status === 'open'));
  }
}, [tasks]);

// ✅ DOĞRU — selectFromResult ile derived state (RTK Query cache'den)
const { openTasks } = useGetTasksQuery(undefined, {
  selectFromResult: ({ data }) => ({
    openTasks: data?.filter(t => t.status === 'open') ?? [],
  }),
});

// ✅ DOĞRU — createSelector ile memoized derived state
const selectOpenTasks = createSelector(
  (state: RootState) => state.api.queries['getTasks(undefined)']?.data as Task[] | undefined,
  (tasks) => tasks?.filter(t => t.status === 'open') ?? []
);

const openTasks = useSelector(selectOpenTasks);
```

### 2.5.5 Transform Response (Ayrı Component'te)

> **Kural:** API response'larını mutlaka ayrı bir component'te transform et. RAM tasarrufu sağlar, component sorumluluğu net olur.

```typescript
// components/tasks/TaskList.tsx — Presentation Component
export function TaskList({ tasks }: { tasks: TaskViewModel[] }) {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

// components/tasks/TaskListContainer.tsx — Container Component (Transform burada)
export function TaskListContainer() {
  const { data: tasks, isLoading } = useGetTasksQuery();

  // Transform burada yapılır, API slice'da DEĞİL
  const transformedTasks = useMemo(() => {
    if (!tasks) return [];
    return tasks.map(transformTaskToViewModel);
  }, [tasks]);

  if (isLoading) return <TaskListSkeleton />;

  return <TaskList tasks={transformedTasks} />;
}

// lib/transformers/taskTransformer.ts
export function transformTaskToViewModel(task: Task): TaskViewModel {
  return {
    ...task,
    isOverdue: task.dueDate ? new Date(task.dueDate) < new Date() : false,
    daysUntilDue: task.dueDate 
      ? Math.ceil((new Date(task.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : null,
    priorityLabel: getPriorityLabel(task.priority),
    statusLabel: getStatusLabel(task.status),
  };
}
```

### 2.5.6 RTK Query Best Practices

| # | Kural | Açıklama |
|---|-------|----------|
| 1 | **Axios kullanma** | RTK Query'nin `fetchBaseQuery`'si yeterli. Axios ekstra bundle ekler. |
| 2 | **useEffect kullanma** | Veri çekme, filtreleme, transform için RTK Query hook'larını kullan. |
| 3 | **Tag'leri doğru kullan** | Her endpoint `providesTags` ve `invalidatesTags` ile cache invalidation yap. |
| 4 | **Optimistic Updates** | UI anında güncellensin, API başarısız olursa geri al. |
| 5 | **Polling** | Gerçek zamanlı gereken yerde `pollingInterval` kullan. |
| 6 | **Skip token** | Koşullu sorgular için `skipToken` kullan, undefined gönderme. |
| 7 | **Prefetching** | Hover'da veya route değişiminde `prefetch` ile veriyi önceden çek. |

### 2.5.7 Store Yapısı

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './api/baseApi';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,        // Sadece client-side state (token, user)
    ui: uiReducer,            // UI state (sidebar açık/kapalı, modal'lar)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2.5.8 Client State vs Server State Ayrımı

| State Tipi | Örnek | Yönetim |
|------------|-------|---------|
| **Server State** | Görevler, projeler, kullanıcılar | RTK Query (cache, auto-sync) |
| **Client State** | Auth token, tema, dil, sidebar durumu | Redux Toolkit slice |
| **UI State** | Modal açık/kapalı, form dirty state | Redux Toolkit slice veya local state |
| **Derived State** | Filtrelenmiş liste, hesaplanan toplamlar | `selectFromResult` veya `createSelector` |


## 3. Veritabanı Şeması (DB Schema)

### 3.1 Tablo İlişki Diyagramı

```
users                    (1) ───< (N)  tasks
  │                        │           │
  │                        │           ├── task_comments (N)
  │                        │           └── task_files (N)
  │                        │
  │                        └──< (N)  projects
  │                                    │
  │                                    ├── project_members (N) ──> users
  │                                    ├── project_files (N)
  │                                    └── project_tasks (1:N ile tasks)
  │
  ├──< (N)  customers
  │           │
  │           ├──< (N)  leads
  │           │           └── lead_history (N)
  │           └──< (N)  invoices
  │
  ├──< (N)  finances (gelir/gider kayıtları)
  │
  ├──< (N)  seo_campaigns
  │           └── seo_keywords (N)
  │
  └──< (N)  documents
              └── document_versions (N)

system_settings          (1 satır, key-value)
email_templates          (N)
announcements            (N)
activity_logs            (N) ──> users
```

### 3.2 Detaylı Tablo Tanımları

#### `users` — Ekip Üyeleri
| Alan | Tip | Kısıtlama | Açıklama |
|------|-----|-----------|----------|
| id | UUID | PK, auto | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Giriş için |
| password_hash | VARCHAR(255) | | NULL olabilir (Google OAuth için) |
| full_name | VARCHAR(150) | NOT NULL | |
| role | ENUM | NOT NULL | `super_admin`, `admin`, `developer`, `designer`, `seo_specialist`, `viewer`, `accountant` |
| status | ENUM | DEFAULT 'active' | `active`, `inactive`, `suspended` |
| avatar_url | VARCHAR(500) | | |
| hourly_rate | DECIMAL(10,2) | | EUR cinsinden, opsiyonel |
| expertise_tags | JSONB | | `["Spring Boot", "Next.js", "UI/UX"]` |
| google_id | VARCHAR(255) | UNIQUE | OAuth ID |
| preferred_language | VARCHAR(5) | DEFAULT 'tr' | `tr`, `de`, `en` |
| timezone | VARCHAR(50) | DEFAULT 'Europe/Istanbul' | |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| last_login_at | TIMESTAMP | | |

#### `tasks` — Görevler
| Alan | Tip | Kısıtlama | Açıklama |
|------|-----|-----------|----------|
| id | UUID | PK, auto | |
| title | VARCHAR(300) | NOT NULL, min 2 char | |
| description | TEXT | | Markdown destekli |
| status | ENUM | DEFAULT 'open' | `open`, `in_progress`, `in_review`, `completed`, `cancelled`, `delayed` |
| priority | ENUM | DEFAULT 'medium' | `low`, `medium`, `high`, `urgent` |
| assignee_id | UUID | FK → users | NULL = "Ortak Havuz" |
| project_id | UUID | FK → projects | NULL = genel görev |
| due_date | DATE | | |
| completed_at | TIMESTAMP | | |
| created_by | UUID | FK → users, NOT NULL | |
| tags | JSONB | | `["frontend", "bug"]` |
| estimated_hours | DECIMAL(5,2) | | |
| actual_hours | DECIMAL(5,2) | | |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

#### `task_comments` — Görev Yorumları
| Alan | Tip | Kısıtlama |
|------|-----|-----------|
| id | UUID | PK |
| task_id | UUID | FK → tasks, ON DELETE CASCADE |
| user_id | UUID | FK → users |
| content | TEXT | NOT NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |

#### `task_files` — Görev Dosyaları
| Alan | Tip | Kısıtlama |
|------|-----|-----------|
| id | UUID | PK |
| task_id | UUID | FK → tasks, ON DELETE CASCADE |
| file_name | VARCHAR(255) | NOT NULL |
| file_url | VARCHAR(500) | NOT NULL |
| file_size_bytes | BIGINT | max 10MB = 10485760 |
| uploaded_by | UUID | FK → users |
| uploaded_at | TIMESTAMP | DEFAULT NOW() |

#### `projects` — Projeler
| Alan | Tip | Kısıtlama | Açıklama |
|------|-----|-----------|----------|
| id | UUID | PK | |
| name | VARCHAR(200) | NOT NULL | |
| customer_id | UUID | FK → customers | |
| description | TEXT | | |
| status | ENUM | DEFAULT 'proposal' | `proposal`, `approved`, `in_progress`, `testing`, `live`, `maintenance`, `cancelled`, `completed` |
| budget_amount | DECIMAL(12,2) | | |
| budget_currency | ENUM | DEFAULT 'EUR' | `EUR`, `TRY`, `USD` |
| start_date | DATE | | |
| end_date | DATE | | |
| profit_share_dev | DECIMAL(5,2) | DEFAULT 40 | % |
| profit_share_design | DECIMAL(5,2) | DEFAULT 20 | % |
| profit_share_pm | DECIMAL(5,2) | DEFAULT 20 | % |
| profit_share_company | DECIMAL(5,2) | DEFAULT 20 | % |
| created_by | UUID | FK → users | |
| created_at | TIMESTAMP | DEFAULT NOW() | |

#### `project_members` — Proje-Ekip İlişkisi
| Alan | Tip | Kısıtlama |
|------|-----|-----------|
| id | UUID | PK |
| project_id | UUID | FK → projects, ON DELETE CASCADE |
| user_id | UUID | FK → users |
| role_in_project | VARCHAR(100) | "Backend Dev", "UI Designer" |
| joined_at | TIMESTAMP | DEFAULT NOW() |

#### `customers` — Müşteriler
| Alan | Tip | Kısıtlama |
|------|-----|-----------|
| id | UUID | PK |
| company_name | VARCHAR(200) | NOT NULL |
| tax_number | VARCHAR(50) | |
| contact_person | VARCHAR(150) | |
| email | VARCHAR(255) | |
| phone | VARCHAR(50) | |
| country | ENUM | `TR`, `DE`, `AT`, `CH`, `OTHER` |
| city | VARCHAR(100) | |
| address | TEXT | |
| website | VARCHAR(255) | |
| notes | TEXT | |
| created_by | UUID | FK → users |
| created_at | TIMESTAMP | DEFAULT NOW() |

#### `leads` — Müşteri Adayları
| Alan | Tip | Kısıtlama | Açıklama |
|------|-----|-----------|----------|
| id | UUID | PK | |
| customer_id | UUID | FK → customers | NULL = henüz müşteri değil |
| source | ENUM | | `website_form`, `referral`, `linkedin`, `seo`, `direct`, `other` |
| source_detail | VARCHAR(255) | | Hangi yazıdan, kimden referans |
| status | ENUM | DEFAULT 'new' | `new`, `contacted`, `meeting_scheduled`, `proposal_sent`, `won`, `lost`, `on_hold` |
| expected_value | DECIMAL(12,2) | | Tahmini gelir |
| currency | ENUM | DEFAULT 'EUR' | |
| assigned_to | UUID | FK → users | Sorumlu ekip üyesi |
| notes | TEXT | | |
| contact_name | VARCHAR(150) | | |
| contact_email | VARCHAR(255) | | |
| contact_phone | VARCHAR(50) | | |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

#### `finances` — Gelir / Gider
| Alan | Tip | Kısıtlama | Açıklama |
|------|-----|-----------|----------|
| id | UUID | PK | |
| type | ENUM | NOT NULL | `income`, `expense` |
| category | ENUM | | `project_payment`, `commission`, `server`, `domain`, `license`, `salary`, `other` |
| project_id | UUID | FK → projects | NULL = genel gelir/gider |
| amount | DECIMAL(12,2) | NOT NULL | |
| currency | ENUM | NOT NULL | `EUR`, `TRY`, `USD` |
| exchange_rate | DECIMAL(10,6) | DEFAULT 1 | O anki kur |
| amount_eur | DECIMAL(12,2) | | EUR karşılığı (otomatik) |
| description | TEXT | | |
| date | DATE | NOT NULL | |
| created_by | UUID | FK → users | |
| created_at | TIMESTAMP | DEFAULT NOW() | |

#### `documents` — Doküman Arşivi
| Alan | Tip | Kısıtlama |
|------|-----|-----------|
| id | UUID | PK |
| folder_path | VARCHAR(500) | NOT NULL | `/Sozlesmeler/2024/` |
| file_name | VARCHAR(255) | NOT NULL |
| file_url | VARCHAR(500) | NOT NULL |
| file_size_bytes | BIGINT | |
| access_level | ENUM | DEFAULT 'team' | `public`, `team`, `admin_only`, `custom` |
| allowed_roles | JSONB | | `["admin", "super_admin"]` |
| uploaded_by | UUID | FK → users |
| uploaded_at | TIMESTAMP | DEFAULT NOW() |

#### `seo_campaigns` — SEO Projeleri
| Alan | Tip | Kısıtlama |
|------|-----|-----------|
| id | UUID | PK |
| name | VARCHAR(200) | NOT NULL |
| customer_id | UUID | FK → customers |
| target_country | ENUM | `DE`, `TR`, `GLOBAL` |
| status | ENUM | DEFAULT 'active' | `active`, `paused`, `completed` |
| start_date | DATE | |
| end_date | DATE | |
| monthly_budget | DECIMAL(10,2) | |
| created_at | TIMESTAMP | DEFAULT NOW() |

#### `seo_keywords` — Anahtar Kelime Takibi
| Alan | Tip | Kısıtlama |
|------|-----|-----------|
| id | UUID | PK |
| campaign_id | UUID | FK → seo_campaigns |
| keyword | VARCHAR(200) | NOT NULL |
| target_url | VARCHAR(500) | |
| current_rank | INT | |
| previous_rank | INT | |
| search_volume | INT | |
| last_checked | DATE | |

#### `announcements` — Sistem Duyuruları
| Alan | Tip | Kısıtlama |
|------|-----|-----------|
| id | UUID | PK |
| title | VARCHAR(200) | NOT NULL |
| content | TEXT | NOT NULL |
| priority | ENUM | DEFAULT 'normal' | `low`, `normal`, `high`, `urgent` |
| active_from | DATE | |
| active_until | DATE | |
| created_by | UUID | FK → users |
| created_at | TIMESTAMP | DEFAULT NOW() |

#### `activity_logs` — Sistem Logları
| Alan | Tip | Kısıtlama |
|------|-----|-----------|
| id | UUID | PK |
| user_id | UUID | FK → users |
| action | VARCHAR(100) | NOT NULL | `task_created`, `task_updated`, `file_uploaded` |
| entity_type | VARCHAR(50) | | `task`, `project`, `customer` |
| entity_id | UUID | | |
| details | JSONB | | `{ "old_status": "open", "new_status": "completed" }` |
| ip_address | VARCHAR(45) | |
| created_at | TIMESTAMP | DEFAULT NOW() |

#### `email_templates` — E-posta Şablonları
| Alan | Tip | Kısıtlama |
|------|-----|-----------|
| id | UUID | PK |
| name | VARCHAR(100) | NOT NULL, UNIQUE |
| subject | VARCHAR(255) | NOT NULL |
| body_html | TEXT | NOT NULL |
| body_text | TEXT | |
| variables | JSONB | | `["{{customer_name}}", "{{project_name}}"]` |
| language | VARCHAR(5) | DEFAULT 'tr' |
| is_active | BOOLEAN | DEFAULT true |

#### `system_settings` — Sistem Ayarları (Key-Value)
| Alan | Tip | Kısıtlama |
|------|-----|-----------|
| id | UUID | PK |
| setting_key | VARCHAR(100) | UNIQUE, NOT NULL |
| setting_value | TEXT | |
| setting_type | ENUM | `string`, `number`, `boolean`, `json` |
| description | VARCHAR(255) | |


---

## 4. API Endpoint Listesi (REST API Contract)

### 4.1 Authentication (`/api/v1/auth`)

| Endpoint | Method | Açıklama | Request Body | Response |
|----------|--------|----------|--------------|----------|
| `/register` | POST | E-posta ile kayıt | `{ email, password, full_name }` | `{ user, token }` |
| `/login` | POST | E-posta + şifre | `{ email, password }` | `{ user, token, expires_at }` |
| `/google` | POST | Google OAuth callback | `{ id_token }` | `{ user, token }` |
| `/refresh` | POST | Token yenileme | `{ refresh_token }` | `{ token, refresh_token }` |
| `/me` | GET | Mevcut kullanıcı | — | `{ id, email, full_name, role, avatar_url }` |
| `/logout` | POST | Çıkış | — | `{ success: true }` |
| `/forgot-password` | POST | Şifre sıfırlama | `{ email }` | `{ message }` |
| `/reset-password` | POST | Yeni şifre | `{ token, new_password }` | `{ success }` |

### 4.2 Tasks (`/api/v1/tasks`)

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `GET /tasks` | LIST | Filtrele: `?status=open&assignee_id=xxx&project_id=xxx&priority=high&due_before=2026-08-01` |
| `GET /tasks/:id` | GET | Tekil görev + yorumlar + dosyalar |
| `POST /tasks` | CREATE | `{ title, description, assignee_id, project_id, due_date, priority, tags, estimated_hours }` |
| `PUT /tasks/:id` | UPDATE | Tüm alanlar güncellenebilir |
| `PATCH /tasks/:id/status` | UPDATE | Sadece status güncelleme (drag-drop için) |
| `DELETE /tasks/:id` | DELETE | Soft delete veya hard delete |
| `POST /tasks/:id/comments` | CREATE | `{ content }` |
| `DELETE /tasks/:id/comments/:commentId` | DELETE | |
| `POST /tasks/:id/files` | UPLOAD | multipart/form-data, max 10MB |
| `DELETE /tasks/:id/files/:fileId` | DELETE | |

### 4.3 Projects (`/api/v1/projects`)

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `GET /projects` | LIST | `?status=&customer_id=&page=&limit=` |
| `GET /projects/:id` | GET | Proje detay + üyeler + görev özeti |
| `POST /projects` | CREATE | `{ name, customer_id, description, status, budget_amount, budget_currency, start_date, end_date, profit_shares }` |
| `PUT /projects/:id` | UPDATE | |
| `DELETE /projects/:id` | DELETE | |
| `POST /projects/:id/members` | ADD | `{ user_id, role_in_project }` |
| `DELETE /projects/:id/members/:userId` | REMOVE | |
| `GET /projects/:id/tasks` | LIST | Projenin görevleri |
| `GET /projects/:id/finances` | LIST | Projenin gelir/gider özeti |

### 4.4 Customers (`/api/v1/customers`)

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `GET /customers` | LIST | `?country=&search=&page=` |
| `GET /customers/:id` | GET | Detay + projeler + lead geçmişi |
| `POST /customers` | CREATE | `{ company_name, contact_person, email, phone, country, city, address, website, notes }` |
| `PUT /customers/:id` | UPDATE | |
| `DELETE /customers/:id` | DELETE | |

### 4.5 Leads (`/api/v1/leads`)

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `GET /leads` | LIST | `?status=&source=&assigned_to=&page=` |
| `GET /leads/:id` | GET | |
| `POST /leads` | CREATE | `{ source, source_detail, contact_name, contact_email, contact_phone, expected_value, currency, assigned_to, notes }` |
| `PUT /leads/:id` | UPDATE | |
| `PATCH /leads/:id/status` | UPDATE | `{ status, notes }` — pipeline hareketi |
| `DELETE /leads/:id` | DELETE | |

### 4.6 Finances (`/api/v1/finances`)

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `GET /finances` | LIST | `?type=income&category=&project_id=&date_from=&date_to=` |
| `GET /finances/summary` | GET | Aylık/ylık özet: `{ total_income, total_expense, net_profit, by_currency }` |
| `GET /finances/project/:id` | GET | Proje bazlı finans özeti |
| `POST /finances` | CREATE | `{ type, category, project_id, amount, currency, exchange_rate, description, date }` |
| `PUT /finances/:id` | UPDATE | |
| `DELETE /finances/:id` | DELETE | |
| `GET /finances/profit-share/:projectId` | GET | `{ total_profit, shares: [{ user_id, role, percentage, amount }] }` |

### 4.7 Documents (`/api/v1/documents`)

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `GET /documents` | LIST | `?folder_path=&search=` |
| `POST /documents` | UPLOAD | multipart/form-data + `{ folder_path, access_level }` |
| `GET /documents/:id/download` | GET | Presigned URL döner |
| `DELETE /documents/:id` | DELETE | |

### 4.8 SEO (`/api/v1/seo`)

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `GET /seo/campaigns` | LIST | |
| `POST /seo/campaigns` | CREATE | `{ name, customer_id, target_country, monthly_budget }` |
| `GET /seo/campaigns/:id` | GET | + keyword listesi |
| `GET /seo/keywords` | LIST | `?campaign_id=&rank_change=` |
| `POST /seo/keywords` | CREATE | `{ campaign_id, keyword, target_url }` |
| `PATCH /seo/keywords/:id/rank` | UPDATE | `{ current_rank, search_volume }` |

### 4.9 Admin / System (`/api/v1/admin`)

| Endpoint | Method | Açıklama | Yetki |
|----------|--------|----------|-------|
| `GET /admin/users` | LIST | Tüm kullanıcılar | admin+ |
| `POST /admin/users` | CREATE | Yeni kullanıcı ekle | super_admin |
| `PUT /admin/users/:id/role` | UPDATE | Rol değiştir | super_admin |
| `DELETE /admin/users/:id` | DELETE | | super_admin |
| `GET /admin/activity-logs` | LIST | `?user_id=&action=&date_from=` | admin+ |
| `GET /admin/settings` | GET | Sistem ayarları | admin+ |
| `PUT /admin/settings` | UPDATE | | super_admin |
| `GET /admin/email-templates` | LIST | | admin+ |
| `PUT /admin/email-templates/:id` | UPDATE | | admin+ |
| `POST /admin/announcements` | CREATE | Duyuru ekle | admin+ |
| `DELETE /admin/announcements/:id` | DELETE | | admin+ |

### 4.10 Dashboard (`/api/v1/dashboard`)

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `GET /dashboard/stats` | GET | `{ total_tasks, open_tasks, completed_tasks, delayed_tasks, total_projects, active_projects, monthly_income, monthly_expense }` |
| `GET /dashboard/activities` | GET | Son 20 aktivite logu |
| `GET /dashboard/announcements` | GET | Aktif duyurular |
| `GET /dashboard/my-tasks` | GET | Giriş yapan kullanıcının görevleri |

### 4.11 Public Website (`/api/v1/public`)

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `POST /public/contact` | POST | İletişim formu — doğrudan lead oluşturur + e-posta gönderir |
| `GET /public/projects` | GET | Portfolyo için kamuya açık proje listesi |
| `GET /public/projects/:slug` | GET | Tekil proje detayı |
| `GET /public/blog` | GET | Blog yazıları listesi |
| `GET /public/blog/:slug` | GET | Tekil yazı |
| `GET /public/testimonials` | GET | Müşteri yorumları |
| `GET /public/team` | GET | Ekip üyeleri (sadece public bilgiler) |

---

## 5. Rol ve Yetki Matrisi (RBAC)

| Modül / Eylem | Super Admin | Admin | Developer | Designer | SEO Specialist | Viewer | Accountant |
|---------------|:-----------:|:-----:|:---------:|:--------:|:------------:|:------:|:----------:|
| **Dashboard** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Görevler — Görüntüle** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Görevler — Oluştur** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Görevler — Düzenle (Kendi)** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Görevler — Düzenle (Tümü)** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Görevler — Sil** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Projeler — Görüntüle** | ✅ | ✅ | ✅* | ✅* | ✅* | ✅ | ❌ |
| **Projeler — Oluştur/Düzenle** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Müşteriler — Görüntüle** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Müşteriler — Oluştur/Düzenle** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Lead Yönetimi** | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Finans — Görüntüle** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Finans — Giriş** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Hakediş Hesaplama** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **SEO Kampanyaları** | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Dokümanlar — Görüntüle** | ✅ | ✅ | ✅* | ✅* | ✅* | ✅* | ✅ |
| **Dokümanlar — Yükle** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Ekip Yönetimi** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Sistem Ayarları** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **E-posta Şablonları** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Duyuru Ekleme** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Aktivite Logları** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

> `*`: Sadece atanmış projeleri/dokümanları görebilir.


---

## 6. Ön Yüz (Public Website) — Sayfa ve İçerik Mimarisi

### 6.1 Ana Sayfa (`/`)
Ziyaretçinin ilk 3 saniyede **"Bu kim? Ne yapıyor? Neden güvenilir?"** sorularını yanıtlayan dönüşüm odaklı açılış sayfası.
* **Hero Section (EMK Teknoloji Referansı):** Güçlü ve net bir değer önerisi: *"Türkiye ve Almanya Arasında Yüksek Ölçeklenebilir Dijital Çözüm Köprünüz."* CTA Butonları: `Projenizi Başlatın` (Birincil), `Teknoloji Stack'imizi İnceleyin` (İkincil).
* **İstatistikler (Trust Metrics):** Animasyonlu sayaçlar: `10+ Yıl Kümülatif Tecrübe`, `100+ Başarılı Teslimat`, `%98 Müşteri Memnuniyeti`, `2 Ülke / 1 Hibrit Ekip`.
* **Hizmetler Grid (İnksen Referansı):** Kart yapısında hover efektli özetler:
  * Özel Yazılım Geliştirme (Web, Mobil & Spring Boot Mimarileri)
  * Almanya Proje Ortaklığı & Outsourcing
  * SEO / GEO & Dijital Büyüme
  * AI & Bulut Danışmanlığı
* **Neden Biz? (Edvido Eşleştirme Mantığı):** Kurumların Alman disiplini ile Türk mühendislik esnekliğini nasıl aynı anda aldığını açıklayan 3 sütunlu infografik alan.
* **Öne Çıkan Projeler:** Case Study formatında 3 vitrin projesi (Örn: *Lojistik Platformu - Berlin*, *Fintech Mobil Uygulaması - İstanbul*). Gizlilik gereği müşteri adı yerine sektör, kullanılan teknoloji (Spring Boot, Next.js, AWS) ve elde edilen metrik (%40 performans artışı vb.) vurgulanır.
* **Müşteri Yorumları & Sosyal Kanıt:** C-Level yöneticilerin, şirket unvanları ve fotoğraflarıyla yer aldığı referans döngüsü.
* **Alt Bilgi (Footer):** TR (İstanbul/İzmir) ve DE (Berlin/Münih) ofis adresleri, KVKK/GDPR linkleri, dil seçici ve sosyal medya ikonları.

### 6.2 Hakkımızda (`/hakkimizda`)
* **Hikayemiz:** Almanya'daki dijital dönüşüm ihtiyacı ile Türkiye'deki kıdemli mühendislik kaynağının birleşme hikayesi.
* **Misyon & Vizyon:** "Teknik uzmanlığı, sınır ötesi ticari bir avantaja dönüştürmek."
* **Ekip (LinkedIn Entegreli):** Core ekibin biyografisi, uzmanlık alanları (Spring Boot, Hibernate, Next.js, React, AWS vb.) ve sosyal ağ linkleri.
* **Değerlerimiz:** Şeffaflık, çeviklik, uzaktan çalışma disiplini ve paylaşım ekonomisi.

### 6.3 Hizmetler (`/hizmetler` ve Alt Sayfalar)
Her alt sayfa `Problem → Çözüm → Süreç → Teknolojiler → CTA` kurgusuyla tasarlanır:
* `/hizmetler/ozel-yazilim`: Kurumsal web platformları, Spring Boot tabanlı mikroservis/monolit arka yüzler, Next.js/React arayüzleri, React Native/Flutter mobil uygulamaları.
* `/hizmetler/proje-ortakligi`: Almanya pazarından iş alan veya taşeron arayan ajanslara özel "Dedicated Team" ve proje bazlı ortaklık modeli.
* `/hizmetler/seo-geo`: Yerel (Almanya/TR) pazar liderliği için teknik SEO, içerik stratejisi ve harita optimizasyonları.
* `/hizmetler/danismanlik`: AWS/Cloud mimarisi, Spring Boot mikroservis dönüşümü ve DevOps süreç danışmanlığı.
* `/hizmetler/kurumsal-kimlik`: UI/UX tasarımı, marka dili oluşturma ve tasarım sistemleri (Design Systems).
* `/hizmetler/egitim-teknolojileri`: Kivi / Kivi Akademi tecrübesi üzerinden EdTech çözümleri ve kurum içi eğitim altyapıları.

### 6.4 Portfolyo / Vaka Çalışmaları (`/projeler` & `/projeler/[slug]`)
* **Filtrelenebilir Galeri:** Sektör (E-ticaret, Finans, Sağlık, Lojistik) ve Teknolojiye göre anlık filtreleme.
* **Detay Sayfası (`[slug]`):**
  * **Proje Özeti & Zorluk:** Müşterinin yaşadığı problem neydi?
  * **Çözüm Mimarisi:** Hangi teknolojiler (Next.js, Spring Boot, PostgreSQL, Docker) neden seçildi?
  * **Sonuç & Metrikler:** Örn: *"Sayfa yüklenme süresi 4.2 saniyeden 0.8 saniyeye indirildi, API yanıt süresi 50ms altına düştü, dönüşüm oranı %22 arttı."*

### 6.5 Kariyer & Ekip Katılımı (`/kariyer`)
* **Çalışma Kültürü:** Tamamen remote, asenkron iletişim ve proje bazlı gelir paylaşım modeli.
* **Açık Pozisyonlar:** Frontend (Next.js/React), Backend (Spring Boot/Java), Full-Stack, UI/UX Designer, SEO Uzmanı (Tam zamanlı / Proje bazlı / Freelance).
* **Başvuru Formu:** LinkedIn, GitHub, Portfolyo URL alımı ve PDF CV yükleme.

### 6.6 Blog & İçerik Merkezi (`/blog` & `/blog/[slug]`)
* **SEO Odaklı Mimari:** Almanya pazarında "Softwareagentur Türkei", "Nearshoring Vorteile" gibi arama hacmi yüksek anahtar kelimeleri hedefleyen teknik makaleler.
* **İçerik Detayı:** Yazar kartı, sosyal medya paylaşım butonları, "Okuma Süresi" hesaplayıcısı ve ilgili yazılar (Related Posts).

### 6.7 İletişim & Randevu (`/iletisim`)
* **Gelişmiş Form:** Ad, E-posta, Şirket, Proje Türü, Bütçe Aralığı ($5k-$10k, $10k-$25k vb.) ve Mesaj alanları.
* **Takvim Entegrasyonu:** Müşterinin doğrudan toplantı ayarlayabilmesi için Calendly / TidyCal embed alanı.
* **Lokasyonlar:** Google Maps üzerinde TR ve DE ofis işaretlemeleri.

### 6.8 Hukuki Sayfalar
* `/gizlilik-politikasi`: Almanya pazarı için zorunlu olan GDPR (DSGVO) ve Türkiye için KVKK tam uyumluluk metinleri.
* `/kullanim-kosullari` & `/cerez-politikasi`: Çerez onay banner'ı ile senkronize çalışan yasal bildirimler.
* `/sss`: Akıllardaki soru işaretlerini gidermeye yönelik akordeon (accordion) yapısında Sıkça Sorulan Sorular.

---

## 7. Yönetim Paneli (Admin Panel) — Modül Mimarisi

Erişim `/admin` rotası üzerinden yapılır. Spring Security kontrolünde tamamen rol bazlı (RBAC) güvenlik katmanı ile korunur. Arayüzler pürüzsüz bir SPA/SSR deneyimi için React/Next.js ile inşa edilir.

### 7.1 Dashboard (Görev ve Özet Panosu - `/admin`)
* **Aksiyon Merkezi:** Tek tıkla `Yeni Görev`, `Yeni Lead (Müşteri Adayı)` veya `Yeni Proje` oluşturma modal butonları.
* **İstatistik Kartları:**
  * Toplam Aktif Proje (Sayısal + % değişim)
  * Açık / Tamamlanan / Geciken Görev Dağılımı
  * Aylık Tahmini Ciro / Hakediş Havuzu (EUR & TRY)
* **Canlı Aktivite Akışı:** *"Ahmet, 'MGS Clone' projesine yeni bir tasarım dosyası yükledi."* tarzında zaman damgalı sistem logları.
* **Duyurular (System Announcements):** Yönetici tarafından eklenen, ekibin görmesi gereken acil bildirimler veya güncelleme notları.

### 7.2 Görev Yönetimi (`/admin/gorevler`)
* **Görev Oluşturma:** Başlık (min. 2 karakter), Detaylı Açıklama (Markdown destekli), Sorumlu Kişi (Ekip üyesi veya "Ortak Havuz"), Teslim Tarihi (Datepicker), Öncelik (`Düşük`, `Orta`, `Yüksek`, `Acil`), Etiketler ve Çoklu Dosya Yükleme (max 10 MB).
* **Görünümler:**
  * **Liste Görünümü:** Tablo yapısında hızlı filtreleme (Duruma, Sorumluya, Tarihe veya Projeye göre). Hızlı durum değiştirme (Checkbox ile tamamla).
  * **Kanban Board:** `Açık` → `Devam Ediyor` → `İncelemede` → `Tamamlandı` kolonları arasında Sürükle-Bırak (Drag & Drop) desteği.
* **Gecikme Uyarı Sistemi:** Teslim tarihi geçen görevler satır olarak kırmızı vurgulanır ve sorumlunun paneline bildirim düşer.
* **Görev Detay & İş Birliği:** Her görevin altında thread (dizi) yapısında yorumlaşma alanı, dosya revizyon geçmişi ve alt görevler (Sub-tasks / Checklist).

### 7.3 Proje Yönetimi (`/admin/projeler`)
* **Proje Kartı:** Proje Adı, Bağlı Müşteri, Sözleşme Bedeli, Para Birimi (EUR/TRY/USD), Başlangıç ve Hedeflenen Bitiş Tarihi.
* **Durum Takibi:** `Teklif Aşamasında` → `Onaylandı` → `Geliştirme` → `Test/QA` → `Canlıda (Maintenance)` → `İptal`.
* **Ekip Atama & Efor:** Projede çalışan yazılımcıların listesi. Harcanan saatlerin (Time-tracking) proje bütçesiyle oranlanması (Burn-down chart).

### 7.4 Müşteri ve Lead Yönetimi - CRM (`/admin/musteriler`)
* **Lead (Aday Müşteri) Pipeline:** Web sitesinden veya referansla gelen taleplerin takibi: `Yeni` → `İletişime Geçildi` → `Toplantı Yapıldı` → `Teklif İletildi` → `Kazanıldı` / `Kaybedildi`.
* **Müşteri Profili:** Firma Unvanı, Vergi No/StNr, Yetkili Kişi, E-posta, Telefon, Ülke, İletişim Geçmişi Notları (Meeting Notes) ve müşteriye kesilen faturaların/projelerin listesi.

### 7.5 Finans & Gelir Paylaşım Modülü (`/admin/finans`)
* **Gelir / Gider Girişi:** Projelerden alınan peşinat, ara ödeme ve teslimat ödemelerinin kaydı. Sunucu, domain, lisans gibi operasyonel giderlerin takibi.
* **Otomatik Hakediş & Komisyon Hesaplayıcı:**
  * Sefaris ekibinin felsefesi olan "Paylaşım Ekonomisi"ni otomatize eder.
  * **Örnek Formül:** Bir projeden elde edilen net kârın (Kesintiler sonrası), projede görev alan geliştiricilerin efor saatlerine veya önceden anlaşılan yüzdelik paylarına (`%40 Yazılım`, `%20 Tasarım`, `%20 Proje Yönetimi`, `%20 Şirket Kasası`) göre dağılımını gösteren şeffaf tablo.
* **SEO/GEO Komisyonları:** Müşteri getiren veya SEO projelerini yöneten üyelere ait komisyon tanımlamaları.

### 7.6 SEO / GEO İş Takip Modülü (`/admin/seo`)
* Müşteriler için yürütülen SEO projelerinin operasyonel paneli.
* **Anahtar Kelime & Sıralama Takibi:** Hedef kelimelerin aylık pozisyon değişimleri.
* **İçerik Takvimi (Content Calendar):** Web sitesi blogu veya müşteri siteleri için yazılacak makalelerin başlıkları, hedef anahtar kelimeleri, atanan yazarı ve yayın durumu (`Taslak` → `Gözden Geçiriliyor` → `Yayınlandı`).

### 7.7 Doküman Arşivi (`/admin/dokumanlar`)
Şirketin dijital hafızası. Klasör bazlı yapı:
* `/Sozlesmeler` (Gizlilik sözleşmeleri - NDA, Hizmet sözleşmeleri)
* `/Teklifler` (Müşterilere iletilen PDF teklifler)
* `/Marka-Kutuphanesi` (Logo assetleri, fontlar, sunum şablonları)
* `/Mali-Belgeler`

### 7.8 Ekip & Kullanıcı Yönetimi (`/admin/ekip`)
* **Kullanıcı Listesi & Rol Yönetimi (RBAC):**
  * **Süper Admin:** Sistem ayarları, finans ve rol atama dahil tüm haklar.
  * **Admin / Proje Yöneticisi:** Proje, müşteri ve görev yönetimi.
  * **Geliştirici / Tasarımcı:** Yalnızca atandığı projeleri, görevleri görme ve süre/yorum ekleme hakkı.
  * **Görüntüleyici / Muhasebe:** Sadece finans ve raporları okuma yetkisi.
* **Kullanıcı Detayı:** Uzmanlık alanları, saatlik efor ücreti (opsiyonel), aktif/pasif durumu ve sistem içi işlem geçmişi (Audit Log).

### 7.9 Sistem Ayarları (`/admin/ayarlar`)
* **Genel Ayarlar:** Site meta başlıkları, bakım modu anahtarı, iletişim mailleri.
* **E-posta Şablonları:** Yeni lead geldiğinde müşteriye giden "Talebiniz alındı" maili, ekibe giden görev atama bildirim maillerinin şablon düzenleyicisi.
* **Entegrasyonlar:** Spring Boot API adresleri, AWS S3 erişim anahtarları, Google Analytics ID, Sentry hata takip entegrasyonu.


---

## 8. E-posta Akışları

| Tetikleyici | Alıcı(lar) | Şablon | İçerik |
|-------------|-----------|--------|--------|
| İletişim formu gönderildi | Lead (müşteri adayı) | `lead_confirmation_tr` / `lead_confirmation_de` | "Talebiniz alındı, en kısa sürede dönüş yapacağız" |
| İletişim formu gönderildi | Admin / Sorumlu | `new_lead_notification` | Yeni lead detayları, admin panel linki |
| Yeni görev atandı | Atanan kişi | `task_assigned` | Görev başlığı, teslim tarihi, link |
| Görev teslim tarihi yaklaştı (24h) | Atanan kişi + Admin | `task_due_reminder` | Hatırlatma, gecikme riski |
| Görev gecikti | Atanan kişi + Admin | `task_delayed` | Kırmızı uyarı, acil müdahale |
| Görev tamamlandı | Atayan kişi / Admin | `task_completed` | Tamamlama bildirimi, review bekleniyor |
| Yeni yorum eklendi | Görev sahipleri | `new_comment` | Yorum içeriği, görev linki |
| Yeni proje onaylandı | Proje üyeleri | `project_approved` | Proje detayları, başlangıç tarihi |
| Hakediş hesaplandı | İlgili üyeler | `profit_share_calculated` | Dönem, tutar, ödeme tarihi |
| Yeni duyuru eklendi | Tüm aktif kullanıcılar | `announcement` | Duyuru başlığı ve içeriği |
| Şifre sıfırlama talebi | Talep eden | `password_reset` | Sıfırlama linki (24h geçerli) |

---

## 9. Bildirim Sistemi

### 9.1 Bildirim Kanalları
1. **Panel İçi Bildirimler:** Sağ üst köşe "zil" ikonu, dropdown listesi, okunmamış sayacı
2. **E-posta Bildirimleri:** Yukarıdaki akış tablosu
3. **Real-time (Opsiyonel):** WebSocket veya Server-Sent Events (SSE) ile anlık güncelleme

### 9.2 Bildirim Tipleri
| Tip | Tetikleyici | Varsayılan Kanal |
|-----|-------------|------------------|
| `task_assigned` | Görev ataması | Panel + E-posta |
| `task_due_soon` | Teslim tarihi < 24h | Panel + E-posta |
| `task_delayed` | Teslim tarihi geçti | Panel + E-posta (Acil) |
| `task_completed` | Görev tamamlandı | Panel |
| `new_comment` | Yorum eklendi | Panel |
| `new_lead` | Yeni lead geldi | Panel + E-posta (Admin) |
| `lead_status_changed` | Lead durumu değişti | Panel |
| `project_status_changed` | Proje durumu değişti | Panel + E-posta (Proje üyeleri) |
| `announcement` | Yeni duyuru | Panel + E-posta |
| `file_uploaded` | Dosya yüklendi | Panel |

### 9.3 Kullanıcı Tercihleri
Her kullanıcı kendi bildirim tercihlerini ayarlayabilmeli:
- Hangi olaylar için e-posta alsın?
- Hangi olaylar sadece panel içi kalsın?
- Gecikme uyarısı kaç saat önce gelsin? (varsayılan: 24)

---

## 10. Dosya Yükleme Kuralları

| Kural | Değer |
|-------|-------|
| **Maksimum boyut** | 10 MB (10,485,760 bytes) |
| **İzin verilen türler** | Görev dosyaları: `.pdf`, `.doc`, `.docx`, `.xls`, `.xlsx`, `.ppt`, `.pptx`, `.zip`, `.rar`, `.jpg`, `.png`, `.gif`, `.svg`, `.mp4`, `.mov` |
| **Doküman arşivi** | `.pdf`, `.doc`, `.docx`, `.xls`, `.xlsx`, `.zip`, `.rar` |
| **Yasaklı türler** | `.exe`, `.bat`, `.sh`, `.js`, `.php`, `.html` (güvenlik riski) |
| **Dosya adı kuralları** | Orijinal ad korunur, sunucuda: `{uuid}_{timestamp}_{safe_filename}` |
| **Virus taraması** | ClamAV entegrasyonu (opsiyonel, Faz 2) |
| **S3/Storage yapısı** | `tasks/{task_id}/{file_name}` ve `documents/{folder_path}/{file_name}` |
| **Erişim kontrolü** | Presigned URL (15 dakika geçerli), RLS ile kullanıcı bazlı erişim |
| **Thumbnail** | Resim dosyaları için otomatik thumbnail oluşturma (opsiyonel) |

---

## 11. Form Validasyon Kuralları (Zod Schemas)

### 11.1 Görev Formu
```typescript
const taskSchema = z.object({
  title: z.string().min(2, "En az 2 karakter olmalı").max(300, "En fazla 300 karakter"),
  description: z.string().max(5000).optional(),
  assignee_id: z.string().uuid().nullable(), // null = Ortak Havuz
  project_id: z.string().uuid().optional(),
  due_date: z.date().min(new Date(), "Geçmiş tarih olamaz").optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  status: z.enum(["open", "in_progress", "in_review", "completed", "cancelled", "delayed"]).default("open"),
  tags: z.array(z.string().max(50)).max(10, "En fazla 10 etiket").optional(),
  estimated_hours: z.number().min(0).max(1000).optional(),
});
```

### 11.2 Proje Formu
```typescript
const projectSchema = z.object({
  name: z.string().min(3, "En az 3 karakter").max(200),
  customer_id: z.string().uuid().optional(),
  description: z.string().max(10000).optional(),
  status: z.enum(["proposal", "approved", "in_progress", "testing", "live", "maintenance", "cancelled", "completed"]).default("proposal"),
  budget_amount: z.number().min(0).optional(),
  budget_currency: z.enum(["EUR", "TRY", "USD"]).default("EUR"),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  profit_share_dev: z.number().min(0).max(100).default(40),
  profit_share_design: z.number().min(0).max(100).default(20),
  profit_share_pm: z.number().min(0).max(100).default(20),
  profit_share_company: z.number().min(0).max(100).default(20),
}).refine((data) => {
  const total = data.profit_share_dev + data.profit_share_design + data.profit_share_pm + data.profit_share_company;
  return total === 100;
}, { message: "Paylaşım toplamı %100 olmalı" });
```

### 11.3 İletişim Formu (Public)
```typescript
const contactSchema = z.object({
  name: z.string().min(2, "Adınızı girin").max(100),
  email: z.string().email("Geçerli e-posta girin"),
  company: z.string().max(200).optional(),
  project_type: z.enum(["web", "mobile", "consulting", "seo", "partnership", "other"]).optional(),
  budget_range: z.enum(["under_5k", "5k_10k", "10k_25k", "25k_50k", "50k_plus", "not_sure"]).optional(),
  message: z.string().min(10, "En az 10 karakter").max(5000),
});
```

### 11.4 Kullanıcı Formu
```typescript
const userSchema = z.object({
  email: z.string().email(),
  full_name: z.string().min(2).max(150),
  role: z.enum(["super_admin", "admin", "developer", "designer", "seo_specialist", "viewer", "accountant"]),
  status: z.enum(["active", "inactive", "suspended"]).default("active"),
  hourly_rate: z.number().min(0).optional(),
  expertise_tags: z.array(z.string().max(50)).max(20).optional(),
  password: z.string().min(8, "En az 8 karakter").regex(/[A-Z]/, "En az 1 büyük harf").regex(/[0-9]/, "En az 1 rakam").optional(), // Sadece e-posta kayıtta zorunlu
});
```

---

## 12. UI/UX Tasarım Sistemi

### 12.1 Renk Paleti
```css
:root {
  --color-primary: #0F172A;        /* Slate 900 - Kurumsal koyu */
  --color-primary-light: #1E293B; /* Slate 800 */
  --color-accent: #3B82F6;         /* Blue 500 - Teknoloji, güven */
  --color-accent-hover: #2563EB;  /* Blue 600 */
  --color-accent-light: #DBEAFE;  /* Blue 100 */
  --color-success: #10B981;        /* Emerald 500 */
  --color-warning: #F59E0B;        /* Amber 500 */
  --color-danger: #EF4444;        /* Red 500 */
  --color-info: #06B6D4;           /* Cyan 500 */
  --color-background: #FFFFFF;
  --color-surface: #F8FAFC;        /* Slate 50 */
  --color-border: #E2E8F0;        /* Slate 200 */
  --color-text-primary: #0F172A;   /* Slate 900 */
  --color-text-secondary: #64748B; /* Slate 500 */
  --color-text-muted: #94A3B8;     /* Slate 400 */
}
```

### 12.2 Tipografi
| Element | Font | Boyut | Ağırlık | Satır Yüksekliği |
|---------|------|-------|---------|------------------|
| H1 (Hero) | Inter | 48px / 3rem | 700 | 1.1 |
| H2 (Bölüm) | Inter | 32px / 2rem | 600 | 1.2 |
| H3 (Kart) | Inter | 20px / 1.25rem | 600 | 1.3 |
| Body | Inter | 16px / 1rem | 400 | 1.6 |
| Small | Inter | 14px / 0.875rem | 400 | 1.5 |
| Caption | Inter | 12px / 0.75rem | 500 | 1.4 |
| Mono (kod) | JetBrains Mono | 14px | 400 | 1.5 |

### 12.3 Bileşen Boyutları
| Bileşen | Padding | Border Radius | Border |
|---------|---------|---------------|--------|
| Button (Primary) | 12px 24px | 8px | none |
| Button (Secondary) | 12px 24px | 8px | 1px solid --color-border |
| Input | 12px 16px | 8px | 1px solid --color-border |
| Card | 24px | 12px | 1px solid --color-border |
| Modal | 32px | 16px | none |
| Badge | 4px 12px | 9999px | none |
| Table Row | 12px 16px | 0 | bottom border |

### 12.4 Görev Durum Renkleri (Kanban + Liste)
| Durum | Arkaplan | Yazı | Border |
|-------|----------|------|--------|
| Açık | #F1F5F9 | #475569 | #CBD5E1 |
| Devam Ediyor | #DBEAFE | #1E40AF | #93C5FD |
| İncelemede | #FEF3C7 | #92400E | #FCD34D |
| Tamamlandı | #D1FAE5 | #065F46 | #6EE7B7 |
| Gecikti | #FEE2E2 | #991B1B | #FCA5A5 |
| İptal | #F3F4F6 | #6B7280 | #D1D5DB |

### 12.5 Öncelik Renkleri
| Öncelik | Badge Rengi | İkon |
|---------|-------------|------|
| Düşük | Slate | `arrow-down` |
| Orta | Blue | `minus` |
| Yüksek | Amber | `arrow-up` |
| Acil | Red | `alert-triangle` + pulse animasyonu |


---

## 13. Sayfa Layout Yapısı (Responsive)

### 13.1 Breakpoints
```
sm: 640px   — Mobil yatay
md: 768px   — Tablet dikey
lg: 1024px  — Tablet yatay / Küçük laptop
xl: 1280px  — Desktop
2xl: 1536px — Büyük ekran
```

### 13.2 Admin Panel Layout
```
Desktop (lg+):
┌─────────────────────────────────────────────────────────┐
│  [Logo]  Dashboard  Görevler  Projeler ...    [🔔 👤 Çıkış] │  ← Topbar (64px)
├────────┬────────────────────────────────────────────────┤
│        │                                                │
│ Sidebar│              Main Content Area                 │
│ (260px)│              (flex: 1, max-w: 1400px)          │
│        │                                                │
│        │                                                │
└────────┴────────────────────────────────────────────────┘

Tablet (md-lg):
┌─────────────────────────────────────────────────────────┐
│  [☰]  [Logo]                    [🔔 👤]                │  ← Collapsible sidebar
├─────────────────────────────────────────────────────────┤
│                    Main Content                         │
└─────────────────────────────────────────────────────────┘

Mobil (<md):
┌─────────────────────────────────┐
│  [☰]  [Logo]        [🔔 👤]    │
├─────────────────────────────────┤
│        Main Content               │
├─────────────────────────────────┤
│  [🏠] [📋] [📁] [💰] [⚙️]       │  ← Bottom nav (5 ana sekme)
└─────────────────────────────────┘
```

### 13.3 Public Website Layout
```
Desktop:
┌─────────────────────────────────────────────────────────┐
│  [Logo]    Hakkımızda  Hizmetler  Projeler  ...  [TR▼]  │  ← Sticky navbar (72px)
├─────────────────────────────────────────────────────────┤
│                      Hero Section                        │
│                    (100vh - navbar)                      │
├─────────────────────────────────────────────────────────┤
│                    Content Sections                      │
│              (max-w: 1280px, mx-auto)                   │
├─────────────────────────────────────────────────────────┤
│                       Footer                             │
└─────────────────────────────────────────────────────────┘
```

---

## 14. Hata Kodları ve Mesajları

### 14.1 HTTP Status Kodları
| Kod | Türkçe Mesaj | Almanca Mesaj | Kullanım |
|-----|-------------|---------------|----------|
| 200 | İşlem başarılı | Erfolgreich | Başarılı GET/PUT/DELETE |
| 201 | Kayıt oluşturuldu | Erstellt | Başarılı POST |
| 400 | Geçersiz istek | Ungültige Anfrage | Validasyon hatası |
| 401 | Oturum süresi doldu | Sitzung abgelaufen | Token geçersiz/eksik |
| 403 | Bu işlem için yetkiniz yok | Zugriff verweigert | RBAC reddi |
| 404 | Kaynak bulunamadı | Nicht gefunden | Kayıt yok |
| 409 | Çakışma oluştu | Konflikt | Unique constraint, duplicate |
| 422 | Doğrulama hatası | Validierungsfehler | Zod validasyon başarısız |
| 429 | Çok fazla istek | Zu viele Anfragen | Rate limit |
| 500 | Sunucu hatası | Serverfehler | Beklenmedik hata |
| 503 | Bakım modu | Wartungsmodus | Sistem bakımda |

### 14.2 İş Mantığı Hata Kodları
```json
{
  "code": "TASK_DUE_DATE_PAST",
  "message_tr": "Teslim tarihi geçmiş olamaz",
  "message_de": "Das Fälligkeitsdatum darf nicht in der Vergangenheit liegen",
  "field": "due_date"
}
```

| Kod | Açıklama |
|-----|----------|
| `TASK_DUE_DATE_PAST` | Geçmiş tarihli görev oluşturulamaz |
| `PROJECT_BUDGET_NEGATIVE` | Bütçe negatif olamaz |
| `PROFIT_SHARE_NOT_100` | Paylaşım toplamı %100 değil |
| `FILE_TOO_LARGE` | Dosya 10 MB limitini aşıyor |
| `FILE_TYPE_NOT_ALLOWED` | Dosya türü izin verilenler listesinde değil |
| `USER_ALREADY_EXISTS` | Bu e-posta ile kayıtlı kullanıcı var |
| `LEAD_ALREADY_CONVERTED` | Bu lead zaten müşteriye dönüştürülmüş |
| `INVALID_STATUS_TRANSITION` | Geçersiz durum geçişi (örn: iptal -> tamamlandı) |
| `PROJECT_NOT_FOUND` | Proje bulunamadı |
| `INSUFFICIENT_PERMISSIONS` | Bu işlem için yetki yetersiz |

---

## 15. Durum Geçiş Diyagramları (State Machines)

### 15.1 Görev Durum Geçişi
```
                    ┌─────────────┐
                    │   AÇIK      │
                    │   (open)    │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │ DEVAM EDİYOR│ │   İPTAL     │ │  GECİKTİ    │
    │(in_progress)│ │ (cancelled) │ │  (delayed)  │
    └──────┬──────┘ └─────────────┘ └──────┬──────┘
           │                               │
           │                               │
           ▼                               ▼
    ┌─────────────┐                 ┌─────────────┐
    │ İNCELEMEDE  │                 │ DEVAM EDİYOR│
    │(in_review)  │                 │(in_progress)│
    └──────┬──────┘                 └──────┬──────┘
           │                               │
           │                               │
           ▼                               ▼
    ┌─────────────┐                 ┌─────────────┐
    │ TAMAMLANDI  │◄────────────────│ İNCELEMEDE  │
    │(completed)  │                 │(in_review)  │
    └─────────────┘                 └─────────────┘
           ▲
           │ (Geri aç)
           │
    ┌──────┴──────┐
    │   AÇIK      │
    │   (open)    │
    └─────────────┘

KURALLAR:
- "Tamamlandı" -> "Açık" (geri açma) SADECE Admin/Super Admin yapabilir
- "İptal" her durumdan geçilebilir (SADECE Admin+)
- "Gecikti" otomatik tetiklenir (cron job), manuel de atanabilir
- "İncelemede" -> "Tamamlandı" SADECE atayan kişi veya Admin yapabilir
```

### 15.2 Lead Pipeline Durum Geçişi
```
┌────────┐    ┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌─────────┐
│  YENI  │───▶│ İLETİŞİME   │───▶│  TOPLANTI    │───▶│  TEKLİF     │───▶│ KAZANILDI│
│ (new)  │    │  GEÇİLDİ    │    │  YAPILDI     │    │  İLETİLDİ   │    │  (won)   │
└────────┘    │(contacted)  │    │(meeting_sched)│    │(proposal_sent)│    └─────────┘
     │        └─────────────┘    └──────────────┘    └──────┬──────┘
     │                                                       │
     │                                                       ▼
     │                                                ┌─────────────┐
     │                                                │  KAYBEDİLDİ │
     │                                                │   (lost)    │
     │                                                └─────────────┘
     │
     └──────────────────────────────────────────────────────────────▶
     (Herhangi bir aşamadan "Beklemede" (on_hold) geçilebilir)
```

---

## 16. Kullanıcı Akış Senaryoları

### Senaryo A: Potansiyel Müşteri (Lead Generation Akışı)

```
[Almanya'da Bir KOBİ] 
    │
    ▼ Google Arama / LinkedIn Referans
[sefaris.site/de - Ana Sayfa / Next.js SSR]
    │
    ├──▶ [Hizmetler: Outsourcing & Proje Ortaklığı İncelemesi]
    │
    └──▶ [Portfolyo: İlgili Sektördeki Başarı Hikayesini Okuma]
              │
              ▼
    [İletişim Formu Doldurma / Calendly Üzerinden Görüşme Seçme]
              │
              ▼ Spring Boot REST API Tetiklenir
    [Müşteriye: 'Talebinizi Aldık' Otomatik E-postası Gider]
              │
              ▼
    [Admin Panel: /admin/musteriler Modülüne 'Yeni Lead' Olarak Düşer]
```

### Senaryo B: Ekip Üyesi (Günlük İş Akışı)

```
[Geliştirici / Yazılımcı]
    │
    ▼ /admin Adresine Git
[Google OAuth veya E-posta ile Giriş / Spring Security]
    │
    ▼
[Dashboard / React UI: 'Güncellemeler' ve 'Üzerimdeki Görevler' Listesi]
    │
    ▼
[Görev Yönetimi: İlgili Görevi Seç, 'Devam Ediyor' Kolonuna Sürükle]
    │
    ▼ Kodlamayı Bitir
[Göreve PR Linkini Yorum Olarak Ekle, Dosya Yükle / AWS S3]
    │
    ▼ Görevi 'Tamamlandı' Olarak İşaretle
[Yöneticinin Paneline Bildirim Düşer]
```

---

## 17. Güvenlik, Veri Gizliliği & Uyumluluk

- **Spring Security & RBAC:** Arka yüzde tüm endpoint'ler Spring Security katmanı ile korunur. Stateful oturumlar yerine stateless JWT mimarisi kullanılarak yatay ölçekleme (horizontal scaling) kolaylaştırılır.
- **Veritabanı İzolasyonu:** Yetkisiz API sorgularını engellemek için ORM ve servis katmanında sıkı tenant/kullanıcı sahiplik kontrolleri uygulanır.
- **KVKK & GDPR (DSGVO) Uyumluluğu:**
  - Çerez banner'ında "Zorunlu", "Analitik" ve "Pazarlama" çerezleri için ayrı onay mekanizması bulunur.
  - Kullanıcıların/Müşterilerin sistemdeki verilerini "Unutulma Hakkı" kapsamında tek tıkla anonimleştirme veya silme fonksiyonu mevcuttur.
- **Veri Giriş Validasyonu:** Ön yüzde **Zod**, arka yüzde **Hibernate Validator (Bean Validation)** kullanılarak XSS ve SQL Injection saldırılarına karşı tam çift taraflı koruma sağlanır.

---

## 18. Environment Variables

```bash
# === UYGULAMA ===
NODE_ENV=development
NEXT_PUBLIC_APP_URL=https://sefaris.site
NEXT_PUBLIC_API_URL=https://api.sefaris.site/api/v1

# === VERITABANI ===
DATABASE_URL=postgresql://user:pass@host:5432/sefaris_db
DATABASE_POOL_SIZE=20

# === KIMLIK DOGRULAMA ===
JWT_SECRET=your-256-bit-secret-key-here
JWT_EXPIRATION=86400
JWT_REFRESH_EXPIRATION=604800

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_REDIRECT_URI=https://sefaris.site/api/v1/auth/google/callback

# === DOSYA DEPOLAMA (AWS S3 veya MinIO) ===
S3_ENDPOINT=https://s3.eu-central-1.amazonaws.com
S3_BUCKET=sefaris-documents
S3_ACCESS_KEY=AKIA...
S3_SECRET_KEY=xxx
S3_REGION=eu-central-1
S3_PUBLIC_URL=https://cdn.sefaris.site

# === E-POSTA (SendGrid / AWS SES / SMTP) ===
EMAIL_PROVIDER=sendgrid
EMAIL_FROM=noreply@sefaris.site
EMAIL_FROM_NAME=Sefaris
SENDGRID_API_KEY=SG.xxx

# === RATE LIMITING ===
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# === LOGGING ===
LOG_LEVEL=info
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# === BACKUP ===
BACKUP_SCHEDULE=0 2 * * *
BACKUP_RETENTION_DAYS=30
```

---

## 19. Docker Compose Yapısı

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
    depends_on:
      - backend
    networks:
      - sefaris-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DATABASE_URL=jdbc:postgresql://db:5432/sefaris_db
      - JWT_SECRET=${JWT_SECRET}
      - S3_ENDPOINT=${S3_ENDPOINT}
    depends_on:
      - db
      - redis
    networks:
      - sefaris-network
    volumes:
      - ./backend/logs:/app/logs

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=sefaris_db
      - POSTGRES_USER=sefaris
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    networks:
      - sefaris-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - sefaris-network

  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin
    volumes:
      - minio-data:/data
    networks:
      - sefaris-network

volumes:
  postgres-data:
  minio-data:

networks:
  sefaris-network:
    driver: bridge
```

---

## 20. CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Sefaris CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
      - name: Run Tests
        run: ./backend/mvnw test
      - name: Build JAR
        run: ./backend/mvnw clean package -DskipTests

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install & Test
        run: |
          cd frontend
          npm ci
          npm run lint
          npm run test
          npm run build

  deploy:
    needs: [test-backend, test-frontend]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        run: |
          # SSH ile sunucuya bağlan, docker compose pull && up
          echo "Deploying..."
```

---

## 21. SEO Meta Tag Şablonları

| Sayfa | Title (TR) | Title (DE) | Description |
|-------|-----------|-----------|-------------|
| Ana Sayfa | Sefaris — Türkiye & Almanya Yazılım Geliştirme ve Proje Ortaklığı | Sefaris — Softwareentwicklung & Projektpartnerschaft Türkei-Deutschland | Türkiye ve Almanya arasında yazılım geliştirme, dijital dönüşüm ve IT danışmanlığı sunan proje ortaklığı platformu. |
| Hakkımızda | Hakkımızda — Sefaris | Über Uns — Sefaris | Sefaris ekibinin hikayesi, misyonu ve Türkiye-Almanya arasındaki yazılım köprüsü vizyonu. |
| Hizmetler | Hizmetlerimiz — Sefaris | Unsere Leistungen — Sefaris | Özel yazılım, proje ortaklığı, SEO/GEO ve IT danışmanlığı hizmetlerimizi keşfedin. |
| Projeler | Projelerimiz — Sefaris | Unsere Projekte — Sefaris | Tamamladığımız yazılım projeleri ve vaka çalışmaları. |
| Blog | Blog — Sefaris | Blog — Sefaris | Yazılım, Almanya pazarı ve teknoloji trendleri hakkında içerikler. |
| İletişim | İletişim — Sefaris | Kontakt — Sefaris | Projeniz için bizimle iletişime geçin. TR ve DE ofislerimiz. |
| Admin Panel | Sefaris Yönetim Paneli | Sefaris Admin Panel | Ekip içi proje ve görev yönetim paneli. |

### Open Graph & Twitter Card Şablonu
```html
<meta property="og:title" content="{{page_title}}" />
<meta property="og:description" content="{{page_description}}" />
<meta property="og:image" content="https://sefaris.site/og-image.jpg" />
<meta property="og:url" content="https://sefaris.site{{current_path}}" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="{{locale}}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@sefaris" />
```

---

## 22. Performans Hedefleri (Core Web Vitals)

| Metrik | Hedef | Yöntem |
|--------|-------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | Next.js Image optimization, lazy loading, WebP formatı |
| FID (First Input Delay) | < 100ms | Code splitting, minimal JS bundle |
| CLS (Cumulative Layout Shift) | < 0.1 | Sabit boyutlu görseller, font-display: swap |
| TTFB (Time to First Byte) | < 600ms | Vercel Edge Network, API caching |
| FCP (First Contentful Paint) | < 1.8s | Inline critical CSS, preload font |

---

## 23. Yedekleme ve Kurtarma Stratejisi

| Yedekleme | Sıklık | Saklama | Hedef |
|-----------|--------|---------|-------|
| Veritabanı (pg_dump) | Günlük 02:00 | 30 gün | S3 Glacier |
| Dosyalar (S3) | Gerçek zamanlı | Sürümlü | S3 Versioning |
| Uygulama kodu | Her push | Sonsuz | Git |
| Environment dosyaları | Haftalık | 90 gün | Şifreli vault (Bitwarden/1Password) |

### Kurtarma Süresi Hedefleri (RTO/RPO)
- **RTO (Recovery Time Objective):** 4 saat
- **RPO (Recovery Point Objective):** 24 saat (en fazla 1 günlük veri kaybı)

---

## 24. Test Stratejisi

| Test Tipi | Kapsam | Araç |
|-----------|--------|------|
| **Unit Test** | Servis katmanı, yardımcı fonksiyonlar | Jest (FE), JUnit 5 (BE) |
| **Integration Test** | API endpoint'leri, DB sorguları | Supertest (FE), TestContainers (BE) |
| **E2E Test** | Kullanıcı akışları (login -> görev oluştur -> tamamla) | Playwright |
| **Görsel Regresyon** | UI bileşenleri, responsive tasarım | Chromatic / Storybook |
| **Performans Testi** | API response time, DB sorgu süresi | k6 / Artillery |
| **Güvenlik Testi** | XSS, SQL Injection, Auth bypass | OWASP ZAP |
| **Lighthouse** | Core Web Vitals, Accessibility | Chrome DevTools |

---

## 25. Geliştirme Yol Haritası (Milestones)

### Faz 1: MVP & Kurumsal Kimlik Çıkışı (1. - 4. Hafta)
- [ ] Mimari tasarım ve teknoloji stack kurulumu (Spring Boot Backend + Next.js Frontend).
- [ ] Ön yüz ana sayfa, hizmetler, iletişim ve hakkında sayfalarının TR/DE dillerinde kodlanması.
- [ ] Admin panel kimlik doğrulama (Spring Security + JWT + Google OAuth2) entegrasyonu.
- [ ] Dashboard ve temel Görev Yönetimi (CRUD + Kanban) modülünün tamamlanması.
- [ ] Vercel (Frontend) ve AWS/Cloud (Backend Docker Container) üzerine canlı deployment.

### Faz 2: Operasyonel Derinlik & CRM (5. - 8. Hafta)
- [ ] Proje Yönetimi ve Müşteri/Lead (CRM) modüllerinin devreye alınması.
- [ ] İletişim formu ve Calendly randevularının doğrudan Admin Lead paneline düşürülmesi.
- [ ] Portfolyo ve Blog CMS altyapısının kurularak ilk içeriklerin girilmesi.
- [ ] Dosya & Doküman arşivi modülünün S3/Cloud Storage ile entegre edilmesi.

### Faz 3: Otomasyon, Finans & Ölçeklenme (9. - 12. Hafta)
- [ ] Finans modülü (Gelir/Gider takibi) ve otomatik Hakediş/Komisyon hesaplayıcının kodlanması.
- [ ] SEO / GEO takip modülünün devreye alınması.
- [ ] Kullanıcı rol yönetiminin (RBAC) detaylandırılması ve sistem loglarının (Audit Log) izlenmesi.
- [ ] Otomatik e-posta bildirimleri (Spring Mail / SendGrid entegrasyonu).
- [ ] Performans optimizasyonu (Lighthouse skorlarının 95+ seviyesine çıkarılması).

---

## 26. Dokümantasyon Yapısı (README.md Şablonu)

```markdown
# Sefaris — Kurumsal Web Sitesi & Yönetim Paneli

## Hizli Baslangic
### Gereksinimler
- Node.js 20+
- Java 21+
- Docker & Docker Compose
- PostgreSQL 16

### Kurulum
1. `git clone ...`
2. `cp .env.example .env` (degiskenleri doldur)
3. `docker compose up -d` (DB + Redis + MinIO)
4. `cd backend && ./mvnw spring-boot:run`
5. `cd frontend && npm install && npm run dev`

### Mimari
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [API Dokumantasyonu](./docs/API.md)
- [Deployment Rehberi](./docs/DEPLOYMENT.md)

### Komutlar
| Komut | Aciklama |
|-------|----------|
| `npm run dev` | Gelistirme sunucusu |
| `npm run build` | Production build |
| `npm run test` | Unit testler |
| `npm run test:e2e` | E2E testler (Playwright) |
| `./mvnw test` | Backend testleri |
| `docker compose up` | Tum servisleri baslat |
```

---

_**Bu tam ve eksiksiz rehber, mevcut Sefaris v3.5.1 rehberinin eksik kalan tum teknik detaylarini icerir. Bu haliyle bir yapay zeka modeline verildiginde, tutarli, guvenli ve olceklenebilir bir uygulama uretmesi mumkun hale gelir.**_
