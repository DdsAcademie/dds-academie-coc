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
    // Vérifier le token JWT
    const token = request.cookies.get('dds_token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
    const { oldPassword, newPassword, confirmPassword } = await request.json()

    // Validations
    if (!oldPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'Les mots de passe ne correspondent pas' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit faire au moins 6 caractères' },
        { status: 400 }
      )
    }

    // Récupérer le joueur
    const { data: player } = await supabase
      .from('players')
      .select('*')
      .eq('id', decoded.playerId)
      .single()

    if (!player) {
      return NextResponse.json({ error: 'Joueur non trouvé' }, { status: 404 })
    }

    // Vérifier l'ancien mot de passe
    const isValid = await bcrypt.compare(oldPassword, player.password_hash)
    const isValidWithHash = await bcrypt.compare(
      oldPassword.startsWith('#') ? oldPassword : `#${oldPassword}`,
      player.password_hash
    )

    if (!isValid && !isValidWithHash) {
      return NextResponse.json(
        { error: 'Ancien mot de passe incorrect' },
        { status: 401 }
      )
    }

    // Hasher le nouveau mot de passe
    const newPasswordHash = await bcrypt.hash(newPassword, 10)

    // Mettre à jour
    await supabase
      .from('players')
      .update({
        password_hash: newPasswordHash,
        first_login: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', decoded.playerId)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Erreur changement mot de passe:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
