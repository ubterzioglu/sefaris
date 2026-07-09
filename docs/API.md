# Sefaris API — REST Sözleşmesi (özet)

Base URL: `/api/v1` · Auth: `Authorization: Bearer <JWT>` · Enum'lar lowercase (`open`, `in_progress`).
Tam interaktif liste: backend çalışırken `http://localhost:8080/api/v1/swagger-ui.html`.

## Auth (`/auth`) — açık
`POST /register` · `POST /login` · `POST /google` · `POST /refresh` · `GET /me` · `POST /logout` · `POST /forgot-password` · `POST /reset-password`

## Tasks (`/tasks`)
`GET /tasks?status=&assignee_id=&project_id=&priority=` · `GET /tasks/{id}` · `POST /tasks` · `PUT /tasks/{id}` · `PATCH /tasks/{id}/status` · `DELETE /tasks/{id}` · `POST /tasks/{id}/comments` · `DELETE /tasks/{id}/comments/{commentId}` · `POST /tasks/{id}/files` · `DELETE /tasks/{id}/files/{fileId}`

## Projects (`/projects`)
`GET` (`?status=&customer_id=&page=&limit=`) · `GET /{id}` · `POST` · `PUT /{id}` · `DELETE /{id}` · `POST /{id}/members` · `DELETE /{id}/members/{userId}` · `GET /{id}/tasks` · `GET /{id}/finances`

## Customers (`/customers`)
`GET` (`?country=&search=`) · `GET /{id}` · `POST` · `PUT /{id}` · `DELETE /{id}`

## Leads (`/leads`)
`GET` (`?status=&source=&assigned_to=`) · `GET /{id}` · `POST` · `PUT /{id}` · `PATCH /{id}/status` · `DELETE /{id}`

## Finances (`/finances`)
`GET` (`?type=&category=&project_id=`) · `GET /summary` · `GET /project/{id}` · `POST` · `PUT /{id}` · `DELETE /{id}` · `GET /profit-share/{projectId}`

## Documents (`/documents`)
`GET` (`?folder_path=&search=`) · `POST` (multipart) · `GET /{id}/download` · `DELETE /{id}`

## SEO (`/seo`)
`GET /campaigns` · `POST /campaigns` · `GET /campaigns/{id}` · `GET /keywords?campaign_id=` · `POST /keywords` · `PATCH /keywords/{id}/rank`

## Admin (`/admin`)
`GET/POST /users` · `PUT /users/{id}/role` · `DELETE /users/{id}` · `GET /activity-logs` · `GET/PUT /settings` · `GET /email-templates` · `PUT /email-templates/{id}` · `POST /announcements` · `DELETE /announcements/{id}`

## Dashboard (`/dashboard`)
`GET /stats` · `GET /activities` · `GET /announcements` · `GET /my-tasks`

## Public (`/public`) — açık
`POST /contact` (→ lead + e-posta) · `GET /projects` · `GET /projects/{slug}` · `GET /blog` · `GET /blog/{slug}` · `GET /testimonials` · `GET /team`

## Hata gövdesi (rehber bölüm 14)
```json
{ "code": "TASK_DUE_DATE_PAST", "messageTr": "...", "messageDe": "...", "field": "dueDate", "status": 422 }
```

## RBAC (bölüm 5)
Roller: `super_admin, admin, developer, designer, seo_specialist, viewer, accountant`. Metod bazlı `@PreAuthorize`.
