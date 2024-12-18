require("dotenv").config();

const config = {
	PORT: Number(process.env.PORT),
	DB: {
		user: process.env.DB_USER,
		host: process.env.DB_HOST,
		db: process.env.DB,
		pw: process.env.DB_PW,
		port: Number(process.env.DB_PORT),
	},
};

export default config;
