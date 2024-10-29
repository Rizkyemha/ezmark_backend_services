import pool from "../utils/db";

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
	} catch (error) {
		console.log(error); // Log error untuk debugging
		return "unregister"; // Mengembalikan "unregister" saat terjadi error
	}
};

const getCategory_id = async (
	user_id: string,
	category: string
): Promise<string> => {
	try {
		const result = await pool.query(
			`SELECT id FROM categories WHERE user_id = $1 AND category_name ILIKE $2`,
			[user_id, category]
		);

		if (result.rows.length > 0) {
			return result.rows[0].id; // Kembalikan id jika sudah ada
		} else {
			const insertResult = await pool.query(
				`INSERT INTO categories (user_id, category_name) VALUES ($1, $2) RETURNING id`,
				[user_id, category.toUpperCase()]
			);
			return insertResult.rows[0].id; // Kembalikan id dari data baru
		}
	} catch (error) {
		console.log("Error inserting transaction:", error);
		throw error;
	}
};

const getWallet_id = async (
	user_id: string,
	wallet: string
): Promise<string> => {
	try {
		const result = await pool.query(
			`SELECT id FROM wallets WHERE user_id = $1 AND wallet_name ILIKE $2`,
			[user_id, wallet]
		);

		if (result.rows.length > 0) {
			return result.rows[0].id; // Kembalikan id jika sudah ada
		} else {
			const insertResult = await pool.query(
				`INSERT INTO wallets (user_id, wallet_name) VALUES ($1, $2) RETURNING id`,
				[user_id, wallet.toUpperCase()]
			);
			return insertResult.rows[0].id; // Kembalikan id dari data baru
		}
	} catch (error) {
		console.log("Error inserting transaction:", error);
		throw error;
	}
};

const getPaymentMethode_id = async (
	user_id: string,
	payment_methode: string
): Promise<string> => {
	try {
		const result = await pool.query(
			`SELECT id FROM payment_methods WHERE user_id = $1 AND payment_name ILIKE $2`,
			[user_id, payment_methode]
		);

		if (result.rows.length > 0) {
			return result.rows[0].id; // Kembalikan id jika sudah ada
		} else {
			const insertResult = await pool.query(
				`INSERT INTO payment_methods (user_id, payment_name) VALUES ($1, $2) RETURNING id`,
				[user_id, payment_methode.toUpperCase()]
			);
			return insertResult.rows[0].id; // Kembalikan id dari data baru
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
