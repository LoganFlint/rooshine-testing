import axios from "axios"

export interface SendEmail {
	email: string
}

export function resetPasswordSendEmail(emailObj: SendEmail): Promise<string> {
	return axios.post(`/api/v1/email`, emailObj)
}

export interface SendCode {
	code: string
}

export function resetPasswordVerifyEmail(codeObj: SendCode): Promise<string> {
	return axios.post(`/api/v1/email/confirm`, codeObj)
}

export interface SendPassword {
	password: string
}

export function resetPasswordComplete(passwordObj: SendPassword): Promise<string> {
	return axios.post(`/api/v1/password`, passwordObj)
}
