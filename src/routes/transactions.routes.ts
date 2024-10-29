import { Request, Response, Router } from "express";
import {
	getCategory_id,
	getWallet_id,
	getPaymentMethode_id,
} from "../services/utils";
import { getCacheId } from "../utils/cacheUserMap";
import { createTransaction } from "../services/createTransaction";

const TransactionRoutes: Router = Router();

TransactionRoutes.post(
	"/:phone_number",
	async (req: Request, res: Response): Promise<void> => {
		const { phone_number } = req.params;

		const user_id = await getCacheId(phone_number); // memeriksa cache user

		if (user_id === "unregister") {
			res.status(200).send({
				status: "error",
				message: "Transaksi gagal",
				error: {
					code: "UNREGISTERED_USER",
					description:
						"Nomor kamu belum terdaftar, pastikan registrasi dulu",
				},
			});
			return;
		}

		// jika ditemukan cache proses pembuatan transaksi akan berlanjut
		// validasi body value

		const {
			transaction_type,
			amount,
			category,
			payment_methode,
			wallet,
			status,
			transaction_date,
			description,
		} = req.body;

		try {
			// Query untuk catat transaksi baru

			const category_id = await getCategory_id(user_id, category);
			const wallet_id = await getWallet_id(user_id, wallet);
			const payment_methode_id = await getPaymentMethode_id(
				user_id,
				payment_methode
			);

			const transactions = await createTransaction({
				user_id,
				category_id,
				payment_methode_id,
				wallet_id,
				transaction_type,
				amount,
				description,
				transaction_date,
				status,
			});

			res.status(200).send({
				data: transactions,
			});
		} catch (error) {
			res.status(400).send({ message: "Transaksi gagal" });
		}
	}
);

export { TransactionRoutes };
