import pool from "../utils/db";
import { createCatregory } from "./categories";
import { createPaymentMethod } from "./payment_methods";
import { createWallet } from "./wallets";

interface Payload {
	phone_number: String;
	name: String;
	email: String;
}

const registerUser = async (payload: Payload) => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");

		const query = `
      INSERT INTO users (name, email, phone_number) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
		const value = [payload.name, payload.email, payload.phone_number];
		const result = await client.query(query, value);

		await Promise.all([
			createCatregory(result.rows[0].id, client),
			createPaymentMethod(result.rows[0].id, client),
			createWallet(result.rows[0].id, client),
		]);

		await client.query("COMMIT");
		return result.rows[0];
	} catch (error: any) {
		await client.query("ROLLBACK");
		console.error("Error registering user:", error.message);
		throw new Error(`Error registering user : ${error.message} `);
	} finally {
		client.release();
	}
};

export { registerUser };
