<h1 align="center">📰 LankaNews AI</h1>

<p align="center"><strong>Follow Sri Lankan news across publishers and languages.</strong></p>

<p align="center">
  <img src="docs/readme-cover.svg" alt="LankaNews AI project illustration" width="1120">
</p>

<p align="center"><a href="#project-summary">Project summary</a> · <a href="#quick-start">Quick start</a> · <a href="#project-reference">Project reference</a></p>

## Project summary

Follow Sri Lankan news across publishers, languages, and districts.

| 🗺️ Explore | 📰 Compare | 🛠️ Reuse |
| --- | --- | --- |
| [Districts](app/districts/page.tsx) and [map](app/map/page.tsx) | [Coverage comparison](app/compare/page.tsx) and [story clusters](app/events/page.tsx) | [RSS](app/api/rss/route.ts) and [OpenAPI](app/api/openapi.json/route.ts) |

## Quick start

```sh
npm install
npm run dev
```

Copy [the environment template](.env.example) for database persistence or AI features. Without a database URL, the app uses sample data and temporary process memory.

## Project reference

<details>
<summary><strong>📰 Ingestion, storage, and setup</strong></summary>

Sri Lankan news intelligence dashboard built with Next.js.

## Detailed overview

```mermaid
flowchart LR
  A["Read publisher feeds"] --> B["Classify articles"] --> C["Group related coverage"] --> D["Serve dashboards and APIs"]
  classDef primary fill:#047857,stroke:#047857,color:#fff
  classDef accent fill:#1d4ed8,stroke:#1d4ed8,color:#fff
  class A primary
  class B accent
  class C primary
  class D accent
```

LankaNews AI collects stories from Sri Lankan publishers and helps readers follow coverage across outlets. The dashboard combines category and language filters with story clusters, timelines, district views, and research tools.

1. [RSS ingestion](lib/rss.ts) retrieves feed items and keeps their original publisher links.
2. [Classification](lib/classify.ts) and [clustering](lib/cluster.ts) attach categories and group related coverage.
3. [The article store](lib/store.ts) saves records in PostgreSQL when configured. Without a database URL it uses sample data and process memory, so changes are temporary.
4. The [daily brief](app/api/brief/route.ts), [RSS feed](app/api/rss/route.ts), and [open API description](app/api/openapi.json/route.ts) provide additional ways to consume coverage. AI-assisted summaries and translations require an OpenAI API key.

## Included
- RSS ingestion from Sri Lankan publishers
- Sinhala/Tamil/English keyword categorization
- PostgreSQL persistence through the Neon serverless client in [lib/db.ts](lib/db.ts) when `DATABASE_URL` is configured
- Canonical URL deduplication
- Lightweight duplicate-story clustering
- Daily brief API at /api/brief
- Optional OpenAI article summaries at /api/summarize
- Ingestion requires a bearer token when `CRON_SECRET` is configured
- Vercel Cron every 15 minutes

---

## Setup

> [!NOTE]
> With no `DATABASE_URL`, the app uses sample data and temporary process memory.
1. Copy .env.example to .env.local.
2. Set DATABASE_URL to your Supabase PostgreSQL connection string for persistent storage.
3. Optionally set OPENAI_API_KEY for AI summaries.
4. Set CRON_SECRET in Vercel and locally; Vercel Cron can use it to authorize scheduled ingestion.
5. Run npm install, npm run db:init, npm run dev.

The original publisher remains the source of record. AI summaries are generated only from available feed text and should be checked against the original article.

---

</details>

<details>
<summary><strong>📊 Intelligence modules and production checklist</strong></summary>

## Expanded intelligence modules

**Ways to explore news**

| Area | Start here |
| --- | --- |
| Place | [Map route](app/map/page.tsx) and [district route](app/districts/page.tsx) |
| Coverage | [Cross-source comparison](app/compare/page.tsx) and [story clusters](app/events/page.tsx) |
| Reuse | [RSS endpoint](app/api/rss/route.ts) and [OpenAPI description](app/api/openapi.json/route.ts) |
- News map and district intelligence: /map and /districts
- Topic trends: /trends
- Cross-source comparison: /compare
- Event/story cluster tracker: /events
- Historical archive: /archive
- Research mode: /research
- Sports and business dashboards: /sports and /business
- Disaster/emergency monitor: /emergency
- Embeddable/read-only API guide: /widgets and /api/openapi.json
- RSS output: /api/rss
- Health endpoint: /api/health
- Translation endpoint: POST /api/translate (requires OPENAI_API_KEY)

The system keeps original publisher URLs and labels AI-assisted features. Political coverage is presented descriptively and source-attributed; the product does not rank political actors or recommend electoral choices.


---

## Production checklist
- Configure the PostgreSQL `DATABASE_URL` and run `npm run db:init` once.
- Configure `CRON_SECRET` and keep it private.
- Optionally configure `OPENAI_API_KEY` for AI summaries, digest, research, and translation features.
- Deploy the repository to Vercel with the same environment variables.
- The scheduled `/api/ingest` job runs every 15 minutes from `vercel.json`.
- `/api/health` can be used as a deployment health check.
- Original publisher links remain the source of record; AI output is clearly labeled.

</details>
