export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  xpense: {
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
        Args: {
          book_id: string
        }
        Returns: boolean
      }
      create_book: {
        Args: {
          name: string
          description: string
        }
        Returns: undefined
      }
      create_category: {
        Args: {
          book_id: string
          name: string
          description: string
        }
        Returns: undefined
      }
      create_expense: {
        Args: {
          book_id: string
          category_id: string
          payment_method_id: string
          amount: number
          remark: string
          date: string
        }
        Returns: undefined
      }
      create_payment_method: {
        Args: {
          book_id: string
          name: string
          description: string
        }
        Returns: undefined
      }
      delete_book: {
        Args: {
          id: string
        }
        Returns: undefined
      }
      delete_category: {
        Args: {
          id: string
        }
        Returns: undefined
      }
      delete_expense: {
        Args: {
          id: string
        }
        Returns: undefined
      }
      delete_payment_method: {
        Args: {
          id: string
        }
        Returns: undefined
      }
      get_books: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          description: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
          user_id: string
        }[]
      }
      get_categories: {
        Args: {
          book_id: string
        }
        Returns: {
          book_id: string
          created_at: string
          description: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }[]
      }
      get_expenses: {
        Args: {
          book_id: string
        }
        Returns: {
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
        }[]
      }
      get_payment_methods: {
        Args: {
          book_id: string
        }
        Returns: {
          book_id: string
          created_at: string
          description: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }[]
      }
      update_book: {
        Args: {
          id: string
          name: string
          description: string
        }
        Returns: undefined
      }
      update_category: {
        Args: {
          id: string
          name: string
          description: string
        }
        Returns: undefined
      }
      update_expense: {
        Args: {
          id: string
          category_id: string
          payment_method_id: string
          amount: number
          remark: string
          date: string
        }
        Returns: undefined
      }
      update_payment_method: {
        Args: {
          id: string
          name: string
          description: string
        }
        Returns: undefined
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
