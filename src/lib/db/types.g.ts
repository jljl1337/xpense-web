export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  xpense_private: {
    Tables: {
      book: {
        Row: {
          created_at: string
          description: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      book_history: {
        Row: {
          created_at: string
          description: string
          history_id: string
          history_user_id: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at: string
          description: string
          history_id?: string
          history_user_id?: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          history_id?: string
          history_user_id?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      category: {
        Row: {
          book_id: string
          created_at: string
          description: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          book_id: string
          created_at?: string
          description: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          book_id?: string
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "book"
            referencedColumns: ["id"]
          },
        ]
      }
      category_history: {
        Row: {
          book_id: string
          created_at: string
          description: string
          history_id: string
          history_user_id: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          book_id: string
          created_at: string
          description: string
          history_id?: string
          history_user_id?: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Update: {
          book_id?: string
          created_at?: string
          description?: string
          history_id?: string
          history_user_id?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      expense: {
        Row: {
          amount: number
          book_id: string
          category_id: string
          created_at: string
          date: string
          id: string
          is_active: boolean
          payment_method_id: string
          remark: string
          updated_at: string
        }
        Insert: {
          amount: number
          book_id: string
          category_id: string
          created_at?: string
          date: string
          id?: string
          is_active?: boolean
          payment_method_id: string
          remark: string
          updated_at?: string
        }
        Update: {
          amount?: number
          book_id?: string
          category_id?: string
          created_at?: string
          date?: string
          id?: string
          is_active?: boolean
          payment_method_id?: string
          remark?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expense_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "book"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_method"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_history: {
        Row: {
          amount: number
          book_id: string
          category_id: string
          created_at: string
          date: string
          history_id: string
          history_user_id: string
          id: string
          is_active: boolean
          payment_method_id: string
          remark: string
          updated_at: string
        }
        Insert: {
          amount: number
          book_id: string
          category_id: string
          created_at: string
          date: string
          history_id?: string
          history_user_id?: string
          id: string
          is_active: boolean
          payment_method_id: string
          remark: string
          updated_at: string
        }
        Update: {
          amount?: number
          book_id?: string
          category_id?: string
          created_at?: string
          date?: string
          history_id?: string
          history_user_id?: string
          id?: string
          is_active?: boolean
          payment_method_id?: string
          remark?: string
          updated_at?: string
        }
        Relationships: []
      }
      payment_method: {
        Row: {
          book_id: string
          created_at: string
          description: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          book_id: string
          created_at?: string
          description: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          book_id?: string
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_method_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "book"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_method_history: {
        Row: {
          book_id: string
          created_at: string
          description: string
          history_id: string
          history_user_id: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          book_id: string
          created_at: string
          description: string
          history_id?: string
          history_user_id?: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Update: {
          book_id?: string
          created_at?: string
          description?: string
          history_id?: string
          history_user_id?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_book: {
        Args: { book_id: string }
        Returns: boolean
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
  xpense_private: {
    Enums: {},
  },
} as const
