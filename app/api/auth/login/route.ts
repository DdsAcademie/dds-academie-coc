import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(request: NextRequest) {
  try {
    const { pseudo, tag } = await request.json()

    if (!pseudo || !tag) {
      return NextResponse.json(
        { error: 'Pseudo et tag requis' },
        { status: 400 }
      )
    }

    // Normaliser le tag (ajouter # si manquant, mettre en majuscules)
    const normalizedTag = tag.startsWith('#')
      ? tag.toUpperCase()
      : `#${tag.toUpperCase()}`

    // Chercher le joueur par pseudo ET tag
    const { data: player, error } = await supabase
      .from('players')
      .select('*')
      .eq('pseudo', pseudo)
      .eq('tag', normalizedTag)
      .single()

    if (error || !player) {
      return NextResponse.json(
        { error: 'Joueur non trouvé. Vérifie ton pseudo et ton tag.' },
        { status: 401 }
      )
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(tag, player.password_hash)
    // Essayer aussi avec le tag normalisé
    const isValidNormalized = await bcrypt.compare(normalizedTag, player.password_hash)

    if (!isValidPassword && !isValidNormalized) {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      )
    }

    // Générer le token JWT
    const token = jwt.sign(
      {
        playerId: player.id,
        pseudo: player.pseudo,
        tag: player.tag,
        clanTag: player.clan_tag,
        isAdmin: player.is_admin,
        firstLogin: player.first_login,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Réponse avec le token dans un cookie httpOnly
    const response = NextResponse.json({
      success: true,
      firstLogin: player.first_login,
      player: {
        id: player.id,
        pseudo: player.pseudo,
        tag: player.tag,
        clanTag: player.clan_tag,
        isAdmin: player.is_admin,
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
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    })

    return response

  } catch (error) {
    console.error('Erreur login:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
