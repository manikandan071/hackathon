import React from "react";
import "./BottomNav.css";
import {
  HomeOutlined,
  LineChartOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
export interface IBottomNavProps {
  tabName: string;
  setTabName: (tabName: string) => void;
}
const BottomNav: React.FC<IBottomNavProps> = ({ tabName, setTabName }) => {
  return (
    <div className="bottom-nav-wrapper">
      <div className="bottom-nav-container">
        <div
          className={`${tabName === "home" ? "nav-item active" : "nav-item"}`}
          onClick={() => setTabName("home")}
        >
          <HomeOutlined />
        </div>
        <div
          className={`${tabName === "analytics" ? "nav-item active" : "nav-item"}`}
          onClick={() => setTabName("analytics")}
        >
          <LineChartOutlined />
        </div>
        <div
          className={`${tabName === "trophy" ? "nav-item active" : "nav-item"}`}
          onClick={() => setTabName("trophy")}
        >
          <TrophyOutlined />
        </div>
        <div
          className={`${tabName === "profile" ? "nav-item active" : "nav-item"}`}
          onClick={() => setTabName("profile")}
        >
          <UserOutlined />
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
