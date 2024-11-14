import pool from "../utils/db";

const defval = {
	category: "umum",
	description: "Transaksi yang bersifat umum",
};

interface defval {
	category: any;
	description: any;
}

const createCatregory = async (
	user_id: String,
	client: any = pool,
	properties: defval | boolean = false
) => {
	try {
		const query = `
      INSERT INTO categories (
        category_name,
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

		const { category, description } = properties;

		const values = [category, description, user_id];

		const result = await client.query(query, values);
		console.log("kategori : " + result);

		const category_id = result.rows[0]?.id || result;

		console.log("kategori : " + category_id);
		return category_id;
	} catch (error: any) {
		throw new Error(`Gagal membuat kategori baru karena ${error.message}`);
	}
};

export { createCatregory };
