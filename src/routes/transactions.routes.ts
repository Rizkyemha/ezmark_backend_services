import { Request, Response, Router } from "express";
import {
	getCategory_id,
	getWallet_id,
	getPaymentMethode_id,
} from "../services/utils";
import { getCacheId } from "../utils/cacheUserMap";
import { createTransaction } from "../services/transactions";

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
			const transactions = await createTransaction({
				user_id,
				transaction_type,
				amount,
				category,
				payment_methode,
				wallet,
				status,
				transaction_date,
				description,
			});

			res.status(200).send({
				data: transactions,
			});
		} catch (error: any) {
			res.status(400).send({
				message: `Transaksi gagal karena : ${error.message}`,
			});
		}
	}
);

export { TransactionRoutes };
