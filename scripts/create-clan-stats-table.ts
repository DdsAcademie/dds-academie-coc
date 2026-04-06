import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const env = readFileSync('.env.local', 'utf-8')
for (const line of env.split('\n')) {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
}

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: 'public' } }
  )

  // Créer la table clan_stats via SQL brut
  const sql = `
    CREATE TABLE IF NOT EXISTS clan_stats (
      tag        TEXT PRIMARY KEY,
      name       TEXT NOT NULL DEFAULT '',
      members    INTEGER NOT NULL DEFAULT 0,
      clan_level INTEGER NOT NULL DEFAULT 0,
      war_league TEXT NOT NULL DEFAULT 'Non classé',
      war_wins   INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    ALTER TABLE clan_stats ENABLE ROW LEVEL SECURITY;

    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'clan_stats' AND policyname = 'Lecture publique'
      ) THEN
        CREATE POLICY "Lecture publique" ON clan_stats FOR SELECT USING (true);
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'clan_stats' AND policyname = 'Upsert service role'
      ) THEN
        CREATE POLICY "Upsert service role" ON clan_stats FOR ALL USING (true) WITH CHECK (true);
      END IF;
    END $$;
  `

  const { error } = await (supabase as any).rpc('exec_sql', { query: sql })
  if (error) {
    // fallback: essayer via l'API REST postgres
    console.log('rpc non disponible, tentative via API postgres directe...')
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`,
      { headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY! } }
    )
    console.log('Status API:', res.status)
    console.error('Erreur:', error.message)
    console.log('\nExecute ce SQL manuellement dans Supabase SQL Editor:')
    console.log(sql)
    return
  }

  console.log('✓ Table clan_stats créée')
}

main().catch(console.error)
