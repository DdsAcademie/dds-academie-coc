const SUPABASE_STORAGE = 'https://khwjpdbckcgurxzawxie.supabase.co/storage/v1/object/public/coc-assets'

// Nouvelles ligues uniquement
const NEW_LEAGUE_MAP: Record<string, string> = {
  'Barbarian League':     'LB_big_barb.png',
  'Archer League':        'LB_big_archer.png',
  'Valkyrie League':      'LB_big_valyrie.png',
  'Witch League':         'LB_big_witch.png',
  'Golem League':         'LB_big_golem.png',
  'P.E.K.K.A League':    'LB_big_pekka.png',
  'Wizard League':        'LB_big_wizard.png',
  'Dragon League':        'LB_big_dragon1.png',
  'Ice Dragon League':    'LB_big_dragon2.png',
  'Legend Dragon League': 'LB_big_dragon3.png',
  'Titan League':         'LB_big_titan.png',
}

// Anciennes ligues obsolètes — à ignorer
const OBSOLETE_LEAGUES = [
  'Bronze League I', 'Bronze League II', 'Bronze League III',
  'Silver League I', 'Silver League II', 'Silver League III',
  'Gold League I', 'Gold League II', 'Gold League III',
  'Crystal League I', 'Crystal League II', 'Crystal League III',
  'Master League I', 'Master League II', 'Master League III',
  'Champion League I', 'Champion League II', 'Champion League III',
  'Titan League I', 'Titan League II', 'Titan League III',
  'Legend League',
]

/**
 * Retourne l'URL de l'image HDV selon le niveau (1–18)
 */
export function getHdvImageUrl(level: number): string {
  const clampedLevel = Math.min(Math.max(level, 1), 18)
  return `${SUPABASE_STORAGE}/hdv/Building_HV_Town_Hall_level_${clampedLevel}.png`
}

/**
 * Retourne l'URL de l'image de ligue (nouveau système)
 * Les ligues obsolètes et absentes → skeleton
 */
export function getLeagueImageUrl(leagueName: string): string {
  if (!leagueName || OBSOLETE_LEAGUES.includes(leagueName)) {
    return `${SUPABASE_STORAGE}/ligues/LB_big_skeleton.png`
  }
  const fileName = NEW_LEAGUE_MAP[leagueName] || 'LB_big_skeleton.png'
  return `${SUPABASE_STORAGE}/ligues/${fileName}`
}

/**
 * Retourne le nom affiché de la ligue
 * Les ligues obsolètes → "Non classé"
 */
export function getLeagueDisplayName(leagueName: string): string {
  if (!leagueName || OBSOLETE_LEAGUES.includes(leagueName)) {
    return 'Non classé'
  }
  return leagueName
}

export function isObsoleteLeague(leagueName: string): boolean {
  return OBSOLETE_LEAGUES.includes(leagueName)
}
