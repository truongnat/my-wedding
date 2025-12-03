// Database types generated from Supabase schema
// This file should be regenerated when the database schema changes
// Run: bun run db:types

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      rsvp_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          attending: boolean;
          guests: number;
          dietary_restrictions: string | null;
          message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          attending: boolean;
          guests?: number;
          dietary_restrictions?: string | null;
          message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          attending?: boolean;
          guests?: number;
          dietary_restrictions?: string | null;
          message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      guest_messages: {
        Row: {
          id: string;
          name: string;
          message: string;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          message: string;
          approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          message?: string;
          approved?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
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
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
