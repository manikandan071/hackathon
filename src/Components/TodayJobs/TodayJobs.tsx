import React from "react";
import PageHeader from "../PageHeader/PageHeader";
import { SearchOutlined } from "@ant-design/icons";
import "./TodayJobs.css";

const TodayJobs: React.FC = () => {
  return (
    <div className="today-job-wrapper">
      <PageHeader title="Today's Jobs" showBack={true} />
      <div>
        <div className="card">
          <div className="cardHeader">
            <div>
              <div className="date">12 July 2023</div>
            </div>
          </div>

          <div className="cardBody">
            {/* Left Section */}
            <div className="leftSection">
              <div className="bigNumber">54</div>
              <div className="statusText">Overall</div>

              <div className="progressBar">
                <div className="progressFill"></div>
              </div>
            </div>

            {/* Right Section */}
            <div className="rightSection">
              <div className="statBox">
                <span>Not Started</span>
                <strong style={{ letterSpacing: "1px" }}>33</strong>
              </div>
              <div className="statBox">
                <span>In Progress</span>
                <strong style={{ letterSpacing: "1px" }}>20</strong>
              </div>
              <div className="statBox">
                <span>Completed</span>
                <strong style={{ letterSpacing: "1px" }}>80</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Bottom Controls */}
        <div className="bottomActions">
          <div className="searchBox">
            <SearchOutlined />

            <input placeholder="Find task" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayJobs;
