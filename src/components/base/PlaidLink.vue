<template>
  <div @click="link_open">
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted } from "vue";
  import type { PropType } from "vue";
  export default defineComponent({
    props: {
      clientName: { type: String, default: "" },
      env: {
        type: String,
        required: true,
        default: "",
      },
      isWebview: {
        type: Boolean,
        required: false,
        default: false,
      },
      linkToken: { type: String, required: true },
      publicKey: {
        type: String,
        required: false,
        default: "",
      },
      // products: { type: [] as PropType<Array<string>>, required: true },
      receivedRedirectUri: {
        type: (null as unknown) as PropType<string | null>,
        required: false,
        default: null,
      },
      webhook: {
        type: String,
        required: false,
        default: "",
      },
      onLoad: {
        type: Function,
        required: false,
        default: null,
      },
      onSuccess: { type: Function, default: null },
      onExit: {
        type: Function,
        required: false,
        default: null,
      },
      onEvent: {
        type: Function,
        required: false,
        default: null,
      },
    },

    setup(props) {
      interface LinkHandler{
        open: () => void,
        destroy: () => void
      }

      interface Plaid{
        create: (PlaidPayload: PlaidPayload) => LinkHandler,
      }

      interface PlaidPayload{
        clientName: string,
        env: string,
        key: string,
        receivedRedirectUri: string | null,
        token: string,
        webhook: string,
        onLoad: () => void,
        onSuccess: (public_token: string, metadata: string) => void,
        onExit: (err: string, metadata: string) => void,
        onEvent: (eventName: string, metadata: string) => void,
      }

      const state = reactive<{ plaid: null | Plaid; linkHandler: null | LinkHandler }>({
        plaid: null,
        linkHandler: null,
      });

      function link_open(e: Event) {
        e.preventDefault();
        if (state.plaid != null) {
          if (state.linkHandler != null) {
            state.linkHandler.destroy();
            state.linkHandler = null;
          }

          state.linkHandler = state.plaid.create({
            clientName: props.clientName,
            env: props.env,
            key: props.publicKey,
            receivedRedirectUri: props.receivedRedirectUri,
            token: props.linkToken,
            webhook: props.webhook,
            onLoad: function () {
              props.onLoad();
            },

            onSuccess: function (public_token: string, metadata: string) {
              props.onSuccess(public_token, metadata);
            },

            onExit: function (err: string, metadata: string) {
              if (err != null) {
                // The user encountered a Plaid API error prior to exiting.
              }
              props.onExit(err, metadata);
            },

            onEvent: function (eventName: string, metadata: string) {
              props.onEvent(eventName, metadata);
            },
          });
          if (state.linkHandler != null) {
            state.linkHandler.open();
          }
        }
      }

      onMounted(() => {
        let linkScript = document.createElement("script");
        linkScript.async = true;
        linkScript.setAttribute(
          "src",
          "https://cdn.plaid.com/link/v2/stable/link-initialize.js"
        );
        document.head.appendChild(linkScript);
        linkScript.onload = () => {
          state.plaid = ((window as unknown) as { Plaid: Plaid }).Plaid;
        };
      });
      return { link_open };
    },
  });
</script>
