// StatusCard.jsx
import React from "react";
import "./StatusCard.css";

interface StatusCardData {
  title: string;
  startDate: string;
  endDate: string;
  completed: number;
  total: number;
  rating: number;
  status: string;
}

const StatusCard = ({ data }: { data: StatusCardData }) => {
  const percentage = Math.round((data.completed / data.total) * 100);
  const radius = 30; // smaller radius
  const stroke = 6; // thickness
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  return (
    <div className="Status-card">
      <div className="card-header">
        <h3>{data.title}</h3>
        <p>
          {data.startDate} to {data.endDate}
        </p>
      </div>
      <div className="card-body">
        <div style={{ width: "45%" }}>
          <h1>
            {data.completed}
            <span>/{data.total}</span>
          </h1>
          <p className="completed-text">Completed</p>
        </div>

        <div className="circle" style={{ width: "25%" }}>
          <svg width="60" height="60">
            {/* Background Circle */}
            <circle
              cx="30"
              cy="30"
              r={normalizedRadius}
              stroke="#d6d6d6"
              strokeWidth={stroke}
              fill="none"
            />

            {/* Progress Circle */}
            <circle
              cx="30"
              cy="30"
              r={normalizedRadius}
              stroke="#f29d2e"
              strokeWidth={stroke}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - (percentage / 100) * circumference
              }
              strokeLinecap="round"
              transform="rotate(-90 30 30)"
            />

            {/* Percentage Text */}
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#f29d2e"
            >
              {percentage}%
            </text>
          </svg>
        </div>
        <div style={{ width: "30%", textAlign: "end" }}>
          <div className="rating">⭐ {data.rating}</div>
          <div className="status-text">{data.status}</div>
        </div>
      </div>

      {/* <div className="card-footer">
        <div className="rating">⭐ {data.rating}</div>
        <div className="status-text">{data.status}</div>
      </div> */}
    </div>
  );
};

export default StatusCard;
