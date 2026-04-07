'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AnimatedBackground from '@/app/components/AnimatedBackground'
import Navbar from '@/app/components/Navbar'
import ChangePasswordForm from '@/app/components/ChangePasswordForm'

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

          {/* HEADER PROFIL — Stats de base */}
          <div style={{
            background: `rgba(${clanColor.rgb}, 0.06)`,
            border: `1px solid rgba(${clanColor.rgb}, 0.2)`,
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Ligne lumineuse en haut */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: '60%', height: '1px',
              background: `linear-gradient(to right, transparent, ${clanColor.primary}, transparent)`,
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
              {/* Avatar placeholder */}
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: `rgba(${clanColor.rgb}, 0.15)`,
                border: `2px solid rgba(${clanColor.rgb}, 0.4)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', flexShrink: 0,
              }}>
                ⚔
              </div>
              <div>
                <div style={{ color: clanColor.primary, fontSize: '22px', fontWeight: 700 }}>
                  {player.pseudo}
                </div>
                <div style={{ color: '#6677aa', fontSize: '12px', letterSpacing: '1.5px' }}>
                  {player.tag}
                </div>
              </div>
            </div>

            {/* Grille de stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '1rem',
            }}>
              {[
                { label: 'HDV', value: player.hdvLevel },
                { label: 'TROPHÉES', value: player.trophies?.toLocaleString() },
                { label: 'MEILLEURS TROPHÉES', value: player.bestTrophies?.toLocaleString() },
                { label: 'NIVEAU EXP', value: player.expLevel },
                { label: 'LIGUE', value: player.league || 'Non classé' },
                { label: 'RÔLE', value: player.role },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '10px',
                  padding: '0.875rem',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>
                    {stat.value}
                  </div>
                  <div style={{ color: '#6677aa', fontSize: '9px', letterSpacing: '1.5px', marginTop: '2px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION CHANGEMENT DE MOT DE PASSE */}
          <ChangePasswordForm clanColor={clanColor} />

        </main>
      </div>
    </>
  )
}
