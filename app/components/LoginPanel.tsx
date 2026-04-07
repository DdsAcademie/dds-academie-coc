'use client'

import { useState } from 'react'

interface LoginPanelProps {
  isOpen: boolean
}

export default function LoginPanel({ isOpen }: LoginPanelProps) {
  const [pseudo, setPseudo] = useState('')
  const [tag, setTag] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo, tag }),
    })

    const data = await response.json()

    if (data.success) {
      if (data.firstLogin) {
        window.location.href = '/first-login'
      } else {
        window.location.href = '/profil'
      }
    } else {
      setError(data.error || 'Erreur de connexion')
      setLoading(false)
    }
  }

  return (
    <div
      style={{
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
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(200,168,75,0.05)',
      }}
    >
      <p
        style={{
          color: '#c8a84b',
          fontSize: '12px',
          letterSpacing: '3px',
          textAlign: 'center',
          marginBottom: '0.75rem',
          marginTop: 0,
          fontWeight: 700,
        }}
      >
        ESPACE MEMBRE
      </p>
      <div
        style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #c8a84b, transparent)',
          margin: '0 auto 1.5rem',
        }}
      />

      {/* Pseudo */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', marginBottom: '6px', marginTop: 0, fontWeight: 600 }}>
          PSEUDO
        </p>
        <input
          type="text"
          placeholder="Almin_Ox"
          value={pseudo}
          onChange={e => setPseudo(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(200,168,75,0.2)',
            borderRadius: '8px',
            color: '#ffffff',
            padding: '10px 14px',
            fontSize: '13px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.5)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.2)')}
        />
      </div>

      {/* Tag */}
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', marginBottom: '6px', marginTop: 0, fontWeight: 600 }}>
          TAG DE JEU
        </p>
        <input
          type="text"
          placeholder="#9J8Y0QYC0"
          value={tag}
          onChange={e => setTag(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(200,168,75,0.2)',
            borderRadius: '8px',
            color: '#ffffff',
            padding: '10px 14px',
            fontSize: '13px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.5)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.2)')}
        />
        <p style={{ color: '#4a9eff', fontSize: '10px', marginTop: '4px', marginBottom: 0 }}>
          Ton identifiant Clash of Clans
        </p>
      </div>

      {error && (
        <div style={{
          background: 'rgba(220,50,50,0.1)',
          border: '1px solid rgba(220,50,50,0.3)',
          borderRadius: '8px',
          padding: '8px 12px',
          color: '#ff6b6b',
          fontSize: '11px',
          marginBottom: '0.75rem',
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
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '2px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: '0.5rem',
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
