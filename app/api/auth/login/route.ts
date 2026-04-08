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
    const { pseudo, tag, email, password } = await request.json()

    let player = null

    // Connexion superadmin par email
    if (email && password) {
      const { data } = await supabase
        .from('players')
        .select('*')
        .eq('email', email)
        .eq('is_superadmin', true)
        .single()

      if (data) {
        const isValid = await bcrypt.compare(password, data.password_hash)
        if (isValid) player = data
      }
    }
    // Connexion joueur normal par pseudo + mot de passe
    else if (pseudo && password) {
      const { data } = await supabase
        .from('players')
        .select('*')
        .eq('pseudo', pseudo)
        .neq('tag', '#SUPERADMIN')
        .single()

      if (data) {
        const isValid = await bcrypt.compare(password, data.password_hash)
        if (isValid) player = data
      }
    } else {
      return NextResponse.json(
        { error: 'Identifiants manquants' },
        { status: 400 }
      )
    }

    if (!player) {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      )
    }

    // Générer le JWT
    const token = jwt.sign(
      {
        playerId: player.id,
        pseudo: player.pseudo,
        tag: player.tag,
        clanTag: player.clan_tag,
        isAdmin: player.is_admin,
        isSuperAdmin: player.is_superadmin,
        firstLogin: player.first_login,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({
      success: true,
      firstLogin: player.first_login,
      isAdmin: player.is_admin,
      isSuperAdmin: player.is_superadmin,
      player: {
        id: player.id,
        pseudo: player.pseudo,
        tag: player.tag,
        clanTag: player.clan_tag,
        isAdmin: player.is_admin,
        isSuperAdmin: player.is_superadmin,
        hdvLevel: player.hdv_level,
        league: player.league,
        trophies: player.trophies,
        expLevel: player.exp_level,
      }
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
    console.error('Erreur login:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
