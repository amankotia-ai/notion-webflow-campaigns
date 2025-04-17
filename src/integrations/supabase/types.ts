export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics: {
        Row: {
          campaign_id: string
          content_rule_id: string | null
          created_at: string
          event_type: string
          id: string
          referrer: string | null
          user_agent: string | null
          user_id: string
          visitor_ip: string | null
          webpage_url: string
        }
        Insert: {
          campaign_id: string
          content_rule_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          referrer?: string | null
          user_agent?: string | null
          user_id: string
          visitor_ip?: string | null
          webpage_url: string
        }
        Update: {
          campaign_id?: string
          content_rule_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          referrer?: string | null
          user_agent?: string | null
          user_id?: string
          visitor_ip?: string | null
          webpage_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_content_rule_id_fkey"
            columns: ["content_rule_id"]
            isOneToOne: false
            referencedRelation: "content_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      caching_stats: {
        Row: {
          cache_hit: boolean
          created_at: string
          id: string
          response_time: number
          user_id: string
          webpage_id: string
        }
        Insert: {
          cache_hit: boolean
          created_at?: string
          id?: string
          response_time: number
          user_id: string
          webpage_id: string
        }
        Update: {
          cache_hit?: boolean
          created_at?: string
          id?: string
          response_time?: number
          user_id?: string
          webpage_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "caching_stats_webpage_id_fkey"
            columns: ["webpage_id"]
            isOneToOne: false
            referencedRelation: "webpages"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          created_at: string
          id: string
          name: string
          status: string | null
          user_id: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          webpage_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          status?: string | null
          user_id: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          webpage_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          status?: string | null
          user_id?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          webpage_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_webpage_id_fkey"
            columns: ["webpage_id"]
            isOneToOne: false
            referencedRelation: "webpages"
            referencedColumns: ["id"]
          },
        ]
      }
      content_rules: {
        Row: {
          active: boolean | null
          campaign_id: string
          created_at: string
          element_id: string
          element_name: string
          id: string
          new_content: string
          original_content: string | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          campaign_id: string
          created_at?: string
          element_id: string
          element_name: string
          id?: string
          new_content: string
          original_content?: string | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          campaign_id?: string
          created_at?: string
          element_id?: string
          element_name?: string
          id?: string
          new_content?: string
          original_content?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_rules_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      webpages: {
        Row: {
          created_at: string
          embed_key: string | null
          id: string
          name: string
          script_installed: boolean | null
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          embed_key?: string | null
          id?: string
          name: string
          script_installed?: boolean | null
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          embed_key?: string | null
          id?: string
          name?: string
          script_installed?: boolean | null
          url?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_campaign_rules: {
        Args: {
          webpage_url: string
          p_utm_source?: string
          p_utm_medium?: string
          p_utm_campaign?: string
          p_utm_term?: string
          p_utm_content?: string
        }
        Returns: {
          element_id: string
          original_content: string
          new_content: string
        }[]
      }
      get_public_rules: {
        Args: {
          webpage_url: string
          p_utm_source?: string
          p_utm_medium?: string
          p_utm_campaign?: string
          p_utm_term?: string
          p_utm_content?: string
        }
        Returns: {
          element_id: string
          new_content: string
        }[]
      }
      track_content_rule_event: {
        Args: {
          p_campaign_id: string
          p_content_rule_id: string
          p_webpage_url: string
          p_event_type: string
          p_visitor_ip?: string
          p_user_agent?: string
          p_referrer?: string
        }
        Returns: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
