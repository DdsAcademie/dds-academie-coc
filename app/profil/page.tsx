'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AnimatedBackground from '@/app/components/AnimatedBackground'
import Navbar from '@/app/components/Navbar'
import ChangePasswordForm from '@/app/components/ChangePasswordForm'
import PlayerStatsHeader from '@/app/components/PlayerStatsHeader'

const CLAN_NAMES: Record<string, string> = {
  '#2RJJJ2V09': 'DDS Académie',
  '#8CLGGL8V': 'OpenSys',
  '#99UPQRLJ': 'いえすぽす',
}

// Couleurs par clan
const CLAN_COLORS: Record<string, { primary: string; rgb: string }> = {
  '#2RJJJ2V09': { primary: '#4a9eff', rgb: '74,158,255' },   // DDS Académie → bleu
  '#8CLGGL8V':  { primary: '#ff8c00', rgb: '255,140,0' },    // OpenSys → orange
  '#99UPQRLJ':  { primary: '#9b59ff', rgb: '155,89,255' },   // いえすぽす → violet
}

interface Player {
  id: string
  pseudo: string
  tag: string
  clanTag: string
  clan_tag: string
  isAdmin: boolean
  is_admin: boolean
  firstLogin: boolean
  first_login: boolean
  hdvLevel: number
  hdv_level: number
  league: string
  trophies: number
  bestTrophies: number
  best_trophies: number
  expLevel: number
  exp_level: number
  role: string
  dons: number
}

export default function ProfilPage() {
  const router = useRouter()
  const [player, setPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => {
        if (!data.player) {
          router.push('/')
          return
        }
        // Supabase retourne snake_case, normaliser
        const p = data.player
        const normalized = {
          ...p,
          clanTag: p.clan_tag ?? p.clanTag,
          isAdmin: p.is_admin ?? p.isAdmin,
          firstLogin: p.first_login ?? p.firstLogin,
          hdvLevel: p.hdv_level ?? p.hdvLevel,
          bestTrophies: p.best_trophies ?? p.bestTrophies,
          expLevel: p.exp_level ?? p.expLevel,
        }
        if (normalized.firstLogin) {
          router.push('/first-login')
          return
        }
        setPlayer(normalized)
        setLoading(false)
      })
  }, [router])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#030712' }}>
        <div style={{ color: '#c8a84b', fontSize: '14px', letterSpacing: '2px' }}>CHARGEMENT...</div>
      </div>
    )
  }

  if (!player) return null

  const clanColor = CLAN_COLORS[player.clanTag] || { primary: '#c8a84b', rgb: '200,168,75' }

  return (
    <>
      <AnimatedBackground primaryColor={clanColor.rgb} />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Navbar player={player} />
        <main style={{ paddingTop: '80px', padding: '80px 2rem 2rem', maxWidth: '900px', margin: '0 auto' }}>

          {/* HEADER PROFIL — Stats avec assets COC */}
          <PlayerStatsHeader
            player={player}
            clanColor={clanColor}
            clanName={CLAN_NAMES[player.clanTag] || 'DDS Cluster'}
          />

          {/* SECTION CHANGEMENT DE MOT DE PASSE */}
          <ChangePasswordForm clanColor={clanColor} />

        </main>
      </div>
    </>
  )
}
