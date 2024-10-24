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

export { findUserIdByPhoneNumber };
