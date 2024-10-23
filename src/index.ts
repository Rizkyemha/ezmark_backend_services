import config from "./config";
import { routes } from "./routes";
import pool from "./utils/db";
import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();
const port: Number = config.PORT;

routes(app);

app.listen(port, () => console.log(`server is listening on port ${port}`));
