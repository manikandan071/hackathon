import React from "react";
import "./MobileLayout.css";
import App from "../NewApp/NewApp";
// import BottomNav from "../BottomNav/BottomNav";
// import TodayJobs from "../TodayJobs/TodayJobs";
// import Performance from "../Performance/Performance";
// import HomePage from "../HomePage/HomePage";

const MobileLayout: React.FC = ({}: any) => {
  // const [tabName, setTabName] = useState("home");
  return (
    <div className="mobile-wrapper">
      {/* {tabName === "home" && <HomePage />}
      {tabName === "Today Jobs" && <TodayJobs />}
      {tabName == "trophy" && <Performance />}
      <BottomNav tabName={tabName} setTabName={setTabName} /> */}
      <App />
    </div>
  );
};

export default MobileLayout;
