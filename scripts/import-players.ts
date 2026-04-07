/**
 * Script d'import des joueurs depuis l'API COC vers Supabase
 * Lance depuis ta machine locale : npx tsx scripts/import-players.ts
 *
 * Ce script :
 * 1. Récupère la liste des membres des 3 clans via l'API COC
 * 2. Pour chaque membre, crée un compte dans Supabase si inexistant
 * 3. Met à jour les infos si le joueur existe déjà
 * 4. Le mot de passe par défaut est le tag du joueur (ex: #9J8Y0QYC0)
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as bcrypt from 'bcryptjs'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const COC_API_KEY = process.env.COC_API_KEY!
const COC_API_BASE = 'https://api.clashofclans.com/v1'

const CLANS = [
  { tag: '#2RJJJ2V09', name: 'DDS Académie' },
  { tag: '#8CLGGL8V',  name: 'OpenSys' },
  { tag: '#99UPQRLJ',  name: 'いえすぽす' },
]

function encodeTag(tag: string): string {
  return encodeURIComponent(tag.startsWith('#') ? tag : `#${tag}`)
}

async function getClanMembers(clanTag: string) {
  const response = await fetch(
    `${COC_API_BASE}/clans/${encodeTag(clanTag)}/members`,
    {
      headers: {
        'Authorization': `Bearer ${COC_API_KEY}`,
      }
    }
  )
  if (!response.ok) {
    throw new Error(`Erreur API COC ${clanTag}: ${response.status}`)
  }
  const data = await response.json()
  return data.items || []
}

async function getPlayerDetail(playerTag: string) {
  const response = await fetch(
    `${COC_API_BASE}/players/${encodeTag(playerTag)}`,
    {
      headers: {
        'Authorization': `Bearer ${COC_API_KEY}`,
      }
    }
  )
  if (!response.ok) return null
  return response.json()
}

async function importPlayers() {
  console.log('🚀 Début de l\'import des joueurs...\n')

  for (const clan of CLANS) {
    console.log(`📋 Traitement du clan : ${clan.name} (${clan.tag})`)

    let members
    try {
      members = await getClanMembers(clan.tag)
      console.log(`   ${members.length} membres trouvés`)
    } catch (error) {
      console.error(`   ❌ Erreur: ${error}`)
      continue
    }

    for (const member of members) {
      try {
        // Récupérer les détails du joueur
        const playerDetail = await getPlayerDetail(member.tag)

        // Hash du mot de passe par défaut (le tag du joueur)
        const defaultPassword = member.tag // ex: #9J8Y0QYC0
        const passwordHash = await bcrypt.hash(defaultPassword, 10)

        const playerData = {
          tag: member.tag,
          pseudo: member.name,
          clan_tag: clan.tag,
          password_hash: passwordHash,
          hdv_level: member.townHallLevel || 0,
          league: member.league?.name || 'Non classé',
          trophies: member.trophies || 0,
          best_trophies: playerDetail?.bestTrophies || member.trophies || 0,
          exp_level: member.expLevel || 0,
          role: { member: 'membre', elder: 'ancien', coLeader: 'co-chef', leader: 'chef' }[member.role as string] || 'membre',
          dons: member.donations || 0,
          updated_at: new Date().toISOString(),
        }

        // Upsert : crée si n'existe pas, met à jour si existe
        const { error } = await supabase
          .from('players')
          .upsert(playerData, {
            onConflict: 'tag',
            ignoreDuplicates: false,
          })

        if (error) {
          console.error(`   ❌ Erreur pour ${member.name} (${member.tag}):`, error.message)
        } else {
          console.log(`   ✅ ${member.name} (${member.tag}) — importé`)
        }

        // Petite pause pour éviter le rate limiting
        await new Promise(resolve => setTimeout(resolve, 100))

      } catch (error) {
        console.error(`   ❌ Erreur pour ${member.tag}:`, error)
      }
    }

    console.log(`\n`)
  }

  console.log('✅ Import terminé !')
}

importPlayers().catch(console.error)
