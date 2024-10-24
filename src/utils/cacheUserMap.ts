import { findUserIdByPhoneNumber } from "../services/utils";

const userCache = new Map(); // Penyimpanan sementara id_user berdasarkan phone_number

function getCacheId(phone_number: string) {
	let idUser = userCache.get(phone_number);
	if (!idUser) {
		// Jika id_user tidak ditemukan di cache, lakukan query ke DB
		idUser = findUserIdByPhoneNumber(phone_number);
		if (idUser) {
			userCache.set(phone_number, idUser); // Simpan ke cache
		}
	}
	return idUser;
}

export { getCacheId };
