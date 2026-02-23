import React from "react";
// import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

import { WEEKLY_PERFORMANCE } from "../../constants";
import { TrendingUp, Award, Zap, Medal } from "lucide-react";
import "./PerformanceView.css";

const PerformanceView: React.FC = () => {
  const ratingData = [
    { name: "Excellent", value: 65, color: "#5B5FC7" },
    { name: "Good", value: 25, color: "#8a8886" },
    { name: "Average", value: 10, color: "#F5A623" },
  ];

  return (
    <div className="performance-container">
      <div className="performance-header">
        <h2>Performance Insights</h2>
        <p>Analytics driven by your service excellence</p>
      </div>

      {/* Hero Stats */}
      <div className="hero-card">
        <div>
          <p className="hero-label">Weekly Efficiency</p>
          <h3 className="hero-value">94.8%</h3>
          <p className="hero-trend">
            <TrendingUp size={12} /> +4.2% from last week
          </p>
        </div>
        <div className="hero-icon">
          <Zap size={40} color="#fde047" fill="#fde047" />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card">
        <div className="card-header">
          <h3>Completed Jobs</h3>
          <div className="icon-box">
            <Medal size={16} />
          </div>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_PERFORMANCE}>
              <CartesianGrid vertical={false} stroke="#f1f1f1" />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8a8886", fontSize: 11, fontWeight: 700 }}
              />
              <Tooltip />
              <Bar dataKey="completed" radius={[12, 12, 12, 12]} barSize={28}>
                {WEEKLY_PERFORMANCE.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.completed > 5 ? "#5B5FC7" : "#e1dfdd"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Pie Chart */}
      <div className="card">
        <h3 className="cus-card-title">Customer Sentiments</h3>
        <div className="pie-wrapper">
          <div className="pie-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratingData}
                  innerRadius={38}
                  outerRadius={52}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {ratingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="legend">
            {ratingData.map((item) => (
              <div key={item.name} className="legend-item">
                <div
                  className="legend-dot"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Achievement Card */}
      <div
        // whileHover={{ scale: 1.01 }}
        className="card achievement-card"
      >
        <div className="achievement-header">
          <div className="achievement-icon">
            <Award size={28} />
          </div>
          <div>
            <h3>Expert Level</h3>
            <p>Master Technician Track</p>
          </div>
        </div>
        <div className="progress-section">
          <div className="progress-label">
            <span>Progression</span>
            <span className="xp">750 / 1000 XP</span>
          </div>
          <div className="progress-bar">
            <div
              //   initial={{ width: 0 }}
              //   animate={{ width: "75%" }}
              //   transition={{ duration: 1.5 }}
              className="progress-fill"
            />
          </div>
        </div>

        <p className="achievement-text">
          You're in the <span>top 5%</span> of technicians this month. Keep it
          up!
        </p>
      </div>
    </div>
  );
};

export default PerformanceView;
