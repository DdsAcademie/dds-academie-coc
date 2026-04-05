// Types globaux du projet DDS Académie COC
// Ces types seront enrichis au fur et à mesure du développement

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// À compléter avec les types Supabase générés
export interface Database {
  public: {
    Tables: {
      // Tables à définir
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
