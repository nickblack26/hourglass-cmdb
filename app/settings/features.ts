import { LucideIcon } from "lucide-react";

export interface Feature {
	name: string;
	description?: string;
	icon?: LucideIcon;
	enabled: boolean;
}

const voiceFeatures: Feature[] = [
	{
		name: 'Voice',
		enabled: false,
	},
	{
		name: 'Email',
		enabled: false,
	},
	{
		name: 'Customer portal',
		enabled: false,
	},
	{
		name: 'Widget',
		enabled: false,
	},
	{
		name: 'Chat',
		enabled: false,
	}
]

export const sectionedFeatures: { name: string; features: Feature[] }[] = [
	{
		name: 'Channels',
		features: voiceFeatures
	}
]