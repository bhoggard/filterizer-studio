# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Sanity Studio instance for "Filterizer" - a content management system for tracking events, venues, and neighborhoods. The project uses Sanity v4 with TypeScript and React.

**Sanity Project Details:**
- Project ID: `ng5yto4p`
- Dataset: `production`
- Studio Host: `filterizer`

## Development Commands

```bash
# Start development server
yarn dev

# Build the studio for production
yarn build

# Deploy the studio to Sanity hosting
yarn deploy

# Deploy GraphQL API
yarn deploy-graphql

# Generate TypeScript types from schemas
sanity typegen generate
```

## Architecture

### Content Schema

The studio defines three interconnected content types located in `/schemaTypes/`:

1. **Neighborhood** (`neighborhoodType.ts`) - Base geographical unit
   - Simple document with a name field

2. **Venue** (`venueType.ts`) - Physical locations
   - References a neighborhood
   - Includes name, address, and website (required)
   - Website validation requires http/https schemes

3. **Event** (`eventType.ts`) - Time-based occurrences
   - References a venue
   - Uses date fields with America/New_York timezone for display
   - Start and end dates are required

Schema types are aggregated in `schemaTypes/index.ts` and imported into `sanity.config.ts`.

### Type Generation

TypeScript types are auto-generated from schemas:
- Configuration: `sanity-typegen.json`
- Generated types: `src/sanity/types.ts` (DO NOT EDIT MANUALLY)
- Run `sanity typegen generate` after schema changes

### Configuration Files

- `sanity.config.ts` - Main Sanity Studio configuration with plugins (structureTool, visionTool)
- `sanity.cli.ts` - CLI configuration with deployment settings and auto-updates enabled
- `tsconfig.json` - TypeScript compiler settings (ES2017 target, strict mode)
- `eslint.config.mjs` - Uses `@sanity/eslint-config-studio`

### Prettier Configuration

Project uses Prettier with custom settings (defined in package.json):
- No semicolons
- 100 character print width
- No bracket spacing
- Single quotes

## Important Notes

- All date fields use `America/New_York` timezone for display purposes
- Auto-updates are enabled for the studio deployment
- The project uses Yarn with Yarn Berry (v3+) as indicated by `.yarnrc.yml`
- When modifying schemas, always run `sanity typegen generate` to update TypeScript types
