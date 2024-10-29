import pool from "../utils/db";

interface Payload {
	user_id: string;
	category_id: string | null;
	payment_methode_id: string | null;
	wallet_id: string | null;
	transaction_type: string;
	amount: number;
	description: string;
	transaction_date: Date | null | any;
	status: string;
}

// Masih belum bisa kondisional query untuk kolom transaction_date

const createTransaction = async (payload: Payload) => {
	try {
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
                ${!payload.transaction_date ? "DEFAULT" : "$8"},
                $9
            ) RETURNING *`,
			[
				payload.user_id,
				payload.category_id || "",
				payload.payment_methode_id || "",
				payload.wallet_id || "",
				payload.transaction_type,
				payload.amount,
				payload.description,
				payload.transaction_date,
				payload.status,
			]
		);

		return result.rows[0]; // Kembalikan data yang baru dimasukkan (opsional)
	} catch (error) {
		console.error("Error inserting transaction:", error);
		throw error;
	}
};

export { createTransaction };
