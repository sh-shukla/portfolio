# Database Documentation

## Structure
- `migrations/` - Database schema and migration files
- `functions/` - Database functions and procedures  
- `policies/` - Row Level Security policies
- `seeds/` - Sample data for development

## Files
- `enhanced-tables.sql` - Main table schema
- `supabase-lifecycle-policy-fixed.sql` - Auto-cleanup policies (15 days)
- `supabase-auto-cleanup.sql` - Cleanup triggers
- `check-lifecycle-policy.sql` - Policy verification queries

## Setup
1. Run `enhanced-tables.sql` first
2. Apply `supabase-lifecycle-policy-fixed.sql` for auto-cleanup
3. Verify with `check-lifecycle-policy.sql`