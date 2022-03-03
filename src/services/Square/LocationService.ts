import { Service } from "typedi";
import { Client } from "square";

import SquareConfig from "../../core/config/SquareConfig";

@Service()
class SquareLocations {
	private readonly client: Client;

	constructor(public config: SquareConfig) {
		this.client = new Client(this.config.config);
	}

	public async getList() {
		const response = await this.client.locationsApi.listLocations();

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

	public async getLocationById(locationId: string) {
		const response = await this.client.locationsApi.retrieveLocation(
			locationId
		);

		if (response.result.errors) {
			throw new Error(
				"code: " +
					response.result.errors[0].code +
					" category: " +
					response.result.errors[0].category
			);
		}

		return response.result.location;
	}
}

export default SquareLocations;
