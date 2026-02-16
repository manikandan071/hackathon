import React from "react";
import "./Performance.css";
import {
  StarFilled,
  ToolOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  BuildOutlined,
} from "@ant-design/icons";

const Performance = () => {
  const stats = {
    jobsCompleted: 24,
    rating: 4,
  };

  const activities = [
    {
      id: 1,
      title: "AC Repair",
      status: "Completed",
      time: "2h ago",
      icon: <ToolOutlined />,
      color: "green",
    },
    {
      id: 2,
      title: "Plumbing Check",
      status: "In Progress",
      icon: <ToolOutlined />,
      color: "orange",
    },
    {
      id: 3,
      title: "Cleaning",
      status: "Completed",
      time: "1 month ago",
      icon: <BuildOutlined />,
      color: "green",
    },
    {
      id: 4,
      title: "Plumbing Check",
      status: "In Progress",
      icon: <ToolOutlined />,
      color: "orange",
    },
    {
      id: 5,
      title: "AC Repair",
      status: "Completed",
      time: "2h ago",
      icon: <ToolOutlined />,
      color: "green",
    },
    {
      id: 6,
      title: "Plumbing Check",
      status: "Cancelled",
      icon: <ToolOutlined />,
      color: "red",
    },
  ];
  return (
    <div className="performance-container">
      <h1 className="performance-title">Performance</h1>
      <p className="performance-subtitle">This week’s status</p>

      <div className="stats-container">
        <div className="stat-card">
          <h2 className="stat-number green">{stats.jobsCompleted}</h2>
          <p className="stat-label">Job Completed</p>
          <p className="stat-growth">+12%</p>
        </div>

        <div className="stat-card">
          <div className="rating-stars">
            {[...Array(4)].map((_, i) => (
              <StarFilled key={i} />
            ))}
            <StarFilled className="star-muted" />
          </div>
          <p className="stat-label">Avg. rating (4)</p>
          <p className="stat-excellent">Excellent</p>
        </div>
      </div>

      <h2 className="activity-title">Recent Activity</h2>

      <div className="activity-list">
        {activities.map((item) => (
          <div key={item.id} className="activity-card">
            <div className="activity-left">
              <div className={`activity-icon ${item.color}`}>{item.icon}</div>
              <div>
                <p className="activity-name">{item.title}</p>
                <p className="activity-status">
                  {item.status} {item.time && `• ${item.time}`}
                </p>
              </div>
            </div>

            <div>
              {item.status === "Completed" && (
                <CheckCircleFilled className="status-green" />
              )}
              {item.status === "In Progress" && (
                <ClockCircleOutlined className="status-orange" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Performance;
