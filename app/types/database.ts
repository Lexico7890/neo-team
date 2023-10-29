export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      award: {
        Row: {
          created_at: string
          id: string
          name: string
          tournament_id: string | null
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          tournament_id?: string | null
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          tournament_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: 'award_tournament_id_fkey'
            columns: ['tournament_id']
            referencedRelation: 'tournament'
            referencedColumns: ['id']
          }
        ]
      }
      category: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      gender: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      league: {
        Row: {
          created_at: string
          createdBy: string | null
          id: string
          name: string
          url_image: string | null
        }
        Insert: {
          created_at?: string
          createdBy?: string | null
          id?: string
          name: string
          url_image?: string | null
        }
        Update: {
          created_at?: string
          createdBy?: string | null
          id?: string
          name?: string
          url_image?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'league_createdBy_fkey'
            columns: ['createdBy']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      rol: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      tournament: {
        Row: {
          category: string
          contact_name: string
          contact_number: string
          created_at: string
          description: string
          gender: string
          id: string
          league_id: string | null
          name: string
          value: number
        }
        Insert: {
          category: string
          contact_name: string
          contact_number: string
          created_at?: string
          description: string
          gender: string
          id?: string
          league_id?: string | null
          name: string
          value: number
        }
        Update: {
          category?: string
          contact_name?: string
          contact_number?: string
          created_at?: string
          description?: string
          gender?: string
          id?: string
          league_id?: string | null
          name?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: 'tournament_category_fkey'
            columns: ['category']
            referencedRelation: 'category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tournament_gender_fkey'
            columns: ['gender']
            referencedRelation: 'gender'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tournament_league_id_fkey'
            columns: ['league_id']
            referencedRelation: 'league'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          number_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id: string
          name: string
          number_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          number_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      variant: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
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
