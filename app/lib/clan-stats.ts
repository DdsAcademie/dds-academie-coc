import { createClient } from '@supabase/supabase-js'

export interface ClanStat {
  tag: string
  name: string
  members: number
  clan_level: number
  war_league: string
  war_wins: number
  updated_at: string
}

const FALLBACK: ClanStat[] = [
  { tag: '#2RJJJ2V09', name: 'DDS Académie', members: 0, clan_level: 0, war_league: 'Non classé', war_wins: 0, updated_at: '' },
  { tag: '#8CLGGL8V',  name: 'OpenSys',      members: 0, clan_level: 0, war_league: 'Non classé', war_wins: 0, updated_at: '' },
  { tag: '#99UPQRLJ',  name: 'いえすぽす',   members: 0, clan_level: 0, war_league: 'Non classé', war_wins: 0, updated_at: '' },
]

export async function getAllClanStats(): Promise<ClanStat[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabase
      .from('clan_stats')
      .select('*')
      .in('tag', ['#2RJJJ2V09', '#8CLGGL8V', '#99UPQRLJ'])

    if (error || !data || data.length === 0) {
      console.warn('clan_stats vide ou erreur, utilisation du fallback:', error?.message)
      return FALLBACK
    }

    // Retourner dans l'ordre des tags
    const order = ['#2RJJJ2V09', '#8CLGGL8V', '#99UPQRLJ']
    return order.map(tag => data.find(c => c.tag === tag) ?? FALLBACK.find(c => c.tag === tag)!)
  } catch (e) {
    console.error('getAllClanStats error:', e)
    return FALLBACK
  }
}
