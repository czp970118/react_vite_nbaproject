import { ParttitionEnum } from "@/enum";


export interface TeamItem {
	city: string;
	teamId: number;
	teamName: string;
	partition: keyof typeof ParttitionEnum;
	logo: string;
	manager: string;
	homeArena: string;
}