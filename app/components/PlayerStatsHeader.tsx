'use client'

import { useState } from 'react'
import { getHdvImageUrl, getLeagueImageUrl, getLeagueDisplayName } from '@/app/lib/coc-assets'

interface PlayerStatsHeaderProps {
  player: {
    pseudo: string
    tag: string
    clanTag: string
    hdvLevel: number
    league: string
    trophies: number
    bestTrophies: number
    expLevel: number
    role: string
    dons?: number
  }
  clanColor: { primary: string; rgb: string }
  clanName: string
}

function AssetImage({ src, alt, fallbackText }: { src: string; alt: string; fallbackText: string }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div style={{
        width: '64px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 0.5rem',
        fontSize: '11px', color: '#6677aa', textAlign: 'center',
      }}>
        {fallbackText}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={64}
      height={64}
      style={{
        width: '64px',
        height: '64px',
        objectFit: 'contain',
        display: 'block',
        margin: '0 auto 0.5rem',
      }}
      onError={() => setHasError(true)}
    />
  )
}

export default function PlayerStatsHeader({ player, clanColor, clanName }: PlayerStatsHeaderProps) {
  return (
    <div style={{
      background: `rgba(${clanColor.rgb}, 0.06)`,
      border: `1px solid rgba(${clanColor.rgb}, 0.2)`,
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ligne lumineuse */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '1px',
        background: `linear-gradient(to right, transparent, ${clanColor.primary}, transparent)`,
      }} />

      {/* Header : avatar + nom + tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: `rgba(${clanColor.rgb}, 0.15)`,
          border: `2px solid rgba(${clanColor.rgb}, 0.4)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', flexShrink: 0,
        }}>
          ⚔
        </div>
        <div>
          <div style={{ color: clanColor.primary, fontSize: '20px', fontWeight: 700 }}>
            {player.pseudo}
          </div>
          <div style={{ color: '#6677aa', fontSize: '11px', letterSpacing: '1px', marginTop: '2px' }}>
            {player.tag} · {clanName}
          </div>
          <div style={{
            display: 'inline-block', marginTop: '4px',
            background: `rgba(${clanColor.rgb}, 0.1)`,
            border: `1px solid rgba(${clanColor.rgb}, 0.25)`,
            color: clanColor.primary,
            padding: '2px 10px', borderRadius: '10px',
            fontSize: '10px', letterSpacing: '1px',
          }}>
            {player.role?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Grille principale : HDV + Ligue + Trophées + Niveau EXP */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem',
      }}>

        {/* HDV avec image */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '14px',
          padding: '1.25rem',
          textAlign: 'center',
        }}>
          <AssetImage
            src={getHdvImageUrl(player.hdvLevel)}
            alt={`HDV ${player.hdvLevel}`}
            fallbackText={`HDV ${player.hdvLevel}`}
          />
          <div style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>
            HDV {player.hdvLevel}
          </div>
          <div style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', marginTop: '2px' }}>
            HÔTEL DE VILLE
          </div>
        </div>

        {/* Ligue avec image */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '14px',
          padding: '1.25rem',
          textAlign: 'center',
        }}>
          <AssetImage
            src={getLeagueImageUrl(player.league)}
            alt={getLeagueDisplayName(player.league)}
            fallbackText={getLeagueDisplayName(player.league)}
          />
          <div style={{ color: '#c8a84b', fontSize: '14px', fontWeight: 700 }}>
            {getLeagueDisplayName(player.league)}
          </div>
          <div style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', marginTop: '2px' }}>
            LIGUE ACTUELLE
          </div>
        </div>

        {/* Trophées */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '14px',
          padding: '1.25rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{ color: '#c8a84b', fontSize: '28px', fontWeight: 700 }}>
            {player.trophies?.toLocaleString()}
          </div>
          <div style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', marginTop: '4px' }}>
            TROPHÉES
          </div>
          <div style={{ color: '#4a5568', fontSize: '11px', marginTop: '4px' }}>
            Meilleur : {player.bestTrophies?.toLocaleString()}
          </div>
        </div>

        {/* Niveau expérience */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '14px',
          padding: '1.25rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{ color: '#fff', fontSize: '28px', fontWeight: 700 }}>
            {player.expLevel}
          </div>
          <div style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '1.5px', marginTop: '4px' }}>
            NIVEAU EXP
          </div>
        </div>

      </div>
    </div>
  )
}
