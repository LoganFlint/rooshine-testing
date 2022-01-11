import { useStore } from "./store"

import {
	createRouter, createWebHistory
} from "vue-router"
// layouts
import Layout from "./components/layouts/Layout.vue"
import UserLayout from "./components/layouts/UserLayout.vue"
import PageNotFound from "./components/base/PageNotFound.vue"
import SideBar from "./components/interface/admin/SideBar.vue"
// marketing related
import Marketing from "./pages/Marketing.vue"
import LiveAuctionsEmpty from "./pages/LiveAuctionsEmpty.vue"
import LiveAuction from "./pages/LiveAuction.vue"
import AddBarrelParent from "./pages/add-barrel/AddBarrelParent.vue"
import BarrelInfo from "./pages/add-barrel/BarrelInfo.vue"
import BarrelDocuments from "./pages/add-barrel/BarrelDocuments.vue"
import BarrelReserve from "./pages/add-barrel/BarrelReserve.vue"
import BarrelSend from "./pages/add-barrel/BarrelSend.vue"
import BarrelPhotos from "./pages/add-barrel/BarrelPhotos.vue"
import SignInModal from "./components/interface/modals/SignInModal.vue"
import SignUpModal from "./components/interface/modals/SignUpModal.vue"

import PastAuctions from "./pages/PastAuctions.vue"
import Sell from "./pages/Sell.vue"
import Profile from "./pages/profile/Profile.vue"
// register related
import Wallet from "./pages/wallet/Wallet.vue"
//import UnlockWalletModal from "./components/interface/modals/UnlockWalletModal.vue"
import IsvComplete from "./components/interface/wallet/IsvComplete.vue"
import IsvConfirmation from "./components/interface/wallet/IsvConfirmation.vue"
import IsvError from "./components/interface/wallet/IsvError.vue"
import Register from "./pages/register/Register.vue"
import WalletSetup from "./components/interface/wallet/WalletSetup.vue"
import AccountDetails from "./pages/register/AccountDetails.vue"
import AccountIdentity from "./pages/register/AccountIdentity.vue"
import AddressDetails from "./pages/register/AddressDetails.vue"
import LotDetails from "./pages/LotDetails.vue"
import BillingInfo from "./pages/register/BillingInfo.vue"
import FinalizeReg from "./pages/register/FinalizeReg.vue"
// import Error from "./components/base/Error.vue"
import AddPayment from "./components/interface/payment/payment-modals/AddPayment.vue"
import AddBank from "./components/interface/payment/payment-modals/AddBank.vue"
import AddCard from "./components/interface/payment/payment-modals/AddCard.vue"
import EditPayment from "./components/interface/payment/payment-modals/EditPayment.vue";
import ChangePasswordModal from "./components/interface/profile/change-password/ChangePasswordModal.vue"
import ChangePasswordConfirm from "./components/interface/profile/change-password/ChangePasswordConfirm.vue"
import BidModal from "./components/interface/bids/BidModal.vue"

import PasswordResetParent from "./components/interface/password/password-reset/PasswordResetParent.vue"
import ResetPasswordEmail from "./components/interface/password/password-reset/ResetPasswordEmail.vue"
import ResetPasswordCheckEmail from "./components/interface/password/password-reset/ResetPasswordCheckEmail.vue"
import ResetPasswordVerify from "./components/interface/password/password-reset/ResetPasswordVerify.vue"
import ResetPasswordNewPassword from "./components/interface/password/password-reset/ResetPasswordNewPassword.vue"

import AddLotBottles from "./components/interface/lot/add-lot-flow/AddLotBottles.vue"
import AddLotDetails from "./components/interface/lot/add-lot-flow/AddLotDetails.vue"
import AddLotConfirm from "./components/interface/lot/add-lot-flow/AddLotConfirm.vue"
import AddLotSubmitted from "./components/interface/lot/add-lot-flow/AddLotSubmitted.vue"

// admin related
import Home from "./pages/admin/Home.vue"

import Members from "./pages/admin/Members.vue"
import MemberInfo from "./pages/admin/MemberInfo.vue"
import MemberTokens from "./pages/admin/MemberTokens.vue"
import MemberActivity from "./pages/admin/MemberActivity.vue"
import MemberListings from "./pages/admin/MemberListings.vue"
import Barrels from "./pages/admin/barrels/Barrels.vue"
import AdminBarrelInfo from "./pages/admin/barrels/AdminBarrelInfo.vue"
import Auctions from "./pages/admin/auctions/Auctions.vue"
import AdminUpcomingAuctions from "./pages/admin/auctions/UpcomingAuctions.vue"
import AdminPastAuctions from "./pages/admin/auctions/PastAuctions.vue"
import BarrelBottles from "./pages/admin/barrels/BarrelBottles.vue"
import BarrelLots from "./pages/admin/barrels/BarrelLots.vue"

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: Layout,
			children: [
				{
					name: "marketing",
					path: "/",
					components: { main: Marketing },
				},
				//TODO: Get public key more persistent in store
				// {
				// 	name: "unlock.wallet",
				// 	path: "/unlock-wallet",
				// 	components: {
				// 		main: Wallet, navbarModal: UnlockWalletModal
				// 	},
				// 	props: true
				// },
				{
					name: "signin",
					path: "/sign-in",
					components: { main: Marketing, navbarModal: SignInModal },
					props: true,
				},
				{
					name: "signup",
					path: "/sign-up",
					components: { main: Marketing, navbarModal: SignUpModal },
					props: true,
				},
				{
					name: "reset.password",
					path: "/reset-password/:userEmail",
					components: { navbarModal: PasswordResetParent },
					props: true,
					redirect: (to) => ({
						name: "reset.password.email",
						params: { userEmail: to.params.userEmail },
					}),
					children: [
						{
							name: "reset.password.email",
							path: "/reset-password/:userEmail/email",
							component: ResetPasswordEmail,
							props: true,
						},
						{
							name: "reset.password.checkemail",
							path: "/reset-password/:userEmail/checkemail",
							component: ResetPasswordCheckEmail,
						},
						{
							name: "reset.password.verify",
							path: "/reset-password/:userEmail/verify",
							component: ResetPasswordVerify,
						},
						{
							name: "reset.password.newpassword",
							path: "/reset-password/:userEmail/newpassword",
							component: ResetPasswordNewPassword,
						},
					],
				},

				{
					path: "/:catchAll(.*)",
					name: "not-found",
					components: { main: PageNotFound },
				},
				{
					name: "create.barrel.parent",
					path: "/create-barrel",
					components: { main: AddBarrelParent },
					redirect: { name: "create-barrel.info" },
					children: [
						{
							name: "create-barrel.info",
							path: "/create-barrel/barrel-info",
							component: BarrelInfo,
						},
						{
							name: "create-barrel.documents",
							path: "/create-barrel/documents/:barrelId",
							component: BarrelDocuments,
							props: true,
						},
						{
							name: "create-barrel.photos",
							path: "/create-barrel/photos/:barrelId",
							component: BarrelPhotos,
							props: true,
						},
						{
							name: "create-barrel.reserve",
							path: "/create-barrel/reserve/:barrelId",
							component: BarrelReserve,
							props: true,
						},
						{
							name: "create-barrel.send",
							path: "/create-barrel/send/:barrelId",
							component: BarrelSend,
							props: true,
						},
					],
				},
				{
					name: "register",
					path: "/register",
					components: { main: Register },
					redirect: { name: "register.account" },
					children: [
						{
							name: "register.account",
							path: "/register/account",
							component: AccountDetails,
						},
						{
							name: "register.identity",
							path: "/register/identity",
							component: AccountIdentity,
						},
						{
							name: "register.address",
							path: "/register/address",
							component: AddressDetails,
						},
						{
							name: "register.billing",
							path: "/register/billing",
							component: BillingInfo,
						},
						{
							name: "register.finalize",
							path: "/register/finalize",
							component: FinalizeReg,
						},

					],
				},
			],
		},
		{
			path: "/profile",
			component: UserLayout,
			children: [
				{
					name: "profile",
					path: "/profile",
					component: Profile,
					children: [
						{
							name: "add.payment",
							path: "/profile/add-payment",
							components: { profileModal: AddPayment },
						},
						{
							name: "add.payment.bank",
							path: "/profile/add-payment-bank",
							components: { profileModal: AddBank },
							props: true
						},
						{
							name: "edit.payment",
							path: "/profile/edit-payment",
							components: { profileModal: EditPayment },
							props: true
						},
						{
							name: "add.payment.card",
							path: "/profile/add-payment-card",
							components: { profileModal: AddCard },
						},
						{
							name: "profile.change.password",
							path: "/profile/change-password",
							components: { profileModal: ChangePasswordModal },
						},
						{
							name: "profile.change.password.confirm",
							path: "/profile/change-password-confirm",
							components: { profileModal: ChangePasswordConfirm },
						},
						{
							name: "add.lot.bottles",
							path: "/profile/add-lot-bottles",
							components: { profileModal: AddLotBottles },
						},
						{
							name: "add.lot.details",
							path: "/profile/add-lot-details",
							components: { profileModal: AddLotDetails },
						},
						{
							name: "add.lot.confirm",
							path: "/profile/add-lot-confirm",
							components: { profileModal: AddLotConfirm },
						},
						{
							name: "add.lot.confirmation",
							path: "/profile/add-lot-confirmation",
							components: { profileModal: AddLotSubmitted },
						},
					],
				},
				{
					name: "user-wallet-setup",
					path: "/wallet-setup",
					component: WalletSetup,
				},
				{
					name: "wallet",
					path: "/wallet",
					component: Wallet,
					props: true,
					children: [
						{
							name: "wallet.purchase-confirm",
							path: "/wallet/purchase-confirm",
							components: { walletModal: IsvConfirmation },
              props: true,
						},
						{
							name: "wallet.purchase-complete",
							path: "/wallet/purchase-complete",
							components: { walletModal: IsvComplete },
						},
            {
							name: "wallet.purchase-error",
							path: "/wallet/purchase-error",
							components: { walletModal: IsvError },
						},
					]
				},
				{
					name: "live.auction",
					path: "/auctions",
					component: LiveAuction,
					props: {
						search: String
					}
				},
				{
					name: "live.auction.empty",
					path: "/auctions-empty",
					component: LiveAuctionsEmpty,
				},
				{
					name: "past.auctions",
					path: "/auctions/history",
					component: PastAuctions,
				},
				{
					name: "live.auction.details",
					path: "/lot-details/:lotNumberStr",
					component: LotDetails,
					props: true,
					children: [
						{
							name: "live.auction.details_bid",
							path: "/lot-details/:lotNumberStr/bid",
							component: BidModal,
							props: true,
						},
					],
				},
				{
					name: "sell",
					path: "/sell",
					component: Sell,
				},
			],
		},
		{
			path: "/admin",
			component: SideBar,
			redirect: { name: "admin.home" },
			children: [
				{
					name: "admin.home",
					path: "/admin/home",
					components: { adminSidebar: Home },
				},
				{
					name: "admin.barrels",
					path: "/admin/barrels",
					components: { adminSidebar: Barrels },
				},
				{
					name: "admin.barrel-info",
					path: "/admin/barrel/barrel-info",
					components: { adminSidebar: AdminBarrelInfo },
					props: {
						barrellId: String
					}
				},
				{
					name: "admin.barrel-bottles",
					path: "/admin/barrel/barrel-bottles",
					components: { adminSidebar: BarrelBottles },
					props: {
						lotNumber: String
					}
				},

				{
					name: "admin.barrel-lots",
					path: "/admin/barrel/barrel-lots",
					components: { adminSidebar: BarrelLots },
					props: {
						lotNumber: Number
					}
				},
				{
					name: "admin.auctions.live",
					path: "/admin/auctions/live",
					components: {
						adminSidebar: Auctions,
					},
				},
				{
					name: "admin.auctions.upcoming",
					path: "/admin/auctions/upcoming",
					components: {
						adminSidebar: AdminUpcomingAuctions,
					},
				},
				{
					name: "admin.auctions.past",
					path: "/admin/auctions/past",
					components: {
						adminSidebar: AdminPastAuctions,
					},
				},
				{
					name: "admin.members",
					path: "/admin/members",
					components: {
						adminSidebar: Members,
					},
          props: true
				},
				{
					name: "admin.member.info",
					path: "/admin/members/info",
					components: { adminSidebar: MemberInfo, },
					props: {
						email: String
					},
				},
				{
					name: "admin.member.tokens",
					path: "/admin/members/tokens",
					components: { adminSidebar: MemberTokens, },
				},
				{
					name: "admin.member.activity",
					path: "/admin/members/activity",
					components: { adminSidebar: MemberActivity, },
				},
				{
					name: "admin.member.listings",
					path: "/admin/members/listings",
					components: { adminSidebar: MemberListings, },
				},
			],
		},
	],
})


router.beforeEach((to, _, next) => {
	if (to.name?.toString().includes("admin") && useStore().user.isAdmin == false) {
		next({ name: "profile" });
	} else next();
});

export default router
