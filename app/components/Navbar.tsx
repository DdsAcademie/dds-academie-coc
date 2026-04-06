'use client'

import { useState } from 'react'
import LoginPanel from './LoginPanel'

export default function Navbar() {
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '3px',
            color: '#c8a84b',
            lineHeight: 1,
          }}
        >
          DDS{' '}
        </span>
        <span
          style={{
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '3px',
            color: '#ffffff',
            lineHeight: 1,
          }}
        >
          CLUSTER
        </span>
      </div>

      {/* Liens + Connexion */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
        {(['ACCUEIL', 'CLASSEMENTS', 'RECRUTEMENT'] as const).map((link) => (
          <span
            key={link}
            className="nav-link"
            style={{
              color: '#8899bb',
              fontSize: '11px',
              letterSpacing: '1.5px',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c8a84b')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8899bb')}
          >
            {link}
          </span>
        ))}

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
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-link { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
