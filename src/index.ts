import "reflect-metadata";
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import locationsRouter from "./rest/locations";
import menuRouter from "./rest/menu";

dotenv.config();

(async function () {
	const app = express();

	app.use(cors());
	app.use(bodyParser.json());

	app.use("/locations", locationsRouter);
	app.use("/menu", menuRouter);

	const httpServer = http.createServer(app);

	await new Promise<void>((resolve) =>
		httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
	);
	console.log(`🚀 Server ready, listening on port ${process.env.PORT || 4000}`);
})();
