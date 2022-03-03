import { Configuration, Environment } from "square";
import { Service } from "typedi";

import { SQUARE_ACCESS_TOKEN } from "../../config";

@Service()
class SquareConfig {
	public readonly config = {
		environment: Environment.Sandbox,
		accessToken: SQUARE_ACCESS_TOKEN,
	} as Partial<Configuration>;
}

export default SquareConfig;
