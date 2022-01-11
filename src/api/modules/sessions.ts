import axios from "axios";
import router from "../../router";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/v1/session`, {
        email,
        password,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((reason) => {
        console.log("data:", `"${reason.response.data}"`);
        console.log(reason);
        reject(reason);
      });
  });
}

export async function loginGoogle({ google }: { google: string }): Promise<string> {
	return new Promise((resolve, reject) => {
		axios.post(`/api/v1/session/sso`, {
			google
		}).then(async(response) => {
      if(response.status == 200) {
        // if user exists in rooshine DB
        await router.push({ name: "profile"})
      } else if (response.status == 202) {
         // if user doesn't exists in rooshine DB and needs register flow conpleted 
        await router.push({ name: "register.account" })
      }
			resolve(response.data)
		}).catch((reason) => {
			console.log("data:", `"${reason.response.data}"`)
			console.log(reason)
			reject(reason)
		})
	})
}

export async function signUp({ email }: { email: string }): Promise<string> {
  return new Promise((resolve, reject) => {
    const body = {
      email: email,
    };
    axios
      .post(`/api/v1/email`, body)
      .then((response) => {
        resolve(response.data);
      })
      .catch((reason) => {
        console.log("data:", `"${reason.response.data}"`);
        reject(reason);
      });
  });
}

export async function confirmEmail({
  code,
}: {
  code: string;
}): Promise<string> {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/v1/email/confirm`, { code })
      .then((response) => {
        resolve(response.data);
      })
      .catch((reason) => {
        console.log("data:", `"${reason.response.data}"`);
        reject(reason);
      });
  });
}

export interface PasswordReset {
  current: string;
  new: string;
}

export async function changePassword(
  passwordResetObj: PasswordReset
): Promise<string> {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/v1/user/me/password`, passwordResetObj)
      .then((response) => {
        resolve(response.data);
      })
      .catch((reason) => {
        console.log("headers", reason.response.headers);
        console.log("data:", `"${reason.response.data}"`);
        console.log("catch", reason);
        reject(reason);
      });
  });
}

export async function logout(): Promise<void> {
  return axios.delete(`/api/v1/session`);
}
