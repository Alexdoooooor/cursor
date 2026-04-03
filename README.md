# CineCraft Control Room

Русскоязычный web-сервис для контролируемого AI-видеопроизводства: проекты, story bible, герои, мир, стиль, storyboard, generation queue, continuity, audio stage, timeline и export center.

## Стек

- Next.js (React, App Router, TypeScript)
- Vercel-friendly route handlers / server actions
- MongoDB Atlas
- Inngest-ready orchestration
- Tailwind CSS

## Быстрый старт

```bash
npm install
npm run setup
npm run dev
```

Откройте `http://localhost:3000`.

## Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните значения:

```bash
cp .env.example .env.local
```

Минимально важные переменные:

- `MONGODB_URI` — строка подключения к MongoDB Atlas
- `MONGODB_DB_NAME` — имя базы
- `NEXTAUTH_SECRET` — секрет для Auth.js
- `NEXTAUTH_URL` — базовый URL приложения
- `INNGEST_EVENT_KEY` — ключ событий Inngest
- `INNGEST_SIGNING_KEY` — signing key Inngest

Если MongoDB не подключена, приложение использует встроенный демо-слой данных, чтобы интерфейс и маршруты всё равно были доступны для локальной разработки.

## Что уже есть в MVP

- русскоязычный app shell
- список и создание проектов
- overview проекта
- story bible
- character bible
- world / style bible
- asset manager
- storyboard и shot inspector
- generation queue и mock takes
- audio stage
- timeline rough cut
- export center
- usage dashboard
- settings экран для провайдеров

## Архитектурная заметка

Это control room для AI video production, а не магическая модель сама по себе. Качество финального видео зависит от подключённых video/audio providers. Приложение даёт:

- сильную структуру проекта,
- continuity control,
- provider abstraction,
- workflow orchestration,
- управление takes, lineage и export.

## Доступные команды

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
```
