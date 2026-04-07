'use client'

import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(200,168,75,0.2)',
  borderRadius: '8px',
  color: '#ffffff',
  padding: '10px 12px',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box',
}

export default function LoginPanel({ isOpen }: { isOpen: boolean }) {
  const [mode, setMode] = useState<'player' | 'admin'>('player')
  const [pseudo, setPseudo] = useState('')
  const [tag, setTag] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    const body = mode === 'admin'
      ? { email, password }
      : { pseudo, tag }

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (data.success) {
      if (data.firstLogin) {
        window.location.href = '/first-login'
      } else if (data.isSuperAdmin || data.isAdmin) {
        window.location.href = '/admin'
      } else {
        window.location.href = '/profil'
      }
    } else {
      setError(data.error || 'Erreur de connexion')
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'absolute',
      top: '70px',
      right: '2rem',
      background: 'rgba(10, 14, 30, 0.96)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(200, 168, 75, 0.25)',
      borderRadius: '16px',
      padding: '1.5rem',
      width: '290px',
      zIndex: 100,
      boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
    }}>
      {/* Titre */}
      <div style={{ color: '#c8a84b', fontSize: '12px', letterSpacing: '3px', textAlign: 'center', marginBottom: '1.25rem', fontWeight: 700 }}>
        ESPACE MEMBRE
      </div>

      {/* Toggle JOUEUR / ADMIN */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '1.25rem' }}>
        {(['player', 'admin'] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setError('') }}
            style={{
              flex: 1,
              padding: '6px',
              borderRadius: '6px',
              fontSize: '10px',
              letterSpacing: '1px',
              cursor: 'pointer',
              fontWeight: 600,
              background: mode === m ? 'rgba(200,168,75,0.15)' : 'transparent',
              border: mode === m ? '1px solid rgba(200,168,75,0.4)' : '1px solid rgba(255,255,255,0.08)',
              color: mode === m ? '#c8a84b' : '#6677aa',
            }}
          >
            {m === 'player' ? 'JOUEUR' : 'ADMIN'}
          </button>
        ))}
      </div>

      {/* Champs selon le mode */}
      {mode === 'player' ? (
        <>
          <div style={{ marginBottom: '0.875rem' }}>
            <label style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', display: 'block', marginBottom: '5px', fontWeight: 600 }}>PSEUDO</label>
            <input
              type="text"
              placeholder="Almin_Ox"
              value={pseudo}
              onChange={e => setPseudo(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.2)')}
            />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', display: 'block', marginBottom: '5px', fontWeight: 600 }}>TAG DE JEU</label>
            <input
              type="text"
              placeholder="#9J8Y0QYC0"
              value={tag}
              onChange={e => setTag(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.2)')}
            />
            <div style={{ color: '#4a9eff', fontSize: '10px', marginTop: '4px' }}>Ton tag Clash of Clans</div>
          </div>
        </>
      ) : (
        <>
          <div style={{ marginBottom: '0.875rem' }}>
            <label style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', display: 'block', marginBottom: '5px', fontWeight: 600 }}>EMAIL</label>
            <input
              type="email"
              placeholder="admin@dds.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.2)')}
            />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', display: 'block', marginBottom: '5px', fontWeight: 600 }}>MOT DE PASSE</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.2)')}
            />
          </div>
        </>
      )}

      {error && (
        <div style={{
          background: 'rgba(220,50,50,0.1)',
          border: '1px solid rgba(220,50,50,0.3)',
          borderRadius: '6px',
          padding: '8px 12px',
          color: '#ff6b6b',
          fontSize: '11px',
          marginBottom: '0.875rem',
        }}>
          {error}
        </div>
      )}

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #c8a84b, #f0c060)',
          border: 'none',
          color: '#030712',
          padding: '11px',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '2px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = '0.85' }}
        onMouseLeave={(e) => { if (!loading) e.currentTarget.style.opacity = '1' }}
      >
        {loading ? 'CONNEXION...' : 'SE CONNECTER'}
      </button>
    </div>
  )
}
