import pool from "../utils/db";

const defval = {
	wallet: "Umum",
};

interface defval {
	wallet: string;
}

const createWallet = async (
	user_id: String,
	client: any = pool,
	wallet: defval | boolean = false
) => {
	try {
		const query = `
      INSERT INTO wallets (
        wallet_name,
        user_id
      ) VALUES (
       $1,
       $2
      ) RETURNING id
    `;

		if (wallet === false || wallet === true) {
			wallet = defval;
		}

		const values = [wallet.wallet, user_id];

		const result = await client.query(query, values);
		const wallet_id = result.rows[0]?.id || result;

		console.log("wallet : " + wallet_id);
		return wallet_id;
	} catch (error: any) {
		throw new Error(`Gagal membuat wallet baru karena ${error.message}`);
	}
};

export { createWallet };
