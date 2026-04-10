# Design Brief

## Direction

Techno-Brutalist Dark Portfolio — immersive dark theme for a distributed systems engineer, balancing technical credibility with visual presence through electric cyan accents and ambient glow effects.

## Tone

Hacker-meets-premium: intentional edge (sharp minimalism, near-black backgrounds) paired with carefully placed visual richness (glow, strategic accents) that feels professional yet memorable.

## Differentiation

Ambient glow rings on hero text and interactive elements + warm amber accent for terminal/code sections create a signature "glowing circuits" aesthetic—like a senior engineer's personal brand site.

## Color Palette

| Token      | OKLCH            | Role                                    |
| ---------- | ---------------- | --------------------------------------- |
| background | 0.12 0.01 260    | Hero/main deep dark, near-black         |
| foreground | 0.92 0.01 260    | Primary text, high contrast             |
| card       | 0.16 0.015 260   | Section cards, slightly elevated        |
| primary    | 0.7 0.22 200     | Electric cyan, hero/accent highlights   |
| accent     | 0.72 0.18 70     | Warm amber, terminal/code warm contrast |
| muted      | 0.22 0.02 260    | Secondary surfaces, borders             |
| destructive| 0.65 0.19 22     | Error/warning states                    |

## Typography

- **Display**: Space Grotesk — tech-forward, geometric headings (hero: `text-6xl md:text-8xl font-bold tracking-tight`, h2: `text-4xl md:text-5xl font-bold`)
- **Body**: General Sans — clean, neutral paragraphs and UI labels (`text-base`, `text-lg`)
- **Mono**: JetBrains Mono — code blocks, terminal output, technical elements (`text-sm`)

## Elevation & Depth

Minimal physical shadows; depth via surface lightness (bg-card at 0.16 L over bg-background 0.12 L) + ambient glow utilities on primary/accent interactive states—glowing rings at 20-40px spread.

## Structural Zones

| Zone    | Background        | Border                   | Notes                                         |
| ------- | ----------------- | ------------------------ | --------------------------------------------- |
| Header  | card (0.16 L)     | border/muted fade        | Elevated nav, subtle underline                |
| Hero    | background (0.12) | primary glow on text     | Full-width, circuit grid texture overlay      |
| Content | background repeat | card alternation (0.16)  | Sections toggle bg-card/bg-background        |
| Footer  | card (0.16 L)     | border top               | Muted text, link accents                      |

## Spacing & Rhythm

Spacious grid (6rem sections, 4rem gaps)—room to breathe. Micro: 0.5rem, 1rem, 1.5rem clusters. Sections cascade via alternating bg-card/bg-background for visual rhythm.

## Component Patterns

- **Buttons**: bg-primary with glow-md on hover, rounded-md, font-semibold, smooth transition
- **Cards**: bg-card, rounded-lg, border border-muted, glow-sm on hover, shadow-none
- **Links**: text-primary, underline-offset, glow-accent on hover (short blur)
- **Code/Terminal**: font-mono, bg-muted, text-accent, monospace rendering

## Motion

- **Entrance**: fade-in + slide-up (0.6s ease-out) on scroll intersection
- **Hover**: smooth scale (1→1.02) + glow-pulse shadow, 0.3s cubic-bezier
- **Decorative**: glow-pulse animation (3s infinite) on accent badges and featured project highlights

## Constraints

- No raw hex/rgb colors—all tokens via CSS variables
- Glow effects use oklch with 0.1–0.4 opacity to avoid neon cheapness
- Monospace reserved for code/terminal; body copy always General Sans
- Cyan primary only on CTA/hero; warm amber for terminal to prevent color saturation

## Signature Detail

Glowing cyan rings + warm amber terminal text on dark ground create an unmistakable "hacker's workbench" aesthetic—technical credibility wrapped in visual craft.
