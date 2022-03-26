export type FFZEmote = {
	id: number;
	name: string;
	height: number;
	width: number;
	public: boolean;
	hidden: boolean;
	modifier: boolean;
	offset: null;
	margins: null;
	css: null;
	owner: {
		_id: number;
		name: string;
		display_name: string;
	};
	urls: {
		[key: string]: string;
	};
	status: number;
	usage_count: number;
	created_at: string;
	last_updated: string;
};
