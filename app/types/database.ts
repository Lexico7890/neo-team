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
          isFinished: boolean
          match_id: string | null
          team_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          isFinished: boolean
          match_id?: string | null
          team_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          isFinished?: boolean
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
      request_join_team_tournament: {
        Row: {
          accepted: boolean
          created_at: string
          id: string
          isWaiting: boolean
          team_id: string | null
          tournament_id: string | null
        }
        Insert: {
          accepted: boolean
          created_at?: string
          id?: string
          isWaiting: boolean
          team_id?: string | null
          tournament_id?: string | null
        }
        Update: {
          accepted?: boolean
          created_at?: string
          id?: string
          isWaiting?: boolean
          team_id?: string | null
          tournament_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "request_join_team_tournament_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "request_join_team_tournament_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament"
            referencedColumns: ["id"]
          }
        ]
      }
      request_join_user_team: {
        Row: {
          accepted: boolean
          created_at: string
          id: string
          isWaiting: boolean
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          accepted: boolean
          created_at?: string
          id?: string
          isWaiting: boolean
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          accepted?: boolean
          created_at?: string
          id?: string
          isWaiting?: boolean
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "request_join_user_team_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "request_join_user_team_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
      state_tournament: {
        Row: {
          created_at: string | null
          id: string
          payment_subscription: number | null
          team_id: string | null
          tournament_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          payment_subscription?: number | null
          team_id?: string | null
          tournament_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          payment_subscription?: number | null
          team_id?: string | null
          tournament_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "state_tournament_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "state_tournament_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament"
            referencedColumns: ["id"]
          }
        ]
      }
      sub_category: {
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
      team_tournament: {
        Row: {
          created_at: string
          id: string
          isFlag: boolean | null
          team_id: string | null
          total_inscription: number | null
          tournament_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          isFlag?: boolean | null
          team_id?: string | null
          total_inscription?: number | null
          tournament_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          isFlag?: boolean | null
          team_id?: string | null
          total_inscription?: number | null
          tournament_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_tournament_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_tournament_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament"
            referencedColumns: ["id"]
          }
        ]
      }
      team_user: {
        Row: {
          created_at: string
          current_team: boolean
          id: number
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          current_team: boolean
          id?: number
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          current_team?: boolean
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
          isFlag: boolean
          league_id: string
          name: string
          state_id: string
          sub_category: string
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
          isFlag: boolean
          league_id: string
          name: string
          state_id: string
          sub_category: string
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
          isFlag?: boolean
          league_id?: string
          name?: string
          state_id?: string
          sub_category?: string
          value?: number
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
            foreignKeyName: "tournament_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "tournament_state"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_sub_category_fkey"
            columns: ["sub_category"]
            isOneToOne: false
            referencedRelation: "sub_category"
            referencedColumns: ["id"]
          }
        ]
      }
      tournament_state: {
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
          number_identity: string | null
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
          number_identity?: string | null
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
          number_identity?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_match_show_view_tournament: {
        Args: {
          tournamentid: string
        }
        Returns: {
          team_id: string
          tournament_id: string
          name: string
          match_history_id: number
          image_team: string
          match_id: string
          date_game: string
        }[]
      }
      get_team_by_tournament_id: {
        Args: {
          tournamentid: string
        }
        Returns: {
          id: string
          name: string
          payment_subscription: number
          games_played: number
          players: number
        }[]
      }
      get_team_user_id: {
        Args: {
          userid: string
        }
        Returns: {
          id: string
          user_id: string
          created_at: string
          name: string
          image: string
          main_color: string
          second_color: string
          campus: string
        }[]
      }
      get_tournament_count_info: {
        Args: {
          tournamentid: string
        }
        Returns: {
          total_teams: number
          total_payment_subscription: number
          total_players: number
          total_matches_played: number
        }[]
      }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
