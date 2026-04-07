'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AnimatedBackground from '@/app/components/AnimatedBackground'

const labelStyle: React.CSSProperties = {
  color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px',
  display: 'block', marginBottom: '6px',
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(200,168,75,0.2)', borderRadius: '8px',
  color: '#fff', padding: '11px 14px', fontSize: '13px', outline: 'none',
  boxSizing: 'border-box',
}

const btnStyle: React.CSSProperties = {
  width: '100%', background: 'linear-gradient(135deg, #c8a84b, #f0c060)',
  border: 'none', color: '#030712', padding: '12px', borderRadius: '8px',
  fontSize: '12px', fontWeight: 700, letterSpacing: '2px', cursor: 'pointer',
}

export default function FirstLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    pseudo: '',
    tag: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    const response = await fetch('/api/auth/first-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await response.json()

    if (data.success) {
      router.push('/profil')
    } else {
      setError(data.error || 'Erreur inconnue')
      setLoading(false)
    }
  }

  return (
    <>
      <AnimatedBackground />
      <div style={{
        position: 'relative', zIndex: 1, minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
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
            <div style={{ color: '#c8a84b', fontSize: '11px', letterSpacing: '3px', marginBottom: '0.5rem' }}>
              PREMIÈRE CONNEXION
            </div>
            <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '0.75rem', marginTop: 0 }}>
              Bienvenue sur DDS Cluster
            </h1>
            <p style={{ color: '#8899bb', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
              Pour activer ton compte, renseigne ton pseudo ingame, ton tag Clash of Clans
              et choisis ton mot de passe personnel.
            </p>
          </div>

          {/* Pseudo */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>PSEUDO INGAME</label>
            <input type="text" placeholder="Almin_Ox"
              value={form.pseudo} onChange={e => setForm({ ...form, pseudo: e.target.value })}
              style={inputStyle} />
          </div>

          {/* Tag */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>TON TAG COC</label>
            <input type="text" placeholder="#9J8Y0QYC0"
              value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })}
              style={inputStyle} />
            <div style={{ color: '#4a9eff', fontSize: '10px', marginTop: '4px' }}>
              Sert à vérifier ton identité — visible dans le jeu
            </div>
          </div>

          {/* Nouveau MDP */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>NOUVEAU MOT DE PASSE</label>
            <input type="password" placeholder="Minimum 6 caractères"
              value={form.newPassword} onChange={e => setForm({ ...form, newPassword: e.target.value })}
              style={inputStyle} />
          </div>

          {/* Confirmation */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>CONFIRMER LE MOT DE PASSE</label>
            <input type="password" placeholder="Répète ton mot de passe"
              value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              style={inputStyle} />
          </div>

          {error && (
            <div style={{
              background: 'rgba(220,50,50,0.1)', border: '1px solid rgba(220,50,50,0.3)',
              borderRadius: '8px', padding: '10px 14px', color: '#ff6b6b',
              fontSize: '12px', marginBottom: '1rem',
            }}>
              {error}
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading} style={{ ...btnStyle, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'VÉRIFICATION...' : 'ACTIVER MON COMPTE'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span onClick={() => window.location.href = '/'}
              style={{ color: '#6677aa', fontSize: '11px', cursor: 'pointer' }}>
              ← Retour à l'accueil
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
