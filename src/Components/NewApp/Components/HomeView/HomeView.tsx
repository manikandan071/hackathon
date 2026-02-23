import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MOCK_ACTIVITIES } from "../../constants";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
  Power,
  Activity,
  Trophy,
} from "lucide-react";

import "./HomeView.css";

interface HomeViewProps {
  onViewAllActivities: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onViewAllActivities }) => {
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [clockInTime, setClockInTime] = useState<Date | null>(
    new Date(new Date().setHours(8, 42, 0)),
  );
  const [elapsed, setElapsed] = useState("00:00:00");

  useEffect(() => {
    let interval: number;

    if (isClockedIn && clockInTime) {
      interval = window.setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - clockInTime.getTime();

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setElapsed(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
        );
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isClockedIn, clockInTime]);

  const handleToggleClock = () => {
    if (isClockedIn) {
      setIsClockedIn(false);
      setClockInTime(null);
    } else {
      setIsClockedIn(true);
      setClockInTime(new Date());
    }
  };

  return (
    <div className="home-container">
      {/* Premium Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-banner"
      >
        <div className="banner-content">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="badge"
          >
            <Zap size={10} color="#fde047" fill="currentColor" />
            Duty Active
          </motion.div>

          <h2 className="banner-title">
            Good shift,
            <br />
            <span>Henderson.</span>
          </h2>

          <p className="banner-subtitle">
            You have 5 high-priority tickets today.
          </p>

          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="primary-button"
          >
            Go to Tasks
            <ArrowRight size={16} />
          </motion.button>
        </div>
        <motion.div
          animate={{ y: [0, -50, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="banner-image"
        >
          <img src="https://img.icons8.com/clouds/200/wrench.png" alt="Asset" />
        </motion.div>
      </motion.div>

      {/* Quick Stats */}
      {/* <div className="stats-grid">
        <div className="premium-card">
          <div className="stat-icon indigo">
            <Clock size={24} />
          </div>
          <div>
            <p className="stat-value">09:12</p>
            <p className="stat-label">Shift Time</p>
          </div>
        </div>

        <div className="premium-card">
          <div className="stat-icon amber">
            <Star size={24} fill="currentColor" />
          </div>
          <div>
            <p className="stat-value">4.98</p>
            <p className="stat-label">Net Rating</p>
          </div>
        </div>
      </div> */}

      {/* Cards */}
      <div className="cards-grid">
        <motion.div
          whileTap={{ scale: 0.96 }}
          onClick={handleToggleClock}
          className={`clock-card ${isClockedIn ? "on" : "off"}`}
        >
          <div className="card-bg-icon">
            <Activity size={80} />
          </div>
          <div className="clock-icon">
            <Power size={20} />
          </div>

          {isClockedIn ? (
            <>
              <p className="label">Session Time</p>
              <p className="time">{elapsed}</p>
              <p className="hint">Tap to Finish</p>
            </>
          ) : (
            <>
              <p className="label">Current Status</p>
              <p className="time">Off Duty</p>
              <p className="hint">Tap to Clock In</p>
            </>
          )}
        </motion.div>

        <motion.div whileTap={{ scale: 0.96 }} className="rating-card">
          <div className="card-bg-icon">
            <Trophy size={80} />
          </div>
          <div className="rating-icon">
            <Star size={20} fill="currentColor" />
          </div>
          <p className="label">Net Rating</p>
          <div className="rating-value-row">
            <p className="rating-value">4.98</p>
            <span className="rating-max">/5.0</span>
          </div>
          <p className="hint">Top 1% Technician</p>
        </motion.div>
      </div>
      {/* Activity Logs */}
      <div className="logs-section">
        <div className="logs-header">
          <h3>Recent Logs</h3>
          <button onClick={onViewAllActivities} className="history-btn">
            History <ArrowRight size={14} />
          </button>
        </div>

        <div className="logs-list">
          {MOCK_ACTIVITIES.slice(0, 3).map((activity: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="log-card"
            >
              <div
                className={`log-icon ${
                  activity.type === "Job Completed" ? "green" : "blue"
                }`}
              >
                <CheckCircle2 size={20} />
              </div>

              <div className="log-content">
                <p className="log-type">{activity.type}</p>
                <p className="log-description">{activity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Banner */}
      <div className="trust-banner">
        <div className="trust-content">
          <div className="trust-icon">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4>Location Privacy Active</h4>
            <p>Tracking only during active shifts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
