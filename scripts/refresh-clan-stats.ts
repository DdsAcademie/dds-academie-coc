/**
 * Script à lancer en local (machine avec IP whitelistée dans la clé COC).
 * Récupère les données des 3 clans via l'API COC et les stocke dans Supabase.
 *
 * Usage : npx tsx scripts/refresh-clan-stats.ts
 */
import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

// Charger .env.local
const env = readFileSync('.env.local', 'utf-8')
for (const line of env.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eqIdx = trimmed.indexOf('=')
  if (eqIdx === -1) continue
  const key = trimmed.slice(0, eqIdx).trim()
  const val = trimmed.slice(eqIdx + 1).trim()
  process.env[key] = val
}

const CLAN_TAGS = ['#2RJJJ2V09', '#8CLGGL8V', '#99UPQRLJ']

async function main() {
  const cocKey = process.env.COC_API_KEY!
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  console.log('Récupération des données COC...\n')

  for (const tag of CLAN_TAGS) {
    const res = await fetch(
      `https://api.clashofclans.com/v1/clans/${encodeURIComponent(tag)}`,
      { headers: { Authorization: `Bearer ${cocKey}` } }
    )

    if (!res.ok) {
      console.error(`✗ ${tag} → HTTP ${res.status}`)
      continue
    }

    const clan = await res.json()

    const { error } = await supabase
      .from('clan_stats')
      .upsert(
        {
          tag: clan.tag,
          name: clan.name,
          members: clan.members,
          clan_level: clan.clanLevel ?? 0,
          war_league: clan.warLeague?.name ?? 'Non classé',
          war_wins: clan.warWins ?? 0,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'tag' }
      )

    if (error) {
      console.error(`✗ Supabase ${tag}:`, error.message)
    } else {
      console.log(`✓ ${clan.name.padEnd(20)} ${clan.members} membres  |  ${clan.warLeague?.name ?? 'Non classé'}`)
    }
  }

  console.log('\nTerminé.')
}

main().catch(console.error)
