'use client'

interface LoginPanelProps {
  isOpen: boolean
}

export default function LoginPanel({ isOpen }: LoginPanelProps) {
  if (!isOpen) return null

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
        <p
          style={{
            color: '#6677aa',
            fontSize: '10px',
            letterSpacing: '1.5px',
            marginBottom: '6px',
            marginTop: 0,
            fontWeight: 600,
          }}
        >
          PSEUDO
        </p>
        <input
          type="text"
          placeholder="Almin_Ox"
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(200,168,75,0.2)',
            borderRadius: '8px',
            color: '#ffffff',
            padding: '10px 14px',
            fontSize: '13px',
            outline: 'none',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.5)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.2)')}
        />
      </div>

      {/* Tag */}
      <div style={{ marginBottom: '1.25rem' }}>
        <p
          style={{
            color: '#6677aa',
            fontSize: '10px',
            letterSpacing: '1.5px',
            marginBottom: '6px',
            marginTop: 0,
            fontWeight: 600,
          }}
        >
          TAG DE JEU
        </p>
        <input
          type="text"
          placeholder="#9J8Y0QYC0"
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(200,168,75,0.2)',
            borderRadius: '8px',
            color: '#ffffff',
            padding: '10px 14px',
            fontSize: '13px',
            outline: 'none',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.5)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(200,168,75,0.2)')}
        />
        <p style={{ color: '#4a9eff', fontSize: '10px', marginTop: '4px', marginBottom: 0 }}>
          Ton identifiant Clash of Clans
        </p>
      </div>

      <button
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
          cursor: 'pointer',
          marginTop: '0.5rem',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        SE CONNECTER
      </button>
    </div>
  )
}
