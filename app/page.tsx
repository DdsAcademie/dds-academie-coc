import AnimatedBackground from './components/AnimatedBackground'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsBar from './components/StatsBar'
import GuildeCard from './components/GuildeCard'
import { getAllClansInfo } from './lib/coc-api'
import { GUILDES_CONFIG } from './lib/guildes-config'

export const dynamic = 'force-dynamic'

type GuildeWithApi = typeof GUILDES_CONFIG[0] & { apiData: Record<string, unknown> | null }

function GuildesSection({ guildes }: { guildes: GuildeWithApi[] }) {
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
        {guildes.map((guilde) => {
          const api = guilde.apiData as Record<string, unknown> | null
          const warLeagueName = (api?.warLeague as Record<string, unknown> | null)?.name as string | undefined
          return (
            <GuildeCard
              key={guilde.tag}
              name={(api?.name as string) || guilde.staticName}
              tag={guilde.tag}
              category={guilde.category}
              members={(api?.members as number) ?? 0}
              maxMembers={50}
              description={guilde.description}
              apiData={api}
              hdvRequirement={guilde.hdvRequirement}
              primaryColor={guilde.primaryColor}
              primaryColorRgb={guilde.primaryColorRgb}
              logoUrl={guilde.logoUrl}
              logoDelay={guilde.logoDelay}
              discordUrl={guilde.discordUrl}
              warLeague={warLeagueName || 'Non classé'}
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
  const clansData = await getAllClansInfo()

  const totalMembers = clansData.reduce(
    (sum, clan) => sum + ((clan?.members as number) ?? 0), 0
  )

  const guildes = GUILDES_CONFIG.map((config, index) => ({
    ...config,
    apiData: clansData[index],
  }))

  return (
    <>
      <AnimatedBackground />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Navbar />
        <main style={{ paddingTop: '64px' }}>
          <HeroSection />
          <StatsBar totalMembers={totalMembers} />
          <GuildesSection guildes={guildes} />
        </main>
      </div>
    </>
  )
}
