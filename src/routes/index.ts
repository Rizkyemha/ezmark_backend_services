import { Application } from "express";
import { HealthRouter, Router } from "./health.routes";
import { TestDbRouter } from "./testConnection.routes";
import { TransactionRoutes } from "./transactions.routes";
import { UsersRoute } from "./users.routes";

const _routes: Array<[string, Router]> = [
	["/health", HealthRouter],
	["/testdb", TestDbRouter],
	["/transactions", TransactionRoutes],
	["/users", UsersRoute],
];

export const routes = (app: Application): void => {
	_routes.forEach((route) => {
		const [url, router] = route;
		app.use(url, router);
	});
};
