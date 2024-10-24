import { Request, Response, Router } from "express";
import { getCacheId } from "../utils/cacheUserMap";

const TransactionRoutes: Router = Router();

TransactionRoutes.post(
	"/:phone_number",
	async (req: Request, res: Response): Promise<void> => {
		const { phone_number } = req.params;

		const id = await getCacheId(phone_number); // memeriksa cache user

		if (id === "unregister") {
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
			description,
			category,
			payment_methode,
			status,
		} = req.body;

		try {
			// Query untuk catat transaksi baru

			res.status(200).send({
				data: {
					phone_number,
					transaction_type,
					amount,
					description,
					category,
					payment_methode,
					status,
				},
			});
		} catch (error) {
			res.status(400).send({ message: "Transaksi gagal" });
		}
	}
);

export { TransactionRoutes };
