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
            foreignKeyName: "award_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament"
            referencedColumns: ["id"]
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
            foreignKeyName: "league_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      match: {
        Row: {
          created_at: string
          date_game: string | null
          deescription: string | null
          id: string
          time_game: string | null
          value: number | null
        }
        Insert: {
          created_at?: string
          date_game?: string | null
          deescription?: string | null
          id?: string
          time_game?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string
          date_game?: string | null
          deescription?: string | null
          id?: string
          time_game?: string | null
          value?: number | null
        }
        Relationships: []
      }
      match_history: {
        Row: {
          created_at: string
          id: number
          match_id: string | null
          team_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          match_id?: string | null
          team_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          match_id?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_history_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_history_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          }
        ]
      }
      rol: {
        Row: {
          created_at: string
          id: string
          name: string
          show: boolean | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          show?: boolean | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          show?: boolean | null
        }
        Relationships: []
      }
      sanction: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
          tournament_id: string | null
          value: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          tournament_id?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          tournament_id?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sanction_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament"
            referencedColumns: ["id"]
          }
        ]
      }
      team: {
        Row: {
          campus: string | null
          created_at: string
          id: string
          image: string | null
          main_color: string
          name: string
          second_color: string
        }
        Insert: {
          campus?: string | null
          created_at?: string
          id?: string
          image?: string | null
          main_color: string
          name: string
          second_color: string
        }
        Update: {
          campus?: string | null
          created_at?: string
          id?: string
          image?: string | null
          main_color?: string
          name?: string
          second_color?: string
        }
        Relationships: []
      }
      team_position: {
        Row: {
          created_at: string
          id: number
          name: string | null
          symbol: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          symbol?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          symbol?: string | null
        }
        Relationships: []
      }
      team_user: {
        Row: {
          created_at: string
          id: number
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_user_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
          isFlag: boolean | null
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
          isFlag?: boolean | null
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
          isFlag?: boolean | null
          league_id?: string
          name?: string
          value?: number
          variant?: number
        }
        Relationships: [
          {
            foreignKeyName: "tournament_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_gender_fkey"
            columns: ["gender"]
            isOneToOne: false
            referencedRelation: "gender"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "league"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_variant_fkey"
            columns: ["variant"]
            isOneToOne: false
            referencedRelation: "variant"
            referencedColumns: ["id"]
          }
        ]
      }
      tournament_history: {
        Row: {
          created_at: string
          final: string | null
          id: number
          start: string | null
          team_id: string | null
          tournament_id: string | null
        }
        Insert: {
          created_at?: string
          final?: string | null
          id?: number
          start?: string | null
          team_id?: string | null
          tournament_id?: string | null
        }
        Update: {
          created_at?: string
          final?: string | null
          id?: number
          start?: string | null
          team_id?: string | null
          tournament_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_history_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_history_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament"
            referencedColumns: ["id"]
          }
        ]
      }
      user_log: {
        Row: {
          created_at: string
          id: string
          team: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          team?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          team?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_match: {
        Row: {
          attend: boolean | null
          created_at: string
          goal: number | null
          id: number
          match_id: string | null
          red_card: number | null
          user_id: string | null
          yellow_card: number | null
        }
        Insert: {
          attend?: boolean | null
          created_at?: string
          goal?: number | null
          id?: number
          match_id?: string | null
          red_card?: number | null
          user_id?: string | null
          yellow_card?: number | null
        }
        Update: {
          attend?: boolean | null
          created_at?: string
          goal?: number | null
          id?: number
          match_id?: string | null
          red_card?: number | null
          user_id?: string | null
          yellow_card?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_match_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_match_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bird_date: string | null
          created_at: string
          email: string | null
          gender: string | null
          id: string
          is_completed: boolean | null
          name: string
          number: string | null
          phone_number: string | null
          position_id: number | null
          rol_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bird_date?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id: string
          is_completed?: boolean | null
          name: string
          number?: string | null
          phone_number?: string | null
          position_id?: number | null
          rol_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bird_date?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          is_completed?: boolean | null
          name?: string
          number?: string | null
          phone_number?: string | null
          position_id?: number | null
          rol_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_gender_fkey"
            columns: ["gender"]
            isOneToOne: false
            referencedRelation: "gender"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "team_position"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_rol_id_fkey"
            columns: ["rol_id"]
            isOneToOne: false
            referencedRelation: "rol"
            referencedColumns: ["id"]
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
      get_tournaments:
        | {
            Args: Record<PropertyKey, never>
            Returns: {
              id: string
              created_at: string
              name: string
              value: number
              description: string
              nombre_categoria: string
              nombre_genero: string
              sub_categoria: string
              contact_name: string
              contact_number: string
              league_id: string
            }[]
          }
        | {
            Args: {
              tournamentid: string
            }
            Returns: {
              id: string
              created_at: string
              name: string
              value: number
              description: string
              nombre_categoria: string
              nombre_genero: string
              sub_categoria: string
              contact_name: string
              contact_number: string
              league_id: string
            }[]
          }
      get_tournaments_id: {
        Args: {
          leagueid: string
        }
        Returns: {
          id: string
          created_at: string
          name: string
          value: number
          description: string
          nombre_categoria: string
          nombre_genero: string
          sub_categoria: string
          contact_name: string
          contact_number: string
          league_id: string
        }[]
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
