# PROMPT — Nouveau système de ligues COC 2025 (V8)

## Contexte

Supercell a remplacé l'ancien système de ligues en octobre 2025.
L'API COC retourne maintenant les IDs `440000xx` pour les nouvelles ligues.
Les IDs `290000xx` (Bronze, Silver, Gold, etc.) sont obsolètes.

Ce prompt met à jour tout le code lié aux ligues.

---

## TÂCHE 1 — Mettre à jour app/lib/coc-assets.ts

Remplacer complètement le contenu de ce fichier :

```typescript
const SUPABASE_STORAGE = 'https://khwjpdbckcgurxzawxie.supabase.co/storage/v1/object/public/coc-assets'

// ============================================================
// NOUVEAU SYSTÈME DE LIGUES COC (Octobre 2025)
// IDs 440000xx — Les anciens IDs 290000xx sont obsolètes
// ============================================================

// Ordre de priorité pour les classements (1 = meilleur)
export const LEAGUE_ORDER: Record<number, number> = {
  44000036: 1,  // Legend
  44000035: 2,  // Electro 33
  44000034: 3,  // Electro 32
  44000033: 4,  // Electro 31
  44000032: 5,  // Dragon 30
  44000031: 6,  // Dragon 29
  44000030: 7,  // Dragon 28
  44000029: 8,  // Titan 27
  44000028: 9,  // Titan 26
  44000027: 10, // Titan 25
  44000026: 11, // P.E.K.K.A 24
  44000025: 12, // P.E.K.K.A 23
  44000024: 13, // P.E.K.K.A 22
  44000023: 14, // Golem 21
  44000022: 15, // Golem 20
  44000021: 16, // Golem 19
  44000020: 17, // Witch 18
  44000019: 18, // Witch 17
  44000018: 19, // Witch 16
  44000017: 20, // Valkyrie 15
  44000016: 21, // Valkyrie 14
  44000015: 22, // Valkyrie 13
  44000014: 23, // Wizard 12
  44000013: 24, // Wizard 11
  44000012: 25, // Wizard 10
  44000011: 26, // Archer 9
  44000010: 27, // Archer 8
  44000009: 28, // Archer 7
  44000008: 29, // Barbarian 6
  44000007: 30, // Barbarian 5
  44000006: 31, // Barbarian 4
  44000005: 32, // Skeleton 3
  44000004: 33, // Skeleton 2
  44000003: 34, // Skeleton 1
  44000000: 35, // Unranked
}

// Couleurs associées aux ligues
export const LEAGUE_COLORS: Record<number, string> = {
  44000036: '#ff6600', // Legend    → orange feu
  44000035: '#00bfff', // Electro 33 → bleu glacé
  44000034: '#00bfff', // Electro 32
  44000033: '#00bfff', // Electro 31
  44000032: '#8b008b', // Dragon 30  → violet
  44000031: '#8b008b', // Dragon 29
  44000030: '#8b008b', // Dragon 28
  44000029: '#e0e0e0', // Titan 27   → blanc glacé
  44000028: '#e0e0e0', // Titan 26
  44000027: '#e0e0e0', // Titan 25
  44000026: '#6a0dad', // P.E.K.K.A 24 → violet foncé
  44000025: '#6a0dad', // P.E.K.K.A 23
  44000024: '#6a0dad', // P.E.K.K.A 22
  44000023: '#808080', // Golem 21   → gris
  44000022: '#808080', // Golem 20
  44000021: '#808080', // Golem 19
  44000020: '#9400d3', // Witch 18   → violet
  44000019: '#9400d3', // Witch 17
  44000018: '#9400d3', // Witch 16
  44000017: '#ff4500', // Valkyrie 15 → orange-rouge
  44000016: '#ff4500', // Valkyrie 14
  44000015: '#ff4500', // Valkyrie 13
  44000014: '#4169e1', // Wizard 12  → bleu royal
  44000013: '#4169e1', // Wizard 11
  44000012: '#4169e1', // Wizard 10
  44000011: '#ff69b4', // Archer 9   → rose
  44000010: '#ff69b4', // Archer 8
  44000009: '#ff69b4', // Archer 7
  44000008: '#cd7f32', // Barbarian 6 → bronze doré
  44000007: '#cd7f32', // Barbarian 5
  44000006: '#cd7f32', // Barbarian 4
  44000005: '#a0522d', // Skeleton 3  → marron bronze
  44000004: '#a0522d', // Skeleton 2
  44000003: '#a0522d', // Skeleton 1
  44000000: '#666666', // Unranked    → gris
}

// IDs des anciennes ligues obsolètes (à ignorer)
const OBSOLETE_LEAGUE_IDS = new Set([
  29000000, 29000001, 29000002, 29000003, 29000004,
  29000005, 29000006, 29000007, 29000008, 29000009,
  29000010, 29000011, 29000012, 29000013, 29000014,
  29000015, 29000016, 29000017, 29000018, 29000019,
  29000020, 29000021, 29000022,
])

// ============================================================
// FONCTIONS UTILITAIRES
// ============================================================

/**
 * Image HDV depuis Supabase Storage
 * Fichiers : Building_HV_Town_Hall_level_1.png → level_18.png
 */
export function getHdvImageUrl(level: number): string {
  const clampedLevel = Math.min(Math.max(level, 1), 18)
  return `${SUPABASE_STORAGE}/hdv/Building_HV_Town_Hall_level_${clampedLevel}.png`
}

/**
 * Icône de ligue — utilise directement l'URL fournie par l'API Supercell
 * Plus besoin de nos assets Supabase pour les ligues !
 *
 * @param league - Objet ligue retourné par l'API COC
 *   { id: number, name: string, iconUrls: { small: string, medium: string } }
 */
export function getLeagueIconUrl(league: {
  id?: number
  name?: string
  iconUrls?: { small?: string; medium?: string }
} | null | undefined): string | null {
  if (!league) return null
  if (OBSOLETE_LEAGUE_IDS.has(league.id ?? 0)) return null
  return league.iconUrls?.medium || league.iconUrls?.small || null
}

/**
 * Nom d'affichage de la ligue
 * Retourne "Non classé" si la ligue est obsolète ou absente
 */
export function getLeagueDisplayName(league: {
  id?: number
  name?: string
} | null | undefined): string {
  if (!league || !league.name) return 'Non classé'
  if (OBSOLETE_LEAGUE_IDS.has(league.id ?? 0)) return 'Non classé'
  return league.name
}

/**
 * Couleur de la ligue
 */
export function getLeagueColor(leagueId: number | undefined): string {
  return LEAGUE_COLORS[leagueId ?? 44000000] ?? '#666666'
}

/**
 * Vérifie si une ligue est obsolète
 */
export function isObsoleteLeague(leagueId: number | undefined): boolean {
  return OBSOLETE_LEAGUE_IDS.has(leagueId ?? 0)
}
```

---

## TÂCHE 2 — Mettre à jour scripts/import-players.ts

Stocker l'ID et l'URL d'icône de la ligue en base de données.

### 2.1 Ajouter des colonnes à la table players (SQL Supabase)

Exécuter dans le dashboard Supabase :

```sql
ALTER TABLE players
  ADD COLUMN IF NOT EXISTS league_id INTEGER NOT NULL DEFAULT 44000000,
  ADD COLUMN IF NOT EXISTS league_icon_url TEXT NOT NULL DEFAULT '';
```

### 2.2 Mettre à jour le script d'import

```typescript
const leagueData = member.league || null
const leagueId = leagueData?.id ?? 44000000
const leagueName = leagueData?.name ?? 'Non classé'
const leagueIconUrl = leagueData?.iconUrls?.medium 
  || leagueData?.iconUrls?.small 
  || ''

// Ignorer les anciennes ligues
const OBSOLETE_IDS = new Set([29000000,29000001,29000002,29000003,29000004,
  29000005,29000006,29000007,29000008,29000009,29000010,29000011,29000012,
  29000013,29000014,29000015,29000016,29000017,29000018,29000019,29000020,
  29000021,29000022])

const finalLeagueName = OBSOLETE_IDS.has(leagueId) ? 'Non classé' : leagueName
const finalLeagueId = OBSOLETE_IDS.has(leagueId) ? 44000000 : leagueId
const finalLeagueIconUrl = OBSOLETE_IDS.has(leagueId) ? '' : leagueIconUrl

const playerData = {
  tag: member.tag,
  pseudo: member.name,
  clan_tag: clan.tag,
  password_hash: passwordHash,
  hdv_level: member.townHallLevel || 1,
  league: finalLeagueName,
  league_id: finalLeagueId,
  league_icon_url: finalLeagueIconUrl,
  trophies: member.trophies || 0,
  best_trophies: playerDetail?.bestTrophies || member.trophies || 0,
  exp_level: member.expLevel || 0,
  role: { member: 'membre', elder: 'ancien', coLeader: 'co-chef', leader: 'chef' }[member.role as string] || 'membre',
  dons: member.donations || 0,
  is_admin: member.role === 'leader' || member.role === 'coLeader',
  updated_at: new Date().toISOString(),
}
```

---

## TÂCHE 3 — Mettre à jour PlayerStatsHeader.tsx

Utiliser les icônes directement depuis l'URL stockée en base (fournie par Supercell).

```tsx
'use client'

import { useState } from 'react'
import { getHdvImageUrl, getLeagueColor } from '@/app/lib/coc-assets'

// Composant image avec fallback texte propre
function AssetImage({
  src,
  alt,
  size = 64,
  fallbackText,
}: {
  src: string | null
  alt: string
  size?: number
  fallbackText: string
}) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div style={{
        width: size, height: size,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 0.5rem',
        color: '#6677aa', fontSize: '11px', textAlign: 'center', lineHeight: 1.3,
      }}>
        {fallbackText}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: size, height: size,
        objectFit: 'contain',
        display: 'block',
        margin: '0 auto 0.5rem',
      }}
      onError={() => setError(true)}
    />
  )
}

// Dans le composant principal, pour la carte ligue :
// Utiliser player.leagueIconUrl (URL directe Supercell) au lieu de getLeagueImageUrl
// Et player.leagueId pour la couleur

interface PlayerStatsHeaderProps {
  player: {
    pseudo: string
    tag: string
    clanTag: string
    hdvLevel: number
    league: string        // nom de la ligue
    leagueId?: number     // ID de la ligue (nouveau champ)
    leagueIconUrl?: string // URL icône Supercell (nouveau champ)
    trophies: number
    bestTrophies: number
    expLevel: number
    role: string
    dons?: number
  }
  clanColor: { primary: string; rgb: string }
  clanName: string
}

// Dans le JSX — carte HDV :
// <AssetImage src={getHdvImageUrl(player.hdvLevel)} alt={`HDV ${player.hdvLevel}`} fallbackText={`HDV ${player.hdvLevel}`} />

// Dans le JSX — carte Ligue :
// <AssetImage src={player.leagueIconUrl || null} alt={player.league} fallbackText={player.league} />
// <div style={{ color: getLeagueColor(player.leagueId), fontSize: '14px', fontWeight: 700 }}>
//   {player.league || 'Non classé'}
// </div>
```

---

## TÂCHE 4 — Mettre à jour app/api/auth/me/route.ts

Inclure les nouveaux champs dans la réponse :

```typescript
return NextResponse.json({
  player: {
    id: player.id,
    pseudo: player.pseudo,
    tag: player.tag,
    clanTag: player.clan_tag,
    isAdmin: player.is_admin,
    isSuperAdmin: player.is_superadmin,
    firstLogin: player.first_login,
    hdvLevel: player.hdv_level,
    league: player.league,
    leagueId: player.league_id,           // NOUVEAU
    leagueIconUrl: player.league_icon_url, // NOUVEAU
    trophies: player.trophies,
    bestTrophies: player.best_trophies,
    expLevel: player.exp_level,
    role: player.role,
    dons: player.dons,
  }
})
```

---

## ORDRE D'EXÉCUTION

1. Exécuter le SQL dans Supabase dashboard (TÂCHE 2.1)
2. Mettre à jour `app/lib/coc-assets.ts` (TÂCHE 1)
3. Mettre à jour `scripts/import-players.ts` (TÂCHE 2.2)
4. Mettre à jour `app/components/PlayerStatsHeader.tsx` (TÂCHE 3)
5. Mettre à jour `app/api/auth/me/route.ts` (TÂCHE 4)
6. Build : `npm run build`
7. Push : `git add . && git commit -m "feat: nouveau système ligues COC 2025, icônes Supercell directes" && git push`
8. Relancer l'import local : `npx tsx scripts/import-players.ts`

---

## RÉSULTAT ATTENDU

- Icônes de ligues depuis Supercell directement (toujours à jour)
- Anciennes ligues (Bronze, Silver, Legend...) → "Non classé"
- Couleurs correctes par famille de ligue
- HDV18 correctement affiché avec son image
- Ordre de tri des ligues prêt pour les classements futurs
