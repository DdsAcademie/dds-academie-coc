/**
 * Initialise le compte superadmin avec le mot de passe hashé
 * Lance : npx tsx scripts/init-superadmin.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function initSuperAdmin() {
  // Mot de passe initial : "Azerty" — À CHANGER IMMÉDIATEMENT APRÈS
  const passwordHash = await bcrypt.hash('Azerty', 10)

  const { error } = await supabase
    .from('players')
    .update({
      password_hash: passwordHash,
      email: 'ddsacademie@proton.me',
      is_admin: true,
      is_superadmin: true,
      first_login: false,
    })
    .eq('tag', '#SUPERADMIN')

  if (error) {
    console.error('❌ Erreur:', error.message)
    console.error('   (Si "column is_superadmin does not exist", exécute d\'abord le SQL de TÂCHE 1 dans Supabase)')
  } else {
    console.log('✅ SuperAdmin initialisé !')
    console.log('   Tag      : #SUPERADMIN')
    console.log('   Email    : ddsacademie@proton.me')
    console.log('   Mot de passe : Azerty')
    console.log('   ⚠️  Change ton mot de passe immédiatement après connexion !')
  }
}

initSuperAdmin()
