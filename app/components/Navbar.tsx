'use client'

import { useState, useEffect } from 'react'
import LoginPanel from './LoginPanel'

interface ConnectedPlayer {
  pseudo: string
  clanTag: string
  isAdmin: boolean
  isSuperAdmin: boolean
}

const CLAN_COLOR_MAP: Record<string, { primary: string; rgb: string }> = {
  '#2RJJJ2V09': { primary: '#4a9eff', rgb: '74,158,255' },
  '#8CLGGL8V':  { primary: '#ff8c00', rgb: '255,140,0' },
  '#99UPQRLJ':  { primary: '#9b59ff', rgb: '155,89,255' },
}

const CLAN_NAMES: Record<string, string> = {
  '#2RJJJ2V09': 'DDS Académie',
  '#8CLGGL8V': 'OpenSys',
  '#99UPQRLJ': 'いえすぽす',
}

const dropdownItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '9px 12px',
  borderRadius: '10px',
  fontSize: '13px',
  color: '#fff',
  textDecoration: 'none',
  cursor: 'pointer',
  background: 'transparent',
  width: '100%',
  border: 'none',
  textAlign: 'left',
}

function UserMenu({ player }: { player: ConnectedPlayer }) {
  const [open, setOpen] = useState(false)

  const clan = CLAN_COLOR_MAP[player.clanTag] || { primary: '#c8a84b', rgb: '200,168,75' }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-dropdown]')) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div style={{ position: 'relative' }} data-dropdown="true">
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: `rgba(${clan.rgb}, 0.1)`,
          border: `1px solid rgba(${clan.rgb}, 0.45)`,
          color: clan.primary,
          padding: '7px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '1px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s',
        }}
      >
        {player.pseudo}
        <span style={{
          fontSize: '8px',
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>▼</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '48px',
          right: 0,
          background: 'rgba(10, 14, 30, 0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(200, 168, 75, 0.25)',
          borderRadius: '16px',
          padding: '0.75rem',
          minWidth: '200px',
          zIndex: 200,
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(200,168,75,0.04)',
        }}>

          {/* En-tête pseudo + clan */}
          <div style={{
            padding: '8px 12px 12px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            marginBottom: '6px',
          }}>
            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>
              {player.pseudo}
            </div>
            <div style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1px', marginTop: '2px' }}>
              {CLAN_NAMES[player.clanTag] || 'DDS Cluster'}
            </div>
          </div>

          {/* Mon profil */}
          <a
            href="/profil"
            style={dropdownItemStyle}
            onClick={() => setOpen(false)}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontSize: '14px' }}>⚔</span>
            <span>Mon profil</span>
          </a>

          {/* Administration — uniquement admin/superadmin */}
          {(player.isAdmin || player.isSuperAdmin) && (
            <a
              href="/admin"
              style={{ ...dropdownItemStyle, color: '#c8a84b' }}
              onClick={() => setOpen(false)}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,168,75,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: '14px' }}>🛡</span>
              <span>Administration</span>
            </a>
          )}

          {/* Séparateur */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '6px 0' }} />

          {/* Se déconnecter */}
          <button
            onClick={handleLogout}
            style={{ ...dropdownItemStyle, color: '#ff6b6b' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(220,50,50,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontSize: '14px' }}>↩</span>
            <span>Se déconnecter</span>
          </button>

        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [player, setPlayer] = useState<ConnectedPlayer | null>(null)
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => {
        if (data.player) {
          setPlayer({
            pseudo: data.player.pseudo,
            clanTag: data.player.clanTag,
            isAdmin: data.player.isAdmin,
            isSuperAdmin: data.player.isSuperAdmin,
          })
        }
      })
      .catch(() => {})
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '64px',
        background: 'rgba(3, 7, 18, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(200, 168, 75, 0.15)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
      }}
    >
      {/* Logo */}
      <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '3px', color: '#c8a84b', lineHeight: 1 }}>
          DDS{' '}
        </span>
        <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '3px', color: '#ffffff', lineHeight: 1 }}>
          CLUSTER
        </span>
      </a>

      {/* Liens + Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
        {(['ACCUEIL', 'CLASSEMENTS', 'RECRUTEMENT'] as const).map((link) => (
          <span
            key={link}
            className="nav-link"
            style={{ color: '#8899bb', fontSize: '11px', letterSpacing: '1.5px', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c8a84b')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8899bb')}
          >
            {link}
          </span>
        ))}

        {player ? (
          <UserMenu player={player} />
        ) : (
          <>
            <button
              onClick={() => setLoginOpen(!loginOpen)}
              style={{
                background: 'linear-gradient(135deg, #c8a84b, #f0c060)',
                border: 'none',
                color: '#030712',
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              CONNEXION
            </button>
            <LoginPanel isOpen={loginOpen} />
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-link { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
