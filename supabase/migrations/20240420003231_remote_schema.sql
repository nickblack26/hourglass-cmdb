
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA IF NOT EXISTS "Organization";

ALTER SCHEMA "Organization" OWNER TO "postgres";

CREATE SCHEMA IF NOT EXISTS "company";

ALTER SCHEMA "company" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE SCHEMA IF NOT EXISTS "service";

ALTER SCHEMA "service" OWNER TO "postgres";

CREATE SCHEMA IF NOT EXISTS "system";

ALTER SCHEMA "system" OWNER TO "postgres";

CREATE SCHEMA IF NOT EXISTS "workflow";

ALTER SCHEMA "workflow" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."Block Type" AS ENUM (
    'heading_1',
    'heading_2',
    'heading_3',
    'heading_4',
    'paragraph'
);

ALTER TYPE "public"."Block Type" OWNER TO "postgres";

CREATE TYPE "public"."icon" AS ENUM (
    'phone',
    'laptop',
    'printer',
    'server',
    'router',
    'cable',
    'cpu',
    'hard-drive',
    'memory-stick',
    'pc-case',
    'monitor'
);

ALTER TYPE "public"."icon" OWNER TO "postgres";

CREATE TYPE "public"."impact" AS ENUM (
    'Low',
    'Medium',
    'High'
);

ALTER TYPE "public"."impact" OWNER TO "postgres";

CREATE TYPE "public"."recordType" AS ENUM (
    'ProjectIssue',
    'ProjectTicket',
    'ServiceTicket'
);

ALTER TYPE "public"."recordType" OWNER TO "postgres";

CREATE TYPE "public"."severity" AS ENUM (
    'Low',
    'Medium',
    'High'
);

ALTER TYPE "public"."severity" OWNER TO "postgres";

CREATE TYPE "public"."statusCategory" AS ENUM (
    'TODO',
    'IN_PROGRESS',
    'DONE'
);

ALTER TYPE "public"."statusCategory" OWNER TO "postgres";

COMMENT ON TYPE "public"."statusCategory" IS 'The category of the status.';

CREATE TYPE "public"."where" AS ENUM (
    'OnSite',
    'Remote',
    'InHouse'
);

ALTER TYPE "public"."where" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."create_new_ticket"("summary" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$begin
INSERT INTO public.tickets (summary, source)
VALUES (create_new_ticket.summary, 4);
end$$;

ALTER FUNCTION "public"."create_new_ticket"("summary" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."execute_action"("automation_id" integer) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    action_sql TEXT;
BEGIN
    -- Retrieve the action SQL statement from the Automation table
    SELECT action INTO action_sql FROM Automation WHERE automation_id = execute_action.automation_id;

    -- Execute the action SQL statement
    EXECUTE action_sql;
END;
$$;

ALTER FUNCTION "public"."execute_action"("automation_id" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."execute_action"("automation_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    action_sql TEXT;
BEGIN
    -- Retrieve the action SQL statement from the Automation table
    SELECT action INTO action_sql FROM automations WHERE automations.id = execute_action.automation_id;

    -- Execute the action SQL statement
    EXECUTE action_sql;
END;
$$;

ALTER FUNCTION "public"."execute_action"("automation_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."answers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "text" "text" NOT NULL,
    "rating" smallint,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_by" "uuid" DEFAULT "auth"."uid"(),
    "question" "uuid" NOT NULL,
    "meets_expectations" boolean DEFAULT false NOT NULL,
    CONSTRAINT "answer_rating_check" CHECK ((("rating" >= 0) OR ("rating" <= 10)))
);

ALTER TABLE "public"."answers" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."assetTypes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "parent" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "last_updated" timestamp with time zone,
    "update_by" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "icon" "public"."icon"
);

ALTER TABLE "public"."assetTypes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."assets" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text",
    "label" "text",
    "objectKey" "text",
    "avatar" "uuid",
    "type" "uuid",
    "created" timestamp with time zone DEFAULT "now"(),
    "updated" timestamp with time zone,
    "hasAvatar" boolean,
    "timestamp" timestamp with time zone,
    "company" bigint
);

ALTER TABLE "public"."assets" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."attributes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "cost" numeric,
    "price" numeric
);

ALTER TABLE "public"."attributes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."tickets" (
    "summary" "text" NOT NULL,
    "recordType" "public"."recordType",
    "board" bigint,
    "status" bigint,
    "company" bigint,
    "contact" bigint,
    "type" bigint,
    "team" bigint,
    "priority" bigint,
    "serviceLocation" bigint,
    "source" bigint,
    "severity" "public"."severity",
    "impact" "public"."impact",
    "allowAllClientsPortalView" boolean,
    "customerUpdatedFlag" boolean,
    "automaticEmailContactFlag" boolean,
    "automaticEmailResourceFlag" boolean,
    "automaticEmailCcFlag" boolean,
    "closedDate" timestamp with time zone,
    "closedBy" "text",
    "closedFlag" boolean,
    "approved" boolean,
    "estimatedExpenseCost" "text",
    "estimatedExpenseRevenue" "text",
    "estimatedProductCost" "text",
    "estimatedProductRevenue" "text",
    "estimatedTimeCost" "text",
    "estimatedTimeRevenue" "text",
    "billingMethod" "text",
    "subBillingMethod" "text",
    "dateResolved" timestamp with time zone,
    "dateResplan" timestamp with time zone,
    "dateResponded" timestamp with time zone,
    "resolveMinutes" bigint,
    "resPlanMinutes" bigint,
    "respondMinutes" bigint,
    "isInSla" boolean,
    "hasChildTicket" boolean,
    "hasMergedChildTicketFlag" boolean,
    "billTime" "text",
    "billExpenses" "text",
    "billProducts" "text",
    "location" bigint,
    "department" bigint,
    "mobileGuid" "text",
    "sla" bigint,
    "slaStatus" "text",
    "requestForChangeFlag" boolean,
    "currency" bigint,
    "escalationStartDateUTC" timestamp with time zone,
    "escalationLevel" bigint,
    "minutesBeforeWaiting" "text",
    "respondedSkippedMinutes" "text",
    "resplanSkippedMinutes" "text",
    "respondedHours" bigint,
    "respondedBy" "text",
    "resplanHours" bigint,
    "resplanBy" "text",
    "resolutionHours" bigint,
    "resolvedBy" "text",
    "minutesWaiting" "text",
    "id" bigint NOT NULL,
    "lastUpdated" timestamp with time zone,
    "dateEntered" timestamp with time zone DEFAULT "now"(),
    "updatedBy" "text",
    "enteredBy" "text",
    "configuration" "uuid"
);

ALTER TABLE "public"."tickets" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."average_tickets_created" AS
 SELECT "date_trunc"('day'::"text", "tickets"."dateEntered") AS "dateEntered",
    "count"("tickets"."id") AS "ticket_count"
   FROM "public"."tickets"
  GROUP BY ("date_trunc"('day'::"text", "tickets"."dateEntered"));

ALTER TABLE "public"."average_tickets_created" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."blocks" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "type" "text" DEFAULT 'paragraph'::"text" NOT NULL,
    "text" "text" NOT NULL,
    "annotations" "jsonb",
    "page" "uuid" NOT NULL,
    "sibling" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."blocks" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."boards" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."boards" OWNER TO "postgres";

ALTER TABLE "public"."boards" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."boards_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."companies" (
    "identifier" "text",
    "name" "text",
    "addressLine1" "text",
    "addressLine2" "text",
    "city" "text",
    "state" "text",
    "zip" "text",
    "phoneNumber" "text",
    "faxNumber" "text",
    "website" "text",
    "accountNumber" "text",
    "dateAcquired" timestamp with time zone,
    "annualRevenue" "text",
    "leadFlag" boolean,
    "unsubscribeFlag" "text",
    "vendorIdentifier" "text",
    "taxIdentifier" "text",
    "deletedFlag" boolean,
    "mobileGuid" "text",
    "isVendorFlag" boolean,
    "id" bigint NOT NULL,
    "status" bigint,
    "country" bigint,
    "territory" bigint,
    "timezone" bigint,
    "billToCompany" bigint
);

ALTER TABLE "public"."companies" OWNER TO "postgres";

ALTER TABLE "public"."companies" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."companies_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."configurations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "status" bigint,
    "install_date" timestamp with time zone,
    "installed_by" "uuid",
    "purchase_date" timestamp with time zone,
    "expiration_date" timestamp with time zone,
    "serial_number" "text",
    "company" bigint,
    "user" bigint,
    "quantity" smallint DEFAULT '1'::smallint,
    "product" "uuid",
    "type" "uuid",
    CONSTRAINT "configurations_quantity_check" CHECK (("quantity" > 0))
);

ALTER TABLE "public"."configurations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."contacts" (
    "user_id" bigint NOT NULL,
    "firstName" "text" NOT NULL,
    "lastName" "text" NOT NULL,
    "inactiveFlag" "text",
    "title" "text",
    "marriedFlag" "text",
    "childrenFlag" "text",
    "portalSecurityLevel" "text",
    "disablePortalLoginFlag" "text",
    "unsubscribeFlag" boolean,
    "mobileGuid" "text",
    "defaultPhoneType" "text",
    "defaultPhoneNbr" "text",
    "defaultBillingFlag" "text",
    "defaultFlag" "text",
    "ignoreDuplicates" "text",
    "company" bigint,
    "id" "uuid"
);

ALTER TABLE "public"."contacts" OWNER TO "postgres";

ALTER TABLE "public"."contacts" ALTER COLUMN "user_id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."contacts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."favorite_contacts" (
    "user" "uuid" NOT NULL,
    "contact" bigint NOT NULL
);

ALTER TABLE "public"."favorite_contacts" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."service_locations" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "where" "public"."where" NOT NULL,
    "defaultFlag" boolean
);

ALTER TABLE "public"."service_locations" OWNER TO "postgres";

ALTER TABLE "public"."service_locations" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."location_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."locations" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."locations" OWNER TO "postgres";

ALTER TABLE "public"."locations" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."locations_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."notes" (
    "id" bigint NOT NULL,
    "text" "text" NOT NULL,
    "type" bigint,
    "flagged" boolean,
    "enteredBy" bigint,
    "company" bigint,
    "createdAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."notes" OWNER TO "postgres";

ALTER TABLE "public"."notes" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."notes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."organizations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "company" bigint NOT NULL
);

ALTER TABLE "public"."organizations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."page_relations" (
    "page" "uuid" NOT NULL,
    "configuration" "uuid",
    "company" bigint
);

ALTER TABLE "public"."page_relations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."pages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "parent" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "last_updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."pages" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."priorities" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "sort" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."priorities" OWNER TO "postgres";

ALTER TABLE "public"."priorities" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."priorities_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."product_attributes" (
    "product" "uuid" NOT NULL,
    "attribute" "uuid" NOT NULL
);

ALTER TABLE "public"."product_attributes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."products" (
    "name" "text" NOT NULL,
    "description" "text",
    "cost" numeric,
    "price" numeric,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "text",
    "quantity" bigint DEFAULT '1'::bigint NOT NULL,
    "parent" "uuid"
);

ALTER TABLE "public"."products" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."question_pages" (
    "question" "uuid" NOT NULL,
    "page" "uuid" NOT NULL
);

ALTER TABLE "public"."question_pages" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."question_types" (
    "question" "uuid" NOT NULL,
    "type" "uuid" NOT NULL
);

ALTER TABLE "public"."question_types" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."questions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "notes" "text"
);

ALTER TABLE "public"."questions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."service_level_agreements" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."service_level_agreements" OWNER TO "postgres";

ALTER TABLE "public"."service_level_agreements" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."service_level_agreements_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."sources" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."sources" OWNER TO "postgres";

ALTER TABLE "public"."sources" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."sources_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."statuses" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "board" bigint,
    "sort" bigint,
    "category" "public"."statusCategory" DEFAULT 'TODO'::"public"."statusCategory"
);

ALTER TABLE "public"."statuses" OWNER TO "postgres";

ALTER TABLE "public"."statuses" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."statuses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."teams" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."teams" OWNER TO "postgres";

ALTER TABLE "public"."teams" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."teams_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE OR REPLACE VIEW "public"."ticket_by_first_reply_time" AS
 SELECT
        CASE
            WHEN ("t"."dateResponded" IS NULL) THEN 'No replies'::"text"
            WHEN (("t"."dateResponded" - "t"."dateEntered") <= '01:00:00'::interval) THEN '0-1 Hours'::"text"
            WHEN (("t"."dateResponded" - "t"."dateEntered") <= '08:00:00'::interval) THEN '1-8 Hours'::"text"
            WHEN (("t"."dateResponded" - "t"."dateEntered") <= '24:00:00'::interval) THEN '8-24 Hours'::"text"
            ELSE '>24 Hours'::"text"
        END AS "response_time_group",
    "count"("t"."id") AS "ticket_count"
   FROM "public"."tickets" "t"
  GROUP BY
        CASE
            WHEN ("t"."dateResponded" IS NULL) THEN 'No replies'::"text"
            WHEN (("t"."dateResponded" - "t"."dateEntered") <= '01:00:00'::interval) THEN '0-1 Hours'::"text"
            WHEN (("t"."dateResponded" - "t"."dateEntered") <= '08:00:00'::interval) THEN '1-8 Hours'::"text"
            WHEN (("t"."dateResponded" - "t"."dateEntered") <= '24:00:00'::interval) THEN '8-24 Hours'::"text"
            ELSE '>24 Hours'::"text"
        END;

ALTER TABLE "public"."ticket_by_first_reply_time" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."ticket_source_summary" AS
 SELECT "s"."name" AS "source_name",
    "count"("t"."id") AS "ticket_count"
   FROM ("public"."tickets" "t"
     JOIN "public"."sources" "s" ON (("t"."source" = "s"."id")))
  GROUP BY "s"."name";

ALTER TABLE "public"."ticket_source_summary" OWNER TO "postgres";

ALTER TABLE "public"."tickets" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."tickets_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."types" (
    "reference_id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "parent" bigint,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);

ALTER TABLE "public"."types" OWNER TO "postgres";

ALTER TABLE "public"."types" ALTER COLUMN "reference_id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."types_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "service"."statuses" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "Sort" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "service"."statuses" OWNER TO "postgres";

ALTER TABLE "service"."statuses" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "service"."statuses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "system"."countries" (
    "id" bigint NOT NULL,
    "identifier" "text",
    "name" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "system"."countries" OWNER TO "postgres";

ALTER TABLE "system"."countries" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "system"."countries_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "system"."timezones" (
    "id" bigint NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL
);

ALTER TABLE "system"."timezones" OWNER TO "postgres";

ALTER TABLE "system"."timezones" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "system"."timezones_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "workflow"."automation_triggers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "automation" "uuid" NOT NULL,
    "ticket" bigint
);

ALTER TABLE "workflow"."automation_triggers" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "workflow"."automations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "condition" "text",
    "action" "text" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "workflow"."automations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "workflow"."request_data" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "value" "text" NOT NULL,
    "request" "uuid" NOT NULL
);

ALTER TABLE "workflow"."request_data" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "workflow"."requests" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "process" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "date" timestamp with time zone,
    "created_by" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "workflow"."requests" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "workflow"."state_types" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "workflow"."state_types" OWNER TO "postgres";

ALTER TABLE ONLY "public"."answers"
    ADD CONSTRAINT "answer_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."assetTypes"
    ADD CONSTRAINT "assetTypes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."assets"
    ADD CONSTRAINT "assets_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."attributes"
    ADD CONSTRAINT "attributes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."blocks"
    ADD CONSTRAINT "blocks_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."boards"
    ADD CONSTRAINT "boards_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."companies"
    ADD CONSTRAINT "companies_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."configurations"
    ADD CONSTRAINT "configurations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."contacts"
    ADD CONSTRAINT "contacts_id_key" UNIQUE ("user_id");

ALTER TABLE ONLY "public"."contacts"
    ADD CONSTRAINT "contacts_id_key1" UNIQUE ("id");

ALTER TABLE ONLY "public"."favorite_contacts"
    ADD CONSTRAINT "favorite_contacts_pkey" PRIMARY KEY ("user", "contact");

ALTER TABLE ONLY "public"."service_locations"
    ADD CONSTRAINT "location_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."locations"
    ADD CONSTRAINT "locations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."notes"
    ADD CONSTRAINT "notes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."page_relations"
    ADD CONSTRAINT "page_relations_pkey" PRIMARY KEY ("page");

ALTER TABLE ONLY "public"."pages"
    ADD CONSTRAINT "pages_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."priorities"
    ADD CONSTRAINT "priorities_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."product_attributes"
    ADD CONSTRAINT "product_attributes_pkey" PRIMARY KEY ("product", "attribute");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_product_id_key" UNIQUE ("product_id");

ALTER TABLE ONLY "public"."question_pages"
    ADD CONSTRAINT "question_pages_pkey" PRIMARY KEY ("question", "page");

ALTER TABLE ONLY "public"."question_types"
    ADD CONSTRAINT "question_types_pkey" PRIMARY KEY ("question", "type");

ALTER TABLE ONLY "public"."questions"
    ADD CONSTRAINT "questions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."service_level_agreements"
    ADD CONSTRAINT "service_level_agreements_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."sources"
    ADD CONSTRAINT "sources_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."statuses"
    ADD CONSTRAINT "statuses_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."teams"
    ADD CONSTRAINT "teams_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "tickets_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."types"
    ADD CONSTRAINT "types_pkey" PRIMARY KEY ("reference_id");

ALTER TABLE ONLY "public"."types"
    ADD CONSTRAINT "types_reference_id_key" UNIQUE ("reference_id");

ALTER TABLE ONLY "service"."statuses"
    ADD CONSTRAINT "statuses_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "system"."countries"
    ADD CONSTRAINT "countries_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "system"."timezones"
    ADD CONSTRAINT "timezones_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "workflow"."automation_triggers"
    ADD CONSTRAINT "automation_triggers_pkey" PRIMARY KEY ("id", "automation");

ALTER TABLE ONLY "workflow"."automations"
    ADD CONSTRAINT "automations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "workflow"."request_data"
    ADD CONSTRAINT "request_data_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "workflow"."requests"
    ADD CONSTRAINT "requests_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "workflow"."state_types"
    ADD CONSTRAINT "state_types_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."notes"
    ADD CONSTRAINT "company_notes_company_fkey" FOREIGN KEY ("company") REFERENCES "public"."companies"("id");

ALTER TABLE ONLY "public"."notes"
    ADD CONSTRAINT "company_notes_enteredBy_fkey" FOREIGN KEY ("enteredBy") REFERENCES "public"."contacts"("user_id");

ALTER TABLE ONLY "public"."answers"
    ADD CONSTRAINT "public_answer_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."contacts"("id");

ALTER TABLE ONLY "public"."answers"
    ADD CONSTRAINT "public_answer_question_fkey" FOREIGN KEY ("question") REFERENCES "public"."questions"("id");

ALTER TABLE ONLY "public"."assetTypes"
    ADD CONSTRAINT "public_assetTypes_parent_fkey" FOREIGN KEY ("parent") REFERENCES "public"."assetTypes"("id");

ALTER TABLE ONLY "public"."assetTypes"
    ADD CONSTRAINT "public_assetTypes_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "public"."contacts"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."assets"
    ADD CONSTRAINT "public_assets_company_fkey" FOREIGN KEY ("company") REFERENCES "public"."companies"("id");

ALTER TABLE ONLY "public"."assets"
    ADD CONSTRAINT "public_assets_type_fkey" FOREIGN KEY ("type") REFERENCES "public"."assetTypes"("id");

ALTER TABLE ONLY "public"."blocks"
    ADD CONSTRAINT "public_blocks_page_fkey" FOREIGN KEY ("page") REFERENCES "public"."pages"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."blocks"
    ADD CONSTRAINT "public_blocks_sibling_fkey" FOREIGN KEY ("sibling") REFERENCES "public"."blocks"("id");

ALTER TABLE ONLY "public"."companies"
    ADD CONSTRAINT "public_companies_billToCompany_fkey" FOREIGN KEY ("billToCompany") REFERENCES "public"."companies"("id");

ALTER TABLE ONLY "public"."companies"
    ADD CONSTRAINT "public_companies_country_fkey" FOREIGN KEY ("country") REFERENCES "system"."countries"("id");

ALTER TABLE ONLY "public"."companies"
    ADD CONSTRAINT "public_companies_status_fkey" FOREIGN KEY ("status") REFERENCES "public"."statuses"("id");

ALTER TABLE ONLY "public"."companies"
    ADD CONSTRAINT "public_companies_territory_fkey" FOREIGN KEY ("territory") REFERENCES "public"."locations"("id");

ALTER TABLE ONLY "public"."companies"
    ADD CONSTRAINT "public_companies_timezone_fkey" FOREIGN KEY ("timezone") REFERENCES "system"."timezones"("id");

ALTER TABLE ONLY "public"."product_attributes"
    ADD CONSTRAINT "public_configuration_attributes_attribute_fkey" FOREIGN KEY ("attribute") REFERENCES "public"."attributes"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."configurations"
    ADD CONSTRAINT "public_configurations_company_fkey" FOREIGN KEY ("company") REFERENCES "public"."companies"("id");

ALTER TABLE ONLY "public"."configurations"
    ADD CONSTRAINT "public_configurations_installed_by_fkey" FOREIGN KEY ("installed_by") REFERENCES "public"."contacts"("id");

ALTER TABLE ONLY "public"."configurations"
    ADD CONSTRAINT "public_configurations_product_fkey" FOREIGN KEY ("product") REFERENCES "public"."products"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."configurations"
    ADD CONSTRAINT "public_configurations_status_fkey" FOREIGN KEY ("status") REFERENCES "public"."statuses"("id");

ALTER TABLE ONLY "public"."configurations"
    ADD CONSTRAINT "public_configurations_type_fkey" FOREIGN KEY ("type") REFERENCES "public"."assetTypes"("id");

ALTER TABLE ONLY "public"."configurations"
    ADD CONSTRAINT "public_configurations_user_fkey" FOREIGN KEY ("user") REFERENCES "public"."contacts"("user_id");

ALTER TABLE ONLY "public"."contacts"
    ADD CONSTRAINT "public_contacts_company_fkey" FOREIGN KEY ("company") REFERENCES "public"."companies"("id");

ALTER TABLE ONLY "public"."contacts"
    ADD CONSTRAINT "public_contacts_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."favorite_contacts"
    ADD CONSTRAINT "public_favorite_contacts_contact_fkey" FOREIGN KEY ("contact") REFERENCES "public"."contacts"("user_id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."favorite_contacts"
    ADD CONSTRAINT "public_favorite_contacts_user_fkey" FOREIGN KEY ("user") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "public_organizations_company_fkey" FOREIGN KEY ("company") REFERENCES "public"."companies"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."page_relations"
    ADD CONSTRAINT "public_page_relations_company_fkey" FOREIGN KEY ("company") REFERENCES "public"."companies"("id");

ALTER TABLE ONLY "public"."page_relations"
    ADD CONSTRAINT "public_page_relations_configuration_fkey" FOREIGN KEY ("configuration") REFERENCES "public"."configurations"("id");

ALTER TABLE ONLY "public"."page_relations"
    ADD CONSTRAINT "public_page_relations_page_fkey" FOREIGN KEY ("page") REFERENCES "public"."pages"("id");

ALTER TABLE ONLY "public"."pages"
    ADD CONSTRAINT "public_pages_parent_fkey" FOREIGN KEY ("parent") REFERENCES "public"."pages"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."product_attributes"
    ADD CONSTRAINT "public_product_attributes_product_fkey" FOREIGN KEY ("product") REFERENCES "public"."products"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "public_products_parent_fkey" FOREIGN KEY ("parent") REFERENCES "public"."products"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."question_pages"
    ADD CONSTRAINT "public_question_pages_page_fkey" FOREIGN KEY ("page") REFERENCES "public"."pages"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."question_pages"
    ADD CONSTRAINT "public_question_pages_question_fkey" FOREIGN KEY ("question") REFERENCES "public"."questions"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."question_types"
    ADD CONSTRAINT "public_question_types_question_fkey" FOREIGN KEY ("question") REFERENCES "public"."questions"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."question_types"
    ADD CONSTRAINT "public_question_types_type_fkey" FOREIGN KEY ("type") REFERENCES "public"."assetTypes"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."statuses"
    ADD CONSTRAINT "public_statuses_board_fkey" FOREIGN KEY ("board") REFERENCES "public"."boards"("id");

ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "public_tickets_configuration_fkey" FOREIGN KEY ("configuration") REFERENCES "public"."configurations"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "public_tickets_status_fkey" FOREIGN KEY ("status") REFERENCES "public"."statuses"("id");

ALTER TABLE ONLY "public"."types"
    ADD CONSTRAINT "public_types_parent_fkey" FOREIGN KEY ("parent") REFERENCES "public"."types"("reference_id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "service_tickets_board/id_fkey" FOREIGN KEY ("board") REFERENCES "public"."boards"("id");

ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "service_tickets_company/id_fkey" FOREIGN KEY ("company") REFERENCES "public"."companies"("id");

ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "service_tickets_contact/id_fkey" FOREIGN KEY ("contact") REFERENCES "public"."contacts"("user_id");

ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "service_tickets_priority/id_fkey" FOREIGN KEY ("priority") REFERENCES "public"."priorities"("id");

ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "service_tickets_serviceLocation_fkey" FOREIGN KEY ("serviceLocation") REFERENCES "public"."service_locations"("id");

ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "service_tickets_sla/id_fkey" FOREIGN KEY ("sla") REFERENCES "public"."service_level_agreements"("id");

ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "service_tickets_source/id_fkey" FOREIGN KEY ("source") REFERENCES "public"."sources"("id");

ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "service_tickets_team/id_fkey" FOREIGN KEY ("team") REFERENCES "public"."teams"("id");

ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "service_tickets_type/id_fkey" FOREIGN KEY ("type") REFERENCES "public"."types"("reference_id");

ALTER TABLE ONLY "workflow"."automation_triggers"
    ADD CONSTRAINT "workflow_automation_triggers_automation_fkey" FOREIGN KEY ("automation") REFERENCES "workflow"."automations"("id");

ALTER TABLE ONLY "workflow"."automation_triggers"
    ADD CONSTRAINT "workflow_automation_triggers_ticket_fkey" FOREIGN KEY ("ticket") REFERENCES "public"."tickets"("id");

ALTER TABLE ONLY "workflow"."request_data"
    ADD CONSTRAINT "workflow_request_data_request_fkey" FOREIGN KEY ("request") REFERENCES "workflow"."requests"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "All" ON "public"."assetTypes" USING (true);

CREATE POLICY "All" ON "public"."blocks" USING (true) WITH CHECK (true);

CREATE POLICY "All" ON "public"."pages" USING (true) WITH CHECK (true);

CREATE POLICY "All" ON "public"."tickets" USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."attributes" USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."boards" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."companies" USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."configurations" USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."contacts" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."favorite_contacts" USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."locations" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."notes" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."priorities" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."product_attributes" USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."products" USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."service_level_agreements" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."service_locations" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."sources" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."statuses" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."teams" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."types" FOR SELECT USING (true);

CREATE POLICY "all" ON "public"."answers" USING (true) WITH CHECK (true);

CREATE POLICY "all" ON "public"."organizations" USING (true) WITH CHECK (true);

CREATE POLICY "all" ON "public"."question_pages" USING (true) WITH CHECK (true);

CREATE POLICY "all" ON "public"."question_types" USING (true) WITH CHECK (true);

CREATE POLICY "all" ON "public"."questions" USING (true) WITH CHECK (true);

ALTER TABLE "public"."answers" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."assetTypes" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."assets" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."attributes" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."blocks" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."boards" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."companies" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."configurations" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."contacts" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."favorite_contacts" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."locations" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."notes" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."organizations" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."page_relations" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."pages" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."priorities" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."product_attributes" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."question_pages" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."question_types" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."questions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."service_level_agreements" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."service_locations" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."sources" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."statuses" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."teams" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."tickets" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."types" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "service"."statuses" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "system"."countries" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "system"."timezones" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "workflow"."automation_triggers" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "workflow"."automations" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "workflow"."request_data" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "workflow"."requests" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "workflow"."state_types" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "company" TO "anon";
GRANT USAGE ON SCHEMA "company" TO "authenticated";
GRANT USAGE ON SCHEMA "company" TO "service_role";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT USAGE ON SCHEMA "service" TO "anon";
GRANT USAGE ON SCHEMA "service" TO "authenticated";
GRANT USAGE ON SCHEMA "service" TO "service_role";

GRANT ALL ON FUNCTION "public"."create_new_ticket"("summary" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."create_new_ticket"("summary" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_new_ticket"("summary" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."execute_action"("automation_id" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."execute_action"("automation_id" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."execute_action"("automation_id" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."execute_action"("automation_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."execute_action"("automation_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."execute_action"("automation_id" "uuid") TO "service_role";

GRANT ALL ON TABLE "public"."answers" TO "anon";
GRANT ALL ON TABLE "public"."answers" TO "authenticated";
GRANT ALL ON TABLE "public"."answers" TO "service_role";

GRANT ALL ON TABLE "public"."assetTypes" TO "anon";
GRANT ALL ON TABLE "public"."assetTypes" TO "authenticated";
GRANT ALL ON TABLE "public"."assetTypes" TO "service_role";

GRANT ALL ON TABLE "public"."assets" TO "anon";
GRANT ALL ON TABLE "public"."assets" TO "authenticated";
GRANT ALL ON TABLE "public"."assets" TO "service_role";

GRANT ALL ON TABLE "public"."attributes" TO "anon";
GRANT ALL ON TABLE "public"."attributes" TO "authenticated";
GRANT ALL ON TABLE "public"."attributes" TO "service_role";

GRANT ALL ON TABLE "public"."tickets" TO "anon";
GRANT ALL ON TABLE "public"."tickets" TO "authenticated";
GRANT ALL ON TABLE "public"."tickets" TO "service_role";

GRANT ALL ON TABLE "public"."average_tickets_created" TO "anon";
GRANT ALL ON TABLE "public"."average_tickets_created" TO "authenticated";
GRANT ALL ON TABLE "public"."average_tickets_created" TO "service_role";

GRANT ALL ON TABLE "public"."blocks" TO "anon";
GRANT ALL ON TABLE "public"."blocks" TO "authenticated";
GRANT ALL ON TABLE "public"."blocks" TO "service_role";

GRANT ALL ON TABLE "public"."boards" TO "anon";
GRANT ALL ON TABLE "public"."boards" TO "authenticated";
GRANT ALL ON TABLE "public"."boards" TO "service_role";

GRANT ALL ON SEQUENCE "public"."boards_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."boards_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."boards_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."companies" TO "anon";
GRANT ALL ON TABLE "public"."companies" TO "authenticated";
GRANT ALL ON TABLE "public"."companies" TO "service_role";

GRANT ALL ON SEQUENCE "public"."companies_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."companies_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."companies_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."configurations" TO "anon";
GRANT ALL ON TABLE "public"."configurations" TO "authenticated";
GRANT ALL ON TABLE "public"."configurations" TO "service_role";

GRANT ALL ON TABLE "public"."contacts" TO "anon";
GRANT ALL ON TABLE "public"."contacts" TO "authenticated";
GRANT ALL ON TABLE "public"."contacts" TO "service_role";

GRANT ALL ON SEQUENCE "public"."contacts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."contacts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."contacts_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."favorite_contacts" TO "anon";
GRANT ALL ON TABLE "public"."favorite_contacts" TO "authenticated";
GRANT ALL ON TABLE "public"."favorite_contacts" TO "service_role";

GRANT ALL ON TABLE "public"."service_locations" TO "anon";
GRANT ALL ON TABLE "public"."service_locations" TO "authenticated";
GRANT ALL ON TABLE "public"."service_locations" TO "service_role";

GRANT ALL ON SEQUENCE "public"."location_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."location_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."location_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."locations" TO "anon";
GRANT ALL ON TABLE "public"."locations" TO "authenticated";
GRANT ALL ON TABLE "public"."locations" TO "service_role";

GRANT ALL ON SEQUENCE "public"."locations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."locations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."locations_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."notes" TO "anon";
GRANT ALL ON TABLE "public"."notes" TO "authenticated";
GRANT ALL ON TABLE "public"."notes" TO "service_role";

GRANT ALL ON SEQUENCE "public"."notes_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."notes_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."notes_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."organizations" TO "anon";
GRANT ALL ON TABLE "public"."organizations" TO "authenticated";
GRANT ALL ON TABLE "public"."organizations" TO "service_role";

GRANT ALL ON TABLE "public"."page_relations" TO "anon";
GRANT ALL ON TABLE "public"."page_relations" TO "authenticated";
GRANT ALL ON TABLE "public"."page_relations" TO "service_role";

GRANT ALL ON TABLE "public"."pages" TO "anon";
GRANT ALL ON TABLE "public"."pages" TO "authenticated";
GRANT ALL ON TABLE "public"."pages" TO "service_role";

GRANT ALL ON TABLE "public"."priorities" TO "anon";
GRANT ALL ON TABLE "public"."priorities" TO "authenticated";
GRANT ALL ON TABLE "public"."priorities" TO "service_role";

GRANT ALL ON SEQUENCE "public"."priorities_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."priorities_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."priorities_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."product_attributes" TO "anon";
GRANT ALL ON TABLE "public"."product_attributes" TO "authenticated";
GRANT ALL ON TABLE "public"."product_attributes" TO "service_role";

GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";

GRANT ALL ON TABLE "public"."question_pages" TO "anon";
GRANT ALL ON TABLE "public"."question_pages" TO "authenticated";
GRANT ALL ON TABLE "public"."question_pages" TO "service_role";

GRANT ALL ON TABLE "public"."question_types" TO "anon";
GRANT ALL ON TABLE "public"."question_types" TO "authenticated";
GRANT ALL ON TABLE "public"."question_types" TO "service_role";

GRANT ALL ON TABLE "public"."questions" TO "anon";
GRANT ALL ON TABLE "public"."questions" TO "authenticated";
GRANT ALL ON TABLE "public"."questions" TO "service_role";

GRANT ALL ON TABLE "public"."service_level_agreements" TO "anon";
GRANT ALL ON TABLE "public"."service_level_agreements" TO "authenticated";
GRANT ALL ON TABLE "public"."service_level_agreements" TO "service_role";

GRANT ALL ON SEQUENCE "public"."service_level_agreements_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."service_level_agreements_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."service_level_agreements_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."sources" TO "anon";
GRANT ALL ON TABLE "public"."sources" TO "authenticated";
GRANT ALL ON TABLE "public"."sources" TO "service_role";

GRANT ALL ON SEQUENCE "public"."sources_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."sources_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."sources_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."statuses" TO "anon";
GRANT ALL ON TABLE "public"."statuses" TO "authenticated";
GRANT ALL ON TABLE "public"."statuses" TO "service_role";

GRANT ALL ON SEQUENCE "public"."statuses_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."statuses_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."statuses_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."teams" TO "anon";
GRANT ALL ON TABLE "public"."teams" TO "authenticated";
GRANT ALL ON TABLE "public"."teams" TO "service_role";

GRANT ALL ON SEQUENCE "public"."teams_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."teams_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."teams_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."ticket_by_first_reply_time" TO "anon";
GRANT ALL ON TABLE "public"."ticket_by_first_reply_time" TO "authenticated";
GRANT ALL ON TABLE "public"."ticket_by_first_reply_time" TO "service_role";

GRANT ALL ON TABLE "public"."ticket_source_summary" TO "anon";
GRANT ALL ON TABLE "public"."ticket_source_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."ticket_source_summary" TO "service_role";

GRANT ALL ON SEQUENCE "public"."tickets_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tickets_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tickets_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."types" TO "anon";
GRANT ALL ON TABLE "public"."types" TO "authenticated";
GRANT ALL ON TABLE "public"."types" TO "service_role";

GRANT ALL ON SEQUENCE "public"."types_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."types_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."types_id_seq" TO "service_role";

GRANT ALL ON TABLE "service"."statuses" TO "anon";
GRANT ALL ON TABLE "service"."statuses" TO "authenticated";
GRANT ALL ON TABLE "service"."statuses" TO "service_role";

GRANT ALL ON SEQUENCE "service"."statuses_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "service"."statuses_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "service"."statuses_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "company" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "company" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "company" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "company" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "company" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "company" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "company" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "company" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "company" GRANT ALL ON TABLES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "service" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "service" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "service" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "service" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "service" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "service" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "service" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "service" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "service" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
