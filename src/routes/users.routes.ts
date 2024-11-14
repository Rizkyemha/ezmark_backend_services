import { Request, Response, Router } from "express";
import { registerUser } from "../services/users";
import { findUserIdByPhoneNumber } from "../services/utils";

const UsersRoute: Router = Router();

UsersRoute.post(
	"/register/:phone_number",
	async (req: Request, res: Response): Promise<void> => {
		const { phone_number } = req.params;
		const { name, email } = req.body;

		const user_id = await findUserIdByPhoneNumber(phone_number);

		if (user_id === "unregister") {
			try {
				const data = await registerUser({ name, email, phone_number });
				res.status(200).send({
					data,
				});
			} catch (error: any) {
				res.status(400).send({ message: error.message });
			}
		} else {
			res.status(400).send({
				message: "Nomor hp sudah terdaftar, gunakan nomor lain",
			});
		}
	}
);

export { UsersRoute };
