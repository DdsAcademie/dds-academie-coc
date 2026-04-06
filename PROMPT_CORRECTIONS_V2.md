# PROMPT — Corrections & Améliorations Page d'accueil DDS Cluster (V2)

## Contexte

Le site est en ligne sur https://dds-academie-coc.vercel.app/
Le design global est validé. Cette tâche concerne des corrections précises et des améliorations importantes.
Lire attentivement chaque section avant de toucher au code.

---

## RÉSUMÉ DES CHANGEMENTS

1. Déplacer les 3 pills de guildes hors de la navbar → les placer dans le Hero, au-dessus du titre
2. Connecter les vraies données des clans via l'API Clash of Clans
3. Remplacer les stats globales par les vraies données calculées depuis l'API
4. Intégrer les vrais logos depuis Supabase Storage avec une animation de lévitation
5. Supprimer la stat "Ligue CWL" globale et l'afficher par clan dans chaque carte

---

## CHANGEMENT 1 — Repositionnement des pills de guildes

### Situation actuelle
Les 3 pills (DDS ACADÉMIE / OPENSYS / いえすぽす) sont dans la Navbar, au centre.

### Ce qu'il faut faire
- **Retirer les 3 pills de la Navbar complètement**
- **Les placer dans le Hero**, entre le pré-titre "✦ Clash of Clans · Cluster Officiel ✦" et le titre "DDS ALLIANCE"
- Elles doivent être parfaitement centrées horizontalement

### Nouveau layout du Hero (ordre vertical, tout centré)
```
1. "✦ Clash of Clans · Cluster Officiel ✦"   ← pré-titre bleu (existant)
2. [DDS ACADÉMIE] [OPENSYS] [いえすぽす]       ← pills ici (NOUVEAU)
3. "DDS ALLIANCE"                              ← titre principal (existant)
4. "3 GUILDES · 1 COMMUNAUTÉ"                 ← tagline (existant)
5. Description texte                           ← (existant)
6. Boutons CTA                                 ← (existant)
```

### Style des pills dans le Hero (adapter légèrement pour le Hero)
```css
/* Conteneur des 3 pills */
display: flex;
justify-content: center;
align-items: center;
gap: 0.75rem;
margin-bottom: 1.25rem;  /* espace avant le titre DDS ALLIANCE */
margin-top: 0.75rem;     /* espace après le pré-titre */

/* Chaque pill */
padding: 6px 18px;
border-radius: 20px;
font-size: 11px;
font-weight: 600;
letter-spacing: 1.5px;
cursor: pointer;
transition: all 0.2s;
```

Pills individuelles (mêmes couleurs qu'avant) :
- DDS ACADÉMIE : `color: #4a9eff`, `border: 1px solid rgba(74,158,255,0.45)`, `background: rgba(74,158,255,0.1)`
- OPENSYS : `color: #ff8c00`, `border: 1px solid rgba(255,140,0,0.45)`, `background: rgba(255,140,0,0.1)`
- いえすぽす : `color: #9b59ff`, `border: 1px solid rgba(155,89,255,0.45)`, `background: rgba(155,89,255,0.1)`

Hover sur chaque pill : augmenter le background opacity à 0.2

### Navbar après modification
La navbar ne contient plus que :
- Gauche : Logo "DDS CLUSTER"
- Droite : ACCUEIL | CLASSEMENTS | RECRUTEMENT | bouton CONNEXION

---

## CHANGEMENT 2 — Intégration de l'API Clash of Clans

### Tags des 3 clans
```
DDS Académie : #2RJJJ2V09
OpenSys      : #8CLGGL8V
いえすぽす    : #99UPQRLJ
```

### Fichier à créer : `app/lib/coc-api.ts`

Ce fichier centralise tous les appels à l'API COC. La clé API est dans les variables d'environnement.

```typescript
const COC_API_BASE = 'https://api.clashofclans.com/v1'
const COC_API_KEY = process.env.COC_API_KEY!

/**
 * Encode le tag COC pour l'URL (# → %23)
 */
function encodeTag(tag: string): string {
  return encodeURIComponent(tag.startsWith('#') ? tag : `#${tag}`)
}

/**
 * Headers communs pour tous les appels API
 */
function getHeaders() {
  return {
    'Authorization': `Bearer ${COC_API_KEY}`,
    'Content-Type': 'application/json',
  }
}

/**
 * Récupère les infos d'un clan par son tag
 */
export async function getClanInfo(tag: string) {
  const response = await fetch(
    `${COC_API_BASE}/clans/${encodeTag(tag)}`,
    {
      headers: getHeaders(),
      next: { revalidate: 300 }, // cache 5 minutes (Next.js)
    }
  )

  if (!response.ok) {
    throw new Error(`Erreur API COC pour ${tag}: ${response.status}`)
  }

  return response.json()
}

/**
 * Récupère les infos des 3 clans en parallèle
 */
export async function getAllClansInfo() {
  const tags = ['#2RJJJ2V09', '#8CLGGL8V', '#99UPQRLJ']
  
  const results = await Promise.allSettled(
    tags.map(tag => getClanInfo(tag))
  )

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value
    } else {
      console.error(`Erreur clan ${tags[index]}:`, result.reason)
      return null
    }
  })
}
```

### Données retournées par l'API COC (champs utiles)

L'API COC retourne pour chaque clan un objet avec ces champs (entre autres) :
```json
{
  "name": "DDS Académie",
  "tag": "#2RJJJ2V09",
  "members": 50,
  "clanLevel": 15,
  "warWinStreak": 3,
  "warWins": 120,
  "warTies": 2,
  "warLosses": 10,
  "clanPoints": 45000,
  "requiredTrophies": 0,
  "warFrequency": "always",
  "isWarLogPublic": true,
  "warLeague": {
    "id": 48000015,
    "name": "Legend League"
  },
  "memberList": [...],
  "description": "..."
}
```

**Champs à utiliser dans les cartes de guildes :**
- `name` → nom du clan
- `members` → nombre de membres actuels
- `clanLevel` → niveau du clan
- `warLeague.name` → ligue CWL (ex: "Legend League")
- `warWins` → nombre de victoires en guerre

---

## CHANGEMENT 3 — Stats globales recalculées depuis l'API

### Fichier à modifier : page d'accueil (Server Component)

La page d'accueil doit être un **Server Component** qui appelle `getAllClansInfo()` au chargement.

### Stat "Membres actifs" (anciennement hardcodé à 148)
```typescript
// Calculer la somme réelle des membres des 3 clans
const totalMembers = clans.reduce((sum, clan) => sum + (clan?.members ?? 0), 0)
```
Afficher ce total dynamiquement.

### Stat "Ligue CWL" — SUPPRIMÉE du bloc global
**Retirer la stat "Ligue CWL" de la StatsBar globale.**
La remplacer par la stat "Niveau moyen des clans" ou simplement laisser 3 stats au lieu de 4.

**Nouveau bloc de 3 stats :**
```
[3 GUILDES]   [X MEMBRES ACTIFS (total réel)]   [XX% PARTICIPATION GUERRE]
```
La grille passe de `repeat(4, 1fr)` à `repeat(3, 1fr)`.

### Dans les cartes de guildes — Ajouter la ligue CWL par clan
Dans chaque `GuildeCard`, ajouter sous le nom du clan :
```tsx
<div className="clan-league">
  {/* Icône de ligue + nom */}
  <span>⚔ {clan.warLeague?.name ?? 'Non classé'}</span>
</div>
```
Style :
```css
color: #c8a84b;
font-size: 11px;
letter-spacing: 1px;
margin-bottom: 0.5rem;
```

### Affichage du nombre de membres (dynamique)
Dans chaque carte, remplacer le hardcodé par :
```tsx
<div>
  <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>
    {clan.members}
  </span>
  <span style={{ fontSize: '13px', color: '#6677aa' }}>
    {' '}/ 50 membres
  </span>
</div>
```

---

## CHANGEMENT 4 — Intégration des vrais logos avec animation de lévitation

### Logos disponibles dans Supabase Storage
Bucket : `LOGOS-DDS` (public)
URL de base : `https://khwjpdbckcgurxzawxie.supabase.co/storage/v1/object/public/LOGOS-DDS/`

Fichiers :
```
DDS-Academie-logo.png  → pour DDS Académie
OpenSys-logo.png       → pour OpenSys
いえすぽす.png          → pour いえすぽす
```

URLs complètes :
```
https://khwjpdbckcgurxzawxie.supabase.co/storage/v1/object/public/LOGOS-DDS/DDS-Academie-logo.png
https://khwjpdbckcgurxzawxie.supabase.co/storage/v1/object/public/LOGOS-DDS/OpenSys-logo.png
https://khwjpdbckcgurxzawxie.supabase.co/storage/v1/object/public/LOGOS-DDS/いえすぽす.png
```

### Remplacement dans GuildeCard

Remplacer le placeholder emoji par une vraie image :

```tsx
<div className="logo-container">
  <img
    src={logoUrl}
    alt={`Logo ${name}`}
    className="clan-logo"
  />
</div>
```

### Style du conteneur logo
```css
.logo-container {
  width: 88px;
  height: 88px;
  margin: 0 auto 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Style de l'image logo
```css
.clan-logo {
  width: 88px;
  height: 88px;
  object-fit: contain;
  border-radius: 50%;
  /* L'animation de lévitation est appliquée ici */
  animation: levitation 3s ease-in-out infinite;
  /* Chaque clan a un délai différent pour ne pas être synchronisés */
}
```

### Animation de lévitation (dans globals.css)
```css
@keyframes levitation {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
```

### Délais par clan (pour désynchroniser)
- DDS Académie : `animation-delay: 0s`
- OpenSys : `animation-delay: 1s`
- いえすぽす : `animation-delay: 2s`

Appliquer via un style inline sur l'image ou via une classe :
```tsx
<img
  style={{ animationDelay: `${logoDelay}s` }}
  className="clan-logo"
  ...
/>
```

### Ajouter le domaine Supabase dans next.config.ts
```typescript
const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'khwjpdbckcgurxzawxie.supabase.co'
    ],
  },
}
```

⚠️ Utiliser une balise `<img>` classique (pas `next/image`) pour éviter les complications de configuration. Les logos viennent d'un storage public et n'ont pas besoin d'optimisation Next.js Image.

---

## RÉCAPITULATIF DES FICHIERS À MODIFIER

```
app/
├── page.tsx                    ← Rendre Server Component, appel API COC, passer données aux composants
├── lib/
│   └── coc-api.ts             ← NOUVEAU : fonctions d'appel API COC
├── components/
│   ├── Navbar.tsx             ← Retirer les pills de guildes
│   ├── HeroSection.tsx        ← Ajouter les pills au bon endroit
│   ├── StatsBar.tsx           ← Passer de 4 à 3 stats, membres dynamique
│   └── GuildeCard.tsx         ← Vrais logos + animation + données API
app/globals.css                 ← Ajouter @keyframes levitation
next.config.ts                  ← Domaine Supabase dans images.domains
```

---

## ARCHITECTURE SERVER / CLIENT

### page.tsx → Server Component
```tsx
// app/page.tsx — PAS de "use client"
import { getAllClansInfo } from '@/app/lib/coc-api'

export default async function HomePage() {
  const clans = await getAllClansInfo()
  
  // clan[0] = DDS Académie (#2RJJJ2V09)
  // clan[1] = OpenSys (#8CLGGL8V)
  // clan[2] = いえすぽす (#99UPQRLJ)
  
  const totalMembers = clans.reduce((sum, clan) => sum + (clan?.members ?? 0), 0)

  return (
    <>
      <AnimatedBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
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
```

### StatsBar → accepter totalMembers en prop
```typescript
interface StatsBarProps {
  totalMembers: number
}
```

### GuildesSection → accepter clans en prop
```typescript
interface GuildesSectionProps {
  clans: any[]  // ou typer selon la réponse API COC
}
```

### Données statiques des guildes (à merger avec les données API)

Créer un fichier `app/lib/guildes-config.ts` qui contient les infos statiques de chaque guilde :

```typescript
export const GUILDES_CONFIG = [
  {
    tag: '#2RJJJ2V09',
    staticName: 'DDS Académie',
    category: '#PRINCIPALE',
    description: 'Guilde principale du cluster. Guerres quotidiennes, CWL en ligue Légendaire. L\'excellence avant tout.',
    hdvRequirement: 'HDV 17+ REQUIS',
    primaryColor: '#4a9eff',
    primaryColorRgb: '74,158,255',
    logoUrl: 'https://khwjpdbckcgurxzawxie.supabase.co/storage/v1/object/public/LOGOS-DDS/DDS-Academie-logo.png',
    logoDelay: 0,
    discordUrl: 'https://discord.gg/P48WHFXaGT',
  },
  {
    tag: '#8CLGGL8V',
    staticName: 'OpenSys',
    category: '#COMPÉTITIVE',
    description: 'Style agressif, perfecteurs. Full Max obligatoire. Participation aux guerres requise sans exception.',
    hdvRequirement: 'HDV 9+ FULL MAX',
    primaryColor: '#ff8c00',
    primaryColorRgb: '255,140,0',
    logoUrl: 'https://khwjpdbckcgurxzawxie.supabase.co/storage/v1/object/public/LOGOS-DDS/OpenSys-logo.png',
    logoDelay: 1,
    discordUrl: 'https://discord.gg/P48WHFXaGT',
  },
  {
    tag: '#99UPQRLJ',
    staticName: 'いえすぽす',
    category: '#INTERNATIONALE',
    description: 'Guilde à dominante japonaise. Esprit communautaire fort, stratégies élaborées. HDV 15+ Full Max.',
    hdvRequirement: 'HDV 15+ FULL MAX',
    primaryColor: '#9b59ff',
    primaryColorRgb: '155,89,255',
    logoUrl: 'https://khwjpdbckcgurxzawxie.supabase.co/storage/v1/object/public/LOGOS-DDS/いえすぽす.png',
    logoDelay: 2,
    discordUrl: 'https://discord.gg/P48WHFXaGT',
  },
]
```

---

## GESTION DES ERREURS API

Si l'API COC est inaccessible ou retourne une erreur, utiliser des valeurs de fallback pour ne pas casser la page :

```typescript
// Fallback si le clan n'est pas récupéré
const fallbackClan = {
  members: 0,
  warLeague: { name: 'Non classé' },
  clanLevel: 0,
}

// Dans la page
const clan = clans[0] ?? fallbackClan
```

---

## VÉRIFICATIONS AVANT COMMIT

1. Tester que l'API COC répond bien en local :
```bash
curl -H "Authorization: Bearer $COC_API_KEY" \
  "https://api.clashofclans.com/v1/clans/%232RJJJ2V09"
```

2. Vérifier que les logos s'affichent depuis Supabase Storage (URLs publiques)

3. Vérifier que les pills sont bien dans le Hero et plus dans la Navbar

4. Vérifier que le total des membres est la somme réelle des 3 clans

5. Build propre :
```bash
npm run build
```

6. Si build OK :
```bash
git add .
git commit -m "feat: vrais logos lévitation, API COC réelle, pills dans hero, stats dynamiques"
git push
```

---

## RÉSULTAT ATTENDU

- Les 3 pills de guildes sont au-dessus du titre "DDS ALLIANCE", parfaitement centrées
- Les vrais logos des clans s'affichent avec une animation de lévitation douce et désynchronisée
- Le nombre de membres total est calculé en temps réel depuis l'API COC
- Chaque carte de guilde affiche sa vraie ligue CWL et son vrai nombre de membres
- La navbar est épurée sans les pills
- La StatsBar a 3 colonnes au lieu de 4 (suppression de la ligue CWL globale)
