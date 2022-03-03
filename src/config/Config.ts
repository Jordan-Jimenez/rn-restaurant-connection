import { Service } from "typedi";

import { SQUARE_ACCESS_TOKEN } from ".";

@Service({ global: true })
class Config {
	public readonly SQUARE_ACCESS_TOKEN = SQUARE_ACCESS_TOKEN;
}

export default Config;
