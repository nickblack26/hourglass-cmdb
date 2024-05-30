import type { Database as DB } from '@/types/supabase';

declare global {
	type Database = DB;

	type Company = DB['public']['Tables']['companies']['Row'];
	type CompanyInsert = DB['public']['Tables']['companies']['Row'];
	type CompanySecret = DB['public']['Tables']['company_secrets']['Row'];

	type Contact = DB['public']['Tables']['users']['Row'];
	type ContactInsert = DB['public']['Tables']['users']['Row'];


	type Organization = DB['public']['Tables']['organizations']['Row'];
	type Product = DB['public']['Tables']['products']['Row'];
	type ProductInsert = DB['public']['Tables']['products']['Insert'];
	type ProductUpdate = DB['public']['Tables']['products']['Update'];
	type Status = DB['public']['Tables']['statuses']['Row'];
	type Ticket = DB['public']['Tables']['tickets']['Row'];
	type Page = DB['public']['Tables']['pages']['Row'];
	type Asset = DB['public']['Tables']['assets']['Row'];
	type AssetInsert = DB['public']['Tables']['assets']['Insert'];
	type AssetUpdate = DB['public']['Tables']['assets']['Update'];
	type AssetType = DB['public']['Tables']['asset_types']['Update'];
	type Block = DB['public']['Tables']['blocks']['Row'];
	type BlockInsert = DB['public']['Tables']['blocks']['Insert'];
	type BlockUpdate = DB['public']['Tables']['blocks']['Update'];
	type Impact = DB['public']['Enums']['impact'];
	type RecordType = DB['public']['Enums']['recordType'];
	type Severity = DB['public']['Enums']['severity'];
	type Where = DB['public']['Enums']['where'];
	type BlockType = DB['public']['Enums']['Block Type'];
	type Team = DB['public']['Tables']['teams']['Row'];

	type Integration = DB['public']['Tables']['integrations']['Row']
}
