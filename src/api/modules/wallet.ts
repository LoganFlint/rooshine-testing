import axios from "axios"
import type { WalletAuth } from "../wallet"

export function wallet({
	timestamp,
	address,
	signature,
}: WalletAuth): Promise<string> {
	const body: WalletAuth = {
		timestamp: timestamp,
		address: address,
		signature: signature,
	}

	return new Promise((resolve, reject) => {
		axios
			.put(`/api/v1/user/me/wallet`, body)
			.then(response => {
				resolve(response.data)
			})
			.catch(reason => {
				// reason.resp.data gets the response from network -> wallet -> response
				console.log("data:", `"${reason.response.data}"`)
				console.log("catch", reason)
				reject(reason)
			})
	})
}

export async function queryBalance(key: string): Promise<number> {
	return (await axios.get(`https://contract.sandbox.drinkrooshine.com/v1/address/${key}`)).data.isv;
}

