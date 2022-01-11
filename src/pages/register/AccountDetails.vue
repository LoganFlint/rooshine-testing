<template>
  <div class="w-full flex flex-col items-center">
    <div class="w-full max-w-2xl">
      <div class="pt-12 pb-10 flex flex-col items-center">
        <div
          class="pb-2 font-serif font-bold text-xl"
        >
          To begin, we need a little more info about you
        </div>
        <div class="font-source">
          Fields marked with an asterisk * are required
        </div>
      </div>
      <form
        data-cy="account-details-form"
        class="flex flex-col items-center font-source"
        @submit.prevent="register"
      >
        <div class="w-full items-center flex flex-col">
          <div
            :class="[
              ' w-full flex',
              {
                'items-center':
                  state.fullName.hasError && state.displayName.hasError,
                'items-center ':
                  !state.fullName.hasError && !state.displayName.hasError,
              },
            ]"
          >
            <div class="text-lg flex flex-col w-1/2 mr-8">
              What’s your name?
              <TextInput
                v-model="state.fullName.value"
                :error="state.fullName.hasError"
                :disabled="processing"
                placeholder="Full Name"
                autocomplete="off"
                input-type="text"
              />
              <div
                v-if="state.fullName.hasError"
                class="text-planetOfTheApes text-sm"
              >
                {{ state.fullName.label }}
              </div>
            </div>

            <div class="text-lg w-1/2">
              <div
                :class="[
                  'h-7',
                  {
                    'h-auto': !state.displayName.hasError,
                  },
                ]"
              />
              <div
                :class="{
                  'mb-2': state.displayName.hasError
                }"
              >
                Display Name
              </div>
              <TextInput
                v-model="state.displayName.value"
                :error="state.displayName.hasError"
                :disabled="processing"
                autocomplete="off"
                input-type="text"
                placeholder="Display Name"
              />
              <div
                v-if="state.displayName.hasError"
                class="text-planetOfTheApes text-sm"
              >
                {{ state.displayName.label }}
              </div>
            </div>
          </div>
        </div>

        <div class="w-full items-center flex flex-col pt-7">
          <div class="w-full flex">
            <div class="text-lg flex flex-col w-1/2 mr-8">
              Phone Number
              <TextInput
                v-model="state.phone.value"
                :disabled="processing"
                class="mt-1"
                autocomplete="off"
                input-type="text"
                placeholder="Phone Number"
              />
            </div>
            <div class="text-lg w-1/2">
              <div>Email Address</div>
              <TextInput
                v-model="store.userEmail.email"
                class="mt-1"
                readonly
                input-type="text"
                :placeholder="store.userEmail.email"
              />
            </div>
          </div>
        </div>

        <div
          v-if="store.userEmail.sso === false"
          class="w-full items-center flex flex-col pt-7"
        >
          <div
            :class="[
              ' w-full flex',
              {
                'items-baseline': state.password.hasError,
                'items-end': !state.password.hasError,
              },
            ]"
            class="flex items-end w-full"
          >
            <div class="text-lg flex flex-col w-1/2 mr-8">
              Choose a Password
              <TextInput
                v-model="state.password.value"
                :error="
                  state.password.hasError || state.confirmPassword.hasError
                "
                :disabled="processing"
                class="mt-1"
                autocomplete="off"
                input-type="password"
                placeholder="Enter a Password *"
              />
              <div
                v-if="state.password.hasError"
                class="text-planetOfTheApes text-sm"
              >
                {{ state.password.label }}
              </div>
              <div
                v-else-if="state.confirmPassword.hasError"
                class="mb-7"
              />
            </div>
            <div class="text-lg w-1/2">
              <div>Confirm Password</div>
              <TextInput
                v-model="state.confirmPassword.value"
                class="mt-1"
                :error="state.confirmPassword.hasError"
                :disabled="processing"
                autocomplete="off"
                input-type="password"
                placeholder="Re-Enter Password *"
              />
              <div
                v-if="state.confirmPassword.hasError"
                class="text-planetOfTheApes text-sm"
              >
                {{ state.confirmPassword.label }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-center items-center">
          <Checkbox
            v-model="state.age.clicked"
            class="mt-10"
            type="submit"
            :disabled="processing"
            :error="state.age.hasError"
            label="I am of legal drinking age in my country"
          />
          <div
            v-if="state.age.hasError"
            class="text-center text-xs text-planetOfTheApes"
          >
            {{ state.age.label }}
          </div>
        </div>
        <MainButton
          type="submit"
          :label="'Continue'"
          class="w-60 mt-8 mb-16"
          :loading="processing"
          :disabled="processing"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../../store";
import router from "../../router";
import api from "../../api/api";

const emit = defineEmits(["continue"]);
const store = useStore();

onMounted(async () => {
  state.userEmail = await store.getUserEmail();
});

const state = reactive({
  fullName: { hasError: false, label: "Full Name", value: "" },
  age: { hasError: false, label: "This field is required", clicked: false },
  displayName: { hasError: false, label: "First Name", value: "" },
  password: { hasError: false, label: "Password", value: "" },
  confirmPassword: { hasError: false, label: "Passwords Must Match", value: "" },
  phone: { hasError: false, label: "Phone Number", value: "" },
  userEmail: {
    email: store.userEmail.email,
    sso: store.userEmail.sso,
  }
});

onMounted(async () => {
  const userEmail = await store.getUserEmail();
  state.userEmail.email = userEmail.email;
  state.userEmail.sso = userEmail.sso;
})

function checkError(): void {
  let hasError = false;
  state.age.hasError = !state.age.clicked;
  hasError = state.age.hasError;
  state.fullName.hasError = state.fullName.value.length < 1;
  hasError = hasError || state.fullName.hasError;
  state.displayName.hasError = state.displayName.value.length < 1;
  hasError = hasError || state.displayName.hasError;
  if (store.userEmail.sso == false) {
    state.password.hasError = state.password.value.length < 1;
    hasError = hasError || state.password.hasError;
    state.confirmPassword.hasError = state.password.value != state.confirmPassword.value;
    hasError = hasError || state.confirmPassword.hasError;
  }
  if (hasError) throw new Error("missing values");
}

const error = ref(false);
const processing = ref(false);

async function register(): Promise<void> {
  try {
    checkError();
    processing.value = true;
    if (store.userEmail.sso === true) {
      await api.register({
        fullName: state.fullName.value,
        displayName: state.displayName.value,
        phone: state.phone.value,
        email: store.userEmail.email,
        password: ""
      });
    } else {
      await api.register({
        fullName: state.fullName.value,
        displayName: state.displayName.value,
        phone: state.phone.value,
        email: store.userEmail.email,
        password: state.password.value,
      });
    }
    emit("continue");
    await router.push({ name: "register.identity" });
  } catch (e) {
    console.log(e)
    error.value = true;
  } finally {
    processing.value = false;
  }
}

</script>
