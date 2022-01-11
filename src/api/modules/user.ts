import axios from "axios"
import type { User } from "../user"
import type { UserEmail } from "../userEmail"
import { getBarrels } from "./barrel"

// any is defined by the definition of how the axios response works
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleUserResponse = async (user: any) => {
	const localUser = createEmptyUser()
	if (user)
		await overwriteUser(user, localUser)
	return localUser
}

const logRejection = (reason: { response?: { data?: string } }) => {
	if (reason.response?.data)
		console.log("data:", `"${reason.response.data}"`)
	console.log("catch", reason)
}

export async function getUser(): Promise<UserEmail> {
	return new Promise((resolve, reject) => {
		axios
			.get(`/api/v1/email`)
			.then((user) => {
				resolve(user.data)
        return user.data
			})
			.catch((reason) => {
				logRejection(reason)
				reject(reason)
			})
	})
}
export async function getCurrentUser(): Promise<User> {
	return new Promise((resolve, reject) => {
		axios
			.get(`/api/v1/user/me`)
			.then(async (user) => {
				const returnedUser = await handleUserResponse(user.data)
        console.log(returnedUser)
				resolve(returnedUser)
			})
			.catch((reason) => {
				logRejection(reason)
				reject(reason)
			})
	})
}

export async function getUserById(id: string): Promise<User> {
	return new Promise((resolve, reject) => {
		axios
			.get(`/api/v1/user/${id}`)
			.then(async (user) => {
				const returnedUser = await handleUserResponse(user.data)
				resolve(returnedUser)
			})
			.catch((reason) => {
				logRejection(reason)
				reject(reason)
			})
	})
}

export async function getAllUsers(): Promise<User[]> {
  const { data } = await axios.get(`/api/v1/user`)
    return data.users as User[]
}



export async function updateCurrentUser(userObj: User): Promise<User> {
	return new Promise((resolve, reject) => {
		const localUser = { ...userObj }
		localUser.barrels = []
		axios
			.patch(`/api/v1/user/me`, localUser)
			.then(async (user: { data: User }) => {
				const returnedUser = await handleUserResponse(user.data)
				resolve(returnedUser)
			})
			.catch((reason) => {
				logRejection(reason)
				reject(reason)
			})
	})
}

export function userIsBlank(user: User): boolean {
	return (
		[user.displayName, user.email, user.fullName, user.phone, user.userId].join(
			""
		) === "" && user.watchList?.length === 0
	)
}

export async function overwriteUser(
	serverUser: User,
	localUser: User
): Promise<void> {
	// transfer properties from object to ours (preserving anything prexisting, but not brought in)
	Object.entries(serverUser).forEach((value) => {
		if (value.length == 2) {
			(localUser as unknown as { [key: string]: string })[value[0]] = value[1]
		}
	})
	localUser.barrels = await getBarrels()
	localUser.watchList = testWatchList
	//override userId
	// localUser.userId = "aed45c92-36be-11ec-9b35-e39b6bc739b0" // Jared
	// localUser.userId = "beeba440-ffab-11eb-b995-7bd1268c2648" // Logan
	// localUser.userId = "1701d7d6-076c-11ec-97bb-93401e32c3ca" // Austin
	// localUser.userId = "6c4df26e-2702-11ec-9006-2706cc957012" // Danielle
}

export function createEmptyUser(): User {
	return {
		userId: "",
		email: "",
		phone: "",
		fullName: "",
		displayName: "",
		shippingAddress: {
			line1: "",
			line2: "",
			city: "",
			district: "",
			postalCode: "",
			country: "",
		},
		barrels: [],
		watchList: [],
		onboardingStep: "account",
		isAdmin: false
	}
}

export const testWatchList: Array<number> = [72197415, 72197416, 72197417]
