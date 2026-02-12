import React from "react";
import * as teamsJs from "@microsoft/teams-js";
import MobileLayout from "../Components/MobileLayout/MobileLayout";

import "./App.css";

export default function App() {
  const [content, setContent] = React.useState("");
  console.log("App component rendered", content);

  React.useEffect(() => {
    (async () => {
      teamsJs.app.initialize().then(() => {
        teamsJs.app.getContext().then((context: teamsJs.app.Context) => {
          if (context?.app?.host?.name) {
            setContent(`Your app is running in ${context.app.host.name}`);
          }
        });
      });
    })();
  }, []);

  return (
    <div className="App">
      <MobileLayout />
    </div>
  );
}
