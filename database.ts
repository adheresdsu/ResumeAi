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
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      ai_usage_logs: {
        Row: {
          cost_estimate: number
          created_at: string
          feature: string
          id: string
          tokens_used: number
          user_id: string
        }
        Insert: {
          cost_estimate?: number
          created_at?: string
          feature: string
          id?: string
          tokens_used?: number
          user_id: string
        }
        Update: {
          cost_estimate?: number
          created_at?: string
          feature?: string
          id?: string
          tokens_used?: number
          user_id?: string
        }
        Relationships: []
      }
      career_evidence_sources: {
        Row: {
          created_at: string
          id: string
          label: string | null
          source_type: string
          uploaded_file_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          label?: string | null
          source_type: string
          uploaded_file_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
          source_type?: string
          uploaded_file_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "career_evidence_sources_uploaded_file_id_fkey"
            columns: ["uploaded_file_id"]
            isOneToOne: false
            referencedRelation: "uploaded_files"
            referencedColumns: ["id"]
          },
        ]
      }
      cover_letters: {
        Row: {
          company_name: string | null
          content: string | null
          created_at: string
          id: string
          job_description: string | null
          job_title: string | null
          resume_version_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name?: string | null
          content?: string | null
          created_at?: string
          id?: string
          job_description?: string | null
          job_title?: string | null
          resume_version_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string | null
          content?: string | null
          created_at?: string
          id?: string
          job_description?: string | null
          job_title?: string | null
          resume_version_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cover_letters_resume_version_id_fkey"
            columns: ["resume_version_id"]
            isOneToOne: false
            referencedRelation: "resume_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      education: {
        Row: {
          created_at: string
          degree: string | null
          description: string | null
          display_order: number
          end_date: string | null
          evidence_source_id: string | null
          field_of_study: string | null
          id: string
          institution: string
          is_current: boolean
          location: string | null
          start_date: string | null
          updated_at: string
          user_id: string
          verification_status: string
        }
        Insert: {
          created_at?: string
          degree?: string | null
          description?: string | null
          display_order?: number
          end_date?: string | null
          evidence_source_id?: string | null
          field_of_study?: string | null
          id?: string
          institution: string
          is_current?: boolean
          location?: string | null
          start_date?: string | null
          updated_at?: string
          user_id: string
          verification_status?: string
        }
        Update: {
          created_at?: string
          degree?: string | null
          description?: string | null
          display_order?: number
          end_date?: string | null
          evidence_source_id?: string | null
          field_of_study?: string | null
          id?: string
          institution?: string
          is_current?: boolean
          location?: string | null
          start_date?: string | null
          updated_at?: string
          user_id?: string
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_evidence_source_id_fkey"
            columns: ["evidence_source_id"]
            isOneToOne: false
            referencedRelation: "career_evidence_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_limits: {
        Row: {
          custom_domain_allowed: boolean
          max_ai_generations_per_month: number
          max_resumes: number
          plan: string
          premium_templates_allowed: boolean
        }
        Insert: {
          custom_domain_allowed?: boolean
          max_ai_generations_per_month: number
          max_resumes: number
          plan: string
          premium_templates_allowed?: boolean
        }
        Update: {
          custom_domain_allowed?: boolean
          max_ai_generations_per_month?: number
          max_resumes?: number
          plan?: string
          premium_templates_allowed?: boolean
        }
        Relationships: []
      }
      portfolios: {
        Row: {
          created_at: string
          custom_domain: string | null
          id: string
          is_published: boolean
          resume_version_id: string | null
          slug: string
          template_id: string | null
          theme: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_domain?: string | null
          id?: string
          is_published?: boolean
          resume_version_id?: string | null
          slug: string
          template_id?: string | null
          theme?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          custom_domain?: string | null
          id?: string
          is_published?: boolean
          resume_version_id?: string | null
          slug?: string
          template_id?: string | null
          theme?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolios_resume_version_id_fkey"
            columns: ["resume_version_id"]
            isOneToOne: false
            referencedRelation: "resume_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolios_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "resume_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_links: {
        Row: {
          created_at: string
          id: string
          label: string
          sort_order: number
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          sort_order?: number
          updated_at?: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          sort_order?: number
          updated_at?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      profile_skills: {
        Row: {
          created_at: string
          evidence_source_id: string | null
          id: string
          skill_id: string
          updated_at: string
          user_id: string
          verification_status: string
        }
        Insert: {
          created_at?: string
          evidence_source_id?: string | null
          id?: string
          skill_id: string
          updated_at?: string
          user_id: string
          verification_status?: string
        }
        Update: {
          created_at?: string
          evidence_source_id?: string | null
          id?: string
          skill_id?: string
          updated_at?: string
          user_id?: string
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_skills_evidence_source_id_fkey"
            columns: ["evidence_source_id"]
            isOneToOne: false
            referencedRelation: "career_evidence_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_skills_skill_id_user_id_fkey"
            columns: ["skill_id", "user_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id", "user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          headline: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          headline?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          headline?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_bullets: {
        Row: {
          content: string
          created_at: string
          evidence_source_id: string | null
          id: string
          project_id: string
          sort_order: number
          updated_at: string
          verification_status: string
        }
        Insert: {
          content: string
          created_at?: string
          evidence_source_id?: string | null
          id?: string
          project_id: string
          sort_order?: number
          updated_at?: string
          verification_status?: string
        }
        Update: {
          content?: string
          created_at?: string
          evidence_source_id?: string | null
          id?: string
          project_id?: string
          sort_order?: number
          updated_at?: string
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_bullets_evidence_source_id_fkey"
            columns: ["evidence_source_id"]
            isOneToOne: false
            referencedRelation: "career_evidence_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_bullets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          evidence_source_id: string | null
          id: string
          name: string
          start_date: string | null
          updated_at: string
          url: string | null
          user_id: string
          verification_status: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          evidence_source_id?: string | null
          id?: string
          name: string
          start_date?: string | null
          updated_at?: string
          url?: string | null
          user_id: string
          verification_status?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          evidence_source_id?: string | null
          id?: string
          name?: string
          start_date?: string | null
          updated_at?: string
          url?: string | null
          user_id?: string
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_evidence_source_id_fkey"
            columns: ["evidence_source_id"]
            isOneToOne: false
            referencedRelation: "career_evidence_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_templates: {
        Row: {
          category: string | null
          config: Json
          created_at: string
          id: string
          is_premium: boolean
          name: string
          preview_image_url: string | null
        }
        Insert: {
          category?: string | null
          config?: Json
          created_at?: string
          id?: string
          is_premium?: boolean
          name: string
          preview_image_url?: string | null
        }
        Update: {
          category?: string | null
          config?: Json
          created_at?: string
          id?: string
          is_premium?: boolean
          name?: string
          preview_image_url?: string | null
        }
        Relationships: []
      }
      resume_versions: {
        Row: {
          content: Json
          created_at: string
          id: string
          resume_id: string
          source: string
          version_number: number
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          resume_id: string
          source?: string
          version_number: number
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          resume_id?: string
          source?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "resume_versions_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      resumes: {
        Row: {
          ats_score: number | null
          created_at: string
          id: string
          is_primary: boolean
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ats_score?: number | null
          created_at?: string
          id?: string
          is_primary?: boolean
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ats_score?: number | null
          created_at?: string
          id?: string
          is_primary?: boolean
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          created_at: string
          id: string
          name: string
          normalized_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          normalized_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          normalized_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          id: string
          plan: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_fkey"
            columns: ["plan"]
            isOneToOne: false
            referencedRelation: "plan_limits"
            referencedColumns: ["plan"]
          },
        ]
      }
      uploaded_files: {
        Row: {
          created_at: string
          file_type: string
          id: string
          linked_resume_id: string | null
          parsed_status: string
          storage_path: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_type: string
          id?: string
          linked_resume_id?: string | null
          parsed_status?: string
          storage_path: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_type?: string
          id?: string
          linked_resume_id?: string | null
          parsed_status?: string
          storage_path?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "uploaded_files_linked_resume_id_fkey"
            columns: ["linked_resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      work_experience_bullets: {
        Row: {
          content: string
          created_at: string
          evidence_source_id: string | null
          id: string
          sort_order: number
          updated_at: string
          verification_status: string
          work_experience_id: string
        }
        Insert: {
          content: string
          created_at?: string
          evidence_source_id?: string | null
          id?: string
          sort_order?: number
          updated_at?: string
          verification_status?: string
          work_experience_id: string
        }
        Update: {
          content?: string
          created_at?: string
          evidence_source_id?: string | null
          id?: string
          sort_order?: number
          updated_at?: string
          verification_status?: string
          work_experience_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_experience_bullets_evidence_source_id_fkey"
            columns: ["evidence_source_id"]
            isOneToOne: false
            referencedRelation: "career_evidence_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_experience_bullets_work_experience_id_fkey"
            columns: ["work_experience_id"]
            isOneToOne: false
            referencedRelation: "work_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      work_experiences: {
        Row: {
          company: string
          created_at: string
          description: string | null
          display_order: number
          end_date: string | null
          evidence_source_id: string | null
          id: string
          is_current: boolean
          location: string | null
          start_date: string
          title: string
          updated_at: string
          user_id: string
          verification_status: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          display_order?: number
          end_date?: string | null
          evidence_source_id?: string | null
          id?: string
          is_current?: boolean
          location?: string | null
          start_date: string
          title: string
          updated_at?: string
          user_id: string
          verification_status?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          display_order?: number
          end_date?: string | null
          evidence_source_id?: string | null
          id?: string
          is_current?: boolean
          location?: string | null
          start_date?: string
          title?: string
          updated_at?: string
          user_id?: string
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_experiences_evidence_source_id_fkey"
            columns: ["evidence_source_id"]
            isOneToOne: false
            referencedRelation: "career_evidence_sources"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      public_portfolio_profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          headline: string | null
          id: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          headline?: string | null
          id?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          headline?: string | null
          id?: string | null
        }
        Relationships: []
      }
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
