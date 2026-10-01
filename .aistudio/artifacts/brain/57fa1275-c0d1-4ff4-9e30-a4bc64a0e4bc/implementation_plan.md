# AURA Fine Dining & Tasting Room – Showcase Website

An editorial, high-performance showcase website for an upscale modern fine dining restaurant. Designed with warm minimalist aesthetics (deep charcoal, warm cream, and champagne gold), featuring an interactive seasonal tasting menu, direct phone and messaging reservation connections, a curated atmospheric photo gallery with lightbox, comprehensive LocalBusiness Schema.org SEO, and a dedicated GitHub + Hostinger production deployment guide.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The design and functionality have been tailored directly to your confirmed preferences:

- **Cuisine & Dining Concept**: Modern fine dining with contemporary seasonal tasting menus, wine pairings, and artisanal sourcing.
- **Visual Aesthetic & Mood**: Warm editorial minimalism with deep charcoal canvas (`#141413`), warm cream accents (`#FDFBF7`), subtle hairline dividers, and champagne gold focus tones (`#D4AF37` / `#C5A880`).
- **Connection & Reservations**: Focused on showcasing exquisite dishes and culinary craft, paired with direct high-convenience phone dial (`tel:`) and WhatsApp booking links, along with an interactive reservation inquiry card that formats reservations ready for direct call or instant messaging.
- **Production & Deployment**: Includes an interactive in-app Deployment Guide detailing step-by-step GitHub connection, Hostinger domain setup, automatic webhook deployments, and HTTPS/SSL certification.

---

## 1. Overview & Core Concept

- **What It Does**: Presents a luxury digital experience that spotlights the restaurant's culinary philosophy, seasonal multi-course tasting menus, dining room ambiance, and private cellar selections. Enables visitors to reserve tables or ask questions through direct telephone and WhatsApp links, explore dishes with ingredient breakdowns, and find location, hours, and parking information.
- **Target Audience**: Discerning diners, couples celebrating milestones, culinary enthusiasts, food critics, and event organizers seeking a memorable fine dining experience.
- **Key Value**: Fast-loading, distraction-free luxury presentation that loads in milliseconds on cellular networks, complies with WCAG AA accessibility, and maximizes local search engine visibility through structured data.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **First Impression & Hero Experience**:
   - Refined Top Bar contract: Brand wordmark (`AURA`), clean navigation (`Menu`, `Reservations`, `Gallery`, `Story`, `Contact`), and one primary direct-connect action (`Call / Book`).
   - Cinematic hero visual featuring plating artistry, clear tagline, service hours indicator, and direct action triggers (`Explore Tasting Menu` and `Reserve Table`).
2. **Interactive Seasonal Menu Showcase**:
   - Filterable seasonal courses: *Chef's Tasting Menu*, *Autumn Degustation*, *Small Plates & Starters*, *Signature Mains*, *Artisanal Desserts*, and *Sommelier Cellar Pairings*.
   - Ingredient clarity with dietary badges (Vegetarian, Gluten-Free, Vegan, Sustainably Sourced) rendered as clean unboxed text.
   - Price display in tabular numerals with course descriptions and chef notes.
3. **Direct-Connect Table Reservation & Inquiries**:
   - Express phone reservation module with one-tap calling (`tel:+1...`) and formatted WhatsApp reservation generator (date, guest count, time, seating area).
   - Interactive table reservation card: Guests select party size (1–8 guests), preferred seating (Dining Room, Chef's Counter, Private Wine Cellar, Terrace), date, and time slot. Clicking "Confirm via Phone / WhatsApp" formats the booking instantly for 1-tap transmission.
4. **Curated Photo Gallery with Lightbox**:
   - Atmospheric masonry/grid showcasing culinary craft, architectural interiors, plating close-ups, and cocktail art.
   - Filter by *All*, *Dishes*, *Ambiance*, and *Cellar*.
   - Accessible lightbox with keyboard navigation (`Esc` to close, `Arrow` keys for next/prev) and zero layout shifts.
5. **Contact, Location, & Local Information**:
   - Operating hours table with live "Open Now / Closed" status indicator based on local time.
   - Address, valet parking details, dress code advisory, interactive Google Maps link, and direct social media icons (Instagram, Facebook, X, TripAdvisor).
6. **Hostinger & GitHub Production Deployment Guide**:
   - An accessible in-app deployment helper modal offering clear step-by-step instructions for:
     1. Pushing repository to GitHub.
     2. Purchasing/configuring a custom domain on Hostinger.
     3. Setting up Hostinger Git deployment or VPS Node.js server.
     4. Enabling free automated SSL / HTTPS encryption.
     5. Configuring automatic deployment webhooks on `git push main`.

### Visual Identity & Theme
- **Aesthetic Direction**: Warm editorial minimalism, tactile typography, generous breathing room, and zero-pill discipline.
- **Color Palette**:
  - Dominant Neutral (60%): Deep Charcoal / Espresso Canvas (`#121211` / `#181816`)
  - Structural Surface (30%): Muted Sandstone / Charcoal Tint (`#1E1E1C` and `#262623`) with hairline borders (`rgba(255,255,255,0.08)`)
  - Accent Tone (10%): Warm Champagne Gold (`#D4AF37` / `#C5A880`) for active tabs, primary buttons, and hover underlines
  - Text: Warm Off-White / Cream (`#FDFBF7`) for headings; Sandstone Grey (`#A8A29E`) for body and descriptions
- **Typography**:
  - Display & Headings: `Cormorant Garamond` / `Playfair Display` serif (high elegance, characterful)
  - Body Prose & UI: `Plus Jakarta Sans` / system geometric sans (crisp legibility, clean numbers)
  - Numerals: Tabular figures (`tabular-nums`) for prices, phone numbers, and time slots
- **Motion**: Subtle opacity reveals and micro-hover lifts ($\le 200\text{ms}$), respecting `prefers-reduced-motion`.

---

## 3. Key Product Decisions & Trade-Offs

- **Direct Phone & Number Connection vs. Complex Backend Booking Engine**:
  - *Chosen Approach*: Lightweight client-side reservation builder paired with instant `tel:` one-touch dialing and direct WhatsApp message formatting (plus clipboard copy and simulated confirmation card).
  - *Why*: Directly aligns with your specification ("only showcase my products and users connect through numbers"). It eliminates third-party booking fees (e.g. OpenTable/Resy), works instantly without requiring users to create accounts, and ensures mobile guests can reserve in under 15 seconds over cellular networks.
- **Image Optimization & Zero-Broken-Image Resilience**:
  - *Chosen Approach*: Generate high-fidelity custom images for the hero, signature dishes, and dining room via `generate_image`, paired with inline SVG architectural fallbacks and modern CSS gradients.
  - *Why*: Guarantees instant cellular rendering without external host dependencies or broken links.
- **Local SEO & Schema.org Strategy**:
  - *Chosen Approach*: Embedded JSON-LD `Restaurant` schema with coordinates, telephone, price range, opening hours specification, menu URL, and accepted payment methods.
  - *Why*: Boosts Google Search and Google Maps local knowledge graph visibility.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          AURA Web Application                          │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌───────────────────────┐  ┌────────────────────────────────────────┐ │
│  │   Navigation Header   │  │           Local SEO Engine             │ │
│  │  Wordmark + Links +   │  │  JSON-LD Restaurant Schema, Meta Tags,  │ │
│  │   Direct Dial CTA     │  │      OpenGraph, Canonical URLs         │ │
│  └──────────┬────────────┘  └───────────────────┬────────────────────┘ │
│             │                                   │                      │
│             ▼                                   ▼                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                         App State Store                          │  │
│  │  - Active Menu Category (Tasting / Starters / Mains / Cellar)    │  │
│  │  - Reservation Draft (Party, Date, Time, Seating Area, Phone)   │  │
│  │  - Gallery Active Filter & Lightbox Selected Image Index         │  │
│  │  - Contact Form State & Validation                               │  │
│  │  - Deployment Guide Modal Visibility                             │  │
│  └──────────┬───────────────────────────────────┬───────────────────┘  │
│             │                                   │                      │
│             ▼                                   ▼                      │
│  ┌───────────────────────┐            ┌───────────────────────────┐    │
│  │      UI Sections      │            │     External Actions      │    │
│  │  - Hero Showcase      │            │  - One-tap Phone Dial     │    │
│  │  - Interactive Menu   │            │    (tel:+1...)            │    │
│  │  - Gallery & Lightbox │            │  - WhatsApp Deep-Link     │    │
│  │  - Reserve by Phone   │            │  - Calendar Event (.ics)  │    │
│  │  - Story & Cellar     │            │  - Google Maps Directions │    │
│  │  - Contact & Hours    │            │  - Hostinger / GitHub Docs│    │
│  └───────────────────────┘            └───────────────────────────┘    │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy & Handlers
- **`Navbar`**: Single-element wordmark, 5 clean text navigation links with smooth scrolling, direct call action, mobile hamburger toggle.
- **`HeroSection`**: High-impact plating visual, primary value statement, quick hours badge, two primary actions.
- **`MenuSection`**: Category filter tabs, seasonal tasting course cards, ingredient highlights, dietary indicators, prices in tabular numerals.
- **`ReservationCard`**: Interactive party size selector (1–8), time picker, seating area buttons, instant dial button (`tel:`), WhatsApp pre-filled booking draft link, and calendar reminder generator.
- **`GallerySection`**: Filterable visual showcase (Dishes, Dining Room, Cellar), click-to-lightbox modal with full keyboard controls and responsive image scaling.
- **`StorySection`**: Chef's philosophy, farm-to-table sourcing, sommelier wine program highlights.
- **`ContactAndHours`**: Working contact inquiry form with validation, real-time "Open Now" calculation, address, phone links, and social channel links.
- **`DeploymentGuideModal`**: Interactive modal with copyable code snippets, Hostinger configuration steps, GitHub repository sync instructions, and free HTTPS SSL setup walkthrough.
