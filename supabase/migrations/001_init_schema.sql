-- ============================================================
-- DDS Académie COC — Migration initiale
-- Projet : khwjpdbckcgurxzawxie
-- ============================================================

-- ------------------------------------------------------------
-- 1. players
-- ------------------------------------------------------------
CREATE TABLE players (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag            TEXT NOT NULL UNIQUE,
  pseudo         TEXT NOT NULL,
  role           TEXT NOT NULL DEFAULT 'membre' CHECK (role IN ('membre', 'ancien', 'co-chef', 'chef')),
  hdv_level      SMALLINT NOT NULL DEFAULT 1 CHECK (hdv_level BETWEEN 1 AND 17),
  trophees       INTEGER NOT NULL DEFAULT 0,
  etoiles_guerre INTEGER NOT NULL DEFAULT 0,
  dons           INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique"   ON players FOR SELECT USING (true);
CREATE POLICY "Insertion admin"    ON players FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Modification admin" ON players FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Suppression admin"  ON players FOR DELETE USING (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- 2. player_profiles
-- ------------------------------------------------------------
CREATE TABLE player_profiles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id  UUID NOT NULL UNIQUE REFERENCES players(id) ON DELETE CASCADE,
  bio        TEXT,
  zone_perso TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE player_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique"   ON player_profiles FOR SELECT USING (true);
CREATE POLICY "Insertion admin"    ON player_profiles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Modification admin" ON player_profiles FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Suppression admin"  ON player_profiles FOR DELETE USING (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- 3. wars
-- ------------------------------------------------------------
CREATE TABLE wars (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date         DATE NOT NULL,
  adversaire   TEXT NOT NULL,
  etoiles_nous SMALLINT NOT NULL DEFAULT 0,
  etoiles_eux  SMALLINT NOT NULL DEFAULT 0,
  resultat     TEXT NOT NULL DEFAULT 'en_cours' CHECK (resultat IN ('victoire', 'defaite', 'nul', 'en_cours')),
  taille       SMALLINT NOT NULL CHECK (taille IN (10, 15, 20, 25, 30, 35, 40, 45, 50)),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE wars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique"   ON wars FOR SELECT USING (true);
CREATE POLICY "Insertion admin"    ON wars FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Modification admin" ON wars FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Suppression admin"  ON wars FOR DELETE USING (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- 4. war_attacks
-- ------------------------------------------------------------
CREATE TABLE war_attacks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  war_id        UUID NOT NULL REFERENCES wars(id) ON DELETE CASCADE,
  attaquant_tag TEXT NOT NULL,
  defenseur_tag TEXT NOT NULL,
  etoiles       SMALLINT NOT NULL CHECK (etoiles BETWEEN 0 AND 3),
  pourcentage   SMALLINT NOT NULL CHECK (pourcentage BETWEEN 0 AND 100),
  ordre_attaque SMALLINT NOT NULL
);

ALTER TABLE war_attacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique"   ON war_attacks FOR SELECT USING (true);
CREATE POLICY "Insertion admin"    ON war_attacks FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Modification admin" ON war_attacks FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Suppression admin"  ON war_attacks FOR DELETE USING (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- 5. announcements
-- ------------------------------------------------------------
CREATE TABLE announcements (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre      TEXT NOT NULL,
  contenu    TEXT NOT NULL,
  admin_id   UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique"   ON announcements FOR SELECT USING (true);
CREATE POLICY "Insertion admin"    ON announcements FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Modification admin" ON announcements FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Suppression admin"  ON announcements FOR DELETE USING (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- 6. reactions
-- ------------------------------------------------------------
CREATE TABLE reactions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  player_id       UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  emoji           TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (announcement_id, player_id, emoji)
);

ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique"   ON reactions FOR SELECT USING (true);
CREATE POLICY "Insertion membre"   ON reactions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Suppression propre" ON reactions FOR DELETE USING (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- 7. tickets
-- ------------------------------------------------------------
CREATE TABLE tickets (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id  UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  sujet      TEXT NOT NULL,
  message    TEXT NOT NULL,
  statut     TEXT NOT NULL DEFAULT 'ouvert' CHECK (statut IN ('ouvert', 'en_cours', 'resolu', 'ferme')),
  reponse    TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture admin"      ON tickets FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Insertion membre"   ON tickets FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Modification admin" ON tickets FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Suppression admin"  ON tickets FOR DELETE USING (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- 8. player_stats
-- ------------------------------------------------------------
CREATE TABLE player_stats (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id         UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  semaine           DATE NOT NULL,
  guerres_jouees    SMALLINT NOT NULL DEFAULT 0,
  attaques_reussies SMALLINT NOT NULL DEFAULT 0,
  etoiles           SMALLINT NOT NULL DEFAULT 0,
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (player_id, semaine)
);

ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique"   ON player_stats FOR SELECT USING (true);
CREATE POLICY "Insertion admin"    ON player_stats FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Modification admin" ON player_stats FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Suppression admin"  ON player_stats FOR DELETE USING (auth.role() = 'authenticated');
