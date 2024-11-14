import pool from "../utils/db";
import { createCatregory } from "./categories";
import { createWallet } from "./wallets";
import { createPaymentMethod } from "./payment_methods";

const findUserIdByPhoneNumber = async (phone_number: string) => {
	try {
		const userId = await pool.query(
			`SELECT id FROM users WHERE phone_number=$1`,
			[phone_number]
		);

		if (userId.rows.length === 0) {
			throw new Error("User not found"); // Lempar error jika tidak ada user
		}

		const { id } = userId.rows[0];
		return id;
	} catch (error: any) {
		console.log(error.message); // Log error untuk debugging
		return "unregister"; // Mengembalikan "unregister" saat terjadi error
	}
};

const getCategory_id = async (
	user_id: string,
	client: any = pool,
	category: string
): Promise<string> => {
	try {
		const result = await client.query(
			`SELECT id FROM categories WHERE user_id = $1 AND category_name ILIKE $2`,
			[user_id, category]
		);

		if (result.rows.length > 0) {
			return result.rows[0].id; // Kembalikan id jika sudah ada
		} else {
			const result = await createCatregory(user_id, client, {
				category,
				description: `Transaksi yang pembayarannya bersifat tunai ${category}`,
			});
			return result; // Kembalikan id dari data baru
		}
	} catch (error: any) {
		console.log("Error inserting transaction:", error);
		throw new Error(error.message);
	}
};

const getWallet_id = async (
	user_id: string,
	client: any = pool,
	wallet: string
): Promise<string> => {
	try {
		const result = await client.query(
			`SELECT id FROM wallets WHERE user_id = $1 AND wallet_name ILIKE $2`,
			[user_id, wallet]
		);

		if (result.rows.length > 0) {
			return result.rows[0].id; // Kembalikan id jika sudah ada
		} else {
			const result = await createWallet(user_id, pool, { wallet });
			return result; // Kembalikan id dari data baru
		}
	} catch (error) {
		console.log("Error inserting transaction:", error);
		throw error;
	}
};

const getPaymentMethode_id = async (
	user_id: string,
	client: any = pool,
	payment_methode: string
): Promise<string> => {
	try {
		const result = await client.query(
			`SELECT id FROM payment_methods WHERE user_id = $1 AND payment_name ILIKE $2`,
			[user_id, payment_methode]
		);

		if (result.rows.length > 0) {
			return result.rows[0].id; // Kembalikan id jika sudah ada
		} else {
			const result = createPaymentMethod(user_id, client, {
				payment_name: payment_methode,
				description: `Transaksi yang pembayarannya bersifat tunai ${payment_methode}`,
			});
			return result; // Kembalikan id dari data baru
		}
	} catch (error) {
		console.log("Error inserting transaction:", error);
		throw error;
	}
};

export {
	findUserIdByPhoneNumber,
	getCategory_id,
	getWallet_id,
	getPaymentMethode_id,
};
