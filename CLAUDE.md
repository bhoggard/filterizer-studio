# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Sanity Studio instance for "Filterizer" - a content management system for tracking events, venues, and neighborhoods. The project uses Sanity Studio v6 with TypeScript and React 19.

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

# Deploy the schema manifest (required for Dashboard / Content Agent)
yarn deploy-schema

# Generate TypeScript types from schemas
yarn typegen
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
   - Uses `date` fields (no time component, so no timezone applies)
   - Start and end dates are required

Schema types are aggregated in `schemaTypes/index.ts` and imported into `sanity.config.ts`.

### Type Generation

TypeScript types are auto-generated from schemas:
- Configuration: `sanity-typegen.json`
- Generated types: `src/sanity/types.ts` (DO NOT EDIT MANUALLY)
- Run `yarn typegen` (`sanity schema extract` + `sanity typegen generate`) after schema changes

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

- Requires Node.js >= 22.12 (Sanity Studio v6 / Sanity CLI baseline)
- Icons must be imported from their own subpath (`@sanity/icons/Calendar`), not the
  `@sanity/icons` root entry, which stopped exporting individual icons in v5
- `@sanity/ui` v4 renamed the `space` prop on layout components (`Stack`, `Flex`, `Grid`,
  `Inline`) to `gap`
- Auto-updates are enabled for the studio deployment
- The project uses Yarn with Yarn Berry (v3+) as indicated by `.yarnrc.yml`
- When modifying schemas, always run `yarn typegen` to update TypeScript types
- After a schema change, run `yarn deploy` (then open the hosted Studio once) or
  `yarn deploy-schema` so Dashboard features such as Content Agent see the current schema
