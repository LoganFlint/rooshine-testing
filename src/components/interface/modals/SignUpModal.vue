<template>
  <SignBaseModal
    left
    blur
    :is-open="true"
    @close="closeModal"
  >
    <div
      v-if="currentStep == 'create'"
      class="pt-12 pl-16 flex flex-col max-w-md max-h-screen overflow-scroll"
    >
      <div>
        <div
          class="max-w-xs pr-5 font-serif pb-4 text-3xl font-bold"
        >
          Buy and sell premium spirits with Rooshine
        </div>
        <div
          class="max-w-xs pr-5 font-source text-xl"
        >
          Join the first auction of rare and collectible bottles run completely on the block chain.
        </div>

        <div class="mt-7 pr-28">
          <div class="font-source">
            Create Account
          </div>
          <form
            class="my-3"
            data-cy="sign-up-form"
            @submit.prevent="signUp"
          >
            <TextInput
              v-model="email"
              input-type="text"
              autocomplete="off"
              :error="error"
              :disabled="processing"
              placeholder="Email Address"
              @change="validateEmail"
            />
            <div
              v-if="error"
              class="text-planetOfTheApes text-xs pt-2"
            >
              Please enter valid email!
            </div>
            <MainButton
              class="w-full mt-5"
              label="get started"
              :loading="processing"
              :disabled="processing"
            />
          </form>
        </div>
        <div class="font source">
          or register with:
        </div>
        <div class="mt-4 mr-auto pr-16">
          <SocialLoginButton
            google
            label="Sign up with Google"
            @click="googleLogin"
          />
        </div>
      </div>
      <div class="mt-8 w-full border-unicornSilver border" />
      <div class="py-6 pr-10 justify-center flex font-source">
        <div>Already a member?</div>
        <router-link
          class="pl-0.5 font-bold underline text-blue"
          :to="{ name: 'signin' }"
        >
          Sign In
        </router-link>
      </div>
    </div>

    <div
      v-if="currentStep == 'verify'"
      class="max-w-md"
    >
      <div class="pt-12 pl-16 flex flex-col max-h-screen overflow-scroll">
        <div class="max-w-xspr-5 font-serif pb-4 text-3xl font-bold">
          Email
          <br>Verification
        </div>
        <div class="max-w-xs font-source text-xl">
          Enter the 6 digit code that was
          <br>sent to the email address
          <br>
          {{ email }}
        </div>
        <form
          class="mt-11 pr-16"
          @submit.prevent="confirm"
        >
          <div
            :class="[
              'flex mr-2',
              {
                'pb-2': error,
                'pb-12': !error,
              },
            ]"
          >
            <PinInput
              v-model="codes"
              :error="error"
              :disabled="processing"
              :button-ref="submitPinButton"
            />
          </div>
          <div
            v-if="error"
            class="mb-3 text-planetOfTheApes text-xs"
          >
            Enter a valid confirmation code
          </div>
          <MainButton
            type="submit"
            class="w-full"
            label="verify email"
            :loading="processing"
            :disabled="processing"
            @button-ref="updateButtonRef"
          />
        </form>

        <div class="py-6 pr-10 flex font-source">
          <div>Didn’t receive the code?</div>
          <a
            class="pl-0.5 font-bold underline text-blue"
            href="#"
          >Send it again</a>
        </div>
        <div class="mt-8 border-unicornSilver border" />
        <div class="pt-6 pr-10 flex font-source">
          <div>Already a member?</div>
          <a
            class="pl-0.5 font-bold underline text-blue"
            href="#"
            @click="goToLogin"
          >Sign In</a>
        </div>
      </div>
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

import router from "../../../router";
import api from "../../../api/api";
const googleClient = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;


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

async function googleLogin() {
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
}

const emit = defineEmits(["close", "signIn"]);

const submitPinButton = ref<HTMLButtonElement | null>(null)
const codes = ref(["", "", "", "", "", ""])

function emptyCode() {
  codes.value = ["", "", "", "", "", ""]
}

function updateButtonRef(el: HTMLButtonElement) {
  submitPinButton.value = el
}

const email = ref<string>("")

const steps = ["create", "verify"]

const currentStep = ref(steps[0])

function resetValues() {
  email.value = ""
  currentStep.value = steps[0]
}

function goToLogin() {
  emit("signIn")
}

async function closeModal() {
  emit("close")
  error.value = false
  currentStep.value = steps[0]
  await router.push({ name: "marketing" })
}
function goToVerify() {
  currentStep.value = steps[1]
}
const error = ref(false)
const processing = ref(false)

async function signUp() {
  if (!processing.value) {
    try {
      validateEmail()
      processing.value = true
      await api.signUp({
        email: email.value,
      })
      goToVerify()
    } catch (e) {
      resetValues()
      error.value = true
    } finally {
      processing.value = false
    }
  }
}

async function confirm() {
  if (!processing.value) {
    try {
      validateCode(codes.value)
      processing.value = true
      await api.confirmEmail({
        code: codes.value.join(""),
      })
      await closeModal()
      await router.push({ name: "register.account" })
    } catch (e) {
      emptyCode()
      error.value = true
    } finally {
      processing.value = false
    }
  }
}

function validateEmail() {
  const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  error.value = !mailRegex.test(email.value)
  if (error.value) {
    throw new Error("invalid email")
  }
}

function validateCode(arr: Array<string>) {
  arr.forEach(value => {
    if (value === "") {
      error.value = true
      throw new Error("invalid code")
    }
  })
}

</script>
