interface ItemVariation {
	id: string;
	name?: string;
	price?: string;
	ordinal?: number;
	options?: { itemOptionId: string; itemOptionValueId: string }[];
}
