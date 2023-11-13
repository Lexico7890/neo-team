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
            isOneToOne: false
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
          createdBy: string
          id: string
          name: string
          url_image: string | null
        }
        Insert: {
          created_at?: string
          createdBy: string
          id?: string
          name: string
          url_image?: string | null
        }
        Update: {
          created_at?: string
          createdBy?: string
          id?: string
          name?: string
          url_image?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'league_createdBy_fkey'
            columns: ['createdBy']
            isOneToOne: true
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
          league_id: string
          name: string
          value: number
          variant: number
        }
        Insert: {
          category: string
          contact_name: string
          contact_number: string
          created_at?: string
          description: string
          gender: string
          id?: string
          league_id: string
          name: string
          value: number
          variant: number
        }
        Update: {
          category?: string
          contact_name?: string
          contact_number?: string
          created_at?: string
          description?: string
          gender?: string
          id?: string
          league_id?: string
          name?: string
          value?: number
          variant?: number
        }
        Relationships: [
          {
            foreignKeyName: 'tournament_category_fkey'
            columns: ['category']
            isOneToOne: false
            referencedRelation: 'category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tournament_gender_fkey'
            columns: ['gender']
            isOneToOne: false
            referencedRelation: 'gender'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tournament_league_id_fkey'
            columns: ['league_id']
            isOneToOne: false
            referencedRelation: 'league'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tournament_variant_fkey'
            columns: ['variant']
            isOneToOne: false
            referencedRelation: 'variant'
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
            isOneToOne: true
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
      get_tournaments: {
        Args: Record<PropertyKey, never>
        Returns: Array<{
          id: string
          created_at: string
          name: string
          value: number
          description: string
          nombre_categoria: string
          nombre_genero: string
          contact_name: string
          contact_number: string
          league_id: string
        }>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
