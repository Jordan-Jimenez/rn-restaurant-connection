import express from "express";
import Container from "typedi";

import SquareLocations from "../services/Square/LocationService";

const locationsRouter = express();

locationsRouter.get("/", async (req, res) => {
	try {
		const locations = Container.get(SquareLocations);

		res.send(await locations.getList());
	} catch (e) {
		res.send(e);
	}
});

locationsRouter.get("/:locationId", async (req, res) => {
	const locations = Container.get(SquareLocations);

	res.send(await locations.getLocationById(req.params.locationId));
});

export default locationsRouter;
