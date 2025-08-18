import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

Deno.serve(async (req: Request) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 15);

  const { error } = await supabase
    .from('user_sessions')
    .delete()
    .lt('created_at', cutoff.toISOString());

  return new Response(
    JSON.stringify({ 
      success: !error,
      message: error ? error.message : 'Cleanup completed',
      deleted_before: cutoff.toISOString()
    }),
    { headers: { 'Content-Type': 'application/json' }}
  );
});