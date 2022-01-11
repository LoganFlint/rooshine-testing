import axios from "axios"
import type { ShippingAddress } from "../user"

export interface RegisterDetails {
	fullName: string,
	displayName: string,
	phone: string,
	email: string,
	password?: string
}

const logRejection = (reason: { response: { data: string } }) => {
	console.log("data:", `"${reason.response.data}"`)
	console.log("catch", reason)
}

export async function register(registerObj: RegisterDetails): Promise<string> {
	return new Promise((resolve, reject) => {
		axios.post(`/api/v1/user`, registerObj).then((res) => {
			resolve(res.data)
		}).catch((reason) => {
			logRejection(reason)
			reject(reason)
		})
	})
}

export type MyAuctionsTabOption = "bidding" | "selling" | "purchased" | "sold" | "watching" | ""

export function shipping(shippingObj: ShippingAddress): Promise<string> {
	return new Promise((resolve, reject) => {
		axios.put(`/api/v1/user/me/shipping`, shippingObj).then((res) => {
			resolve(res.data)
		}).catch((reason) => {
			logRejection(reason)
			reject(reason)
		})
	})
}

export async function checkRegistrationStatus(): Promise<string> {
	const { data } = await axios.get("/api/v1/user/me");
	return data.onboardingStep as string;
}