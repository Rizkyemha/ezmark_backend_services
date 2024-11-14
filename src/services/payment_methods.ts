import pool from "../utils/db";

const defval = {
	payment_name: "Tunai",
	description: "Transaksi yang bersifat tunai",
};

interface defval {
	payment_name: string;
	description: string;
}

const createPaymentMethod = async (
	user_id: String,
	client: any = pool,
	properties: defval | boolean = false
) => {
	try {
		const query = `
      INSERT INTO payment_methods (
        payment_name,
        description,
        user_id
      ) VALUES (
       $1,
       $2,
       $3
      ) RETURNING id
    `;

		if (properties === false || properties === true) {
			properties = defval;
		}

		const values = [properties.payment_name, properties.description, user_id];

		const result = await client.query(query, values);
		const payment_method_id = result.rows[0]?.id || result;

		console.log("payment : " + payment_method_id);
		return payment_method_id;
	} catch (error: any) {
		throw new Error(
			`Gagal membuat payment method baru karena ${error.message}`
		);
	}
};

export { createPaymentMethod };
