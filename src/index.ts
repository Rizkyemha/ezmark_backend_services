import config from "./config";
import { routes } from "./routes";
import express, { Application } from "express";

const app: Application = express();
const port: Number = config.PORT;
app.use(express.json());

routes(app);

app.listen(port, () => console.log(`server is listening on port ${port}`));
