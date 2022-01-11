export interface CardPayment {
    type: string
    cardId: string
    network: string
    last4: string
    expMonth: number | null
    expYear: number | null
    createdAt: string
    updatedAt: Date | null
		bankAccountId: string
		institutionName: string
		redactedAccountNumber: string
}

export interface BankPayment {
  publicToken: string
  accountId: string
  billingDetails: BankInfo
}

export interface BankInfo {
  name: string
	line1: string
	line2: string
	city: string
	district: string
	country: string
	postalCode: string
}

export interface PayInfo {
  expiration: string
  cvv: string
  address: string
  zipCode: string
  city: string
  state: string
  country: string
}

export interface PaymentMenuOption {
  name: string,
  disabled?: boolean,
  message?: string
}

export interface PurchaseDetails {
  amount: number
  /** bank or card number  if already handled in component*/
  cardId?: string
  bankAccountId?: string
}
