# Supabase Configuration

## Structure
- `functions/` - Edge Functions
- `migrations/` - Database migrations
- `types/` - TypeScript type definitions

## Edge Functions
- `supabase-edge-cleanup.ts` - Cleanup function for old analytics data

## Setup
1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link project: `supabase link --project-ref YOUR_PROJECT_ID`
4. Deploy functions: `supabase functions deploy cleanup`