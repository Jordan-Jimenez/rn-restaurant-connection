import "reflect-metadata";
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

(async function () {
	const app = express();

	app.use(cors());
	app.use(bodyParser.json());

	const httpServer = http.createServer(app);

	await new Promise<void>((resolve) =>
		httpServer.listen({ port: 4000 }, resolve)
	);
	console.log(`🚀 Server ready at http://localhost:4000`);
})();
