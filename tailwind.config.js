/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require("@tailwindcss/forms");

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    fontFamily: {
      source: ["Source Sans Pro", "sans-serif"],
      serif: ["PT Serif", "serif"],
    },
    colors: {
      white: "#fff",
      transparent: "transparent",
      black: "#000",
      blackPanther: "#414141",
      americanSilver: "#cecece",
      flintPurple: "#41404A",
      pastelYellow: "#FDFF90",
      lunarRock: "#C5C5C5",
      bloodmystIsle: "#f02723",
      planetOfTheApes: "#812B2B",
      eyeOfNewt: "#ae3d3b",
      speedOfLight: "#F6F4F0",
      cloudDancer: "#F0EDE8",
      irishGreen: "#25A131",
      persianRed: "#cc3333",
      unicornSilver: "#e7e7e7",
      lead: "#202121",
      blue: "#2B6FC0",
      grayOrange: "#EBE9E4",
      scarabaeusSacer: "#404040",
      strongEnvy: "#742727",
      sepiaRose: "#D4B8B5",
      whiteSmoke: "#F5F6F7",
      miyamotoRed: "#E10C0C",
      vampireStateBuilding: "#CC0E00",
      pamperedPrincess: "#F3EAEA",
      lavaPit: "#E17132",
      wildPrimrose: "#F2E19D",
      mountainMint: "#AAE3C0",
      loveSpell: "#FAB6C4",
      purpleIllusion: "#B2BBFA",
      coralBisque: "#FAC9B5",
      superSilver: "#EFEFEF",
      lilacSuede: "#BA9b97",
      deliriousDonkey: "#ddcccc",
      magneticGray: "#EEF3F5",
      trolleyGray: "#828282"
    },
    extend: {
      fontSize: {
        tiny: ".6rem",
      },
      backgroundImage: {
        subscribeBanner: "url('./src/assets/subscribe_banner.png')",
        granite: "url('./src/assets/walletbg.png')",
        graniteTransparent: "url('./src/assets/wood-grain.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [forms],
};
