# AfterTrillion - Idle Game Number Reference

A Next.js application that displays a comprehensive reference table for idle game number suffixes from 10³ (Thousand) to 10³⁰³ (Centillion).

## Features

- 🎮 Gaming-style dark theme with purple/pink gradients
- 📊 Scrollable table with 101 entries
- 🎯 Highlights current level (10¹²⁹ - dQDR)
- ⚡ Algorithmic suffix generation
- 🔤 Three-tier naming system:
  - Tier 1: Standard (k, M, B, T)
  - Tier 2: Short form single letters
  - Tier 3: Compound Latin system

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Algorithm

The suffix generator uses a three-tier system:
- **Tier 1**: Standard suffixes (k, M, B, T) for 10³ to 10¹²
- **Tier 2**: Single-letter suffixes for 10¹⁵ to 10³³
- **Tier 3**: Compound Latin system using Prefix + Root format from 10³⁶ onwards

Special notation for 10¹²⁹: **dQDR** (Duoquadragintillion)

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- React 18
