# LankaNews AI

Sri Lankan news intelligence dashboard built with Next.js.

## Included
- RSS ingestion from Sri Lankan publishers
- Sinhala/Tamil/English keyword categorization
- Neon PostgreSQL persistence when DATABASE_URL is configured
- Canonical URL deduplication
- Lightweight duplicate-story clustering
- Daily brief API at /api/brief
- Optional OpenAI article summaries at /api/summarize
- Protected ingestion using INGEST_SECRET
- Vercel Cron every 15 minutes

## Setup
1. Copy .env.example to .env.local.
2. Set DATABASE_URL for persistent storage.
3. Optionally set OPENAI_API_KEY for AI summaries.
4. Set INGEST_SECRET and configure the Vercel cron request authorization if your deployment uses a protected cron route.
5. Run npm install, npm run db:init, npm run dev.

The original publisher remains the source of record. AI summaries are generated only from available feed text and should be checked against the original article.