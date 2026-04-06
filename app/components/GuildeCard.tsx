'use client'

interface GuildeCardProps {
  name: string
  tag: string
  category: string
  members: number
  maxMembers: number
  description: string
  hdvRequirement: string
  primaryColor: string
  primaryColorRgb: string
  logoUrl: string
  logoDelay: number
  discordUrl: string
  warLeague: string
}

export default function GuildeCard({
  name,
  tag,
  category,
  members,
  maxMembers,
  description,
  hdvRequirement,
  primaryColor,
  primaryColorRgb,
  logoUrl,
  logoDelay,
  discordUrl,
  warLeague,
}: GuildeCardProps) {
  return (
    <div
      style={{
        background: `rgba(${primaryColorRgb}, 0.04)`,
        border: `1px solid rgba(${primaryColorRgb}, 0.2)`,
        borderRadius: '16px',
        padding: '1.75rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s, border-color 0.2s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = `rgba(${primaryColorRgb}, 0.4)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = `rgba(${primaryColorRgb}, 0.2)`
      }}
    >
      {/* Ligne lumineuse en haut */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background: `linear-gradient(to right, transparent, ${primaryColor}, transparent)`,
        }}
      />

      {/* Logo avec animation lévitation */}
      <div
        style={{
          width: '88px',
          height: '88px',
          margin: '0 auto 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={logoUrl}
          alt={`Logo ${name}`}
          style={{
            width: '88px',
            height: '88px',
            objectFit: 'contain',
            borderRadius: '50%',
            animation: 'levitation 3s ease-in-out infinite',
            animationDelay: `${logoDelay}s`,
          }}
        />
      </div>

      {/* Nom */}
      <p
        style={{
          color: primaryColor,
          fontSize: '17px',
          fontWeight: 700,
          letterSpacing: '1px',
          marginBottom: '4px',
          marginTop: 0,
        }}
      >
        {name}
      </p>

      {/* Ligue CWL */}
      <p
        style={{
          color: '#c8a84b',
          fontSize: '11px',
          letterSpacing: '1px',
          marginBottom: '0.5rem',
          marginTop: 0,
        }}
      >
        ⚔ {warLeague}
      </p>

      {/* Tag / Catégorie */}
      <p
        style={{
          color: `rgba(${primaryColorRgb}, 0.5)`,
          fontSize: '10px',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          marginTop: 0,
        }}
      >
        {tag} · {category}
      </p>

      {/* Compteur membres (dynamique) */}
      <div style={{ margin: '0 0 0.25rem' }}>
        <span style={{ color: '#ffffff', fontSize: '26px', fontWeight: 700 }}>{members}</span>
        <span style={{ color: '#6677aa', fontSize: '13px', fontWeight: 400 }}> / {maxMembers} membres</span>
      </div>

      {/* Description */}
      <p
        style={{
          color: '#8899bb',
          fontSize: '12.5px',
          lineHeight: 1.7,
          margin: '0.75rem 0 0.5rem',
        }}
      >
        {description}
      </p>

      {/* Badge HDV */}
      <div style={{ marginBottom: '1.25rem' }}>
        <span
          style={{
            display: 'inline-block',
            background: `rgba(${primaryColorRgb}, 0.1)`,
            border: `1px solid rgba(${primaryColorRgb}, 0.25)`,
            color: primaryColor,
            padding: '3px 10px',
            borderRadius: '12px',
            fontSize: '10px',
            letterSpacing: '1px',
          }}
        >
          {hdvRequirement}
        </span>
      </div>

      {/* Boutons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginTop: 'auto',
        }}
      >
        <button
          style={{
            background: `rgba(${primaryColorRgb}, 0.1)`,
            border: `1px solid rgba(${primaryColorRgb}, 0.35)`,
            color: primaryColor,
            padding: '9px 8px',
            borderRadius: '8px',
            fontSize: '10px',
            letterSpacing: '1.5px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = `rgba(${primaryColorRgb}, 0.2)`)}
          onMouseLeave={(e) => (e.currentTarget.style.background = `rgba(${primaryColorRgb}, 0.1)`)}
        >
          VOIR LA GUILDE
        </button>
        <a
          href={discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#5865f2',
            border: 'none',
            color: '#ffffff',
            padding: '9px 8px',
            borderRadius: '8px',
            fontSize: '10px',
            letterSpacing: '1.5px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#4752c4')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#5865f2')}
        >
          DISCORD
        </a>
      </div>
    </div>
  )
}
