import { defineStore } from "pinia";

import api from "./api/api";
import { createEmptyUser } from "./api/modules/user";
import type { MyAuctionsTabOption } from "./api/modules/register";
import type { Lot } from "./api/lot";
import type { User } from "./api/user";
import type { BillingDetails, BillingPayload, CardData } from "./api/circle";
import type { UserEmail } from "./api/userEmail";
import type { BankPayment, CardPayment } from "./api/payments";
import type { CurrentBarrel } from "./api/barrel";
import type { MintedBarrelToken } from "./api/modules/barrel";


/** used for interface settings */
interface Settings {
  profile: {
    myAuctionsTab: MyAuctionsTabOption;
  };
}

export interface State {
  userEmail: UserEmail;
  user: User;
  lots: Lot[];
  settings: Settings;
  circlePublicKey: string;
  plaidToken: string;
  bankAccount: BankPayment
  cardData: CardData;
  billingActivation: BillingPayload;
  publicKey: string
  paymentMethods: CardPayment[]
  barrel: CurrentBarrel[],
  barrelToken: MintedBarrelToken
  barrelStatus: string
}

export const useStore = defineStore({
  id: "main",

  state(): State {
    return {
      userEmail: { sso: false, email: "" },
      // user: { userId: "beeba440-ffab-11eb-b995-7bd1268c2648", email: "", phone: "", fullName: "", displayName: "Logan", shippingAddress: { line1: "", line2: "", city: "", district: "", postalCode: "", country: "" }, watchList: [], barrels: [] }, // Logan
      // user: { userId: "aed45c92-36be-11ec-9b35-e39b6bc739b0", email: "", phone: "", fullName: "", displayName: "Jared", shippingAddress: { line1: "", line2: "", city: "", district: "", postalCode: "", country: "" }, watchList: [], barrels: [] }, // Jared
      // user: { userId: "1701d7d6-076c-11ec-97bb-93401e32c3ca", email: "", phone: "", fullName: "", displayName: "Austin", shippingAddress: { line1: "", line2: "", city: "", district: "", postalCode: "", country: "" }, watchList: [], barrels: [] }, // Austin
      // user: { userId: "6c4df26e-2702-11ec-9006-2706cc957012", email: "", phone: "", fullName: "", displayName: "Danielle", shippingAddress: { line1: "", line2: "", city: "", district: "", postalCode: "", country: "" }, watchList: [], barrels: [] }, // Danielle
      user: createEmptyUser(), // Blank
      lots: [],
      settings: {
        profile: {
          myAuctionsTab: "",
        },
      },
      circlePublicKey: "",
      cardData: {
        number: "",
        cvv: "",
      },
      billingActivation: {
        encryptedData: "",
        expMonth: null,
        expYear: null,
        keyId: "",

        saveCard: false,

        billingDetails: {
          name: "",
          line1: "",
          line2: "",
          city: "",
          district: "",
          country: "",
          postalCode: "",
        },
      },
      publicKey: "",
      paymentMethods: [{type: "",
        cardId: "",
        network: "",
        last4: "",
        expMonth: null,
        expYear:  null,
        createdAt: "",
        updatedAt: null,
        bankAccountId: "", 
        institutionName: "", 
        redactedAccountNumber: ""
      }],
      plaidToken: "",
      bankAccount: {  publicToken: "", accountId: "", billingDetails:{ name: "", line1: "", line2: "", city: "", district: "", country: "", postalCode: ""
    }},
    barrel: [{barrelId: "", userId: "", userFullName: "", title: "", status: "", createdAt: "", updatedAt: ""}],
    barrelToken: {mintedBarrelId: ""},
    barrelStatus: ""

    };
  },

  getters: {},
  actions: {
    setPublicKey(publicKey: string): void {
      this.publicKey = publicKey;
    },
    
    async getUserEmail(): Promise<UserEmail> {
      try {
        this.userEmail = await api.getUser().then((res) => {
          return this.userEmail = res;
        });
      } catch (e) {
        console.log(e);
        throw e;
      }
      return this.userEmail;
    },

    async logout(): Promise<void> {
      await api.logout().then(() => {
        this.user = createEmptyUser();
      }).catch((error) => {
        this.user = createEmptyUser();
        console.log("error: ", error)
      });
    },

    async getCurrentUser(): Promise<User> {
      const user = await api.getCurrentUser();
      return (this.user = user);
    },

    getLot: (lotNumber: number) => api.getLot(lotNumber),
    // getBarrel: (lotNumber: string) => api.getBarrel(lotNumber),

    getLots: () => api.getLots(),
    // getBarrels: () => api.getBarrels(),

    updateBilling(billingInformation: {
      cardData: CardData;
      encryptedCardData: string;
      billingDetails: BillingDetails;
      expirationDatePair: number[];
    }): void {
      this.cardData = billingInformation.cardData;
      this.billingActivation.encryptedData =
        billingInformation.encryptedCardData;
      this.billingActivation.billingDetails = billingInformation.billingDetails;
      this.billingActivation.expMonth =
        billingInformation.expirationDatePair[0];
      this.billingActivation.expYear = billingInformation.expirationDatePair[1];
    },

    updateKeyId(keyId: string): void {
      this.billingActivation.keyId = keyId;
    },

    updateCirclePublicKey(publicKey: string): void {
      this.circlePublicKey = publicKey;
    },

    getKeyId(): string {
      return this.billingActivation.keyId;
    },

    async getPaymentMethods(): Promise<CardPayment[]> {
      this.paymentMethods = await api.getPaymentMethods();
      return this.paymentMethods;
    },

    async getPlaidUserToken(): Promise<string> {
      const plaidToken = await api.getPlaidToken();
      return (this.plaidToken = plaidToken);
    },

    async getBarrels(): Promise<CurrentBarrel[]> {
      const allBarrels = await api.getBarrel()
      return (this.barrel = allBarrels.barrels)
    },

    async getUserById(id: string): Promise<User> {
      const userInfo = await api.getUserById(id)
      return (this.user = userInfo)
    },

  },
});

export default { useStore };
