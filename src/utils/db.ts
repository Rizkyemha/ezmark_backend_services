const { Pool } = require("pg");
import config from "../config";

const pool = new Pool({
	user: config.DB.user,
	host: config.DB.host,
	database: config.DB.db,
	password: config.DB.pw,
	port: config.DB.port,
});

export default pool;
