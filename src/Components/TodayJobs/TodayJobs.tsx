import React, { useState } from "react";
import PageHeader from "../PageHeader/PageHeader";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import "./TodayJobs.css";

const TodayJobs: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return "0h 0m";

    const startDate = new Date(`2026-02-16 ${start}`);
    const endDate = new Date(`2026-02-16 ${end}`);

    const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours}h ${minutes}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "#999";
      case "In Progress":
        return "#4361ee";
      case "Completed":
        return "#588157";
      default:
        return "#999";
    }
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#bc6c25";
      case "Medium":
        return "#d4d700";
      case "Low":
        return "#2d6a4f";
      default:
        return "#999";
    }
  };
  const getWaveColors = (priority: string) => {
    switch (priority) {
      case "High":
        return ["#e28080", "#e95555", "#ef2b2b", "#cd0000"]; // Red shades

      case "Medium":
        return ["#fde68a", "#ffe97f", "#ffe14c", "#ffd819"]; // Orange shades

      case "Low":
        return ["#d8f3dc", "#95d5b2", "#52b788", "#40916c"]; // Green shades

      default:
        return ["#d0bfff", "#a78bfa", "#8b5cf6", "#6d28d9"]; // Purple shades
    }
  };
  let todayJobs = [
    {
      id: 1,
      title: "Design Homepage",
      status: "Not Started",
      startDate: "16/02/2026",
      startTime: "",
      endTime: "",
      client: "John Doe",
      priority: "High",
    },
    {
      id: 2,
      title: "Design Homepage",
      status: "In Progress",
      startDate: "16/02/2026",
      startTime: "2:00 PM",
      endTime: "",
      client: "John Doe",
      priority: "Low",
    },
    {
      id: 3,
      title: "Design Homepage",
      status: "Completed",
      startDate: "16/02/2026",
      startTime: "2:00 PM",
      endTime: "3:45 PM",
      client: "John Doe",
      priority: "Medium",
    },
  ];
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
        <div style={{ paddingTop: "15px" }}>
          {todayJobs.map((job) => {
            const isExpanded = expandedId === job.id;
            const waveColors = getWaveColors(job.priority);

            return (
              <div
                key={job.id}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "10px 15px",
                  marginBottom: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  position: "relative",
                  overflow: "hidden", // important for wave
                  transition: "0.3s",
                  border: isExpanded
                    ? "1px solid #958eef"
                    : "1px solid #e0dfed",
                }}
              >
                {/* ===== Corner Wave ===== */}
                {/* <svg
                  viewBox="0 0 450 350"
                  preserveAspectRatio="none"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: "-65px",
                    width: "230px",
                    height: "220px",
                    pointerEvents: "none",
                    opacity: 0.5,
                    transform: "rotate(-90deg)",
                  }}
                >
                  <path
                    d="M500 0 C420 0 360 60 360 140 C360 220 300 260 240 260 L500 260 Z"
                    fill={waveColors[0]}
                  />
                  <path
                    d="M500 0 C440 0 380 80 380 150 C380 230 320 270 260 270 L500 270 Z"
                    fill={waveColors[1]}
                  />
                  <path
                    d="M500 0 C460 0 400 100 400 170 C400 240 340 280 280 280 L500 280 Z"
                    fill={waveColors[2]}
                  />
                  <path
                    d="M500 0 C480 0 420 120 420 190 C420 250 360 300 300 300 L500 300 Z"
                    fill={waveColors[3]}
                  />
                </svg> */}
                <svg
                  width="200"
                  height="150"
                  viewBox="0 0 200 150"
                  style={{
                    position: "absolute",
                    top: "-28px",
                    right: "-60px",
                    width: "240px",
                    height: "130px",
                    pointerEvents: "none",
                    // transform: "rotate(-90deg)",
                  }}
                >
                  <circle
                    cx="55"
                    cy="110"
                    r="10"
                    fill={waveColors[0]}
                    opacity={0.2}
                  />

                  {/* Light Pink Circle (Back Left) */}
                  <circle
                    cx="80"
                    cy="70"
                    r="20"
                    fill={waveColors[1]}
                    opacity={0.2}
                  />

                  {/* Bottom Pink Circle */}
                  <circle
                    cx="110"
                    cy="95"
                    r="30"
                    fill={waveColors[2]}
                    opacity={0.2}
                  />

                  {/* Dark Top Circle */}
                  <circle
                    cx="130"
                    cy="55"
                    r="45"
                    fill={waveColors[3]}
                    opacity={0.2}
                  />
                  {/* <text
                    x="65%"
                    y="40%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                    letterSpacing={0.7}
                    fill={getPriorityColor(job.priority)}
                  >
                    {job.priority}
                  </text> */}
                </svg>

                {/* ===== Header Section ===== */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "8px",
                      margin: "6px 0px",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "50px",
                        background: getStatusColor(job.status),
                        color: "#fff",
                        fontSize: "10px",
                      }}
                    >
                      {job.status}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: getPriorityColor(job.priority),
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                      }}
                    >
                      {job.priority}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#3c186b",
                    }}
                  >
                    {job.title}
                  </span>

                  <p
                    style={{ margin: "4px 0", color: "#666", fontSize: "12px" }}
                  >
                    {job.client}
                  </p>
                </div>

                {/* ===== Expanded Section ===== */}
                {isExpanded && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "7px",
                    }}
                  >
                    <div>
                      <p style={{ margin: "-5px 0px", fontSize: "13px" }}>
                        {job.startTime ? job.startTime : "--:--"}
                      </p>
                      <span style={{ fontSize: "11px", color: "#666" }}>
                        Start
                      </span>
                    </div>

                    <div>
                      <span
                        style={{
                          fontSize: "13px",
                          padding: "5px 10px",
                          borderRadius: "10px",
                          background: "#ecdddd",
                        }}
                      >
                        {calculateDuration(job.startTime, job.endTime)}
                      </span>
                    </div>

                    <div>
                      <p style={{ margin: "-5px 0px", fontSize: "13px" }}>
                        {job.endTime ? job.endTime : "--:--"}
                      </p>
                      <span style={{ fontSize: "11px", color: "#666" }}>
                        End
                      </span>
                    </div>
                  </div>
                )}

                {/* ===== Buttons ===== */}
                <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
                  {job.status === "Not Started" && (
                    <>
                      {/* <button className="primaryBtn">Start</button> */}
                      <Button
                        color="default"
                        variant="filled"
                        size="small"
                        className="startBtn"
                      >
                        Start
                      </Button>
                      <Button
                        color="default"
                        variant="outlined"
                        size="small"
                        className="rescheduleBtn"
                      >
                        Reschedule
                      </Button>
                    </>
                  )}
                  {job.status === "In Progress" && (
                    <Button
                      color="default"
                      variant="outlined"
                      size="small"
                      className="completeBtn"
                    >
                      Complete
                    </Button>
                  )}

                  {job.status === "Completed" && (
                    <a
                      href="#"
                      style={{
                        color: "#1890ff",
                        textDecoration: "none",
                        fontSize: "11px",
                      }}
                    >
                      Feedback →
                    </a>
                  )}
                </div>

                {/* ===== Expand / Collapse Icon ===== */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => setExpandedId(isExpanded ? null : job.id)}
                >
                  {isExpanded ? (
                    <ArrowDownOutlined
                      rotate={-230}
                      style={{ color: "#f29d2ec2" }}
                    />
                  ) : (
                    <ArrowUpOutlined
                      rotate={-230}
                      style={{ color: "#f29d2ec2" }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodayJobs;
