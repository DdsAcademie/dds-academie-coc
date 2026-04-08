import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  try {
    const token = request.cookies.get('dds_token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
    if (!decoded.isAdmin && !decoded.isSuperAdmin) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    const { data: players, error } = await supabase
      .from('players')
      .select('id, pseudo, tag, clan_tag, is_admin, is_superadmin, first_login, hdv_level, league, trophies, role')
      .neq('tag', '#SUPERADMIN') // Masquer le compte superadmin de la liste
      .order('clan_tag', { ascending: true })
      .order('pseudo', { ascending: true })

    if (error) throw error

    return NextResponse.json({ players })

  } catch (error) {
    console.error('Erreur liste joueurs:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
