interface MenuItem {
	id?: string;
	name?: string;
	description?: string;
	categoryId?: string;
	productType?: string;
	price?: string;
	imageId?: string;
	variations?: ItemVariation[];
	optionIds?: string[];
}
