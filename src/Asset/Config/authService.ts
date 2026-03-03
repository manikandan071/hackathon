// import { msalInstance } from "./authConfig";
import {
  AuthenticationResult,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";

const getAccessToken1 = async (
  msalInstance: any,
  resource?: string,
): Promise<string | null> => {
  try {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      console.error("No accounts found when trying to get access token");
      return null;
    }

    // Default to Graph API if no resource specified
    const tokenScopes = resource
      ? [`https://graph.microsoft.com/.default`]
      : ["https://graph.microsoft.com/.default"];

    console.log(
      `Acquiring token silently for account: ${accounts[0].username}, resource: ${resource || "graph"}`,
    );
    const tokenRequest = {
      scopes: tokenScopes,
      account: accounts[0],
    };

    const tokenResponse = await msalInstance.acquireTokenSilent(tokenRequest);
    console.log(
      "Token acquired successfully for resource:",
      resource || "graph",
    );

    console.log("Token response:", tokenResponse);

    return tokenResponse.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      console.log(
        `Silent token acquisition failed for resource: ${resource || "graph"}, trying popup`,
      );

      try {
        // If silent acquisition fails, try popup
        const tokenScopes = resource
          ? [`${resource}/.default`]
          : ["https://graph.microsoft.com/.default"];

        const tokenResponse = await msalInstance.acquireTokenPopup({
          scopes: tokenScopes,
        });
        console.log(
          "Token acquired with popup for resource:",
          resource || "graph",
        );
        return tokenResponse.accessToken;
      } catch (fallbackError) {
        console.error(
          `Failed to get access token with popup for resource: ${resource || "graph"}`,
          fallbackError,
        );
        return null;
      }
    } else {
      console.error(
        `Failed to get access token for resource: ${resource || "graph"}`,
        error,
      );
      return null;
    }
  }
};

const login = async (msalInstance: any): Promise<string | null> => {
  try {
    const loginRequest = {
      scopes: [],
    };
    // const response: AuthenticationResult =
    //   await msalInstance.loginPopup(loginRequest);
    const response: AuthenticationResult =
      await msalInstance.acquireTokenPopup(loginRequest);
    if (response) {
      console.log("Login successful:", response);
      msalInstance.setActiveAccount(response.account);
      const token = getAccessToken1(msalInstance);
      return token;
    }
    return null;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const getAccessToken = async (msalInstance: any) => {
  await msalInstance.handleRedirectPromise();
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    console.log("Login successful:", accounts);
    msalInstance.setActiveAccount(accounts[0]);
    const token = getAccessToken1(msalInstance);
    return token;
  } else {
    const token = login(msalInstance);
    return token;
  }
};
