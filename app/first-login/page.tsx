'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AnimatedBackground from '@/app/components/AnimatedBackground'

export default function FirstLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await response.json()

    if (data.success) {
      router.push('/profil')
    } else {
      setError(data.error || 'Erreur inconnue')
    }
    setLoading(false)
  }

  return (
    <>
      <AnimatedBackground primaryColor="74,158,255" />
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}>
        <div style={{
          background: 'rgba(10, 14, 30, 0.92)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(200, 168, 75, 0.25)',
          borderRadius: '20px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '420px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ color: '#c8a84b', fontSize: '12px', letterSpacing: '3px', marginBottom: '0.5rem' }}>
              BIENVENUE
            </div>
            <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '0.5rem', marginTop: 0 }}>
              Première connexion
            </h1>
            <p style={{ color: '#8899bb', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
              Pour sécuriser ton compte, tu dois définir un mot de passe personnel.
            </p>
          </div>

          {/* Champ ancien mot de passe */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', display: 'block', marginBottom: '6px' }}>
              MOT DE PASSE ACTUEL (ton tag)
            </label>
            <input
              type="password"
              placeholder="#9J8Y0QYC0"
              value={form.oldPassword}
              onChange={e => setForm({ ...form, oldPassword: e.target.value })}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(200,168,75,0.2)',
                borderRadius: '8px',
                color: '#fff',
                padding: '11px 14px',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Champ nouveau mot de passe */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', display: 'block', marginBottom: '6px' }}>
              NOUVEAU MOT DE PASSE
            </label>
            <input
              type="password"
              placeholder="Minimum 6 caractères"
              value={form.newPassword}
              onChange={e => setForm({ ...form, newPassword: e.target.value })}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(200,168,75,0.2)',
                borderRadius: '8px',
                color: '#fff',
                padding: '11px 14px',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Confirmation */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', display: 'block', marginBottom: '6px' }}>
              CONFIRMER LE MOT DE PASSE
            </label>
            <input
              type="password"
              placeholder="Répète ton nouveau mot de passe"
              value={form.confirmPassword}
              onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(200,168,75,0.2)',
                borderRadius: '8px',
                color: '#fff',
                padding: '11px 14px',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(220,50,50,0.1)',
              border: '1px solid rgba(220,50,50,0.3)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#ff6b6b',
              fontSize: '12px',
              marginBottom: '1rem',
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #c8a84b, #f0c060)',
              border: 'none',
              color: '#030712',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '2px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'CHARGEMENT...' : 'DÉFINIR MON MOT DE PASSE'}
          </button>
        </div>
      </div>
    </>
  )
}
