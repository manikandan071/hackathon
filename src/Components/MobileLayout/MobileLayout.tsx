import React, { useState } from "react";
import "./MobileLayout.css";
import BottomNav from "../BottomNav/BottomNav";

const MobileLayout: React.FC = ({}: any) => {
  const [tabName, setTabName] = useState("home");
  return (
    <div className="mobile-wrapper">
      <div>{tabName}</div>
      <BottomNav tabName={tabName} setTabName={setTabName} />
    </div>
  );
};

export default MobileLayout;
