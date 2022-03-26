export type STVEmote = {
	id: string;
	name: string;
	owner: {
		id: string;
		twitch_id: string;
		login: string;
		display_name: string;
		role: {
			id: string;
			name: string;
			position: number;
			color: number;
			allowed: number;
			denied: number;
			default: boolean;
		};
	};
	visibility: number;
	visibility_simple: any[];
	mime: string;
	status: number;
	tags: any[];
	width: number[];
	height: number[];
	urls: string[][];
};
