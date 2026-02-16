import React, { useState } from "react";
import "./MobileLayout.css";
import BottomNav from "../BottomNav/BottomNav";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import TodayJobs from "../TodayJobs/TodayJobs";

const MobileLayout: React.FC = ({}: any) => {
  const [tabName, setTabName] = useState("home");
  return (
    <div className="mobile-wrapper">
      {tabName === "home" && (
        <ProfileHeader
          name="Fateha Nil"
          location="Dubai, Marina, UAE"
          image="https://randomuser.me/api/portraits/women/44.jpg"
        />
      )}
      {tabName === "Today Jobs" && <TodayJobs />}

      <BottomNav tabName={tabName} setTabName={setTabName} />
    </div>
  );
};

export default MobileLayout;
