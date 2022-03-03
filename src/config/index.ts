import dotenv from "dotenv";

import getEnvVar from "../util/getEnvVar";

dotenv.config();

export const SQUARE_ACCESS_TOKEN = getEnvVar("SQUARE_ACCESS_TOKEN");
