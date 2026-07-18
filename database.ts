export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Plan = "free" | "pro";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing";
export type ResumeVersionSource = "manual" | "ai_generated" | "uploaded";
export type UploadedFileType = "pdf" | "docx";
export type ParsedStatus = "pending" | "parsed" | "failed";
export type AiFeature =
  "resume_generation" | "resume_improvement" | "cover_letter" | "ats_score";

interface Table<Row, Insert, Update> {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
}

export interface Database {
  public: {
    Tables: {
      profiles: Table<
        {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          headline: string | null;
          created_at: string;
          updated_at: string;
        },
        {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          headline?: string | null;
        },
        {
          full_name?: string | null;
          avatar_url?: string | null;
          headline?: string | null;
        }
      >;
      plan_limits: Table<
        {
          plan: Plan;
          max_resumes: number;
          max_ai_generations_per_month: number;
          custom_domain_allowed: boolean;
          premium_templates_allowed: boolean;
        },
        {
          plan: Plan;
          max_resumes: number;
          max_ai_generations_per_month: number;
          custom_domain_allowed?: boolean;
          premium_templates_allowed?: boolean;
        },
        {
          max_resumes?: number;
          max_ai_generations_per_month?: number;
          custom_domain_allowed?: boolean;
          premium_templates_allowed?: boolean;
        }
      >;
      subscriptions: Table<
        {
          id: string;
          user_id: string;
          plan: Plan;
          status: SubscriptionStatus;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          current_period_end: string | null;
          created_at: string;
          updated_at: string;
        },
        {
          user_id: string;
          plan?: Plan;
          status?: SubscriptionStatus;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          current_period_end?: string | null;
        },
        {
          plan?: Plan;
          status?: SubscriptionStatus;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          current_period_end?: string | null;
        }
      >;
      resume_templates: Table<
        {
          id: string;
          name: string;
          preview_image_url: string | null;
          is_premium: boolean;
          category: string | null;
          config: Json;
          created_at: string;
        },
        {
          name: string;
          preview_image_url?: string | null;
          is_premium?: boolean;
          category?: string | null;
          config?: Json;
        },
        {
          name?: string;
          preview_image_url?: string | null;
          is_premium?: boolean;
          category?: string | null;
          config?: Json;
        }
      >;
      resumes: Table<
        {
          id: string;
          user_id: string;
          title: string;
          is_primary: boolean;
          ats_score: number | null;
          created_at: string;
          updated_at: string;
        },
        {
          user_id: string;
          title?: string;
          is_primary?: boolean;
          ats_score?: number | null;
        },
        { title?: string; is_primary?: boolean; ats_score?: number | null }
      >;
      resume_versions: Table<
        {
          id: string;
          resume_id: string;
          version_number: number;
          content: Json;
          source: ResumeVersionSource;
          created_at: string;
        },
        {
          resume_id: string;
          version_number: number;
          content?: Json;
          source?: ResumeVersionSource;
        },
        { content?: Json; source?: ResumeVersionSource }
      >;
      cover_letters: Table<
        {
          id: string;
          user_id: string;
          resume_version_id: string | null;
          job_title: string | null;
          company_name: string | null;
          job_description: string | null;
          content: string | null;
          created_at: string;
          updated_at: string;
        },
        {
          user_id: string;
          resume_version_id?: string | null;
          job_title?: string | null;
          company_name?: string | null;
          job_description?: string | null;
          content?: string | null;
        },
        {
          resume_version_id?: string | null;
          job_title?: string | null;
          company_name?: string | null;
          job_description?: string | null;
          content?: string | null;
        }
      >;
      portfolios: Table<
        {
          id: string;
          user_id: string;
          resume_version_id: string | null;
          template_id: string | null;
          slug: string;
          custom_domain: string | null;
          is_published: boolean;
          theme: Json;
          created_at: string;
          updated_at: string;
        },
        {
          user_id: string;
          resume_version_id?: string | null;
          template_id?: string | null;
          slug: string;
          custom_domain?: string | null;
          is_published?: boolean;
          theme?: Json;
        },
        {
          resume_version_id?: string | null;
          template_id?: string | null;
          slug?: string;
          custom_domain?: string | null;
          is_published?: boolean;
          theme?: Json;
        }
      >;
      uploaded_files: Table<
        {
          id: string;
          user_id: string;
          storage_path: string;
          file_type: UploadedFileType;
          parsed_status: ParsedStatus;
          linked_resume_id: string | null;
          created_at: string;
        },
        {
          user_id: string;
          storage_path: string;
          file_type: UploadedFileType;
          parsed_status?: ParsedStatus;
          linked_resume_id?: string | null;
        },
        { parsed_status?: ParsedStatus; linked_resume_id?: string | null }
      >;
      ai_usage_logs: Table<
        {
          id: string;
          user_id: string;
          feature: AiFeature;
          tokens_used: number;
          cost_estimate: number;
          created_at: string;
        },
        {
          user_id: string;
          feature: AiFeature;
          tokens_used?: number;
          cost_estimate?: number;
        },
        { tokens_used?: number; cost_estimate?: number }
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
