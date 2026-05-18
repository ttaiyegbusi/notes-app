# Notes App

A clean, minimalistic notes & todos web app. Plan your day with calm.

Built with Next.js 14, TypeScript, Tailwind CSS, Supabase, and Geist Mono.

---

## Quick start

```bash
# 1. Install
npm install

# 2. Set up environment
cp .env.example .env.local
# (For step 1 of setup, the app runs fine with placeholder values — Supabase only kicks in once you wire it up)

# 3. Run
npm run dev
```

Open <http://localhost:3000>. You should see the dashboard with mock data, the date header pulling real weather from Open-Meteo, and the dark mode toggle working.

---

## Project structure

```
notes-app/
├─ public/fonts/             ← Geist Mono variable fonts
├─ src/
│  ├─ app/
│  │  ├─ globals.css         ← Design tokens (light + dark)
│  │  ├─ layout.tsx          ← Root layout, font wiring
│  │  └─ page.tsx            ← Home / dashboard route
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ top-nav.tsx      ← Pill nav (three clusters)
│  │  │  └─ date-header.tsx  ← Weather + date display
│  │  ├─ dashboard/
│  │  │  ├─ dashboard.tsx    ← Grid composing the three panels
│  │  │  ├─ panel.tsx        ← Shared panel shell
│  │  │  ├─ todos-panel.tsx
│  │  │  ├─ schedule-panel.tsx
│  │  │  └─ notes-panel.tsx
│  │  └─ theme-provider.tsx
│  ├─ lib/
│  │  ├─ supabase/           ← Browser + server clients
│  │  ├─ types.ts            ← Todo, ScheduleEvent, Note, Weather
│  │  ├─ mock-data.ts        ← Seed data matching screenshot
│  │  └─ utils.ts
│  └─ hooks/                 ← (Reserved for data hooks once Supabase is wired)
└─ supabase/schema.sql       ← Paste into Supabase SQL editor
```

---

## Setting up Supabase

1. Go to <https://supabase.com> and create a project.
2. From the project dashboard, copy the **URL** and **anon key** into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
3. Open the **SQL Editor**, paste in the contents of `supabase/schema.sql`, and run it. This creates the `todos`, `events`, and `notes` tables with row-level security policies so users can only see their own data.
4. Under **Authentication → Providers**, enable Email and (optionally) Google.

The Supabase clients in `src/lib/supabase/` are already set up for both client and server components.

---

## What's working in this scaffold

- ✅ Dashboard layout matching your Figma reference
- ✅ Geist Mono wired via `next/font/local` (variable font, all weights)
- ✅ Design tokens for warm-tone light & dark mode
- ✅ Top nav with three pill clusters (window dots, route switcher, actions)
- ✅ Weather widget pulling live data from Open-Meteo
- ✅ Todos panel — checkboxes, inline add, completion strikethrough
- ✅ Schedule panel — hourly rail with event cards
- ✅ Notes panel — autoresizing textarea with simulated autosave indicator
- ✅ Dark mode toggle with system preference detection
- ✅ Supabase client + SQL schema ready to wire up

## What's next (planned in build order)

1. **Auth pages** — `/login`, `/signup` using Supabase Auth
2. **Replace mock data with Supabase queries** — server components for initial load, client mutations
3. **Realtime sync** — Supabase channels so changes appear across tabs/devices
4. **Calendar, Inbox, Archive routes** — currently they exist as nav buttons only
5. **Cmd+K command palette**
6. **Gmail integration** (v2) — Google OAuth, fetch threads via Gmail API
7. **Mobile responsive polish** — the grid stacks but the schedule rail needs work below 480px

---

## Design notes

- **Font**: Geist Mono used everywhere — including body. This is intentional and matches the screenshot's character. If you want a sans-serif for body later, set up Geist Sans the same way and swap the `font-sans` token in `tailwind.config.ts`.
- **Colors**: warm off-whites in light mode (`#f0eeea` background, `#ffffff` cards) and warm darks in dark mode. Not pure black/white anywhere.
- **Spacing**: generous. The whole design is about calm.
- **Shadows**: minimal — borders do most of the work. One soft drop shadow on pills.

---

## Tech choices, briefly

| Decision | Why |
|---|---|
| Next.js 14 App Router | RSC for fast initial load, server actions for mutations |
| Tailwind v3 | Stable; design tokens via CSS variables map cleanly |
| Supabase | One vendor for auth + DB + realtime; row-level security is built-in |
| Open-Meteo for weather | No API key, no rate limits to worry about for personal use |
| Lucide icons | Matches the line-weight aesthetic of the screenshot |
| Variable font for Geist Mono | One file, every weight, smaller bundle |

---

## License

Geist Mono is licensed under the SIL Open Font License — see `public/fonts/OFL.txt`.
