import config from "./config";
import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();
const port: Number = config.PORT;

app.use("/health", (req: Request, res: Response, next: NextFunction) => {
	res.status(200).send({ data: "Hello World" });
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
