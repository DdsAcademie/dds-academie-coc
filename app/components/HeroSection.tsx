'use client'

export default function HeroSection() {
  return (
    <div
      style={{
        paddingTop: '120px',
        paddingBottom: '3rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          color: 'rgba(74,158,255,0.85)',
          fontSize: '11px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          marginTop: 0,
        }}
      >
        ✦&nbsp;&nbsp;Clash of Clans · Cluster Officiel&nbsp;&nbsp;✦
      </p>

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
