# LankaNews AI

Sri Lankan news intelligence dashboard built with Next.js.

## Included
- RSS ingestion from Sri Lankan publishers
- Sinhala/Tamil/English keyword categorization
- PostgreSQL persistence (Supabase-compatible) when DATABASE_URL is configured
- Canonical URL deduplication
- Lightweight duplicate-story clustering
- Daily brief API at /api/brief
- Optional OpenAI article summaries at /api/summarize
- Protected ingestion using CRON_SECRET
- Vercel Cron every 15 minutes

## Setup
1. Copy .env.example to .env.local.
2. Set DATABASE_URL to your Supabase PostgreSQL connection string for persistent storage.
3. Optionally set OPENAI_API_KEY for AI summaries.
4. Set CRON_SECRET in Vercel and locally; Vercel Cron can use it to authorize scheduled ingestion.
5. Run npm install, npm run db:init, npm run dev.

The original publisher remains the source of record. AI summaries are generated only from available feed text and should be checked against the original article.

## Expanded intelligence modules
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


## Production checklist
- Configure Supabase `DATABASE_URL` and run `npm run db:init` once.
- Configure `CRON_SECRET` and keep it private.
- Optionally configure `OPENAI_API_KEY` for AI summaries, digest, research, and translation features.
- Deploy the repository to Vercel with the same environment variables.
- The scheduled `/api/ingest` job runs every 15 minutes from `vercel.json`.
- `/api/health` can be used as a deployment health check.
- Original publisher links remain the source of record; AI output is clearly labeled.
