export default function StatsBar() {
  return (
    <div
      style={{
        margin: '0 2rem 2.5rem 2rem',
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        overflow: 'hidden',
      }}
    >
      {/* Stat 1 — Guildes */}
      <div
        style={{
          padding: '1.5rem 1rem',
          textAlign: 'center',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p style={{ color: '#c8a84b', fontSize: '30px', fontWeight: 700, margin: 0 }}>3</p>
        <p style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '2.5px', marginTop: '4px', marginBottom: 0 }}>
          GUILDES
        </p>
      </div>

      {/* Stat 2 — Membres actifs */}
      <div
        style={{
          padding: '1.5rem 1rem',
          textAlign: 'center',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#4a9eff', fontSize: '30px', fontWeight: 700 }}>148</span>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#4a9eff',
              marginLeft: '6px',
              animation: 'pulse 2s infinite',
              display: 'inline-block',
            }}
          />
        </div>
        <p style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '2.5px', marginTop: '4px', marginBottom: 0 }}>
          MEMBRES ACTIFS
        </p>
      </div>

      {/* Stat 3 — Ligue CWL */}
      <div
        style={{
          padding: '1.5rem 1rem',
          textAlign: 'center',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p style={{ color: '#c8a84b', fontSize: '20px', fontWeight: 700, margin: 0 }}>Légendaire</p>
        <p style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '2.5px', marginTop: '4px', marginBottom: 0 }}>
          LIGUE CWL
        </p>
      </div>

      {/* Stat 4 — Participation guerre */}
      <div
        style={{
          padding: '1.5rem 1rem',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#c8a84b', fontSize: '30px', fontWeight: 700, margin: 0 }}>94%</p>
        <p style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '2.5px', marginTop: '4px', marginBottom: 0 }}>
          PARTICIPATION GUERRE
        </p>
      </div>
    </div>
  )
}
