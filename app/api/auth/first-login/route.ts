import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  try {
    const { pseudo, tag, newPassword, confirmPassword } = await request.json()

    // Validations
    if (!pseudo || !tag || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'Les mots de passe ne correspondent pas' }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Le mot de passe doit faire au moins 6 caractères' }, { status: 400 })
    }

    // Normaliser le tag
    const normalizedTag = tag.startsWith('#') ? tag.toUpperCase() : `#${tag.toUpperCase()}`

    // Vérifier que le joueur existe
    const { data: player } = await supabase
      .from('players')
      .select('*')
      .eq('pseudo', pseudo)
      .eq('tag', normalizedTag)
      .single()

    if (!player) {
      return NextResponse.json(
        { error: 'Pseudo ou tag incorrect. Vérifie tes informations.' },
        { status: 401 }
      )
    }

    // Hasher le nouveau mot de passe
    const passwordHash = await bcrypt.hash(newPassword, 10)

    // Mettre à jour le joueur
    await supabase
      .from('players')
      .update({
        password_hash: passwordHash,
        first_login: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', player.id)

    // Connecter automatiquement après la première connexion
    const token = jwt.sign(
      {
        playerId: player.id,
        pseudo: player.pseudo,
        tag: player.tag,
        clanTag: player.clan_tag,
        isAdmin: player.is_admin,
        isSuperAdmin: player.is_superadmin,
        firstLogin: false,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({
      success: true,
      isAdmin: player.is_admin,
      isSuperAdmin: player.is_superadmin,
    })

    response.cookies.set('dds_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response

  } catch (error) {
    console.error('Erreur première connexion:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
