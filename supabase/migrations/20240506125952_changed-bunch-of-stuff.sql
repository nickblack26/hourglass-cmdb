create schema if not exists "knowledge";


drop policy "All" on "public"."assetTypes";

drop policy "Enable read access for all users" on "public"."favorite_contacts";

drop policy "Enable read access for all users" on "public"."priorities";

drop policy "Enable read access for all users" on "public"."service_locations";

drop policy "Enable read access for all users" on "public"."sources";

drop policy "Enable read access for all users" on "public"."teams";

drop policy "All" on "public"."tickets";

drop policy "Enable read access for all users" on "public"."types";

revoke delete on table "public"."assetTypes" from "anon";

revoke insert on table "public"."assetTypes" from "anon";

revoke references on table "public"."assetTypes" from "anon";

revoke select on table "public"."assetTypes" from "anon";

revoke trigger on table "public"."assetTypes" from "anon";

revoke truncate on table "public"."assetTypes" from "anon";

revoke update on table "public"."assetTypes" from "anon";

revoke delete on table "public"."assetTypes" from "authenticated";

revoke insert on table "public"."assetTypes" from "authenticated";

revoke references on table "public"."assetTypes" from "authenticated";

revoke select on table "public"."assetTypes" from "authenticated";

revoke trigger on table "public"."assetTypes" from "authenticated";

revoke truncate on table "public"."assetTypes" from "authenticated";

revoke update on table "public"."assetTypes" from "authenticated";

revoke delete on table "public"."assetTypes" from "service_role";

revoke insert on table "public"."assetTypes" from "service_role";

revoke references on table "public"."assetTypes" from "service_role";

revoke select on table "public"."assetTypes" from "service_role";

revoke trigger on table "public"."assetTypes" from "service_role";

revoke truncate on table "public"."assetTypes" from "service_role";

revoke update on table "public"."assetTypes" from "service_role";

revoke delete on table "public"."favorite_contacts" from "anon";

revoke insert on table "public"."favorite_contacts" from "anon";

revoke references on table "public"."favorite_contacts" from "anon";

revoke select on table "public"."favorite_contacts" from "anon";

revoke trigger on table "public"."favorite_contacts" from "anon";

revoke truncate on table "public"."favorite_contacts" from "anon";

revoke update on table "public"."favorite_contacts" from "anon";

revoke delete on table "public"."favorite_contacts" from "authenticated";

revoke insert on table "public"."favorite_contacts" from "authenticated";

revoke references on table "public"."favorite_contacts" from "authenticated";

revoke select on table "public"."favorite_contacts" from "authenticated";

revoke trigger on table "public"."favorite_contacts" from "authenticated";

revoke truncate on table "public"."favorite_contacts" from "authenticated";

revoke update on table "public"."favorite_contacts" from "authenticated";

revoke delete on table "public"."favorite_contacts" from "service_role";

revoke insert on table "public"."favorite_contacts" from "service_role";

revoke references on table "public"."favorite_contacts" from "service_role";

revoke select on table "public"."favorite_contacts" from "service_role";

revoke trigger on table "public"."favorite_contacts" from "service_role";

revoke truncate on table "public"."favorite_contacts" from "service_role";

revoke update on table "public"."favorite_contacts" from "service_role";

revoke delete on table "public"."priorities" from "anon";

revoke insert on table "public"."priorities" from "anon";

revoke references on table "public"."priorities" from "anon";

revoke select on table "public"."priorities" from "anon";

revoke trigger on table "public"."priorities" from "anon";

revoke truncate on table "public"."priorities" from "anon";

revoke update on table "public"."priorities" from "anon";

revoke delete on table "public"."priorities" from "authenticated";

revoke insert on table "public"."priorities" from "authenticated";

revoke references on table "public"."priorities" from "authenticated";

revoke select on table "public"."priorities" from "authenticated";

revoke trigger on table "public"."priorities" from "authenticated";

revoke truncate on table "public"."priorities" from "authenticated";

revoke update on table "public"."priorities" from "authenticated";

revoke delete on table "public"."priorities" from "service_role";

revoke insert on table "public"."priorities" from "service_role";

revoke references on table "public"."priorities" from "service_role";

revoke select on table "public"."priorities" from "service_role";

revoke trigger on table "public"."priorities" from "service_role";

revoke truncate on table "public"."priorities" from "service_role";

revoke update on table "public"."priorities" from "service_role";

revoke delete on table "public"."service_locations" from "anon";

revoke insert on table "public"."service_locations" from "anon";

revoke references on table "public"."service_locations" from "anon";

revoke select on table "public"."service_locations" from "anon";

revoke trigger on table "public"."service_locations" from "anon";

revoke truncate on table "public"."service_locations" from "anon";

revoke update on table "public"."service_locations" from "anon";

revoke delete on table "public"."service_locations" from "authenticated";

revoke insert on table "public"."service_locations" from "authenticated";

revoke references on table "public"."service_locations" from "authenticated";

revoke select on table "public"."service_locations" from "authenticated";

revoke trigger on table "public"."service_locations" from "authenticated";

revoke truncate on table "public"."service_locations" from "authenticated";

revoke update on table "public"."service_locations" from "authenticated";

revoke delete on table "public"."service_locations" from "service_role";

revoke insert on table "public"."service_locations" from "service_role";

revoke references on table "public"."service_locations" from "service_role";

revoke select on table "public"."service_locations" from "service_role";

revoke trigger on table "public"."service_locations" from "service_role";

revoke truncate on table "public"."service_locations" from "service_role";

revoke update on table "public"."service_locations" from "service_role";

revoke delete on table "public"."sources" from "anon";

revoke insert on table "public"."sources" from "anon";

revoke references on table "public"."sources" from "anon";

revoke select on table "public"."sources" from "anon";

revoke trigger on table "public"."sources" from "anon";

revoke truncate on table "public"."sources" from "anon";

revoke update on table "public"."sources" from "anon";

revoke delete on table "public"."sources" from "authenticated";

revoke insert on table "public"."sources" from "authenticated";

revoke references on table "public"."sources" from "authenticated";

revoke select on table "public"."sources" from "authenticated";

revoke trigger on table "public"."sources" from "authenticated";

revoke truncate on table "public"."sources" from "authenticated";

revoke update on table "public"."sources" from "authenticated";

revoke delete on table "public"."sources" from "service_role";

revoke insert on table "public"."sources" from "service_role";

revoke references on table "public"."sources" from "service_role";

revoke select on table "public"."sources" from "service_role";

revoke trigger on table "public"."sources" from "service_role";

revoke truncate on table "public"."sources" from "service_role";

revoke update on table "public"."sources" from "service_role";

revoke delete on table "public"."teams" from "anon";

revoke insert on table "public"."teams" from "anon";

revoke references on table "public"."teams" from "anon";

revoke select on table "public"."teams" from "anon";

revoke trigger on table "public"."teams" from "anon";

revoke truncate on table "public"."teams" from "anon";

revoke update on table "public"."teams" from "anon";

revoke delete on table "public"."teams" from "authenticated";

revoke insert on table "public"."teams" from "authenticated";

revoke references on table "public"."teams" from "authenticated";

revoke select on table "public"."teams" from "authenticated";

revoke trigger on table "public"."teams" from "authenticated";

revoke truncate on table "public"."teams" from "authenticated";

revoke update on table "public"."teams" from "authenticated";

revoke delete on table "public"."teams" from "service_role";

revoke insert on table "public"."teams" from "service_role";

revoke references on table "public"."teams" from "service_role";

revoke select on table "public"."teams" from "service_role";

revoke trigger on table "public"."teams" from "service_role";

revoke truncate on table "public"."teams" from "service_role";

revoke update on table "public"."teams" from "service_role";

alter table "public"."assetTypes" drop constraint "public_assetTypes_parent_fkey";

alter table "public"."assetTypes" drop constraint "public_assetTypes_update_by_fkey";

alter table "public"."assets" drop constraint "public_assets_company_fkey";

alter table "public"."companies" drop constraint "public_companies_billToCompany_fkey";

alter table "public"."companies" drop constraint "public_companies_country_fkey";

alter table "public"."companies" drop constraint "public_companies_timezone_fkey";

alter table "public"."configurations" drop constraint "public_configurations_company_fkey";

alter table "public"."configurations" drop constraint "public_configurations_user_fkey";

alter table "public"."contacts" drop constraint "contacts_id_key";

alter table "public"."favorite_contacts" drop constraint "public_favorite_contacts_contact_fkey";

alter table "public"."favorite_contacts" drop constraint "public_favorite_contacts_user_fkey";

alter table "public"."notes" drop constraint "company_notes_company_fkey";

alter table "public"."notes" drop constraint "company_notes_enteredBy_fkey";

alter table "public"."organizations" drop constraint "public_organizations_company_fkey";

alter table "public"."page_relations" drop constraint "public_page_relations_company_fkey";

alter table "public"."tickets" drop constraint "public_tickets_configuration_fkey";

alter table "public"."tickets" drop constraint "public_tickets_status_fkey";

alter table "public"."tickets" drop constraint "service_tickets_board/id_fkey";

alter table "public"."tickets" drop constraint "service_tickets_company/id_fkey";

alter table "public"."tickets" drop constraint "service_tickets_contact/id_fkey";

alter table "public"."tickets" drop constraint "service_tickets_priority/id_fkey";

alter table "public"."tickets" drop constraint "service_tickets_serviceLocation_fkey";

alter table "public"."tickets" drop constraint "service_tickets_sla/id_fkey";

alter table "public"."tickets" drop constraint "service_tickets_source/id_fkey";

alter table "public"."tickets" drop constraint "service_tickets_team/id_fkey";

alter table "public"."tickets" drop constraint "service_tickets_type/id_fkey";

alter table "public"."types" drop constraint "public_types_parent_fkey";

alter table "public"."types" drop constraint "types_reference_id_key";

alter table "public"."answers" drop constraint "public_answer_created_by_fkey";

alter table "public"."assets" drop constraint "public_assets_type_fkey";

alter table "public"."configurations" drop constraint "public_configurations_installed_by_fkey";

alter table "public"."configurations" drop constraint "public_configurations_type_fkey";

alter table "public"."contacts" drop constraint "contacts_id_key1";

alter table "public"."contacts" drop constraint "public_contacts_company_fkey";

alter table "public"."contacts" drop constraint "public_contacts_id_fkey";

alter table "public"."question_types" drop constraint "public_question_types_type_fkey";

drop view if exists "public"."average_tickets_created";

drop view if exists "public"."ticket_by_first_reply_time";

drop view if exists "public"."ticket_source_summary";

alter table "public"."assetTypes" drop constraint "assetTypes_pkey";

alter table "public"."favorite_contacts" drop constraint "favorite_contacts_pkey";

alter table "public"."priorities" drop constraint "priorities_pkey";

alter table "public"."service_locations" drop constraint "location_pkey";

alter table "public"."sources" drop constraint "sources_pkey";

alter table "public"."teams" drop constraint "teams_pkey";

alter table "public"."types" drop constraint "types_pkey";

drop index if exists "public"."contacts_id_key";

drop index if exists "public"."favorite_contacts_pkey";

drop index if exists "public"."location_pkey";

drop index if exists "public"."priorities_pkey";

drop index if exists "public"."sources_pkey";

drop index if exists "public"."teams_pkey";

drop index if exists "public"."types_pkey";

drop index if exists "public"."types_reference_id_key";

drop index if exists "public"."assetTypes_pkey";

drop index if exists "public"."contacts_id_key1";

drop table "public"."assetTypes";

drop table "public"."favorite_contacts";

drop table "public"."priorities";

drop table "public"."service_locations";

drop table "public"."sources";

drop table "public"."teams";

create table "public"."comments" (
    "id" uuid not null default gen_random_uuid(),
    "body" text not null,
    "contact" uuid not null default auth.uid()
);


alter table "public"."comments" enable row level security;

create table "public"."sites" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "company" uuid not null
);


alter table "public"."sites" enable row level security;

create table "public"."ticket_assets" (
    "ticket" uuid not null,
    "asset" uuid not null
);


alter table "public"."ticket_assets" enable row level security;

create table "public"."ticket_comments" (
    "ticket" uuid not null,
    "comment" uuid not null
);


alter table "public"."ticket_comments" enable row level security;

alter table "public"."assets" add column "contact" uuid;

alter table "public"."assets" add column "site" uuid;

alter table "public"."assets" alter column "company" set data type uuid using "company"::uuid;

alter table "public"."companies" alter column "id" set default gen_random_uuid();

alter table "public"."companies" alter column "id" drop identity;

alter table "public"."companies" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."contacts" drop column "childrenFlag";

alter table "public"."contacts" drop column "defaultBillingFlag";

alter table "public"."contacts" drop column "defaultFlag";

alter table "public"."contacts" drop column "defaultPhoneNbr";

alter table "public"."contacts" drop column "defaultPhoneType";

alter table "public"."contacts" drop column "disablePortalLoginFlag";

alter table "public"."contacts" drop column "ignoreDuplicates";

alter table "public"."contacts" drop column "marriedFlag";

alter table "public"."contacts" drop column "mobileGuid";

alter table "public"."contacts" drop column "portalSecurityLevel";

alter table "public"."contacts" drop column "unsubscribeFlag";

alter table "public"."contacts" drop column "user_id";

alter table "public"."contacts" add column "auth_id" uuid;

alter table "public"."contacts" add column "site" uuid;

alter table "public"."contacts" alter column "company" set data type uuid using "company"::uuid;

alter table "public"."contacts" alter column "id" set default gen_random_uuid();

alter table "public"."contacts" alter column "id" set not null;

alter table "public"."tickets" drop column "allowAllClientsPortalView";

alter table "public"."tickets" drop column "approved";

alter table "public"."tickets" drop column "automaticEmailCcFlag";

alter table "public"."tickets" drop column "automaticEmailContactFlag";

alter table "public"."tickets" drop column "automaticEmailResourceFlag";

alter table "public"."tickets" drop column "billExpenses";

alter table "public"."tickets" drop column "billProducts";

alter table "public"."tickets" drop column "billTime";

alter table "public"."tickets" drop column "billingMethod";

alter table "public"."tickets" drop column "board";

alter table "public"."tickets" drop column "closedBy";

alter table "public"."tickets" drop column "closedDate";

alter table "public"."tickets" drop column "closedFlag";

alter table "public"."tickets" drop column "company";

alter table "public"."tickets" drop column "configuration";

alter table "public"."tickets" drop column "contact";

alter table "public"."tickets" drop column "currency";

alter table "public"."tickets" drop column "customerUpdatedFlag";

alter table "public"."tickets" drop column "dateEntered";

alter table "public"."tickets" drop column "dateResolved";

alter table "public"."tickets" drop column "dateResplan";

alter table "public"."tickets" drop column "dateResponded";

alter table "public"."tickets" drop column "department";

alter table "public"."tickets" drop column "enteredBy";

alter table "public"."tickets" drop column "escalationLevel";

alter table "public"."tickets" drop column "escalationStartDateUTC";

alter table "public"."tickets" drop column "estimatedExpenseCost";

alter table "public"."tickets" drop column "estimatedExpenseRevenue";

alter table "public"."tickets" drop column "estimatedProductCost";

alter table "public"."tickets" drop column "estimatedProductRevenue";

alter table "public"."tickets" drop column "estimatedTimeCost";

alter table "public"."tickets" drop column "estimatedTimeRevenue";

alter table "public"."tickets" drop column "hasChildTicket";

alter table "public"."tickets" drop column "hasMergedChildTicketFlag";

alter table "public"."tickets" drop column "impact";

alter table "public"."tickets" drop column "isInSla";

alter table "public"."tickets" drop column "lastUpdated";

alter table "public"."tickets" drop column "location";

alter table "public"."tickets" drop column "minutesBeforeWaiting";

alter table "public"."tickets" drop column "minutesWaiting";

alter table "public"."tickets" drop column "mobileGuid";

alter table "public"."tickets" drop column "priority";

alter table "public"."tickets" drop column "recordType";

alter table "public"."tickets" drop column "requestForChangeFlag";

alter table "public"."tickets" drop column "resPlanMinutes";

alter table "public"."tickets" drop column "resolutionHours";

alter table "public"."tickets" drop column "resolveMinutes";

alter table "public"."tickets" drop column "resolvedBy";

alter table "public"."tickets" drop column "resplanBy";

alter table "public"."tickets" drop column "resplanHours";

alter table "public"."tickets" drop column "resplanSkippedMinutes";

alter table "public"."tickets" drop column "respondMinutes";

alter table "public"."tickets" drop column "respondedBy";

alter table "public"."tickets" drop column "respondedHours";

alter table "public"."tickets" drop column "respondedSkippedMinutes";

alter table "public"."tickets" drop column "serviceLocation";

alter table "public"."tickets" drop column "severity";

alter table "public"."tickets" drop column "sla";

alter table "public"."tickets" drop column "slaStatus";

alter table "public"."tickets" drop column "source";

alter table "public"."tickets" drop column "status";

alter table "public"."tickets" drop column "subBillingMethod";

alter table "public"."tickets" drop column "team";

alter table "public"."tickets" drop column "type";

alter table "public"."tickets" drop column "updatedBy";

alter table "public"."tickets" add column "number" bigint;

alter table "public"."tickets" alter column "id" set default gen_random_uuid();

alter table "public"."tickets" alter column "id" drop identity;

alter table "public"."tickets" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."types" drop column "reference_id";

alter table "public"."types" add column "description" text;

alter table "public"."types" add column "icon" icon;

alter table "public"."types" add column "last_updated" timestamp with time zone;

alter table "public"."types" add column "prefix" text;

alter table "public"."types" add column "update_by" uuid not null default auth.uid();

alter table "public"."types" alter column "parent" set data type uuid using "parent"::uuid;

CREATE UNIQUE INDEX comments_pkey ON public.comments USING btree (id);

CREATE UNIQUE INDEX contacts_pkey ON public.contacts USING btree (id);

CREATE UNIQUE INDEX sites_pkey ON public.sites USING btree (id);

CREATE UNIQUE INDEX ticket_assets_pkey ON public.ticket_assets USING btree (ticket, asset);

CREATE UNIQUE INDEX ticket_comments_pkey ON public.ticket_comments USING btree (ticket, comment);

CREATE UNIQUE INDEX "assetTypes_pkey" ON public.types USING btree (id);

CREATE UNIQUE INDEX contacts_id_key1 ON public.contacts USING btree (auth_id);

alter table "public"."comments" add constraint "comments_pkey" PRIMARY KEY using index "comments_pkey";

alter table "public"."contacts" add constraint "contacts_pkey" PRIMARY KEY using index "contacts_pkey";

alter table "public"."sites" add constraint "sites_pkey" PRIMARY KEY using index "sites_pkey";

alter table "public"."ticket_assets" add constraint "ticket_assets_pkey" PRIMARY KEY using index "ticket_assets_pkey";

alter table "public"."ticket_comments" add constraint "ticket_comments_pkey" PRIMARY KEY using index "ticket_comments_pkey";

alter table "public"."types" add constraint "assetTypes_pkey" PRIMARY KEY using index "assetTypes_pkey";

alter table "public"."assets" add constraint "assets_assets_company_fkey" FOREIGN KEY (company) REFERENCES companies(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."assets" validate constraint "assets_assets_company_fkey";

alter table "public"."assets" add constraint "assets_assets_contact_fkey" FOREIGN KEY (contact) REFERENCES contacts(auth_id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."assets" validate constraint "assets_assets_contact_fkey";

alter table "public"."assets" add constraint "assets_assets_site_fkey" FOREIGN KEY (site) REFERENCES sites(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."assets" validate constraint "assets_assets_site_fkey";

alter table "public"."contacts" add constraint "public_contacts_site_fkey" FOREIGN KEY (site) REFERENCES sites(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."contacts" validate constraint "public_contacts_site_fkey";

alter table "public"."sites" add constraint "public_sites_company_fkey" FOREIGN KEY (company) REFERENCES companies(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."sites" validate constraint "public_sites_company_fkey";

alter table "public"."ticket_assets" add constraint "public_ticket_assets_asset_fkey" FOREIGN KEY (asset) REFERENCES assets(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."ticket_assets" validate constraint "public_ticket_assets_asset_fkey";

alter table "public"."ticket_assets" add constraint "public_ticket_assets_ticket_fkey" FOREIGN KEY (ticket) REFERENCES tickets(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."ticket_assets" validate constraint "public_ticket_assets_ticket_fkey";

alter table "public"."ticket_comments" add constraint "public_ticket_comments_comment_fkey" FOREIGN KEY (comment) REFERENCES comments(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."ticket_comments" validate constraint "public_ticket_comments_comment_fkey";

alter table "public"."ticket_comments" add constraint "public_ticket_comments_ticket_fkey" FOREIGN KEY (ticket) REFERENCES tickets(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."ticket_comments" validate constraint "public_ticket_comments_ticket_fkey";

alter table "public"."types" add constraint "public_assetTypes_parent_fkey" FOREIGN KEY (parent) REFERENCES types(id) not valid;

alter table "public"."types" validate constraint "public_assetTypes_parent_fkey";

alter table "public"."types" add constraint "public_assetTypes_update_by_fkey" FOREIGN KEY (update_by) REFERENCES contacts(auth_id) ON DELETE SET NULL not valid;

alter table "public"."types" validate constraint "public_assetTypes_update_by_fkey";

alter table "public"."answers" add constraint "public_answer_created_by_fkey" FOREIGN KEY (created_by) REFERENCES contacts(auth_id) not valid;

alter table "public"."answers" validate constraint "public_answer_created_by_fkey";

alter table "public"."assets" add constraint "public_assets_type_fkey" FOREIGN KEY (type) REFERENCES types(id) not valid;

alter table "public"."assets" validate constraint "public_assets_type_fkey";

alter table "public"."configurations" add constraint "public_configurations_installed_by_fkey" FOREIGN KEY (installed_by) REFERENCES contacts(auth_id) not valid;

alter table "public"."configurations" validate constraint "public_configurations_installed_by_fkey";

alter table "public"."configurations" add constraint "public_configurations_type_fkey" FOREIGN KEY (type) REFERENCES types(id) not valid;

alter table "public"."configurations" validate constraint "public_configurations_type_fkey";

alter table "public"."contacts" add constraint "contacts_id_key1" UNIQUE using index "contacts_id_key1";

alter table "public"."contacts" add constraint "public_contacts_company_fkey" FOREIGN KEY (company) REFERENCES companies(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."contacts" validate constraint "public_contacts_company_fkey";

alter table "public"."contacts" add constraint "public_contacts_id_fkey" FOREIGN KEY (auth_id) REFERENCES auth.users(id) not valid;

alter table "public"."contacts" validate constraint "public_contacts_id_fkey";

alter table "public"."question_types" add constraint "public_question_types_type_fkey" FOREIGN KEY (type) REFERENCES types(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."question_types" validate constraint "public_question_types_type_fkey";

grant delete on table "public"."comments" to "anon";

grant insert on table "public"."comments" to "anon";

grant references on table "public"."comments" to "anon";

grant select on table "public"."comments" to "anon";

grant trigger on table "public"."comments" to "anon";

grant truncate on table "public"."comments" to "anon";

grant update on table "public"."comments" to "anon";

grant delete on table "public"."comments" to "authenticated";

grant insert on table "public"."comments" to "authenticated";

grant references on table "public"."comments" to "authenticated";

grant select on table "public"."comments" to "authenticated";

grant trigger on table "public"."comments" to "authenticated";

grant truncate on table "public"."comments" to "authenticated";

grant update on table "public"."comments" to "authenticated";

grant delete on table "public"."comments" to "service_role";

grant insert on table "public"."comments" to "service_role";

grant references on table "public"."comments" to "service_role";

grant select on table "public"."comments" to "service_role";

grant trigger on table "public"."comments" to "service_role";

grant truncate on table "public"."comments" to "service_role";

grant update on table "public"."comments" to "service_role";

grant delete on table "public"."sites" to "anon";

grant insert on table "public"."sites" to "anon";

grant references on table "public"."sites" to "anon";

grant select on table "public"."sites" to "anon";

grant trigger on table "public"."sites" to "anon";

grant truncate on table "public"."sites" to "anon";

grant update on table "public"."sites" to "anon";

grant delete on table "public"."sites" to "authenticated";

grant insert on table "public"."sites" to "authenticated";

grant references on table "public"."sites" to "authenticated";

grant select on table "public"."sites" to "authenticated";

grant trigger on table "public"."sites" to "authenticated";

grant truncate on table "public"."sites" to "authenticated";

grant update on table "public"."sites" to "authenticated";

grant delete on table "public"."sites" to "service_role";

grant insert on table "public"."sites" to "service_role";

grant references on table "public"."sites" to "service_role";

grant select on table "public"."sites" to "service_role";

grant trigger on table "public"."sites" to "service_role";

grant truncate on table "public"."sites" to "service_role";

grant update on table "public"."sites" to "service_role";

grant delete on table "public"."ticket_assets" to "anon";

grant insert on table "public"."ticket_assets" to "anon";

grant references on table "public"."ticket_assets" to "anon";

grant select on table "public"."ticket_assets" to "anon";

grant trigger on table "public"."ticket_assets" to "anon";

grant truncate on table "public"."ticket_assets" to "anon";

grant update on table "public"."ticket_assets" to "anon";

grant delete on table "public"."ticket_assets" to "authenticated";

grant insert on table "public"."ticket_assets" to "authenticated";

grant references on table "public"."ticket_assets" to "authenticated";

grant select on table "public"."ticket_assets" to "authenticated";

grant trigger on table "public"."ticket_assets" to "authenticated";

grant truncate on table "public"."ticket_assets" to "authenticated";

grant update on table "public"."ticket_assets" to "authenticated";

grant delete on table "public"."ticket_assets" to "service_role";

grant insert on table "public"."ticket_assets" to "service_role";

grant references on table "public"."ticket_assets" to "service_role";

grant select on table "public"."ticket_assets" to "service_role";

grant trigger on table "public"."ticket_assets" to "service_role";

grant truncate on table "public"."ticket_assets" to "service_role";

grant update on table "public"."ticket_assets" to "service_role";

grant delete on table "public"."ticket_comments" to "anon";

grant insert on table "public"."ticket_comments" to "anon";

grant references on table "public"."ticket_comments" to "anon";

grant select on table "public"."ticket_comments" to "anon";

grant trigger on table "public"."ticket_comments" to "anon";

grant truncate on table "public"."ticket_comments" to "anon";

grant update on table "public"."ticket_comments" to "anon";

grant delete on table "public"."ticket_comments" to "authenticated";

grant insert on table "public"."ticket_comments" to "authenticated";

grant references on table "public"."ticket_comments" to "authenticated";

grant select on table "public"."ticket_comments" to "authenticated";

grant trigger on table "public"."ticket_comments" to "authenticated";

grant truncate on table "public"."ticket_comments" to "authenticated";

grant update on table "public"."ticket_comments" to "authenticated";

grant delete on table "public"."ticket_comments" to "service_role";

grant insert on table "public"."ticket_comments" to "service_role";

grant references on table "public"."ticket_comments" to "service_role";

grant select on table "public"."ticket_comments" to "service_role";

grant trigger on table "public"."ticket_comments" to "service_role";

grant truncate on table "public"."ticket_comments" to "service_role";

grant update on table "public"."ticket_comments" to "service_role";

create policy "All"
on "public"."assets"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable read access for all users"
on "public"."comments"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable read access for all users"
on "public"."tickets"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "All"
on "public"."types"
as permissive
for all
to public
using (true);



alter table "workflow"."automation_triggers" drop constraint "workflow_automation_triggers_ticket_fkey";


