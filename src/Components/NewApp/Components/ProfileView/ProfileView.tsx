import React from "react";
// import { motion } from "framer-motion";
import {
  Settings,
  Mail,
  Phone,
  MapPin,
  Award,
  Shield,
  UserCheck,
  Star,
  Zap,
  Globe,
  Clock,
  Box,
} from "lucide-react";
import "./ProfileView.css";

const ProfileView: React.FC = () => {
  const skills = [
    "Systems Repair",
    "Network Config",
    "Diagnostics",
    "Fiber Splicing",
    "IoT Setup",
    "Teams Admin",
  ];
  return (
    <div className="profile-container">
      {/* HEADER */}
      <div className="profile-header">
        <div className="settings-btn">
          <button>
            <Settings size={22} />
          </button>
        </div>
        <div
          //   initial={{ scale: 0.95 }}
          //   animate={{ scale: 1 }}
          className="avatar-wrapper"
        >
          <div className="avatar">
            <img src="https://picsum.photos/300/300?random=12" alt="Avatar" />
          </div>
          <div className="status-indicator" />
        </div>

        <h2>Alex Henderson</h2>
        <div className="role-badge">Senior Tech Lead</div>

        <div className="mini-badges">
          <MiniBadge
            icon={<Star size={14} fill="currentColor" />}
            label="Avg Star"
            value="4.9"
            color="amber"
          />
          <MiniBadge
            icon={<Zap size={14} fill="currentColor" />}
            label="Activity"
            value="High"
            color="indigo"
          />

          <MiniBadge
            icon={<Award size={14} />}
            label="Level"
            value="Gold"
            color="purple"
          />
        </div>
      </div>

      {/* GLOBAL IMPACT */}
      <div className="section">
        <div className="section-header">
          <h3>Global Impact</h3>
          <Globe size={18} color="#cbd5e1" />
        </div>

        <div className="impact-grid">
          <ImpactTile
            label="Jobs Closed"
            value="1.2k"
            trend="+5%"
            icon={<Box size={18} />}
          />
          <ImpactTile
            label="Speed Index"
            value="42m"
            trend="-2m"
            icon={<Clock size={18} />}
          />
          <ImpactTile
            label="Trust Score"
            value="99%"
            trend="+1%"
            icon={<Shield size={18} />}
          />
          <ImpactTile
            label="Referrals"
            value="242"
            trend="+12"
            icon={<UserCheck size={18} />}
          />
        </div>
      </div>

      {/* SKILLS */}
      <div className="section">
        <div className="section-header">
          <h3>Skillsets</h3>
        </div>
        <div className="skills">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              //   initial={{ opacity: 0, scale: 0.9 }}
              //   animate={{ opacity: 1, scale: 1 }}
              //   transition={{ delay: idx * 0.05 }}
              className="skill-pill"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <div className="section">
        <div className="section-header">
          <h3>Direct Channels</h3>
        </div>
        <div className="info-card">
          <InfoRow
            icon={<Mail size={18} color="#cbd5e1" />}
            label="Teams Enterprise"
            value="alex.h@teams-hq.ms"
          />
          <InfoRow
            icon={<Phone size={18} color="#cbd5e1" />}
            label="Secure Voip"
            value="+1 (555) 012-TECH"
          />
          <InfoRow
            icon={<MapPin size={18} color="#cbd5e1" />}
            label="Base Region"
            value="San Francisco Zone"
          />
        </div>
      </div>

      {/* <div className="logout-section">
        <button className="logout-btn">End Current Session</button>
      </div> */}
    </div>
  );
};

const MiniBadge: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}> = ({ icon, label, value, color }) => (
  <div className={`mini-badge ${color}`}>
    <div className="mini-icon">{icon}</div>
    <p className="mini-value">{value}</p>
    <p className="mini-label">{label}</p>
  </div>
);

const ImpactTile: React.FC<{
  label: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}> = ({ label, value, trend, icon }) => (
  <div className="impact-tile">
    <div className="impact-icon">{icon}</div>
    <p className="impact-label">{label}</p>
    <div className="impact-bottom">
      <h4>{value}</h4>
      {trend && <span className="trend">{trend}</span>}
    </div>
  </div>
);

const InfoRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="info-row">
    <div className="info-icon">{icon}</div>
    <div className="info-content">
      <p className="info-label">{label}</p>
      <p className="info-value">{value}</p>
    </div>
    {/* <ChevronRight size={16} /> */}
  </div>
);

export default ProfileView;
