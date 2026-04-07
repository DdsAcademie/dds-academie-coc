'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AnimatedBackground from '@/app/components/AnimatedBackground'
import Navbar from '@/app/components/Navbar'

interface Player {
  id: string
  pseudo: string
  tag: string
  clan_tag: string
  is_admin: boolean
  is_superadmin: boolean
  first_login: boolean
  hdv_level: number
  league: string
  trophies: number
  role: string
}

const CLAN_NAMES: Record<string, string> = {
  '#2RJJJ2V09': 'DDS Académie',
  '#8CLGGL8V': 'OpenSys',
  '#99UPQRLJ': 'いえすぽす',
}

const CLAN_COLORS: Record<string, string> = {
  '#2RJJJ2V09': '#4a9eff',
  '#8CLGGL8V': '#ff8c00',
  '#99UPQRLJ': '#9b59ff',
}

export default function AdminPage() {
  const router = useRouter()
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPlayer, setCurrentPlayer] = useState<{
    pseudo: string
    clanTag?: string
    clan_tag?: string
    isAdmin?: boolean
    is_admin?: boolean
    isSuperAdmin?: boolean
    is_superadmin?: boolean
  } | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [resetting, setResetting] = useState<string | null>(null)
  const [resetMessage, setResetMessage] = useState('')

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => {
        const p = data.player
        if (!p) { router.push('/'); return }
        const isAdmin = p.is_admin ?? p.isAdmin
        const isSuperAdmin = p.is_superadmin ?? p.isSuperAdmin
        if (!isAdmin && !isSuperAdmin) { router.push('/'); return }
        setCurrentPlayer(p)
        return fetch('/api/admin/players')
      })
      .then(r => r?.json())
      .then(data => {
        if (data?.players) setPlayers(data.players)
        setLoading(false)
      })
  }, [router])

  const handleResetPassword = async (playerTag: string, playerPseudo: string) => {
    if (!confirm(`Réinitialiser le mot de passe de ${playerPseudo} ?`)) return

    setResetting(playerTag)
    setResetMessage('')

    const response = await fetch('/api/admin/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerTag }),
    })

    const data = await response.json()
    setResetMessage(data.message || data.error || '')
    setResetting(null)

    if (data.success) {
      const updated = await fetch('/api/admin/players').then(r => r.json())
      if (updated.players) setPlayers(updated.players)
    }
  }

  const filteredPlayers = filter === 'all'
    ? players
    : players.filter(p => p.clan_tag === filter)

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#030712' }}>
        <div style={{ color: '#c8a84b', letterSpacing: '2px' }}>CHARGEMENT...</div>
      </div>
    )
  }

  return (
    <>
      <AnimatedBackground primaryColor="200,168,75" />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Navbar player={currentPlayer} />
        <main style={{ paddingTop: '80px', padding: '80px 2rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ color: '#c8a84b', fontSize: '11px', letterSpacing: '3px', marginBottom: '0.5rem' }}>
              PANNEAU D'ADMINISTRATION
            </div>
            <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 700, margin: 0 }}>
              Gestion des joueurs
            </h1>
          </div>

          {/* Message de reset */}
          {resetMessage && (
            <div style={{
              background: 'rgba(200,168,75,0.1)',
              border: '1px solid rgba(200,168,75,0.3)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#c8a84b',
              fontSize: '13px',
              marginBottom: '1.5rem',
            }}>
              {resetMessage}
            </div>
          )}

          {/* Filtres par clan */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { key: 'all',        label: 'Tous les clans', rgb: '200,168,75',  color: '#c8a84b' },
              { key: '#2RJJJ2V09', label: 'DDS Académie',  rgb: '74,158,255',  color: '#4a9eff' },
              { key: '#8CLGGL8V',  label: 'OpenSys',        rgb: '255,140,0',   color: '#ff8c00' },
              { key: '#99UPQRLJ',  label: 'いえすぽす',     rgb: '155,89,255',  color: '#9b59ff' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  background: filter === f.key ? `rgba(${f.rgb}, 0.15)` : 'transparent',
                  border: `1px solid ${filter === f.key ? f.color : 'rgba(255,255,255,0.1)'}`,
                  color: filter === f.key ? f.color : '#6677aa',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Compteur */}
          <div style={{ color: '#6677aa', fontSize: '12px', marginBottom: '1rem' }}>
            {filteredPlayers.length} joueur{filteredPlayers.length > 1 ? 's' : ''}
          </div>

          {/* Liste des joueurs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredPlayers.map(player => {
              const clanColor = CLAN_COLORS[player.clan_tag] || '#c8a84b'
              const hasChangedPassword = !player.first_login

              return (
                <div
                  key={player.id}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Indicateur clan */}
                  <div style={{
                    width: '4px',
                    height: '40px',
                    borderRadius: '2px',
                    background: clanColor,
                    flexShrink: 0,
                  }} />

                  {/* Infos joueur */}
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px', flexWrap: 'wrap' }}>
                      <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>
                        {player.pseudo}
                      </span>
                      {player.is_superadmin && (
                        <span style={{ background: 'rgba(200,168,75,0.2)', border: '1px solid rgba(200,168,75,0.4)', color: '#c8a84b', fontSize: '9px', padding: '1px 6px', borderRadius: '4px', letterSpacing: '1px' }}>
                          SUPERADMIN
                        </span>
                      )}
                      {player.is_admin && !player.is_superadmin && (
                        <span style={{ background: 'rgba(74,158,255,0.15)', border: '1px solid rgba(74,158,255,0.3)', color: '#4a9eff', fontSize: '9px', padding: '1px 6px', borderRadius: '4px', letterSpacing: '1px' }}>
                          ADMIN
                        </span>
                      )}
                    </div>
                    <div style={{ color: '#6677aa', fontSize: '11px' }}>
                      {player.tag} · {CLAN_NAMES[player.clan_tag] || player.clan_tag} · HDV {player.hdv_level}
                    </div>
                  </div>

                  {/* Indicateurs statut */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      padding: '4px 10px', borderRadius: '8px',
                      background: hasChangedPassword ? 'rgba(74,222,128,0.08)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${hasChangedPassword ? 'rgba(74,222,128,0.25)' : 'rgba(255,255,255,0.08)'}`,
                    }}>
                      <div style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: hasChangedPassword ? '#4ade80' : '#4a5568',
                      }} />
                      <span style={{ fontSize: '10px', color: hasChangedPassword ? '#4ade80' : '#6677aa', letterSpacing: '0.5px' }}>
                        {hasChangedPassword ? 'Connecté' : 'Jamais connecté'}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      padding: '4px 10px', borderRadius: '8px',
                      background: hasChangedPassword ? 'rgba(74,222,128,0.08)' : 'rgba(255,165,0,0.08)',
                      border: `1px solid ${hasChangedPassword ? 'rgba(74,222,128,0.25)' : 'rgba(255,165,0,0.25)'}`,
                    }}>
                      <span style={{ fontSize: '10px', color: hasChangedPassword ? '#4ade80' : '#ffa500', letterSpacing: '0.5px' }}>
                        {hasChangedPassword ? 'MDP personnalisé' : 'MDP par défaut'}
                      </span>
                    </div>
                  </div>

                  {/* Bouton reset MDP */}
                  {!player.is_superadmin && (
                    <button
                      onClick={() => handleResetPassword(player.tag, player.pseudo)}
                      disabled={resetting === player.tag}
                      style={{
                        background: 'rgba(220,50,50,0.08)',
                        border: '1px solid rgba(220,50,50,0.25)',
                        color: '#ff6b6b',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '10px',
                        letterSpacing: '1px',
                        cursor: resetting === player.tag ? 'not-allowed' : 'pointer',
                        opacity: resetting === player.tag ? 0.5 : 1,
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {resetting === player.tag ? '...' : 'RESET MDP'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </>
  )
}
