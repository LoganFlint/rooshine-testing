import {
	login,
	signUp,
	confirmEmail,
	changePassword,
	logout,
	loginGoogle
} from "./modules/sessions"
import {
	wallet,
	queryBalance,
} from "./modules/wallet"
import {
	register,
	shipping,
	checkRegistrationStatus
} from "./modules/register"
import {
	createBarrel,
	editBarrel,
	uploadMedia,
	deleteMedia,
	uploadAuthDocs,
	setAuthDocDesc,
	deleteAuthDocs,
	getBarrelInfo,
	getBarrel,
	getBarrels,
	getMediaURL,
	getBarrelById,
	approveBarrel
} from "./modules/barrel"
import {
	getLot,
	getLots,
	submitBidOnBottle
} from "./modules/lot"
import {
	getUser,
	getCurrentUser,
	updateCurrentUser,
	getAllUsers,
	getUserById
} from "./modules/user"
import {
	getEncryptionKey,
	activateUser,
	encryptCard
} from "./modules/circle"
import {
	resetPasswordSendEmail,
	resetPasswordVerifyEmail,
	resetPasswordComplete,
} from "./modules/resetPassword"
import {
	verifyDocument
} from "./modules/stripe"
import {
	addCardPayment,
	getPaymentMethods,
	getPlaidToken,
	addBankAccount,
	replaceCard,
	deletePaymentMethod,
	purchasIsv
} from "./modules/payments"

export const API_BASE = import.meta.env.VITE_API

export default {
	login,
	loginGoogle,
	wallet,
	queryBalance,
	signUp,
	register,
	confirmEmail,
	getUser,
	getCurrentUser,
	createBarrel,
	editBarrel,
	uploadMedia,
	deleteMedia,
	uploadAuthDocs,
	setAuthDocDesc,
	deleteAuthDocs,
	getLot,
	getLots,
	submitBidOnBottle,
	getBarrel,
	getBarrels,
	getMediaURL,
	changePassword,
	shipping,
	checkRegistrationStatus,
	getBarrelInfo,
	resetPasswordSendEmail,
	resetPasswordVerifyEmail,
	resetPasswordComplete,
	updateCurrentUser,
	logout,
	getEncryptionKey,
	activateUser,
	encryptCard,
	verifyDocument,
	addCardPayment,
	getPaymentMethods,
	getPlaidToken,
	addBankAccount,
	replaceCard,
	deletePaymentMethod,
	purchasIsv,
	getBarrelById,
	getAllUsers,
	getUserById,
	approveBarrel
}
