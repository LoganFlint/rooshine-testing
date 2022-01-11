import type { Barrel } from "./barrel"

export interface User {
	shippingAddress: ShippingAddress
	email: string
	fullName: string
	displayName: string
	phone: string
	userId: string
	/** List of watchlist by lot number */
	watchList?: Array<number> | null
	/** contains an array of the user's barrel inventory */
	barrels?: Array<Barrel>,
	isAdmin: boolean,
	walletAddress?: string | null,
	onboardingStep?: string
  kind?: {
    status: string
  }
  stats?: {
    balance: number
    bidCount: number
    bidWins: number
    balanceSpent: number
    lotCount: number
    revenue: number
  },
}

export type UserKeys =
	| "shippingAddress"
	| "email"
	| "fullName"
	| "displayName"
	| "phone"
	| "userId"
	| "watchList"
	| "barrels"

export interface ShippingAddress {
	/** first address line (house number and street) */
	line1: string
	/** optional, second address line (apt number or suite number) */
	line2: string
	city: string
	/** aka state */
	district: string
	country: string
	/** aka zip code */
	postalCode: string,
}

