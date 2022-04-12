import { Service } from "typedi";
import { Client } from "square";

import SquareConfig from "../../core/config/SquareConfig";

@Service()
class SquareMenu {
	private readonly client: Client;

	constructor(private config: SquareConfig) {
		this.client = new Client(this.config.config);
	}

	public async getCategories(storeId?: string) {
		const response = await this.client.catalogApi.listCatalog(
			undefined,
			"CATEGORY"
		);

		if (response.result.errors) {
			throw new Error(
				"code: " +
					response.result.errors[0].code +
					" category: " +
					response.result.errors[0].category
			);
		}

		if (storeId) {
			return response.result.objects.filter(
				(obj) =>
					obj.presentAtAllLocations ||
					obj.presentAtLocationIds.includes(storeId)
			);
		}

		return response.result.objects;
	}

	public async getItemsByCategory(categoryId: string, storeId?: string) {
		const response = await this.client.catalogApi.searchCatalogItems({
			categoryIds: [categoryId],
			enabledLocationIds: storeId ? [storeId] : undefined,
		});

		if (response.result.errors) {
			throw new Error(
				"code: " +
					response.result.errors[0].code +
					" category: " +
					response.result.errors[0].category
			);
		}

		return response.result;
	}

	public async getItemById(itemId: string) {
		const response = await this.client.catalogApi.retrieveCatalogObject(itemId);

		if (response.result.errors) {
			throw new Error(
				"code: " +
					response.result.errors[0].code +
					" category: " +
					response.result.errors[0].category
			);
		}

		return response.result.object;
	}

	public async getItems(storeId?: string) {
		const response = await this.client.catalogApi.listCatalog(
			undefined,
			"ITEM"
		);

		if (response.result.errors) {
			throw new Error(
				"code: " +
					response.result.errors[0].code +
					" category: " +
					response.result.errors[0].category
			);
		}

		if (storeId) {
			return response.result.objects.filter(
				(obj) =>
					obj.presentAtAllLocations ||
					obj.presentAtLocationIds.includes(storeId)
			);
		}

		return response.result.objects;
	}

	public async getItemsById(objectIds?: string[]) {
		try {
			const response = await this.client.catalogApi.batchRetrieveCatalogObjects(
				{
					objectIds,
				}
			);

			if (response.result.errors) {
				throw new Error(
					"code: " +
						response.result.errors[0].code +
						" category: " +
						response.result.errors[0].category
				);
			}

			return response.result.objects;
		} catch (e) {
			throw new Error(e);
		}
	}
}

export default SquareMenu;
