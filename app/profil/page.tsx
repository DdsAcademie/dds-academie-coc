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

const CLAN_COLORS: Record<string, { primary: string; rgb: string }> = {
  '#2RJJJ2V09': { primary: '#4a9eff', rgb: '74,158,255' },
  '#8CLGGL8V':  { primary: '#ff8c00', rgb: '255,140,0' },
  '#99UPQRLJ':  { primary: '#9b59ff', rgb: '155,89,255' },
}

interface Player {
  id: string
  pseudo: string
  tag: string
  clanTag: string
  isAdmin: boolean
  isSuperAdmin: boolean
  firstLogin: boolean
  hdvLevel: number
  league: string
  trophies: number
  bestTrophies: number
  expLevel: number
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
        const p = data.player
        if (p.firstLogin) {
          router.push('/first-login')
          return
        }
        setPlayer(p)
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
        <Navbar player={{
          pseudo: player.pseudo,
          clanTag: player.clanTag,
          isAdmin: player.isAdmin,
          isSuperAdmin: player.isSuperAdmin,
        }} />
        <main style={{ paddingTop: '80px', padding: '80px 2rem 2rem', maxWidth: '900px', margin: '0 auto' }}>

          <PlayerStatsHeader
            player={player}
            clanColor={clanColor}
            clanName={CLAN_NAMES[player.clanTag] || 'DDS Cluster'}
          />

          <ChangePasswordForm clanColor={clanColor} />

        </main>
      </div>
    </>
  )
}
