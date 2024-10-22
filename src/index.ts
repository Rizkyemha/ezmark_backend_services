import config from "./config";
import pool from "./utils/db";
import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();
const port: Number = config.PORT;

app.use("/health", (req: Request, res: Response, next: NextFunction) => {
	res.status(200).send({ data: "Be ezmark is already for use !!!" });
});

app.get("/test-connection", async (req, res) => {
	try {
		// Jalankan query SQL ke database PostgreSQL
		const result = await pool.query("SELECT * FROM users");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error retrieving data");
	}
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
