export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          admin_id: string | null
          contenu: string
          created_at: string
          id: string
          titre: string
        }
        Insert: {
          admin_id?: string | null
          contenu: string
          created_at?: string
          id?: string
          titre: string
        }
        Update: {
          admin_id?: string | null
          contenu?: string
          created_at?: string
          id?: string
          titre?: string
        }
        Relationships: []
      }
      player_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          id: string
          player_id: string
          updated_at: string
          zone_perso: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          id?: string
          player_id: string
          updated_at?: string
          zone_perso?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          id?: string
          player_id?: string
          updated_at?: string
          zone_perso?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_profiles_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_stats: {
        Row: {
          attaques_reussies: number
          etoiles: number
          guerres_jouees: number
          id: string
          player_id: string
          semaine: string
          updated_at: string
        }
        Insert: {
          attaques_reussies?: number
          etoiles?: number
          guerres_jouees?: number
          id?: string
          player_id: string
          semaine: string
          updated_at?: string
        }
        Update: {
          attaques_reussies?: number
          etoiles?: number
          guerres_jouees?: number
          id?: string
          player_id?: string
          semaine?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          created_at: string
          dons: number
          etoiles_guerre: number
          hdv_level: number
          id: string
          pseudo: string
          role: string
          tag: string
          trophees: number
        }
        Insert: {
          created_at?: string
          dons?: number
          etoiles_guerre?: number
          hdv_level?: number
          id?: string
          pseudo: string
          role?: string
          tag: string
          trophees?: number
        }
        Update: {
          created_at?: string
          dons?: number
          etoiles_guerre?: number
          hdv_level?: number
          id?: string
          pseudo?: string
          role?: string
          tag?: string
          trophees?: number
        }
        Relationships: []
      }
      reactions: {
        Row: {
          announcement_id: string
          created_at: string
          emoji: string
          id: string
          player_id: string
        }
        Insert: {
          announcement_id: string
          created_at?: string
          emoji: string
          id?: string
          player_id: string
        }
        Update: {
          announcement_id?: string
          created_at?: string
          emoji?: string
          id?: string
          player_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reactions_announcement_id_fkey"
            columns: ["announcement_id"]
            isOneToOne: false
            referencedRelation: "announcements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          created_at: string
          id: string
          message: string
          player_id: string
          reponse: string | null
          statut: string
          sujet: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          player_id: string
          reponse?: string | null
          statut?: string
          sujet: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          player_id?: string
          reponse?: string | null
          statut?: string
          sujet?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      war_attacks: {
        Row: {
          attaquant_tag: string
          defenseur_tag: string
          etoiles: number
          id: string
          ordre_attaque: number
          pourcentage: number
          war_id: string
        }
        Insert: {
          attaquant_tag: string
          defenseur_tag: string
          etoiles: number
          id?: string
          ordre_attaque: number
          pourcentage: number
          war_id: string
        }
        Update: {
          attaquant_tag?: string
          defenseur_tag?: string
          etoiles?: number
          id?: string
          ordre_attaque?: number
          pourcentage?: number
          war_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "war_attacks_war_id_fkey"
            columns: ["war_id"]
            isOneToOne: false
            referencedRelation: "wars"
            referencedColumns: ["id"]
          },
        ]
      }
      wars: {
        Row: {
          adversaire: string
          created_at: string
          date: string
          etoiles_eux: number
          etoiles_nous: number
          id: string
          resultat: string
          taille: number
        }
        Insert: {
          adversaire: string
          created_at?: string
          date: string
          etoiles_eux?: number
          etoiles_nous?: number
          id?: string
          resultat?: string
          taille: number
        }
        Update: {
          adversaire?: string
          created_at?: string
          date?: string
          etoiles_eux?: number
          etoiles_nous?: number
          id?: string
          resultat?: string
          taille?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
