import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    // Vérifier que c'est un admin
    const token = request.cookies.get('dds_token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
    if (!decoded.isAdmin) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    const { playerTag } = await request.json()

    // Récupérer le joueur
    const { data: player } = await supabase
      .from('players')
      .select('*')
      .eq('tag', playerTag)
      .single()

    if (!player) {
      return NextResponse.json({ error: 'Joueur non trouvé' }, { status: 404 })
    }

    // Réinitialiser au tag par défaut
    const defaultPassword = player.tag
    const passwordHash = await bcrypt.hash(defaultPassword, 10)

    await supabase
      .from('players')
      .update({
        password_hash: passwordHash,
        first_login: true,
        updated_at: new Date().toISOString(),
      })
      .eq('tag', playerTag)

    return NextResponse.json({
      success: true,
      message: `Mot de passe réinitialisé pour ${player.pseudo}. Il devra changer son mot de passe à la prochaine connexion.`
    })

  } catch (error) {
    console.error('Erreur reset:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
