import express from "express";
import Container from "typedi";

import SquareLocations from "../services/Square/LocationService";

const locationsRouter = express();

locationsRouter.get("/", async (req, res) => {
	try {
		const locations = Container.get(SquareLocations);

		const data = await locations.getList();

		let stores: Store[] = [];

		data.locations.forEach((location) => {
			stores.push({
				id: location.id,
				streetAddress: location?.address?.addressLine1,
				city: location?.address?.locality,
				state: location?.address?.administrativeDistrictLevel1,
				zipCode: location?.address?.postalCode,
				coordinates: location?.coordinates,
				businessHours: location.businessHours?.periods,
			});
		});

		res.send(stores);
	} catch (e) {
		res.send(e);
	}
});

locationsRouter.get("/:locationId", async (req, res) => {
	const locations = Container.get(SquareLocations);

	const location = await locations.getLocationById(req.params.locationId);

	res.send({
		id: location.id,
		streetAddress: location?.address?.addressLine1,
		city: location?.address?.locality,
		state: location?.address?.administrativeDistrictLevel1,
		zipCode: location?.address?.postalCode,
		coordinates: location?.coordinates,
		businessHours: location.businessHours?.periods,
	});
});

export default locationsRouter;
