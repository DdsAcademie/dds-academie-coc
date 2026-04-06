'use client'

const PILLS = [
  { label: 'DDS ACADÉMIE', color: '#4a9eff', rgb: '74,158,255' },
  { label: 'OPENSYS',      color: '#ff8c00', rgb: '255,140,0'  },
  { label: 'いえすぽす',   color: '#9b59ff', rgb: '155,89,255' },
]

export default function HeroSection() {
  return (
    <div
      style={{
        paddingTop: '120px',
        paddingBottom: '3rem',
        textAlign: 'center',
      }}
    >
      {/* Pré-titre */}
      <p
        style={{
          color: 'rgba(74,158,255,0.85)',
          fontSize: '11px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
          marginTop: 0,
        }}
      >
        ✦&nbsp;&nbsp;Clash of Clans · Cluster Officiel&nbsp;&nbsp;✦
      </p>

      {/* Pills des 3 guildes */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.25rem',
          marginTop: '0.75rem',
        }}
      >
        {PILLS.map(({ label, color, rgb }) => (
          <button
            key={label}
            style={{
              color,
              border: `1px solid rgba(${rgb}, 0.45)`,
              background: `rgba(${rgb}, 0.1)`,
              padding: '6px 18px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = `rgba(${rgb}, 0.2)`)}
            onMouseLeave={(e) => (e.currentTarget.style.background = `rgba(${rgb}, 0.1)`)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Titre principal */}
      <h1
        style={{
          fontSize: 'clamp(40px, 6vw, 64px)',
          fontWeight: 800,
          letterSpacing: '4px',
          lineHeight: 1,
          marginBottom: '0.75rem',
          marginTop: 0,
        }}
      >
        <span style={{ color: '#ffffff' }}>DDS </span>
        <span
          style={{
            background: 'linear-gradient(135deg, #c8a84b, #f0c060)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ALLIANCE
        </span>
      </h1>

      {/* Tagline */}
      <p
        style={{
          color: '#6677aa',
          fontSize: '12px',
          letterSpacing: '5px',
          marginBottom: '1.5rem',
          marginTop: 0,
        }}
      >
        3 GUILDES&nbsp;&nbsp;·&nbsp;&nbsp;1 COMMUNAUTÉ
      </p>

      {/* Description */}
      <p
        style={{
          color: '#8899bb',
          fontSize: '15px',
          lineHeight: 1.8,
          maxWidth: '480px',
          margin: '0 auto 2.5rem',
        }}
      >
        Bienvenue sur le portail officiel du cluster DDS.
        <br />
        Retrouvez les statistiques en temps réel, les classements,
        <br />
        et rejoignez notre communauté sur Discord.
      </p>

      {/* Boutons CTA */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <a
          href="https://discord.gg/P48WHFXaGT"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#5865f2',
            border: 'none',
            color: '#ffffff',
            padding: '13px 28px',
            borderRadius: '25px',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '1px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#4752c4'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#5865f2'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ▶&nbsp;&nbsp;Rejoindre le Discord
        </a>

        <button
          style={{
            background: 'transparent',
            border: '1px solid rgba(200,168,75,0.45)',
            color: '#c8a84b',
            padding: '13px 28px',
            borderRadius: '25px',
            fontSize: '13px',
            letterSpacing: '1px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(200,168,75,0.08)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Voir les guildes&nbsp;&nbsp;→
        </button>
      </div>
    </div>
  )
}
