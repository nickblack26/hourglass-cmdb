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
      assets: {
        Row: {
          company: string | null
          contact: string | null
          created: string | null
          id: string
          label: string | null
          name: string | null
          objectKey: string | null
          product: string | null
          type: string | null
          updated: string | null
        }
        Insert: {
          company?: string | null
          contact?: string | null
          created?: string | null
          id?: string
          label?: string | null
          name?: string | null
          objectKey?: string | null
          product?: string | null
          type?: string | null
          updated?: string | null
        }
        Update: {
          company?: string | null
          contact?: string | null
          created?: string | null
          id?: string
          label?: string | null
          name?: string | null
          objectKey?: string | null
          product?: string | null
          type?: string | null
          updated?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_contact_fkey"
            columns: ["contact"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "productInventory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "assetTypes"
            referencedColumns: ["id"]
          },
        ]
      }
      assetTypes: {
        Row: {
          created_at: string
          icon: Database["public"]["Enums"]["icon"]
          id: string
          name: string
          organization: string | null
        }
        Insert: {
          created_at?: string
          icon: Database["public"]["Enums"]["icon"]
          id?: string
          name: string
          organization?: string | null
        }
        Update: {
          created_at?: string
          icon?: Database["public"]["Enums"]["icon"]
          id?: string
          name?: string
          organization?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_types_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
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
      companies: {
        Row: {
          accountNumber: string | null
          addressLine1: string | null
          addressLine2: string | null
          city: string | null
          dateAcquired: string | null
          faxNumber: string | null
          id: string
          name: string | null
          organization: string
          phoneNumber: string | null
          state: string | null
          website: string | null
          zip: string | null
        }
        Insert: {
          accountNumber?: string | null
          addressLine1?: string | null
          addressLine2?: string | null
          city?: string | null
          dateAcquired?: string | null
          faxNumber?: string | null
          id?: string
          name?: string | null
          organization: string
          phoneNumber?: string | null
          state?: string | null
          website?: string | null
          zip?: string | null
        }
        Update: {
          accountNumber?: string | null
          addressLine1?: string | null
          addressLine2?: string | null
          city?: string | null
          dateAcquired?: string | null
          faxNumber?: string | null
          id?: string
          name?: string | null
          organization?: string
          phoneNumber?: string | null
          state?: string | null
          website?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      company_secrets: {
        Row: {
          id: string
          key: Database["public"]["Enums"]["secretKeyType"]
          value: string
        }
        Insert: {
          id: string
          key: Database["public"]["Enums"]["secretKeyType"]
          value: string
        }
        Update: {
          id?: string
          key?: Database["public"]["Enums"]["secretKeyType"]
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_secrets_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          company: string | null
          features: Json | null
          id: string
          logoUrl: string | null
          name: string | null
          urlKey: string | null
          userCount: number | null
        }
        Insert: {
          company?: string | null
          features?: Json | null
          id?: string
          logoUrl?: string | null
          name?: string | null
          urlKey?: string | null
          userCount?: number | null
        }
        Update: {
          company?: string | null
          features?: Json | null
          id?: string
          logoUrl?: string | null
          name?: string | null
          urlKey?: string | null
          userCount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      productAttributes: {
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
      productInventory: {
        Row: {
          cost: number | null
          id: string
          price: number | null
          product: string
          serial: string
        }
        Insert: {
          cost?: number | null
          id?: string
          price?: number | null
          product: string
          serial: string
        }
        Update: {
          cost?: number | null
          id?: string
          price?: number | null
          product?: string
          serial?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_inventory_product_fkey"
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
        }
        Insert: {
          cost?: number | null
          description?: string | null
          id?: string
          name: string
          parent?: string | null
          price?: number | null
        }
        Update: {
          cost?: number | null
          description?: string | null
          id?: string
          name?: string
          parent?: string | null
          price?: number | null
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
      teams: {
        Row: {
          color: string
          icon: Database["public"]["Enums"]["icon"]
          id: string
          identifier: string
          name: string
          organization: string
        }
        Insert: {
          color: string
          icon: Database["public"]["Enums"]["icon"]
          id?: string
          identifier: string
          name: string
          organization: string
        }
        Update: {
          color?: string
          icon?: Database["public"]["Enums"]["icon"]
          id?: string
          identifier?: string
          name?: string
          organization?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          allowAllClientsPortalView: boolean | null
          approved: boolean | null
          automaticEmailCcFlag: boolean | null
          automaticEmailContactFlag: boolean | null
          automaticEmailResourceFlag: boolean | null
          billExpenses: string | null
          billingMethod: string | null
          billProducts: string | null
          billTime: string | null
          board: number | null
          closedBy: string | null
          closedDate: string | null
          closedFlag: boolean | null
          company: number | null
          configuration: string | null
          contact: number | null
          currency: number | null
          customerUpdatedFlag: boolean | null
          dateEntered: string | null
          dateResolved: string | null
          dateResplan: string | null
          dateResponded: string | null
          department: number | null
          enteredBy: string | null
          escalationLevel: number | null
          escalationStartDateUTC: string | null
          estimatedExpenseCost: string | null
          estimatedExpenseRevenue: string | null
          estimatedProductCost: string | null
          estimatedProductRevenue: string | null
          estimatedTimeCost: string | null
          estimatedTimeRevenue: string | null
          hasChildTicket: boolean | null
          hasMergedChildTicketFlag: boolean | null
          id: number
          impact: Database["public"]["Enums"]["impact"] | null
          isInSla: boolean | null
          lastUpdated: string | null
          location: number | null
          minutesBeforeWaiting: string | null
          minutesWaiting: string | null
          mobileGuid: string | null
          priority: number | null
          recordType: Database["public"]["Enums"]["recordType"] | null
          requestForChangeFlag: boolean | null
          resolutionHours: number | null
          resolvedBy: string | null
          resolveMinutes: number | null
          resplanBy: string | null
          resplanHours: number | null
          resPlanMinutes: number | null
          resplanSkippedMinutes: string | null
          respondedBy: string | null
          respondedHours: number | null
          respondedSkippedMinutes: string | null
          respondMinutes: number | null
          serviceLocation: number | null
          severity: Database["public"]["Enums"]["severity"] | null
          sla: number | null
          slaStatus: string | null
          source: number | null
          status: number | null
          subBillingMethod: string | null
          summary: string
          team: number | null
          type: number | null
          updatedBy: string | null
        }
        Insert: {
          allowAllClientsPortalView?: boolean | null
          approved?: boolean | null
          automaticEmailCcFlag?: boolean | null
          automaticEmailContactFlag?: boolean | null
          automaticEmailResourceFlag?: boolean | null
          billExpenses?: string | null
          billingMethod?: string | null
          billProducts?: string | null
          billTime?: string | null
          board?: number | null
          closedBy?: string | null
          closedDate?: string | null
          closedFlag?: boolean | null
          company?: number | null
          configuration?: string | null
          contact?: number | null
          currency?: number | null
          customerUpdatedFlag?: boolean | null
          dateEntered?: string | null
          dateResolved?: string | null
          dateResplan?: string | null
          dateResponded?: string | null
          department?: number | null
          enteredBy?: string | null
          escalationLevel?: number | null
          escalationStartDateUTC?: string | null
          estimatedExpenseCost?: string | null
          estimatedExpenseRevenue?: string | null
          estimatedProductCost?: string | null
          estimatedProductRevenue?: string | null
          estimatedTimeCost?: string | null
          estimatedTimeRevenue?: string | null
          hasChildTicket?: boolean | null
          hasMergedChildTicketFlag?: boolean | null
          id?: number
          impact?: Database["public"]["Enums"]["impact"] | null
          isInSla?: boolean | null
          lastUpdated?: string | null
          location?: number | null
          minutesBeforeWaiting?: string | null
          minutesWaiting?: string | null
          mobileGuid?: string | null
          priority?: number | null
          recordType?: Database["public"]["Enums"]["recordType"] | null
          requestForChangeFlag?: boolean | null
          resolutionHours?: number | null
          resolvedBy?: string | null
          resolveMinutes?: number | null
          resplanBy?: string | null
          resplanHours?: number | null
          resPlanMinutes?: number | null
          resplanSkippedMinutes?: string | null
          respondedBy?: string | null
          respondedHours?: number | null
          respondedSkippedMinutes?: string | null
          respondMinutes?: number | null
          serviceLocation?: number | null
          severity?: Database["public"]["Enums"]["severity"] | null
          sla?: number | null
          slaStatus?: string | null
          source?: number | null
          status?: number | null
          subBillingMethod?: string | null
          summary: string
          team?: number | null
          type?: number | null
          updatedBy?: string | null
        }
        Update: {
          allowAllClientsPortalView?: boolean | null
          approved?: boolean | null
          automaticEmailCcFlag?: boolean | null
          automaticEmailContactFlag?: boolean | null
          automaticEmailResourceFlag?: boolean | null
          billExpenses?: string | null
          billingMethod?: string | null
          billProducts?: string | null
          billTime?: string | null
          board?: number | null
          closedBy?: string | null
          closedDate?: string | null
          closedFlag?: boolean | null
          company?: number | null
          configuration?: string | null
          contact?: number | null
          currency?: number | null
          customerUpdatedFlag?: boolean | null
          dateEntered?: string | null
          dateResolved?: string | null
          dateResplan?: string | null
          dateResponded?: string | null
          department?: number | null
          enteredBy?: string | null
          escalationLevel?: number | null
          escalationStartDateUTC?: string | null
          estimatedExpenseCost?: string | null
          estimatedExpenseRevenue?: string | null
          estimatedProductCost?: string | null
          estimatedProductRevenue?: string | null
          estimatedTimeCost?: string | null
          estimatedTimeRevenue?: string | null
          hasChildTicket?: boolean | null
          hasMergedChildTicketFlag?: boolean | null
          id?: number
          impact?: Database["public"]["Enums"]["impact"] | null
          isInSla?: boolean | null
          lastUpdated?: string | null
          location?: number | null
          minutesBeforeWaiting?: string | null
          minutesWaiting?: string | null
          mobileGuid?: string | null
          priority?: number | null
          recordType?: Database["public"]["Enums"]["recordType"] | null
          requestForChangeFlag?: boolean | null
          resolutionHours?: number | null
          resolvedBy?: string | null
          resolveMinutes?: number | null
          resplanBy?: string | null
          resplanHours?: number | null
          resPlanMinutes?: number | null
          resplanSkippedMinutes?: string | null
          respondedBy?: string | null
          respondedHours?: number | null
          respondedSkippedMinutes?: string | null
          respondMinutes?: number | null
          serviceLocation?: number | null
          severity?: Database["public"]["Enums"]["severity"] | null
          sla?: number | null
          slaStatus?: string | null
          source?: number | null
          status?: number | null
          subBillingMethod?: string | null
          summary?: string
          team?: number | null
          type?: number | null
          updatedBy?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          company: string | null
          email: string
          firstName: string
          id: string
          inactiveFlag: string | null
          lastName: string
          organization: string | null
          title: string | null
          workerSid: string | null
        }
        Insert: {
          company?: string | null
          email: string
          firstName: string
          id: string
          inactiveFlag?: string | null
          lastName: string
          organization?: string | null
          title?: string | null
          workerSid?: string | null
        }
        Update: {
          company?: string | null
          email?: string
          firstName?: string
          id?: string
          inactiveFlag?: string | null
          lastName?: string
          organization?: string | null
          title?: string | null
          workerSid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      userTeams: {
        Row: {
          team: string
          user: string
        }
        Insert: {
          team: string
          user: string
        }
        Update: {
          team?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "userTeams_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userTeams_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
        }
        Returns: boolean
      }
      check_user_organization: {
        Args: {
          org_id: string
          user_id: string
        }
        Returns: boolean
      }
      check_user_organization_membership:
        | {
            Args: Record<PropertyKey, never>
            Returns: boolean
          }
        | {
            Args: {
              user_id: string
            }
            Returns: boolean
          }
        | {
            Args: {
              user_id: string
              org_id: string
            }
            Returns: boolean
          }
      create_new_ticket: {
        Args: {
          summary: string
        }
        Returns: undefined
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
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
      is_organization_member: {
        Args: {
          organization_id: string
          user_id: string
        }
        Returns: boolean
      }
      is_team_member: {
        Args: {
          team_id: string
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_permission: "channels.delete" | "messages.delete"
      app_role: "admin" | "moderator"
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
      secretKeyType:
        | "TWILIO_ACCOUNT_SID"
        | "TWILIO_AUTH_TOKEN"
        | "TWILIO_WORKSPACE_SID"
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
