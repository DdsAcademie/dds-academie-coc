'use client'

import { useState } from 'react'

interface Props {
  clanColor: { primary: string; rgb: string }
}

export default function ChangePasswordForm({ clanColor }: Props) {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    setStatus('loading')
    setMessage('')

    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await response.json()

    if (data.success) {
      setStatus('success')
      setMessage('Mot de passe changé avec succès !')
      setForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
    } else {
      setStatus('error')
      setMessage(data.error || 'Erreur inconnue')
    }
  }

  return (
    <div style={{
      background: `rgba(${clanColor.rgb}, 0.04)`,
      border: `1px solid rgba(${clanColor.rgb}, 0.15)`,
      borderRadius: '16px',
      padding: '1.75rem',
    }}>
      <div style={{ color: clanColor.primary, fontSize: '11px', letterSpacing: '2px', marginBottom: '1.5rem' }}>
        SÉCURITÉ — CHANGER MON MOT DE PASSE
      </div>

      {(['oldPassword', 'newPassword', 'confirmPassword'] as const).map((field, i) => (
        <div key={field} style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', display: 'block', marginBottom: '6px' }}>
            {(['ANCIEN MOT DE PASSE', 'NOUVEAU MOT DE PASSE', 'CONFIRMER LE NOUVEAU'] as const)[i]}
          </label>
          <input
            type="password"
            value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid rgba(${clanColor.rgb}, 0.2)`,
              borderRadius: '8px',
              color: '#fff',
              padding: '11px 14px',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      ))}

      {message && (
        <div style={{
          background: status === 'success' ? 'rgba(50,200,100,0.1)' : 'rgba(220,50,50,0.1)',
          border: `1px solid ${status === 'success' ? 'rgba(50,200,100,0.3)' : 'rgba(220,50,50,0.3)'}`,
          borderRadius: '8px',
          padding: '10px 14px',
          color: status === 'success' ? '#4ade80' : '#ff6b6b',
          fontSize: '12px',
          marginBottom: '1rem',
        }}>
          {message}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === 'loading'}
        style={{
          background: `rgba(${clanColor.rgb}, 0.15)`,
          border: `1px solid rgba(${clanColor.rgb}, 0.4)`,
          color: clanColor.primary,
          padding: '11px 24px',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '1.5px',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.7 : 1,
        }}
      >
        {status === 'loading' ? 'CHARGEMENT...' : 'CHANGER MON MOT DE PASSE'}
      </button>
    </div>
  )
}
