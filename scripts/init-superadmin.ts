/**
 * Script d'initialisation du superadmin
 * Lance : npx tsx scripts/init-superadmin.ts
 *
 * Crée (ou met à jour) un compte admin dans la table players.
 * Le tag et le mot de passe sont demandés en arguments ou en dur ici.
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as bcrypt from 'bcryptjs'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ─── CONFIG ────────────────────────────────────────────────
// Remplace ces valeurs par les vraies infos du superadmin
const ADMIN_TAG      = process.argv[2] || '#SUPERADMIN'   // tag COC ou tag fictif
const ADMIN_PSEUDO   = process.argv[3] || 'Admin'
const ADMIN_PASSWORD = process.argv[4] || 'changeme123'   // mot de passe initial
const ADMIN_CLAN_TAG = process.argv[5] || '#2RJJJ2V09'    // clan principal
// ────────────────────────────────────────────────────────────

async function initSuperAdmin() {
  console.log(`\n🔧 Initialisation du superadmin...`)
  console.log(`   Tag      : ${ADMIN_TAG}`)
  console.log(`   Pseudo   : ${ADMIN_PSEUDO}`)
  console.log(`   Clan     : ${ADMIN_CLAN_TAG}\n`)

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10)

  const adminData = {
    tag: ADMIN_TAG.toUpperCase(),
    pseudo: ADMIN_PSEUDO,
    clan_tag: ADMIN_CLAN_TAG,
    password_hash: passwordHash,
    is_admin: true,
    first_login: false,   // l'admin n'a pas besoin de changer son MDP au premier login
    hdv_level: 1,         // valeur minimale pour satisfaire la contrainte CHECK
    league: '',
    trophies: 0,
    best_trophies: 0,
    exp_level: 0,
    role: 'chef',         // valeurs valides : 'membre', 'ancien', 'co-chef', 'chef'
    dons: 0,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('players')
    .upsert(adminData, { onConflict: 'tag', ignoreDuplicates: false })
    .select('id, pseudo, tag, is_admin')
    .single()

  if (error) {
    console.error('❌ Erreur lors de la création du superadmin :', error.message)
    console.error('   Détail :', error)
    process.exit(1)
  }

  console.log('✅ Superadmin créé / mis à jour avec succès !')
  console.log(`   ID     : ${data.id}`)
  console.log(`   Pseudo : ${data.pseudo}`)
  console.log(`   Tag    : ${data.tag}`)
  console.log(`   Admin  : ${data.is_admin}`)
  console.log(`\n   Connexion : pseudo="${ADMIN_PSEUDO}", mot de passe="${ADMIN_PASSWORD}"`)
  console.log('   ⚠️  Change ce mot de passe dès la première connexion !\n')
}

initSuperAdmin().catch(console.error)
