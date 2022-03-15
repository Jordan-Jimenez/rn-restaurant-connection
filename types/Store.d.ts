interface Store {
	id?: string;
	streetAddress?: string;
	city?: string;
	state?: string;
	zipCode?: string;
	coordinates?: {
		latitude?: number;
		longitude?: number;
	};
	distance?: number;
	businessHours?: OperationTimeZone[];
}
