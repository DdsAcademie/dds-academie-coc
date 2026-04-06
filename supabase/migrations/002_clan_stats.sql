CREATE TABLE IF NOT EXISTS clan_stats (
  tag        TEXT PRIMARY KEY,
  name       TEXT NOT NULL DEFAULT '',
  members    INTEGER NOT NULL DEFAULT 0,
  clan_level INTEGER NOT NULL DEFAULT 0,
  war_league TEXT NOT NULL DEFAULT 'Non classé',
  war_wins   INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE clan_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique"    ON clan_stats FOR SELECT USING (true);
CREATE POLICY "Upsert service role" ON clan_stats FOR ALL    USING (true) WITH CHECK (true);
