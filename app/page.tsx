import AnimatedBackground from './components/AnimatedBackground'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsBar from './components/StatsBar'
import GuildeCard from './components/GuildeCard'

const GUILDES = [
  {
    name: 'DDS Académie',
    tag: '#PRINCIPALE',
    category: 'Élite Compétitive',
    members: 50,
    maxMembers: 50,
    description:
      "Guilde principale du cluster. Guerres quotidiennes, CWL en ligue Légendaire. L'excellence avant tout.",
    hdvRequirement: 'HDV 17+ REQUIS',
    primaryColor: '#4a9eff',
    primaryColorRgb: '74,158,255',
    logoEmoji: '⚔️',
    discordUrl: 'https://discord.gg/P48WHFXaGT',
  },
  {
    name: 'OpenSys',
    tag: '#COMPÉTITIVE',
    category: 'Perfecteurs',
    members: 48,
    maxMembers: 50,
    description:
      'Style agressif, perfecteurs. Full Max obligatoire. Participation aux guerres requise sans exception.',
    hdvRequirement: 'HDV 9+ FULL MAX',
    primaryColor: '#ff8c00',
    primaryColorRgb: '255,140,0',
    logoEmoji: '🐯',
    discordUrl: 'https://discord.gg/P48WHFXaGT',
  },
  {
    name: 'いえすぽす',
    tag: '#INTERNATIONALE',
    category: 'Communautaire',
    members: 45,
    maxMembers: 50,
    description:
      'Guilde à dominante japonaise. Esprit communautaire fort, stratégies élaborées. HDV 15+ Full Max.',
    hdvRequirement: 'HDV 15+ FULL MAX',
    primaryColor: '#9b59ff',
    primaryColorRgb: '155,89,255',
    logoEmoji: '狼',
    discordUrl: 'https://discord.gg/P48WHFXaGT',
  },
]

function GuildesSection() {
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
        {GUILDES.map((guilde) => (
          <GuildeCard key={guilde.name} {...guilde} />
        ))}
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

export default function HomePage() {
  return (
    <>
      <AnimatedBackground />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Navbar />
        <main style={{ paddingTop: '64px' }}>
          <HeroSection />
          <StatsBar />
          <GuildesSection />
        </main>
      </div>
    </>
  )
}
