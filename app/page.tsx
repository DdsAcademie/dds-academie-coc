import AnimatedBackground from './components/AnimatedBackground'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsBar from './components/StatsBar'
import GuildeCard from './components/GuildeCard'
import { getAllClansInfo } from './lib/coc-api'
import { GUILDES_CONFIG, FALLBACK_CLAN } from './lib/guildes-config'

function GuildesSection({ clans }: { clans: any[] }) {
  return (
    <section style={{ padding: '0 2rem 3rem 2rem' }}>
      {/* Titre de section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(200,168,75,0.3))',
          }}
        />
        <span style={{ color: '#6677aa', fontSize: '10px', letterSpacing: '4px', whiteSpace: 'nowrap' }}>
          ✦&nbsp;&nbsp;NOS GUILDES&nbsp;&nbsp;✦
        </span>
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to left, transparent, rgba(200,168,75,0.3))',
          }}
        />
      </div>

      {/* Grille */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
          alignItems: 'stretch',
        }}
      >
        {GUILDES_CONFIG.map((config, i) => {
          const clanData = clans[i] ?? FALLBACK_CLAN
          return (
            <GuildeCard
              key={config.tag}
              name={clanData.name ?? config.staticName}
              tag={config.category}
              category={clanData.warLeague?.name ?? 'Non classé'}
              members={clanData.members ?? 0}
              maxMembers={50}
              description={config.description}
              hdvRequirement={config.hdvRequirement}
              primaryColor={config.primaryColor}
              primaryColorRgb={config.primaryColorRgb}
              logoUrl={config.logoUrl}
              logoDelay={config.logoDelay}
              discordUrl={config.discordUrl}
              warLeague={clanData.warLeague?.name ?? 'Non classé'}
            />
          )
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

export default async function HomePage() {
  const clans = await getAllClansInfo()
  const totalMembers = clans.reduce((sum, clan) => sum + (clan?.members ?? 0), 0)

  return (
    <>
      <AnimatedBackground />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Navbar />
        <main style={{ paddingTop: '64px' }}>
          <HeroSection />
          <StatsBar totalMembers={totalMembers} />
          <GuildesSection clans={clans} />
        </main>
      </div>
    </>
  )
}
