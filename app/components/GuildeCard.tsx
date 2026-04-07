'use client'

interface GuildeCardProps {
  // Données statiques (depuis guildes-config.ts)
  name: string
  tag: string
  category: string
  staticDescription: string
  hdvRequirement: string
  primaryColor: string
  primaryColorRgb: string
  logoUrl: string
  logoDelay: number
  discordUrl: string

  // Données dynamiques (depuis l'API COC)
  apiData: {
    members?: number
    clanLevel?: number
    warLeague?: { name: string }
    description?: string
  } | null
}

export default function GuildeCard({
  name,
  tag,
  category,
  staticDescription,
  hdvRequirement,
  primaryColor,
  primaryColorRgb,
  logoUrl,
  logoDelay,
  apiData,
}: GuildeCardProps) {
  const members = apiData?.members ?? 0
  const clanLevel = apiData?.clanLevel ?? '?'
  const warLeague = apiData?.warLeague?.name ?? 'Non classé'
  const description = apiData?.description || staticDescription

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
        {logoUrl ? (
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
        ) : (
          <div
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              background: `rgba(${primaryColorRgb}, 0.12)`,
              border: `2px solid rgba(${primaryColorRgb}, 0.35)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              animation: 'levitation 3s ease-in-out infinite',
              animationDelay: `${logoDelay}s`,
            }}
          >
            狼
          </div>
        )}
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
        <span style={{ color: '#6677aa', fontSize: '13px', fontWeight: 400 }}> / 50 membres</span>
      </div>

      {/* Badges Niveau clan + Ligue CWL */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          margin: '0.75rem 0',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '1px',
            background: `rgba(${primaryColorRgb}, 0.12)`,
            border: `1px solid rgba(${primaryColorRgb}, 0.3)`,
            color: primaryColor,
          }}
        >
          Niv. {clanLevel}
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '1px',
            background: 'rgba(200, 168, 75, 0.1)',
            border: '1px solid rgba(200, 168, 75, 0.3)',
            color: '#c8a84b',
          }}
        >
          {warLeague}
        </span>
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

      {/* Bouton VOIR LA GUILDE pleine largeur */}
      <button
        style={{
          width: '100%',
          background: `rgba(${primaryColorRgb}, 0.1)`,
          border: `1px solid rgba(${primaryColorRgb}, 0.35)`,
          color: primaryColor,
          padding: '11px',
          borderRadius: '8px',
          fontSize: '11px',
          letterSpacing: '1.5px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.2s',
          textTransform: 'uppercase',
          marginTop: 'auto',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = `rgba(${primaryColorRgb}, 0.2)`)}
        onMouseLeave={(e) => (e.currentTarget.style.background = `rgba(${primaryColorRgb}, 0.1)`)}
      >
        VOIR LA GUILDE
      </button>
    </div>
  )
}
