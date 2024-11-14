import pool from "../utils/db";
import { getCategory_id } from "./utils";
import { getWallet_id } from "./utils";
import { getPaymentMethode_id } from "./utils";

interface Payload {
	user_id: string;
	transaction_type: string;
	payment_methode: string;
	wallet: string;
	amount: number;
	description: string;
	transaction_date: Date | undefined;
	status: string;
	category: string;
}

// Masih belum bisa kondisional query untuk kolom transaction_date

const createTransaction = async (payload: Payload) => {
	const client = await pool.connect();

	try {
		await client.query("BEGIN");

		const [category_id, payment_methode_id, wallet_id] = await Promise.all([
			getCategory_id(payload.user_id, client, payload.category),
			getPaymentMethode_id(payload.user_id, client, payload.payment_methode),
			getWallet_id(payload.user_id, client, payload.wallet),
		]);

		const result = await pool.query(
			`INSERT INTO transactions (
                user_id,
                category_id,
                payment_methode_id,
                wallet_id,
                transaction_type,
                amount,
                description,
                transaction_date, 
                status
            ) VALUES (
                $1, 
                $2, 
                $3, 
                $4, 
                $5, 
                $6, 
                $7, 
                $8,
                $9
            ) RETURNING *`,
			[
				payload.user_id,
				category_id,
				payment_methode_id,
				wallet_id,
				payload.transaction_type,
				payload.amount,
				payload.description,
				payload.transaction_date || "NOW()",
				payload.status,
			]
		);

		await client.query("COMMIT");
		return result.rows[0];
	} catch (error: any) {
		await client.query("ROLLBACK");
		console.error("Error inserting transaction:", error);
		throw new Error(error.message);
	} finally {
		client.release();
	}
};

export { createTransaction };
