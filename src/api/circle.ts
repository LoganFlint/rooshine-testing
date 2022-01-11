export interface BillingPayload {
	encryptedData: string
	expMonth: number | null
	expYear: number | null
	saveCard?: boolean
	keyId: string
	billingDetails: BillingDetails
}

export interface BillingDetails {
	name: string
	line1: string
	line2: string
	city: string
	district: string
	country: string
	postalCode: string
}

export interface CardData {
	number: string 
	cvv: string
}
