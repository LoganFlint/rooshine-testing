import axios from "axios"
import type { BillingPayload } from "../circle"
import type { BankPayment, CardPayment, PurchaseDetails } from "../payments"

const logRejection = (reason: { response: { data: string } }) => {
	console.log("data:", `"${reason.response.data}"`)
	console.log("catch", reason)
}

export async function getPaymentMethods(): Promise<CardPayment[]> {
	return new Promise((resolve, reject) => {
		axios.get(`/api/v1/user/me/payment_method`).then((res) => {
			resolve(res.data.paymentMethods)
			return res.data.paymentMethods
		}).catch((reason) => {
			logRejection(reason)
			reject(reason)
		})
	})
}

export async function addCardPayment(param: BillingPayload): Promise<void> {
	return new Promise((resolve, reject) => {
		axios.post(`/api/v1/user/me/card`, param).then((res) => {
			resolve(res.data)
		}).catch((reason) => {
			logRejection(reason)
			reject(reason)
		})
	})
}

export async function getPlaidToken(): Promise<string> {
	return new Promise((resolve, reject) => {
		axios.post(`/api/v1/user/me/bank/token`, {}).then((res) => {
			resolve(res.data.linkToken)
		}).catch((reason) => {
			logRejection(reason)
			reject(reason)
		})
	})
}

export async function addBankAccount(param: BankPayment): Promise<void> {
	return new Promise((resolve, reject) => {
		axios.post(`/api/v1/user/me/bank`, param).then((res) => {
			resolve(res.data)
		}).catch((reason) => {
			reject(reason)
		})
	})
}

export async function purchasIsv(param: PurchaseDetails): Promise<void> {
	return new Promise((resolve, reject) => {
		axios.post(`/api/v1/isv/purchase`, param).then((res) => {
			resolve(res.data)
		}).catch((reason) => {
			reject(reason)
		})
	})
}

export async function replaceCard(cardId: string, newCard: BillingPayload): Promise<void> {
	await deletePaymentMethod("card", cardId);
	await addCardPayment(newCard);
}

export async function deletePaymentMethod(paymentType: string, paymentId: string): Promise<void> {
	await axios.delete(`/api/v1/user/me/${paymentType}/${paymentId}`);
}
