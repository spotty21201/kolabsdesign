# PRD — Kolabs.Design v2 (Decision Intelligence Think Tank)

## Document purpose
This PRD defines Kolabs.Design v2 as a **public-facing decision intelligence platform** that showcases tools, cases, briefs, and research at the intersection of **design + development + AI**.

The site is designed to:
- Build institutional credibility (McKinsey-grade clarity)
- Center Doddy as founder and lead strategist
- Create a living catalog of assets (continuous publishing)
- Generate multiple conversions (briefings, collaborations, traction)

---

## 1) Product definition
**Kolabs.Design v2** is the AI Think Tank layer of the AIM + HDA + Kolabs collective.

### Positioning statement
**Kolabs.Design is building the decision intelligence layer for land, infrastructure, and capital deployment.**

### What the website is (in one line)
A **catalog of decision assets** — tools, case proof, briefs, and research — presented in an index-first format that signals authority and velocity.

---

## 2) Target users
1) **Institutional decision-makers**
- SOE leadership, government-linked entities, master developers, landholders

2) **Global recruiters and executive search (GCC focus)**
- Evaluate leadership fit through proof of thinking and execution

3) **Academic audience / PhD trajectory**
- Assess research seriousness, frameworks, publications

4) **Public collaborators**
- Partners, co-builders, talent, and aligned communities

---

## 3) Jobs-to-be-done (JTBD)
- Understand what Kolabs does in **30 seconds**
- Browse assets by category/tag and quickly assess relevance
- Validate credibility through consistent structure and evidence
- Explore demos/tools where available
- Request a briefing or collaboration with minimal friction
- Follow updates as new assets are published

---

## 4) Key product principles
1) **Index-first**
The homepage is a catalog, not a brochure.

2) **Decision-first narrative**
Every asset is framed as an aid to decisions.

3) **Low cognitive load**
Fast scanning, short headings, clear CTAs.

4) **Institutional minimalism**
Quiet authority. No hype.

5) **Velocity as credibility**
The site is dynamic by design: new assets can be published continuously.

---

## 5) Information architecture

### Primary navigation (only three items)
- **Now** (homepage / front page)
- **Work** (catalog of assets)
- **Collab with Kolabs** (engagement + people + contact)

### Page roles
#### Now
Acts as an editorial + release feed:
- One sharp positioning line
- Featured releases (3–6 cards)
- Latest updates feed (cards)
- Optional: “New this month / Recently updated” module

#### Work
Acts as the structured, filterable archive:
- Catalog view (cards)
- Filters: Type, Tags, Status
- Sorting: Latest / Featured
- Includes all asset types (Tools, Cases, Briefs, Research) as a unified library

#### Collab with Kolabs
Acts as the institutional entry door:
- People (Doddy + Farid)
- How we work (pilot → prototype → decision-ready)
- Engagement modes (3 max)
- Clear contact paths (email + meeting link + optional lightweight form)

---

## 6) Core content types
### A) Tools & Demos
Purpose: show applied decision capability as usable artifacts.

Minimum content:
- One-line value statement
- What decision it supports
- Demo link (or screenshots)
- Inputs / outputs
- Status: Experiment / Method / Proven

### B) Case Studies
Purpose: prove outcomes and application in real contexts.

Minimum content:
- Context (who/where, generalized if needed)
- Problem framing
- Approach (what model/tool/framework)
- Outputs produced
- Impact metric or measurable proxy

### C) Briefs / Memos
Purpose: institutional tone, sharp insights, decision framing.

Minimum content:
- Thesis
- Key points
- Implications
- Optional download (PDF)

### D) Research / Publications
Purpose: academic signal and deeper work.

Minimum content:
- Abstract / summary
- Link to publication (or PDF)
- Keywords/tags
- Citation details

---

## 7) Standard page template (applies to every asset)
Each asset page must contain these sections (in this order):

1) **Decision**
What decision does this help make?

2) **Inputs**
What data/constraints/assumptions drive it?

3) **Output**
What artifact is produced? (dashboard, simulator, memo, model)

4) **Confidence**
What guardrails, assumptions, risk flags exist?

5) **Impact**
What changed? (time saved, yield/ROI uplift, approval clarity)

6) **CTA**
Try / Read / Download / Request briefing

---

## 8) Catalog experience (homepage + listing pages)
### Cards
Each card displays:
- Type (Tool / Case / Brief / Research)
- Title
- One-line value
- One proof cue (metric, output type, or status)
- Primary CTA

### Filters
- Type
- Tags (land, infra, capital, mobility, governance, etc.)
- Status (Experiment / Method / Proven)
- Optional: geography, client type

### Sorting
- Latest
- Featured
- Most viewed (later)

---

## 9) Conversion design
### Primary conversion paths
- **Request a briefing**
- **Collaborate**

### Secondary conversions
- Subscribe to updates (optional for v1)
- Request access (if gating is used)

### Conversion rules
- One primary CTA per page
- One secondary CTA max
- Avoid “form-heavy” friction; offer direct email + meeting link

---

## 10) Admin publishing workflow (Doddy-led)
### Requirements
- Secure admin route
- Role-based access (at minimum: Admin)
- Create/edit/publish/unpublish content
- Upload images and attach PDFs
- Set featured items
- Control status ladder (Experiment/Method/Proven)

### Publishing guardrails
- No empty pages: enforce minimum required fields before publish
- Preview mode before publish

---

## 11) Tech requirements
### Stack
- Next.js (Vercel)
- Supabase (Postgres + Auth + Storage)

### Content format
- Structured blocks + Markdown support

### Performance
- Fast load
- Optimized images
- SEO-friendly slugs, metadata per item

---

## 12) Data model (Supabase)
### Tables (MVP)
- `items`
  - id
  - type (tool/case/brief/research)
  - title
  - slug
  - status (experiment/method/proven)
  - one_liner
  - hero_image
  - tags (array)
  - cta_type (try/read/download/request)
  - cta_url
  - featured (bool)
  - published_at
  - created_at, updated_at

- `item_blocks`
  - id
  - item_id
  - block_type (decision/inputs/output/confidence/impact/custom)
  - content (markdown or json)
  - sort_order

### Optional (later)
- `people` (for About and collaborators)
- `subscriptions` (newsletter)
- `requests` (briefing/access requests)

---

## 13) MVP scope (Release 1)
### Must-have
- Index page with cards + filters
- Listing pages for Tools, Cases, Briefs, Research
- Asset detail pages using standard template
- About (Doddy) page
- Collaborate page with clear conversion
- Admin publishing workflow (create/edit/publish)

### Nice-to-have
- Search
- Gated content (request access)
- Newsletter
- Analytics dashboard

---

## 14) Success metrics (v1)
- **30-second clarity test**: users can describe what Kolabs is after one scroll
- Conversion rate to briefing/collab
- Click-through rate to demos/downloads
- Repeat visits within 30 days
- Growth in “featured assets” engagement

---

## 15) Risks & mitigations
- Risk: content inconsistency → Mitigation: template + publishing guardrails
- Risk: too many CTAs → Mitigation: CTA rules per page
- Risk: over-indexing on “AI” hype → Mitigation: decision-first narrative and proof cues
- Risk: shipping delays → Mitigation: MVP release with 8–12 strong assets; expand after launch

---

## 16) Page-by-page requirements (v1)

### 16.1 Index (All)
Purpose: the fastest comprehension surface.

Must include:
- Featured strip (3–6 items)
- Catalog grid/list (cards)
- Filters (Type, Tags, Status)
- Sort (Latest / Featured)
- Lightweight intro line (1–2 sentences max)

Acceptance criteria:
- A first-time visitor can explain what Kolabs is after one scroll.
- Filters update results without page reload (client-side) or with fast SSR transitions.

### 16.2 Tools listing
Must include:
- Cards filtered to type=Tool
- Tags + Status filtering
- Clear CTAs (Try / Request Access / Read)

### 16.3 Cases listing
Must include:
- Cards filtered to type=Case
- At least one proof cue displayed per card (metric/output/status)

### 16.4 Briefs listing
Must include:
- Cards filtered to type=Brief
- “Download” or “Read” as primary CTA

### 16.5 Research listing
Must include:
- Cards filtered to type=Research
- Citation block on detail pages

### 16.6 Asset detail page (unified template)
Must include sections in order:
1) Decision
2) Inputs
3) Output
4) Confidence
5) Impact
6) CTA

Additional requirements:
- Metadata (type, status, tags)
- Related items (3–6)
- Share link

### 16.7 About (People)
Purpose: global positioning + institutional credibility.

Must include:
- A short positioning intro for the platform
- **People cards** (at minimum: Doddy + Farid)
- Individual pages or expandable sections for each person

#### Doddy section must include:
- One sharp positioning paragraph
- Focus areas (keywords)
- Selected highlights (roles/projects/tools)
- Links: LinkedIn, publications, contact

#### Farid section must include:
- Role and scope within the collective
- Focus areas (keywords)
- Selected highlights (projects/responsibilities)
- Links: LinkedIn, contact (as appropriate)

Optional:
- Add additional contributors later under a “Collaborators” subsection
Purpose: global positioning + institutional credibility.

Must include:
- One sharp positioning paragraph
- Focus areas (keywords)
- Selected highlights (roles/projects/tools)
- Links: LinkedIn, publications, contact

### 16.8 Collaborate
Purpose: primary conversion surface.

Must include:
- Two pathways: Request Briefing / Collaborate
- Direct email
- Meeting link (preferred)
- A short scoping prompt (what to include in message)

### 16.9 Admin
Purpose: Doddy can publish without developer dependency.

Must include:
- Login (Supabase Auth)
- Create/edit/publish/unpublish
- Image upload
- PDF upload
- Featured toggle
- Preview
- Validation guardrails (minimum fields)

---

## 17) User flows (v1)

### 17.1 Publish an asset (Doddy)
1) Login → Admin
2) Create item → set type/title/slug/status/tags
3) Fill standard blocks (Decision, Inputs, Output, Confidence, Impact)
4) Add hero image + CTA
5) Preview
6) Publish

Success condition:
- Asset appears in Index and its category listing within seconds.

### 17.2 Request a briefing (visitor)
1) Click “Request Briefing”
2) Either:
   - Opens meeting link, or
   - Opens lightweight form
3) Confirmation + next steps

### 17.3 Request access (if gated)
1) Click “Request Access”
2) Provide email + short intent
3) Confirmation + follow-up mechanism

---

## 18) Visual design system (look & feel)

### 18.1 Visual direction
A hybrid of:
- **Institutional minimalism** (McKinsey calm authority)
- **Labs energy** (Google Labs clarity and velocity)
- **Editorial sharpness** (NYT/WSJ scannability)

Key principle:
- The interface should feel like a **library of sharp objects** (assets), not a brochure.

### 18.2 Typography (recommended)
Primary goals: clarity, authority, excellent web readability.

Recommended stack:
- **Primary sans**: Inter (or equivalent modern grotesk)
- **Secondary serif (optional, sparing use)**: a refined editorial serif for headlines only

Usage rules:
- Headlines: short, dense meaning; avoid verbose headers
- Body: high readability, comfortable line length
- UI labels: compact, all-caps optional for tags only

### 18.3 Color system (recommended)
Primary goals: calm authority + controlled accents.

Palette structure:
- Base: white/off-white background
- Ink: near-black / charcoal for text
- Neutral grays for dividers and surfaces
- **Single accent** color for CTAs and highlights (used sparingly)

Usage rules:
- No rainbow palette
- Accent appears only on:
  - Primary CTA
  - Status chips
  - Hover states

### 18.4 Layout + components
Must include:
- Card component (the core unit)
- Status chip (Experiment / Method / Proven)
- Tag chips
- Proof cue line (metric/output)
- Primary CTA button

Layout rules:
- Strong grid
- Large whitespace (but intentional)
- Line length controlled (avoid long columns)

### 18.5 Imagery
- Prefer purposeful thumbnails (dashboard screenshots, diagram snippets, tool UI)
- Avoid generic AI stock imagery
- Use diagrams/figures as credibility signals

### 18.6 Interaction
- Subtle micro-interactions (hover elevation, underline)
- Filters should feel instant
- Navigation should never hide the catalog

### 18.7 Accessibility
- Adequate contrast
- Keyboard navigable filters
- Alt text required for images

---

## 19) Technology architecture (v1)

### 19.1 Stack
- Next.js (App Router preferred)
- Vercel deployment
- Supabase:
  - Postgres
  - Auth
  - Storage (images/PDFs)

### 19.2 Content rendering
- Catalog pages: server-rendered for SEO + speed
- Detail pages: server-rendered with structured blocks
- Admin: client app

### 19.3 Auth + roles
- Supabase Auth
- Role-based access (minimum): Admin
- Optional later: Editor / Viewer

### 19.4 Performance requirements
- Lighthouse targets (guideline):
  - LCP < 2.5s on mobile
  - CLS minimal
- Image optimization via Next Image
- Route-level caching where safe

### 19.5 SEO requirements
- Clean slugs
- Per-item metadata (title, description, OG image)
- Sitemap.xml
- Robots.txt
- Canonical URLs

### 19.6 Analytics (v1)
- Lightweight analytics (privacy-friendly preferred)
- Track:
  - page views
  - filter usage
  - CTA clicks
  - demo click-through

### 19.7 Security basics
- Admin routes protected
- Rate limiting on forms
- Storage rules locked down

---

## 20) Acceptance criteria (definition of done)

### UX
- Visitors can describe Kolabs in 30 seconds.
- Catalog browsing is fast and intuitive.
- Every published item meets template completeness.

### Content
- No blank pages.
- Every card has: title, one-liner, type, CTA.
- Every detail page has the 5 required sections.

### Admin
- Doddy can publish without developer help.
- Publishing validation prevents incomplete entries.

### Technical
- Responsive across mobile/tablet/desktop.
- SEO metadata present for all items.
- Core pages load quickly.

---

## 21) Release plan

### v1 (MVP)
- Catalog + filters
- 4 content types
- Unified template
- Admin publishing
- About + Collaborate

### v1.1
- Search
- Newsletter
- Gated access (if chosen)

### v2
- Advanced analytics
- Multi-author workflow
- More interactive demos

---

## 22) Open decisions (to finalize)
- Public vs gated access policy (which assets are restricted)
- Initial featured asset list (8–12)
- Final typography selection (sans-only vs serif accent)
- Accent color selection
- Newsletter in v1 or v1.1

