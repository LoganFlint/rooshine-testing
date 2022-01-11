<template>
  <div>
    <SignBaseModal
      right
      blur
      image-right
      :is-open="true"
      @close="closeModalRerouteTo('marketing')"
    >
      <div
        data-cy="sign-in-modal"
        class="max-w-lg pr-20 pt-12 pl-16 flex flex-col max-h-screen overflow-auto"
      >
        <div>
          <div
            class="max-w-xs pr-5 font-serif pb-4 text-3xl font-bold"
          >
            Sign in to your Rooshine account
          </div>
          <div class="max-w-xs font-source text-xl">
            Welcome back to the auctions!
          </div>
        </div>

        <div class="pb-5 mt-7 pr-11">
          <div class="font-source">
            Sign in to continue
          </div>
          <form
            class="my-3"
            @submit.prevent="login"
          >
            <TextInput
              v-model="email"
              data-cy="sign-in-email-input"
              :error="isError"
              placeholder="Email Address"
              input-type="text"
              autocomplete="off"
              class="mb-2"
              :disabled="processing"
            />

            <TextInput
              v-model="password"
              data-cy="sign-in-password-input"
              :error="isError"
              placeholder="Password"
              input-type="password"
              autocomplete="off"
              :disabled="processing"
            />
            <div
              v-if="isError"
              data-cy="sign-in-error-message"
              class="pt-1.5 text-sm text-planetOfTheApes"
            >
              Incorrect Password. Did you
              <router-link
                class="underline"
                :to="{
                  name: 'reset.password',
                  params: {
                    userEmail: email,
                  },
                }"
              >
                forget your password?
              </router-link>
            </div>
            <MainButton
              data-cy="sign-in-get-started-button"
              class="w-full mt-4"
              label="get started"
              text-color="white"
              bg-color="red"
              :loading="processing"
              :disabled="processing"
            />
          </form>
        </div>

        <div class="font source">
          or sign in with:
        </div>

        <div
          class="mt-4 mr-auto"
          @click="googleLogin"
        >
          <SocialLoginButton
            google
            label="Sign in with Google"
          />
        </div>
        <div class="mt-12 border-unicornSilver border" />
        <div class="py-6 pr-10 justify-center flex font-source">
          <div>Not a member yet?</div>
          <router-link
            class="font-bold underline text-blue pl-0.5"
            :to="{ name: 'signup' }"
          >
            Create an Account
          </router-link>
        </div>
      </div>
    </SignBaseModal>
  </div>
</template>

<script setup lang="ts">
import api from "../../../api/api";
import router from "../../../router";
import { useStore } from "../../../store";
const googleClient = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const emit = defineEmits(["close", "signUp"]);

const store = useStore();

const email = ref<string>("");
const password = ref<string>("");
const processing = ref(false);
const isError = ref(false);

const state = reactive({
  userToken: "",
  userEmail: ""
});

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  gapi.load("auth2", function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    gapi.auth2.init({
      client_id: googleClient,
    });
  });
});

async function googleLogin(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  await gapi.auth2
    .getAuthInstance()
    .signIn()
    .then(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      state.userToken = gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse(true).id_token;
    })
    .then(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      state.userEmail = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail()
    })
    .then(async () => {
      try {
        await api.loginGoogle({
          google: state.userToken,
        });
      } catch (e) {
        console.log(e);
      }
    });

  const user = await store.getCurrentUser();
  await rerouteOnLogin(user.onboardingStep ?? "");
}

function hasError(): void {
  const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!mailRegex.test(email.value)) {
    isError.value = true;
    throw new Error("invalid email");
  }
  if (!password.value?.length === null || password.value.length === 0) {
    isError.value = true;
    throw new Error("invalid email");
  }
}

function resetValues(): void {
  password.value = "";
  isError.value = false;
}

function closeModal(): void {
  emit("close");
  resetValues();
}

async function closeModalRerouteTo(routeName: string): Promise<void> {
  closeModal();
  await rerouteTo(routeName);
}

async function rerouteTo(routeName: string): Promise<void> {
  await router.push({ name: routeName });
}

async function login(): Promise<void> {
  if (!processing.value) {
    try {
      hasError();
      processing.value = true;
      await api.login({
        email: email.value,
        password: password.value,
      })

      const user = await store.getCurrentUser();
      await rerouteOnLogin(user.onboardingStep ?? "");

    } catch (e) {
      resetValues();
      isError.value = true;
    } finally {
      processing.value = false;
    }
  }
}

async function rerouteOnLogin(onboardingStep: string): Promise<void> {
  switch (onboardingStep) {
    case "createWallet":
      await closeModalRerouteTo("user-wallet-setup");
      break;
    case "verifyIdentity":
      await closeModalRerouteTo("register.identity");
      break;
    case "shippingAddress":
      await closeModalRerouteTo("register.address");
      break;
    case "billing":
      await closeModalRerouteTo("register.billing");
      break;
    case "activationPayment":
      await closeModalRerouteTo("register.billing");
      break;
    default:
      await closeModalRerouteTo("wallet");
  }
}

</script>
