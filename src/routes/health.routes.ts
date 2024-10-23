import { Router, Request, Response, NextFunction } from "express";

const HealthRouter: Router = Router();

HealthRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.status(200).send({
		status: "200",
		data: "BE ezmark is already for use !!!",
	});
});

export { HealthRouter, Router };
