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
            referencedColumns: ["id"]
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
          company: number | null
          created: string | null
          hasAvatar: boolean | null
          id: string
          label: string | null
          name: string | null
          objectKey: string | null
          timestamp: string | null
          type: string | null
          updated: string | null
        }
        Insert: {
          avatar?: string | null
          company?: number | null
          created?: string | null
          hasAvatar?: boolean | null
          id?: string
          label?: string | null
          name?: string | null
          objectKey?: string | null
          timestamp?: string | null
          type?: string | null
          updated?: string | null
        }
        Update: {
          avatar?: string | null
          company?: number | null
          created?: string | null
          hasAvatar?: boolean | null
          id?: string
          label?: string | null
          name?: string | null
          objectKey?: string | null
          timestamp?: string | null
          type?: string | null
          updated?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_assets_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_assets_type_fkey"
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
          update_by: string
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
            referencedRelation: "assetTypes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_assetTypes_update_by_fkey"
            columns: ["update_by"]
            isOneToOne: false
            referencedRelation: "contacts"
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
          id: number
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
          id?: number
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
          id?: number
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
            foreignKeyName: "public_companies_billToCompany_fkey"
            columns: ["billToCompany"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_companies_country_fkey"
            columns: ["country"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
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
          {
            foreignKeyName: "public_companies_timezone_fkey"
            columns: ["timezone"]
            isOneToOne: false
            referencedRelation: "timezones"
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
            foreignKeyName: "public_configurations_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_configurations_installed_by_fkey"
            columns: ["installed_by"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
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
            referencedRelation: "assetTypes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_configurations_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["user_id"]
          },
        ]
      }
      contacts: {
        Row: {
          childrenFlag: string | null
          company: number | null
          defaultBillingFlag: string | null
          defaultFlag: string | null
          defaultPhoneNbr: string | null
          defaultPhoneType: string | null
          disablePortalLoginFlag: string | null
          firstName: string
          id: string | null
          ignoreDuplicates: string | null
          inactiveFlag: string | null
          lastName: string
          marriedFlag: string | null
          mobileGuid: string | null
          portalSecurityLevel: string | null
          title: string | null
          unsubscribeFlag: boolean | null
          user_id: number
        }
        Insert: {
          childrenFlag?: string | null
          company?: number | null
          defaultBillingFlag?: string | null
          defaultFlag?: string | null
          defaultPhoneNbr?: string | null
          defaultPhoneType?: string | null
          disablePortalLoginFlag?: string | null
          firstName: string
          id?: string | null
          ignoreDuplicates?: string | null
          inactiveFlag?: string | null
          lastName: string
          marriedFlag?: string | null
          mobileGuid?: string | null
          portalSecurityLevel?: string | null
          title?: string | null
          unsubscribeFlag?: boolean | null
          user_id?: number
        }
        Update: {
          childrenFlag?: string | null
          company?: number | null
          defaultBillingFlag?: string | null
          defaultFlag?: string | null
          defaultPhoneNbr?: string | null
          defaultPhoneType?: string | null
          disablePortalLoginFlag?: string | null
          firstName?: string
          id?: string | null
          ignoreDuplicates?: string | null
          inactiveFlag?: string | null
          lastName?: string
          marriedFlag?: string | null
          mobileGuid?: string | null
          portalSecurityLevel?: string | null
          title?: string | null
          unsubscribeFlag?: boolean | null
          user_id?: number
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
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_contacts: {
        Row: {
          contact: number
          user: string
        }
        Insert: {
          contact: number
          user: string
        }
        Update: {
          contact?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_favorite_contacts_contact_fkey"
            columns: ["contact"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_favorite_contacts_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
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
        Relationships: [
          {
            foreignKeyName: "company_notes_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_notes_enteredBy_fkey"
            columns: ["enteredBy"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["user_id"]
          },
        ]
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
            foreignKeyName: "public_page_relations_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
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
      priorities: {
        Row: {
          created_at: string
          id: number
          name: string
          sort: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          sort: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          sort?: number
        }
        Relationships: []
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
            referencedRelation: "assetTypes"
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
      service_locations: {
        Row: {
          defaultFlag: boolean | null
          id: number
          name: string
          where: Database["public"]["Enums"]["where"]
        }
        Insert: {
          defaultFlag?: boolean | null
          id?: number
          name: string
          where: Database["public"]["Enums"]["where"]
        }
        Update: {
          defaultFlag?: boolean | null
          id?: number
          name?: string
          where?: Database["public"]["Enums"]["where"]
        }
        Relationships: []
      }
      sources: {
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
      statuses: {
        Row: {
          board: number | null
          created_at: string
          id: number
          name: string
          sort: number | null
        }
        Insert: {
          board?: number | null
          created_at?: string
          id?: number
          name: string
          sort?: number | null
        }
        Update: {
          board?: number | null
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
      teams: {
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
        Relationships: [
          {
            foreignKeyName: "public_tickets_configuration_fkey"
            columns: ["configuration"]
            isOneToOne: false
            referencedRelation: "configurations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_tickets_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_tickets_board/id_fkey"
            columns: ["board"]
            isOneToOne: false
            referencedRelation: "boards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_tickets_company/id_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_tickets_contact/id_fkey"
            columns: ["contact"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "service_tickets_priority/id_fkey"
            columns: ["priority"]
            isOneToOne: false
            referencedRelation: "priorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_tickets_serviceLocation_fkey"
            columns: ["serviceLocation"]
            isOneToOne: false
            referencedRelation: "service_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_tickets_sla/id_fkey"
            columns: ["sla"]
            isOneToOne: false
            referencedRelation: "service_level_agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_tickets_source/id_fkey"
            columns: ["source"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_tickets_team/id_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_tickets_type/id_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "types"
            referencedColumns: ["reference_id"]
          },
        ]
      }
      types: {
        Row: {
          created_at: string
          id: string
          name: string
          parent: number | null
          reference_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          parent?: number | null
          reference_id?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          parent?: number | null
          reference_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_types_parent_fkey"
            columns: ["parent"]
            isOneToOne: false
            referencedRelation: "types"
            referencedColumns: ["reference_id"]
          },
        ]
      }
    }
    Views: {
      average_tickets_created: {
        Row: {
          dateEntered: string | null
          ticket_count: number | null
        }
        Relationships: []
      }
      ticket_by_first_reply_time: {
        Row: {
          response_time_group: string | null
          ticket_count: number | null
        }
        Relationships: []
      }
      ticket_source_summary: {
        Row: {
          source_name: string | null
          ticket_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_new_ticket: {
        Args: {
          summary: string
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
      impact: "Low" | "Medium" | "High"
      recordType: "ProjectIssue" | "ProjectTicket" | "ServiceTicket"
      severity: "Low" | "Medium" | "High"
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
