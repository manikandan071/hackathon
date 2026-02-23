import React from "react";
import "./MobileLayout.css";
import App from "../NewApp/NewApp";

const MobileLayout: React.FC = ({}: any) => {
  // const [tabName, setTabName] = useState("home");
  return (
    <div className="mobile-wrapper">
      <App />
    </div>
  );
};

export default MobileLayout;
