import { Router, Request, Response } from "express";
import pool from "../utils/db";

const TestDbRouter: Router = Router();

TestDbRouter.get("/", async (req: Request, res: Response): Promise<void> => {
	try {
		const result = await pool.query("SELECT * FROM users");
		res.status(200).send({ data: result.rows });
	} catch (err) {
		res.status(500).send("Error retrieving data");
	}
});

export { TestDbRouter };
