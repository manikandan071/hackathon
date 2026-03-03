import React, { useEffect, useState } from "react";
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

import { PublicClientApplication } from "@azure/msal-browser";
import { getAccessToken } from "../../../../Asset/Config/authService";
import { getCurrentUser } from "../../Services";

interface ProfileViewProps {
  employeeDetails: any;
}

const ProfileView: React.FC<ProfileViewProps> = ({ employeeDetails }) => {
  const [profileImage, setProfileImage] = useState<string>("");
  console.log("profileImage", profileImage);

  const msalConfig = {
    auth: {
      clientId: "8d876036-c3cf-4739-89b1-3e98fd2cb857",
      authority:
        "https://login.microsoftonline.com/3e8e53be-a48f-4147-adf8-7e90a6e46b57",
      redirectUri: "/",
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    },
  };

  const msalInstance = new PublicClientApplication(msalConfig);

  (async () => {
    await msalInstance.initialize();
  })();

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessToken(msalInstance);
      const user = await getCurrentUser(accessToken ? accessToken : "");
      const res = await fetch(
        `https://graph.microsoft.com/v1.0/users/${user?.id}/photo/$value`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log("Image response", res);

      if (!res.ok) return null;

      const blob = await res.blob();
      setProfileImage(URL.createObjectURL(blob));
    })();
  }, [employeeDetails]);

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
            <img src={profileImage} alt="Avatar" />
          </div>
          <div className="status-indicator" />
        </div>

        <h2>{employeeDetails?.employee}</h2>
        <div className="role-badge">{employeeDetails?.role}</div>

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
          {employeeDetails?.skillSets.map((skill: any, idx: number) => (
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
          <h3>Others</h3>
        </div>
        <div className="info-card">
          <InfoRow
            icon={<Mail size={18} color="#cbd5e1" />}
            label="Email"
            value={employeeDetails?.contactEmail}
          />
          <InfoRow
            icon={<Phone size={18} color="#cbd5e1" />}
            label="Phone"
            value={employeeDetails?.contactNo}
          />
          <InfoRow
            icon={<MapPin size={18} color="#cbd5e1" />}
            label="Location"
            value={employeeDetails?.city}
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
