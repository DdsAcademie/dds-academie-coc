# DDS Académie — Clash of Clans

Site officiel du clan **DDS Académie** sur Clash of Clans.

## Stack technique

- **Frontend & Backend** : [Next.js 15](https://nextjs.org/) (App Router, TypeScript)
- **Hébergement** : [Vercel](https://vercel.com/)
- **Base de données** : [Supabase](https://supabase.com/) (PostgreSQL)
- **Styles** : [Tailwind CSS](https://tailwindcss.com/)

## Installation

```bash
# Cloner le repo
git clone https://github.com/DdsAcademie/dds-academie-coc.git
cd dds-academie-coc

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local
# Remplir les valeurs dans .env.local

# Lancer en développement
npm run dev
```

## Variables d'environnement

Copie `.env.example` en `.env.local` et remplis :

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
```

## Structure du projet

```
dds-academie-coc/
├── app/
│   ├── api/          # Routes API
│   ├── components/   # Composants React
│   ├── lib/
│   │   └── supabase/ # Clients Supabase (client + server)
│   ├── layout.tsx
│   └── page.tsx
├── public/           # Assets statiques
├── supabase/
│   └── migrations/   # Migrations SQL
├── types/            # Types TypeScript globaux
└── .env.example
```

## Déploiement

Le projet est déployé automatiquement sur **Vercel** à chaque push sur `main`.

Les variables d'environnement doivent être configurées dans le dashboard Vercel.
