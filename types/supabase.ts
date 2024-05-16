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
      answers: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          meets_expectations: boolean
          question: string
          rating: number | null
          text: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          meets_expectations?: boolean
          question: string
          rating?: number | null
          text: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          meets_expectations?: boolean
          question?: string
          rating?: number | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_answer_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["auth_id"]
          },
          {
            foreignKeyName: "public_answer_question_fkey"
            columns: ["question"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          avatar: string | null
          company: string | null
          contact: string | null
          created: string | null
          hasAvatar: boolean | null
          id: string
          label: string | null
          name: string | null
          objectKey: string | null
          site: string | null
          timestamp: string | null
          type: string | null
          updated: string | null
        }
        Insert: {
          avatar?: string | null
          company?: string | null
          contact?: string | null
          created?: string | null
          hasAvatar?: boolean | null
          id?: string
          label?: string | null
          name?: string | null
          objectKey?: string | null
          site?: string | null
          timestamp?: string | null
          type?: string | null
          updated?: string | null
        }
        Update: {
          avatar?: string | null
          company?: string | null
          contact?: string | null
          created?: string | null
          hasAvatar?: boolean | null
          id?: string
          label?: string | null
          name?: string | null
          objectKey?: string | null
          site?: string | null
          timestamp?: string | null
          type?: string | null
          updated?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_assets_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_assets_contact_fkey"
            columns: ["contact"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["auth_id"]
          },
          {
            foreignKeyName: "assets_assets_site_fkey"
            columns: ["site"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_assets_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "types"
            referencedColumns: ["id"]
          },
        ]
      }
      attributes: {
        Row: {
          cost: number | null
          description: string | null
          id: string
          name: string
          price: number | null
        }
        Insert: {
          cost?: number | null
          description?: string | null
          id?: string
          name: string
          price?: number | null
        }
        Update: {
          cost?: number | null
          description?: string | null
          id?: string
          name?: string
          price?: number | null
        }
        Relationships: []
      }
      blocks: {
        Row: {
          annotations: Json | null
          created_at: string
          id: string
          page: string
          sibling: string | null
          text: string
          type: string
        }
        Insert: {
          annotations?: Json | null
          created_at?: string
          id?: string
          page: string
          sibling?: string | null
          text: string
          type?: string
        }
        Update: {
          annotations?: Json | null
          created_at?: string
          id?: string
          page?: string
          sibling?: string | null
          text?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_blocks_page_fkey"
            columns: ["page"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_blocks_sibling_fkey"
            columns: ["sibling"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["id"]
          },
        ]
      }
      boards: {
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
      comments: {
        Row: {
          body: string
          contact: string
          id: string
        }
        Insert: {
          body: string
          contact?: string
          id?: string
        }
        Update: {
          body?: string
          contact?: string
          id?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          accountNumber: string | null
          addressLine1: string | null
          addressLine2: string | null
          annualRevenue: string | null
          billToCompany: number | null
          city: string | null
          country: number | null
          dateAcquired: string | null
          deletedFlag: boolean | null
          faxNumber: string | null
          id: string
          identifier: string | null
          isVendorFlag: boolean | null
          leadFlag: boolean | null
          mobileGuid: string | null
          name: string | null
          phoneNumber: string | null
          state: string | null
          status: number | null
          taxIdentifier: string | null
          territory: number | null
          timezone: number | null
          unsubscribeFlag: string | null
          vendorIdentifier: string | null
          website: string | null
          zip: string | null
        }
        Insert: {
          accountNumber?: string | null
          addressLine1?: string | null
          addressLine2?: string | null
          annualRevenue?: string | null
          billToCompany?: number | null
          city?: string | null
          country?: number | null
          dateAcquired?: string | null
          deletedFlag?: boolean | null
          faxNumber?: string | null
          id?: string
          identifier?: string | null
          isVendorFlag?: boolean | null
          leadFlag?: boolean | null
          mobileGuid?: string | null
          name?: string | null
          phoneNumber?: string | null
          state?: string | null
          status?: number | null
          taxIdentifier?: string | null
          territory?: number | null
          timezone?: number | null
          unsubscribeFlag?: string | null
          vendorIdentifier?: string | null
          website?: string | null
          zip?: string | null
        }
        Update: {
          accountNumber?: string | null
          addressLine1?: string | null
          addressLine2?: string | null
          annualRevenue?: string | null
          billToCompany?: number | null
          city?: string | null
          country?: number | null
          dateAcquired?: string | null
          deletedFlag?: boolean | null
          faxNumber?: string | null
          id?: string
          identifier?: string | null
          isVendorFlag?: boolean | null
          leadFlag?: boolean | null
          mobileGuid?: string | null
          name?: string | null
          phoneNumber?: string | null
          state?: string | null
          status?: number | null
          taxIdentifier?: string | null
          territory?: number | null
          timezone?: number | null
          unsubscribeFlag?: string | null
          vendorIdentifier?: string | null
          website?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_companies_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_companies_territory_fkey"
            columns: ["territory"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      configurations: {
        Row: {
          company: number | null
          expiration_date: string | null
          id: string
          install_date: string | null
          installed_by: string | null
          name: string
          product: string | null
          purchase_date: string | null
          quantity: number | null
          serial_number: string | null
          status: number | null
          type: string | null
          user: number | null
        }
        Insert: {
          company?: number | null
          expiration_date?: string | null
          id?: string
          install_date?: string | null
          installed_by?: string | null
          name: string
          product?: string | null
          purchase_date?: string | null
          quantity?: number | null
          serial_number?: string | null
          status?: number | null
          type?: string | null
          user?: number | null
        }
        Update: {
          company?: number | null
          expiration_date?: string | null
          id?: string
          install_date?: string | null
          installed_by?: string | null
          name?: string
          product?: string | null
          purchase_date?: string | null
          quantity?: number | null
          serial_number?: string | null
          status?: number | null
          type?: string | null
          user?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_configurations_installed_by_fkey"
            columns: ["installed_by"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["auth_id"]
          },
          {
            foreignKeyName: "public_configurations_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_configurations_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_configurations_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "types"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          auth_id: string | null
          company: string | null
          firstName: string
          id: string
          inactiveFlag: string | null
          lastName: string
          site: string | null
          title: string | null
        }
        Insert: {
          auth_id?: string | null
          company?: string | null
          firstName: string
          id?: string
          inactiveFlag?: string | null
          lastName: string
          site?: string | null
          title?: string | null
        }
        Update: {
          auth_id?: string | null
          company?: string | null
          firstName?: string
          id?: string
          inactiveFlag?: string | null
          lastName?: string
          site?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_contacts_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_contacts_id_fkey"
            columns: ["auth_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_contacts_site_fkey"
            columns: ["site"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
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
      notes: {
        Row: {
          company: number | null
          createdAt: string
          enteredBy: number | null
          flagged: boolean | null
          id: number
          text: string
          type: number | null
          updatedAt: string
        }
        Insert: {
          company?: number | null
          createdAt?: string
          enteredBy?: number | null
          flagged?: boolean | null
          id?: number
          text: string
          type?: number | null
          updatedAt?: string
        }
        Update: {
          company?: number | null
          createdAt?: string
          enteredBy?: number | null
          flagged?: boolean | null
          id?: number
          text?: string
          type?: number | null
          updatedAt?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          company: number
          id: string
        }
        Insert: {
          company: number
          id?: string
        }
        Update: {
          company?: number
          id?: string
        }
        Relationships: []
      }
      page_relations: {
        Row: {
          company: number | null
          configuration: string | null
          page: string
        }
        Insert: {
          company?: number | null
          configuration?: string | null
          page: string
        }
        Update: {
          company?: number | null
          configuration?: string | null
          page?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_page_relations_configuration_fkey"
            columns: ["configuration"]
            isOneToOne: false
            referencedRelation: "configurations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_page_relations_page_fkey"
            columns: ["page"]
            isOneToOne: true
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          created_at: string
          id: string
          last_updated_at: string
          parent: string | null
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_updated_at?: string
          parent?: string | null
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          last_updated_at?: string
          parent?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_pages_parent_fkey"
            columns: ["parent"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      product_attributes: {
        Row: {
          attribute: string
          product: string
        }
        Insert: {
          attribute: string
          product: string
        }
        Update: {
          attribute?: string
          product?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_configuration_attributes_attribute_fkey"
            columns: ["attribute"]
            isOneToOne: false
            referencedRelation: "attributes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_product_attributes_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          cost: number | null
          description: string | null
          id: string
          name: string
          parent: string | null
          price: number | null
          product_id: string | null
          quantity: number
        }
        Insert: {
          cost?: number | null
          description?: string | null
          id?: string
          name: string
          parent?: string | null
          price?: number | null
          product_id?: string | null
          quantity?: number
        }
        Update: {
          cost?: number | null
          description?: string | null
          id?: string
          name?: string
          parent?: string | null
          price?: number | null
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_products_parent_fkey"
            columns: ["parent"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      question_pages: {
        Row: {
          page: string
          question: string
        }
        Insert: {
          page: string
          question: string
        }
        Update: {
          page?: string
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_question_pages_page_fkey"
            columns: ["page"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_question_pages_question_fkey"
            columns: ["question"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      question_types: {
        Row: {
          question: string
          type: string
        }
        Insert: {
          question: string
          type: string
        }
        Update: {
          question?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_question_types_question_fkey"
            columns: ["question"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_question_types_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "types"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          id: string
          notes: string | null
          title: string
        }
        Insert: {
          id?: string
          notes?: string | null
          title: string
        }
        Update: {
          id?: string
          notes?: string | null
          title?: string
        }
        Relationships: []
      }
      service_level_agreements: {
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
      sites: {
        Row: {
          company: string
          id: string
          title: string
        }
        Insert: {
          company: string
          id?: string
          title: string
        }
        Update: {
          company?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_sites_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      statuses: {
        Row: {
          board: number | null
          category: Database["public"]["Enums"]["statusCategory"] | null
          created_at: string
          id: number
          name: string
          sort: number | null
        }
        Insert: {
          board?: number | null
          category?: Database["public"]["Enums"]["statusCategory"] | null
          created_at?: string
          id?: number
          name: string
          sort?: number | null
        }
        Update: {
          board?: number | null
          category?: Database["public"]["Enums"]["statusCategory"] | null
          created_at?: string
          id?: number
          name?: string
          sort?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_statuses_board_fkey"
            columns: ["board"]
            isOneToOne: false
            referencedRelation: "boards"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_assets: {
        Row: {
          asset: string
          ticket: string
        }
        Insert: {
          asset: string
          ticket: string
        }
        Update: {
          asset?: string
          ticket?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_ticket_assets_asset_fkey"
            columns: ["asset"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_ticket_assets_ticket_fkey"
            columns: ["ticket"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_comments: {
        Row: {
          comment: string
          ticket: string
        }
        Insert: {
          comment: string
          ticket: string
        }
        Update: {
          comment?: string
          ticket?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_ticket_comments_comment_fkey"
            columns: ["comment"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_ticket_comments_ticket_fkey"
            columns: ["ticket"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          id: string
          number: number | null
          summary: string
        }
        Insert: {
          id?: string
          number?: number | null
          summary: string
        }
        Update: {
          id?: string
          number?: number | null
          summary?: string
        }
        Relationships: []
      }
      types: {
        Row: {
          created_at: string
          description: string | null
          icon: Database["public"]["Enums"]["icon"] | null
          id: string
          last_updated: string | null
          name: string
          parent: string | null
          update_by: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: Database["public"]["Enums"]["icon"] | null
          id?: string
          last_updated?: string | null
          name: string
          parent?: string | null
          update_by?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: Database["public"]["Enums"]["icon"] | null
          id?: string
          last_updated?: string | null
          name?: string
          parent?: string | null
          update_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_assetTypes_parent_fkey"
            columns: ["parent"]
            isOneToOne: false
            referencedRelation: "types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_assetTypes_update_by_fkey"
            columns: ["update_by"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["auth_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_new_ticket: {
        Args: {
          summary: string
        }
        Returns: undefined
      }
      execute_action:
        | {
            Args: {
              automation_id: number
            }
            Returns: undefined
          }
        | {
            Args: {
              automation_id: string
            }
            Returns: undefined
          }
    }
    Enums: {
      "Block Type":
        | "heading_1"
        | "heading_2"
        | "heading_3"
        | "heading_4"
        | "paragraph"
      icon:
        | "phone"
        | "laptop"
        | "printer"
        | "server"
        | "router"
        | "cable"
        | "cpu"
        | "hard-drive"
        | "memory-stick"
        | "pc-case"
        | "monitor"
      impact: "Low" | "Medium" | "High"
      recordType: "ProjectIssue" | "ProjectTicket" | "ServiceTicket"
      severity: "Low" | "Medium" | "High"
      statusCategory: "TODO" | "IN_PROGRESS" | "DONE"
      where: "OnSite" | "Remote" | "InHouse"
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

