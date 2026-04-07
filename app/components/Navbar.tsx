'use client'

import { useState } from 'react'
import LoginPanel from './LoginPanel'

interface NavbarProps {
  player?: {
    pseudo: string
    clanTag?: string
    isAdmin?: boolean
    isSuperAdmin?: boolean
  } | null
}

const CLAN_COLOR_MAP: Record<string, { primary: string; rgb: string }> = {
  '#2RJJJ2V09': { primary: '#4a9eff', rgb: '74,158,255' },
  '#8CLGGL8V':  { primary: '#ff8c00', rgb: '255,140,0' },
  '#99UPQRLJ':  { primary: '#9b59ff', rgb: '155,89,255' },
}

const menuItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  borderRadius: '8px',
  fontSize: '13px',
  color: '#fff',
  textDecoration: 'none',
  cursor: 'pointer',
}

function UserMenu({ player }: { player: NonNullable<NavbarProps['player']> }) {
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }

  const clan = CLAN_COLOR_MAP[player.clanTag || ''] || { primary: '#c8a84b', rgb: '200,168,75' }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: `rgba(${clan.rgb}, 0.12)`,
          border: `1px solid ${clan.primary}`,
          color: clan.primary,
          padding: '7px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '1px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        {player.pseudo}
        <span style={{ fontSize: '8px' }}>▼</span>
      </button>

      {open && (
        <>
          {/* Overlay pour fermer au clic extérieur */}
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 150 }}
            onClick={() => setOpen(false)}
          />
          <div style={{
            position: 'absolute',
            top: '42px',
            right: 0,
            background: 'rgba(10, 14, 30, 0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '8px',
            minWidth: '180px',
            zIndex: 200,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}>
            {/* Mon profil */}
            <a href="/profil" style={menuItemStyle}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span>⚔</span> Mon profil
            </a>

            {/* Administration — seulement pour admin/superadmin */}
            {(player.isAdmin || player.isSuperAdmin) && (
              <a href="/admin" style={{ ...menuItemStyle, color: '#c8a84b' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,168,75,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span>🛡</span> Administration
              </a>
            )}

            {/* Séparateur */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />

            {/* Déconnexion */}
            <button
              onClick={handleLogout}
              style={{ ...menuItemStyle, width: '100%', background: 'none', border: 'none', color: '#ff6b6b', textAlign: 'left' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(220,50,50,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span>↩</span> Se déconnecter
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function Navbar({ player }: NavbarProps) {
  const [loginOpen, setLoginOpen] = useState(false)

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

      {/* Liens + Connexion */}
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
