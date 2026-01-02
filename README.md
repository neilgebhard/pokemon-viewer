# Pokémon Viewer

A modern web application for browsing and viewing detailed information about Pokémon, built with Nuxt 3 and TypeScript.

**[View Live Demo](https://pokemon-viewer-ui.vercel.app/)**

## Features

### Core Functionality

- **Browse Pokémon**: View a grid of 60 Pokémon with names and thumbnails
- **Real-time Search**: Filter Pokémon by name with instant results
- **Detailed Profiles**: Click any Pokémon to view comprehensive information including:
  - High-resolution artwork
  - Physical attributes (height, weight)
  - Abilities with proper formatting
  - Type badges with official color coding
  - Base stats visualization with color-coded progress bars

### User Experience

- Responsive design optimized for desktop and mobile
- Smooth transitions and hover effects
- Search result counter
- Clean, intuitive navigation

## Tech Stack

- **Framework**: Nuxt 3
- **Language**: TypeScript
- **Styling**: Native CSS (no CSS frameworks)
- **API**: [PokéAPI](https://pokeapi.co/)
- **Rendering**: Server-side rendering (SSR) with `useAsyncData`

## Project Structure

```
pokemon-viewer/
├── pages/
│   ├── index.vue           # Landing page with grid and search
│   └── [id].vue            # Profile page for individual Pokémon
├── composables/
│   ├── usePokemon.ts       # API fetching and data transformation
│   └── usePokemonTypes.ts  # Type color mapping utilities
```

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Implementation Highlights

### Type System

- Fully typed with TypeScript interfaces
- Type-safe API responses with `PokemonDetail` and `Pokemon` interfaces
- Proper transformation from API format to internal data structure

### Performance

- Parallel fetching of Pokémon details for optimal load times
- SSR-compatible data fetching with `useAsyncData`
- Efficient filtering with computed properties

## API Integration

Data is fetched from the [PokéAPI](https://pokeapi.co/):

- **Pokémon List**: `/api/v2/pokemon?limit=60`
- **Pokémon Details**: `/api/v2/pokemon/{id}`

All API responses are transformed into a simplified internal format for easier component consumption.

## Creative Enhancements

Beyond the core requirements, the application includes enhanced visualization features:

- **Type Badges**: Color-coded type indicators using official Pokémon type colors across all 18 types, displayed on both the grid and profile pages
- **Stats Visualization**: Interactive progress bars for all six base stats (HP, Attack, Defense, Sp. Attack, Sp. Defense, Speed) with dynamic color coding based on stat values, providing immediate visual feedback on a Pokémon's strengths and weaknesses
