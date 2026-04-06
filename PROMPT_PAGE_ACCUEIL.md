# PROMPT — Page d'accueil DDS Cluster

## Contexte du projet

Tu travailles sur le site **DDS Cluster**, un portail officiel pour un cluster de clans Clash of Clans composé de 3 guildes :
- **DDS Académie** (clan principal, thème bleu électrique)
- **OpenSys** (clan compétitif, thème orange/feu)
- **いえすぽす** (clan international, thème violet/électrique)

Stack technique : Next.js 15 App Router, TypeScript strict, Tailwind CSS, Supabase.
Repo GitHub : https://github.com/DdsAcademie/dds-academie-coc

---

## Objectif de cette tâche

Construire la **page d'accueil complète** du site DDS Cluster avec un design moderne, immersif et vivant. Tout doit être parfaitement centré, aligné et propre. Aucune approximation sur les espacements.

---

## Fichiers à créer

```
app/
├── page.tsx                          ← Page d'accueil principale
├── components/
│   ├── AnimatedBackground.tsx        ← Canvas animé (fond)
│   ├── Navbar.tsx                    ← Barre de navigation
│   ├── LoginPanel.tsx                ← Panel de connexion flottant
│   ├── HeroSection.tsx               ← Section hero centrale
│   ├── StatsBar.tsx                  ← Barre de statistiques
│   └── GuildeCard.tsx                ← Carte de guilde réutilisable
app/globals.css                       ← Ajouter les fonts Google
```

---

## 1. FOND ANIMÉ — `AnimatedBackground.tsx`

### Description générale
Composant client (`"use client"`) avec un `<canvas>` en `position: fixed`, plein écran, derrière tout le contenu (`z-index: 0`). Le fond de base est `#030712`. L'animation tourne en continu avec `requestAnimationFrame`.

### Couleur de fond
```
background: #030712
```

### Orbes lumineux (4 orbes)
Chaque orbe est un `radialGradient` circulaire qui se déplace lentement de manière sinusoïdale. Les orbes donnent une ambiance de lumière colorée diffuse.

| Orbe | Position X | Position Y | Couleur RGB | Rayon | Opacité centre |
|------|-----------|-----------|-------------|-------|----------------|
| 1 | 15% largeur | 30% hauteur | 74,158,255 (bleu) | 250px | 0.12 |
| 2 | 85% largeur | 20% hauteur | 200,168,75 (or) | 300px | 0.10 |
| 3 | 50% largeur | 80% hauteur | 155,89,255 (violet) | 200px | 0.12 |
| 4 | 30% largeur | 65% hauteur | 255,140,0 (orange) | 180px | 0.08 |

Mouvement de chaque orbe :
```
x_final = x_base + Math.sin(t * 0.0008 + index) * 40
y_final = y_base + Math.cos(t * 0.0006 + index) * 25
```
Le gradient va de l'opacité maximum au centre à 0 au bord.

### Particules flottantes (80 particules)
Chaque particule est un petit cercle coloré qui se déplace en ligne droite et rebondit sur les bords (wrap-around).

Initialisation de chaque particule :
```typescript
{
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 1.5 + 0.3,       // entre 0.3 et 1.8px
  vx: (Math.random() - 0.5) * 0.3,          // vitesse lente
  vy: (Math.random() - 0.5) * 0.3,
  opacity: Math.random() * 0.5 + 0.1,       // entre 0.1 et 0.6
  color: choix aléatoire parmi :
    '#c8a84b' (or),
    '#4a9eff' (bleu),
    '#9b59ff' (violet),
    '#ff8c00' (orange)
}
```

Comportement : si une particule sort des bords, elle réapparaît du côté opposé (wrap-around, pas de rebond).

### Code de resize
```typescript
useEffect(() => {
  const handleResize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  handleResize()
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])
```

### Style du canvas
```css
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 0;
pointer-events: none;
```

---

## 2. NAVBAR — `Navbar.tsx`

### Structure générale
Barre fixe en haut (`position: fixed`, `top: 0`, `z-index: 50`), hauteur `64px`, largeur `100%`.

### Background
```css
background: rgba(3, 7, 18, 0.75);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border-bottom: 1px solid rgba(200, 168, 75, 0.15);
```

### Layout interne (flex, 3 zones)
```
[LOGO GAUCHE]     [GUILDES CENTRE]     [LIENS + CONNEXION DROITE]
```
Utiliser `justify-content: space-between` avec `align-items: center` et `padding: 0 2rem`.

### Zone gauche — Logo
```
"DDS " en couleur #c8a84b, font-weight: 800, font-size: 18px, letter-spacing: 3px
"CLUSTER" en couleur #ffffff, même style
```
Pas d'espace entre les deux mots, c'est un seul bloc visuellement.

### Zone centre — Pills des 3 guildes
3 boutons pill côte à côte avec `gap: 0.75rem`.

**DDS ACADÉMIE pill :**
```css
color: #4a9eff;
border: 1px solid rgba(74, 158, 255, 0.45);
background: rgba(74, 158, 255, 0.08);
padding: 5px 16px;
border-radius: 20px;
font-size: 11px;
letter-spacing: 1.5px;
font-weight: 600;
cursor: pointer;
transition: all 0.2s;
```
Hover : `background: rgba(74, 158, 255, 0.18)`

**OPENSYS pill :**
```css
color: #ff8c00;
border: 1px solid rgba(255, 140, 0, 0.45);
background: rgba(255, 140, 0, 0.08);
/* reste identique */
```
Hover : `background: rgba(255, 140, 0, 0.18)`

**いえすぽす pill :**
```css
color: #9b59ff;
border: 1px solid rgba(155, 89, 255, 0.45);
background: rgba(155, 89, 255, 0.08);
/* reste identique */
```
Hover : `background: rgba(155, 89, 255, 0.18)`

### Zone droite — Liens + Connexion
Liens de navigation :
```
ACCUEIL   CLASSEMENTS   RECRUTEMENT
```
Style des liens :
```css
color: #8899bb;
font-size: 11px;
letter-spacing: 1.5px;
cursor: pointer;
transition: color 0.2s;
```
Hover : `color: #c8a84b`

**Bouton CONNEXION :**
```css
background: linear-gradient(135deg, #c8a84b, #f0c060);
border: none;
color: #030712;
padding: 8px 20px;
border-radius: 20px;
font-size: 11px;
font-weight: 700;
letter-spacing: 1.5px;
cursor: pointer;
transition: opacity 0.2s;
```
Hover : `opacity: 0.85`

Au clic, toggle l'affichage du `LoginPanel`.

---

## 3. LOGIN PANEL — `LoginPanel.tsx`

### Positionnement
`position: absolute`, `top: 70px`, `right: 2rem`. S'affiche/masque via une prop `isOpen: boolean`.

### Style du panel
```css
background: rgba(10, 14, 30, 0.96);
backdrop-filter: blur(24px);
border: 1px solid rgba(200, 168, 75, 0.25);
border-radius: 16px;
padding: 1.5rem;
width: 290px;
z-index: 100;
box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(200, 168, 75, 0.05);
```

### Contenu du panel

**Titre :**
```
"ESPACE MEMBRE"
color: #c8a84b
font-size: 12px
letter-spacing: 3px
text-align: center
margin-bottom: 1.5rem
```

**Ligne décorative sous le titre :**
```css
width: 60px;
height: 1px;
background: linear-gradient(to right, transparent, #c8a84b, transparent);
margin: 0 auto 1.5rem;
```

**Champ Pseudo :**
- Label : "PSEUDO" en `#6677aa`, `font-size: 10px`, `letter-spacing: 1.5px`, `margin-bottom: 6px`
- Input :
```css
width: 100%;
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(200, 168, 75, 0.2);
border-radius: 8px;
color: #ffffff;
padding: 10px 14px;
font-size: 13px;
outline: none;
transition: border-color 0.2s;
```
Focus : `border-color: rgba(200, 168, 75, 0.5)`
Placeholder : "Almin_Ox" en `#4a5568`

**Champ Tag :**
- Label : "TAG DE JEU"
- Input identique, placeholder : "#9J8Y0QYC0"
- Texte aide sous le champ : "Ton identifiant Clash of Clans" en `#4a9eff`, `font-size: 10px`, `margin-top: 4px`

**Bouton SE CONNECTER :**
```css
width: 100%;
background: linear-gradient(135deg, #c8a84b, #f0c060);
border: none;
color: #030712;
padding: 11px;
border-radius: 8px;
font-size: 12px;
font-weight: 700;
letter-spacing: 2px;
cursor: pointer;
margin-top: 0.5rem;
transition: opacity 0.2s;
```

---

## 4. HERO SECTION — `HeroSection.tsx`

### Layout
Centré horizontalement et verticalement, `padding-top: 120px` (pour laisser place à la navbar fixe), `padding-bottom: 3rem`, `text-align: center`.

### Élément 1 — Pré-titre
```
"✦  Clash of Clans · Cluster Officiel  ✦"
color: rgba(74, 158, 255, 0.85)
font-size: 11px
letter-spacing: 4px
text-transform: uppercase
margin-bottom: 1rem
```

### Élément 2 — Titre principal
```
"DDS " → color: #ffffff
"ALLIANCE" → background: linear-gradient(135deg, #c8a84b, #f0c060)
             -webkit-background-clip: text
             -webkit-text-fill-color: transparent
             background-clip: text

font-size: clamp(40px, 6vw, 64px)
font-weight: 800
letter-spacing: 4px
line-height: 1
margin-bottom: 0.75rem
```

### Élément 3 — Tagline
```
"3 GUILDES  ·  1 COMMUNAUTÉ"
color: #6677aa
font-size: 12px
letter-spacing: 5px
margin-bottom: 1.5rem
```

### Élément 4 — Description
```
"Bienvenue sur le portail officiel du cluster DDS.
Retrouvez les statistiques en temps réel, les classements,
et rejoignez notre communauté sur Discord."

color: #8899bb
font-size: 15px
line-height: 1.8
max-width: 480px
margin: 0 auto 2.5rem
```

### Élément 5 — Boutons CTA (centrés, côte à côte)
`display: flex`, `gap: 1rem`, `justify-content: center`

**Bouton Discord :**
```css
background: #5865f2;
border: none;
color: #ffffff;
padding: 13px 28px;
border-radius: 25px;
font-size: 13px;
font-weight: 600;
letter-spacing: 1px;
cursor: pointer;
transition: all 0.2s;
```
Hover : `background: #4752c4`, légère translation `translateY(-1px)`
Texte : "▶  Rejoindre le Discord"

**Bouton Guildes :**
```css
background: transparent;
border: 1px solid rgba(200, 168, 75, 0.45);
color: #c8a84b;
padding: 13px 28px;
border-radius: 25px;
font-size: 13px;
letter-spacing: 1px;
cursor: pointer;
transition: all 0.2s;
```
Hover : `background: rgba(200, 168, 75, 0.08)`, légère translation `translateY(-1px)`
Texte : "Voir les guildes  →"

---

## 5. STATS BAR — `StatsBar.tsx`

### Conteneur
```css
margin: 0 2rem 2.5rem 2rem;
background: rgba(255, 255, 255, 0.025);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.07);
border-radius: 16px;
display: grid;
grid-template-columns: repeat(4, 1fr);
overflow: hidden;
```

### Chaque stat (séparateur vertical entre les colonnes)
```css
padding: 1.5rem 1rem;
text-align: center;
border-right: 1px solid rgba(255, 255, 255, 0.06);
/* Dernière colonne : pas de border-right */
```

### Valeurs des stats

**Stat 1 — Guildes :**
```
Valeur : "3"
color: #c8a84b, font-size: 30px, font-weight: 700
Label : "GUILDES"
color: #6677aa, font-size: 10px, letter-spacing: 2.5px, margin-top: 4px
```

**Stat 2 — Membres actifs :**
```
Valeur : inline flex avec "148" + point animé
"148" → color: #4a9eff, font-size: 30px, font-weight: 700
Point animé → width: 8px, height: 8px, border-radius: 50%
              background: #4a9eff, margin-left: 6px
              animation: pulse 2s infinite (scale 1 → 1.4 → 1, opacity 1 → 0.4 → 1)
Label : "MEMBRES ACTIFS"
```

**Stat 3 — Ligue CWL :**
```
Valeur : "Légendaire"
color: #c8a84b, font-size: 20px, font-weight: 700
Label : "LIGUE CWL"
```

**Stat 4 — Participation guerre :**
```
Valeur : "94%"
color: #c8a84b, font-size: 30px, font-weight: 700
Label : "PARTICIPATION GUERRE"
```

### Animation pulse (dans globals.css ou style tag)
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.4; }
}
```

---

## 6. CARTES GUILDES — `GuildeCard.tsx`

### Interface TypeScript
```typescript
interface GuildeCardProps {
  name: string
  tag: string
  category: string
  members: number
  maxMembers: number
  description: string
  hdvRequirement: string
  primaryColor: string        // ex: '#4a9eff'
  primaryColorRgb: string     // ex: '74,158,255'
  logoEmoji: string           // placeholder jusqu'aux vrais logos
  discordUrl: string
}
```

### Conteneur de la grille (dans page.tsx)
```css
padding: 0 2rem 3rem 2rem;
```

**Titre de section :**
```
display: flex, align-items: center, gap: 1.5rem
margin-bottom: 2rem

Ligne gauche :
  flex: 1, height: 1px
  background: linear-gradient(to right, transparent, rgba(200,168,75,0.3))

Texte :
  "✦  NOS GUILDES  ✦"
  color: #6677aa, font-size: 10px, letter-spacing: 4px

Ligne droite :
  flex: 1, height: 1px
  background: linear-gradient(to left, transparent, rgba(200,168,75,0.3))
```

**Grille :**
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 1.25rem;
```

### Style de chaque carte (dynamique selon la couleur)
```css
background: rgba({primaryColorRgb}, 0.04);
border: 1px solid rgba({primaryColorRgb}, 0.2);
border-radius: 16px;
padding: 1.75rem;
text-align: center;
position: relative;
overflow: hidden;
transition: transform 0.2s, border-color 0.2s;
```

Hover :
```css
transform: translateY(-4px);
border-color: rgba({primaryColorRgb}, 0.4);
```

**Ligne lumineuse en haut de la carte :**
```css
position: absolute;
top: 0;
left: 50%;
transform: translateX(-50%);
width: 60%;
height: 1px;
background: linear-gradient(to right, transparent, {primaryColor}, transparent);
```

**Logo placeholder (jusqu'aux vrais logos) :**
```css
width: 72px;
height: 72px;
border-radius: 50%;
background: rgba({primaryColorRgb}, 0.12);
border: 2px solid rgba({primaryColorRgb}, 0.35);
margin: 0 auto 1.25rem;
display: flex;
align-items: center;
justify-content: center;
font-size: 28px;
```
⚠️ Quand les vrais logos PNG arrivent, remplacer par une `<img>` avec `object-fit: cover`.

**Nom de la guilde :**
```css
color: {primaryColor};
font-size: 17px;
font-weight: 700;
letter-spacing: 1px;
margin-bottom: 4px;
```

**Tag/Catégorie :**
```css
color: rgba({primaryColorRgb}, 0.5);
font-size: 10px;
letter-spacing: 2.5px;
text-transform: uppercase;
margin-bottom: 1rem;
```

**Compteur membres :**
```
"50" → color: #ffffff, font-size: 28px, font-weight: 700
" / 50 membres" → color: #6677aa, font-size: 13px, font-weight: 400
```

**Description :**
```css
color: #8899bb;
font-size: 12.5px;
line-height: 1.7;
margin: 0.75rem 0 0.5rem;
```

**Badge HDV requis :**
```css
display: inline-block;
background: rgba({primaryColorRgb}, 0.1);
border: 1px solid rgba({primaryColorRgb}, 0.25);
color: {primaryColor};
padding: 3px 10px;
border-radius: 12px;
font-size: 10px;
letter-spacing: 1px;
margin-bottom: 1.25rem;
```
Texte : "HDV 17+ REQUIS" (selon la guilde)

**Boutons (2 colonnes) :**
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 8px;
margin-top: auto;
```

Bouton "VOIR LA GUILDE" :
```css
background: rgba({primaryColorRgb}, 0.1);
border: 1px solid rgba({primaryColorRgb}, 0.35);
color: {primaryColor};
padding: 9px 8px;
border-radius: 8px;
font-size: 10px;
letter-spacing: 1.5px;
font-weight: 600;
cursor: pointer;
transition: background 0.2s;
```
Hover : `background: rgba({primaryColorRgb}, 0.2)`

Bouton "DISCORD" :
```css
background: #5865f2;
border: none;
color: #ffffff;
padding: 9px 8px;
border-radius: 8px;
font-size: 10px;
letter-spacing: 1.5px;
font-weight: 600;
cursor: pointer;
transition: background 0.2s;
```
Hover : `background: #4752c4`

### Données des 3 guildes à passer en props

**DDS Académie :**
```typescript
{
  name: "DDS Académie",
  tag: "#PRINCIPALE",
  category: "Élite Compétitive",
  members: 50,
  maxMembers: 50,
  description: "Guilde principale du cluster. Guerres quotidiennes, CWL en ligue Légendaire. L'excellence avant tout.",
  hdvRequirement: "HDV 17+ REQUIS",
  primaryColor: "#4a9eff",
  primaryColorRgb: "74,158,255",
  logoEmoji: "⚔️",
  discordUrl: "https://discord.gg/P48WHFXaGT"
}
```

**OpenSys :**
```typescript
{
  name: "OpenSys",
  tag: "#COMPÉTITIVE",
  category: "Perfecteurs",
  members: 48,
  maxMembers: 50,
  description: "Style agressif, perfecteurs. Full Max obligatoire. Participation aux guerres requise sans exception.",
  hdvRequirement: "HDV 9+ FULL MAX",
  primaryColor: "#ff8c00",
  primaryColorRgb: "255,140,0",
  logoEmoji: "🐯",
  discordUrl: "https://discord.gg/P48WHFXaGT"
}
```

**いえすぽす :**
```typescript
{
  name: "いえすぽす",
  tag: "#INTERNATIONALE",
  category: "Communautaire",
  members: 45,
  maxMembers: 50,
  description: "Guilde à dominante japonaise. Esprit communautaire fort, stratégies élaborées. HDV 15+ Full Max.",
  hdvRequirement: "HDV 15+ FULL MAX",
  primaryColor: "#9b59ff",
  primaryColorRgb: "155,89,255",
  logoEmoji: "狼",
  discordUrl: "https://discord.gg/P48WHFXaGT"
}
```

---

## 7. PAGE PRINCIPALE — `app/page.tsx`

### Structure
```tsx
export default function HomePage() {
  return (
    <>
      <AnimatedBackground />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Navbar />
        <main>
          <HeroSection />
          <StatsBar />
          <GuildesSection />  {/* grille + titre */}
        </main>
      </div>
    </>
  )
}
```

### Navbar fixe → padding-top sur main
Puisque la Navbar est `position: fixed`, le `<main>` doit avoir `padding-top: 64px` pour ne pas être caché dessous.

---

## 8. GLOBALS.CSS — Ajouts nécessaires

```css
/* Import font moderne */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

/* Reset de base */
* {
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: #030712;
  color: #ffffff;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Scrollbar custom */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0a0e1a;
}
::-webkit-scrollbar-thumb {
  background: rgba(200, 168, 75, 0.3);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(200, 168, 75, 0.5);
}

/* Animation pulse pour le point live */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.4; }
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}
```

---

## 9. CONTRAINTES IMPORTANTES

### TypeScript
- Pas d'erreurs TypeScript
- Tous les composants typés proprement
- Utiliser `"use client"` pour AnimatedBackground, Navbar (état loginPanel), LoginPanel

### Centrage et alignement
- Tout ce qui doit être centré utilise soit `text-align: center` + `margin: 0 auto`, soit `flexbox` avec `justify-content: center` + `align-items: center`
- Les marges horizontales sont toujours `2rem` minimum
- Les cards de guildes ont exactement le même height (utiliser `align-items: stretch` sur la grille)

### Performance
- Le canvas `requestAnimationFrame` doit utiliser une ref pour le cleanup : `cancelAnimationFrame(animationId)` dans le return du useEffect
- Pas de re-render inutile sur les composants statiques

### Responsive (mobile)
Sur mobile (`< 768px`) :
- La grille de guildes passe en 1 colonne
- La navbar masque les liens de nav, garde seulement logo + bouton connexion
- Les pills de guildes passent en dessous ou dans un menu hamburger (simple toggle)

---

## 10. VÉRIFICATION FINALE

Avant de commit, exécuter :
```bash
npm run build
```

Si le build passe sans erreur :
```bash
git add .
git commit -m "feat: page accueil DDS Cluster - fond animé, navbar, hero, stats, guildes"
git push
```

Si des erreurs TypeScript apparaissent, les corriger avant de push.

---

## Résultat attendu

Une page d'accueil moderne et immersive avec :
- Un fond vivant avec des particules et des orbes lumineux colorés
- Une navbar glassmorphism avec les 3 guildes bien visibles
- Un hero percutant avec le titre en gradient or
- Des stats en temps réel bien présentées
- 3 cartes de guildes avec chacune sa couleur distinctive
- Tout parfaitement centré, propre, et sans approximation
