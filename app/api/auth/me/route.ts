import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as jwt from 'jsonwebtoken'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('dds_token')?.value
    if (!token) {
      return NextResponse.json({ player: null }, { status: 200 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload

    const { data: p } = await supabase
      .from('players')
      .select('id, pseudo, tag, clan_tag, is_admin, is_superadmin, first_login, hdv_level, league, trophies, best_trophies, exp_level, role, dons')
      .eq('id', decoded.playerId)
      .single()

    if (!p) return NextResponse.json({ player: null }, { status: 200 })

    return NextResponse.json({
      player: {
        id: p.id,
        pseudo: p.pseudo,
        tag: p.tag,
        clanTag: p.clan_tag,
        isAdmin: p.is_admin,
        isSuperAdmin: p.is_superadmin,
        firstLogin: p.first_login,
        hdvLevel: p.hdv_level,
        league: p.league,
        trophies: p.trophies,
        bestTrophies: p.best_trophies,
        expLevel: p.exp_level,
        role: p.role,
        dons: p.dons,
      }
    })

  } catch {
    return NextResponse.json({ player: null }, { status: 200 })
  }
}
