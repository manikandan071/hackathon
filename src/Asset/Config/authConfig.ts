// src/authConfig.ts
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "8d876036-c3cf-4739-89b1-3e98fd2cb857",
    authority:
      "https://login.microsoftonline.com/3e8e53be-a48f-4147-adf8-7e90a6e46b57",
    redirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
