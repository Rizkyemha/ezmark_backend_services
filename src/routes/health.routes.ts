import app from "../utils/application";
import { Request, Response, NextFunction } from "express";

app.use("/health", (req: Request, res: Response, next: NextFunction) => {
	res.status(200).send({ data: "BE ezmark is already for use !!!" });
});
