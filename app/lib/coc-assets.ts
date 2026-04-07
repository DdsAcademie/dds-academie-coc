const SUPABASE_STORAGE = 'https://khwjpdbckcgurxzawxie.supabase.co/storage/v1/object/public/coc-assets'

/**
 * Retourne l'URL de l'image HDV selon le niveau
 * Les fichiers s'appellent : Building_HV_Town_Hall_level_X.png
 */
export function getHdvImageUrl(level: number): string {
  const clampedLevel = Math.min(Math.max(level, 1), 17)
  return `${SUPABASE_STORAGE}/hdv/Building_HV_Town_Hall_level_${clampedLevel}.png`
}

/**
 * Retourne l'URL de l'image de ligue
 * L'API COC retourne des noms comme "Legend League", "Titan League I", etc.
 */
export function getLeagueImageUrl(leagueName: string): string {
  if (!leagueName || leagueName === 'Non classé') {
    return `${SUPABASE_STORAGE}/ligues/no-league.png`
  }

  const fileName = leagueName.replace(/ /g, '_') + '.png'
  return `${SUPABASE_STORAGE}/ligues/${fileName}`
}

/**
 * Retourne le nom court de la ligue
 */
export function getLeagueShortName(leagueName: string): string {
  if (!leagueName || leagueName === 'Non classé') return 'Non classé'
  return leagueName.split(' ').slice(0, 2).join(' ')
}
