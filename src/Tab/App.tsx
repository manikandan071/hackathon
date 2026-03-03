import React, { useEffect } from "react";
import * as teamsJs from "@microsoft/teams-js";
import { HashRouter } from "react-router-dom";
import MobileLayout from "../Components/MobileLayout/MobileLayout";
import "../Asset/css/font.css";
import "./App.css";

// import { PublicClientApplication } from "@azure/msal-browser";

// import { getAccessToken } from "../Asset/Config/authService";

export default function App() {
  const [content, setContent] = React.useState("");
  console.log("App component rendered", content);

  // const msalConfig = {
  //   auth: {
  //     clientId: "8d876036-c3cf-4739-89b1-3e98fd2cb857",
  //     authority:
  //       "https://login.microsoftonline.com/3e8e53be-a48f-4147-adf8-7e90a6e46b57",
  //     redirectUri: "/", // ✅ Important
  //   },
  //   cache: {
  //     cacheLocation: "sessionStorage", // important in Teams
  //     storeAuthStateInCookie: false,
  //   },
  // };

  // const msalInstance = new PublicClientApplication(msalConfig);

  // (async () => {
  //   await msalInstance.initialize();
  // })();

  // const getAccessToken = async () => {
  //   const accounts = msalInstance.getAllAccounts();
  //   if (accounts.length > 0) {
  //     console.log("Login successful:", accounts);
  //     msalInstance.setActiveAccount(accounts[0]);
  //     const token = getAccessToken1();
  //     return token;
  //   } else {
  //     const token = login();
  //     return token;
  //   }
  // };

  // const login = async (): Promise<string | null> => {
  //   try {
  //     const loginRequest = {
  //       scopes: [],
  //     };
  //     const response: AuthenticationResult =
  //       await msalInstance.loginPopup(loginRequest);

  //     if (response) {
  //       console.log("Login successful:", response);
  //       msalInstance.setActiveAccount(response.account);
  //       const token = getAccessToken1();
  //       return token;
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     throw error;
  //   }
  // };

  // const getAccessToken1 = async (resource?: string): Promise<string | null> => {
  //   try {
  //     const accounts = msalInstance.getAllAccounts();
  //     if (accounts.length === 0) {
  //       console.error("No accounts found when trying to get access token");
  //       return null;
  //     }

  //     // Default to Graph API if no resource specified
  //     const tokenScopes = resource
  //       ? [`https://graph.microsoft.com/.default`]
  //       : ["https://graph.microsoft.com/.default"];

  //     console.log(
  //       `Acquiring token silently for account: ${accounts[0].username}, resource: ${resource || "graph"}`,
  //     );
  //     const tokenRequest = {
  //       scopes: tokenScopes,
  //       account: accounts[0],
  //     };

  //     const tokenResponse = await msalInstance.acquireTokenSilent(tokenRequest);
  //     console.log(
  //       "Token acquired successfully for resource:",
  //       resource || "graph",
  //     );

  //     console.log("Token response:", tokenResponse);

  //     return tokenResponse.accessToken;
  //   } catch (error) {
  //     if (error instanceof InteractionRequiredAuthError) {
  //       console.log(
  //         `Silent token acquisition failed for resource: ${resource || "graph"}, trying popup`,
  //       );

  //       try {
  //         // If silent acquisition fails, try popup
  //         const tokenScopes = resource
  //           ? [`${resource}/.default`]
  //           : ["https://graph.microsoft.com/.default"];

  //         const tokenResponse = await msalInstance.acquireTokenPopup({
  //           scopes: tokenScopes,
  //         });
  //         console.log(
  //           "Token acquired with popup for resource:",
  //           resource || "graph",
  //         );
  //         return tokenResponse.accessToken;
  //       } catch (fallbackError) {
  //         console.error(
  //           `Failed to get access token with popup for resource: ${resource || "graph"}`,
  //           fallbackError,
  //         );
  //         return null;
  //       }
  //     } else {
  //       console.error(
  //         `Failed to get access token for resource: ${resource || "graph"}`,
  //         error,
  //       );
  //       return null;
  //     }
  //   }
  // };

  // const response = await msalInstance.acquireTokenSilent({
  //   scopes: ["Sites.Read.All"],
  //   account: msalInstance.getAllAccounts()[0],
  // });

  // return response.accessToken;

  useEffect(() => {
    // (async () => {
    //   const accessToken = await getAccessToken(msalInstance);
    //   console.log("Access Token:", accessToken);
    // })();

    (async () => {
      teamsJs.app.initialize().then(async () => {
        teamsJs.app.getContext().then((context: teamsJs.app.Context) => {
          console.log("Context", context);
          if (context?.app?.host?.name) {
            setContent(`Your app is running in ${context.app.host.name}`);
          }
        });
      });
    })();
  }, []);

  return (
    <HashRouter>
      <div className="App">
        <MobileLayout />
      </div>
    </HashRouter>
  );
}
