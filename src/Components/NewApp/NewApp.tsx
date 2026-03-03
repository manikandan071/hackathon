import React, { useEffect, useState } from "react";
import {
  Home,
  ClipboardList,
  TrendingUp,
  User,
  Bell,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { PublicClientApplication } from "@azure/msal-browser";

import HomeView from "./Components/HomeView/HomeView";
import JobsView from "./Components/JobsView/JobsView";
import PerformanceView from "./Components/PerformanceView/PerformanceView";
import ProfileView from "./Components/ProfileView/ProfileView";
import ActivityHistoryView from "./Components/ActivityHistoryView/ActivityHistoryView";
import AllJobsListView from "./Components/AllJobsListView/AllJobsListView";
import TaskDetailView from "./Components/TaskDetailView/TaskDetailView";

import "./NewApp.css";
import { getAccessToken } from "../../Asset/Config/authService";
import { Job } from "./types";
import {
  getCurrentUser,
  getEmployeeDetails,
  getjobsDetails,
  getRecentActivities,
} from "./Services";

export interface IActivities {
  id: number;
  title: string;
  description: string;
  job: number;
  created: string;
}

const NewApp: React.FC = () => {
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
    system: {
      allowPlatformBroker: true,
    },
  };

  const msalInstance = new PublicClientApplication(msalConfig);

  (async () => {
    await msalInstance.initialize();
    await msalInstance.handleRedirectPromise();
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.acquireTokenSilent({
        scopes: ["https://graph.microsoft.com/.default"],
        account: accounts[0],
      });
    }
  })();

  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [recentActivities, setRecentActivities] = useState<IActivities[]>([]);
  const [employeeDetails, setEmployeeDetails] = useState<any>([]);
  console.log("recentActivities:", recentActivities);
  console.log("employeeDetails:", employeeDetails);

  const usePageMeta = () => {
    const location = useLocation();

    if (location.pathname.startsWith("/home/activity-history")) {
      return { title: "Logs", isSubView: true };
    }
    if (location.pathname.startsWith("/jobs/all")) {
      return { title: "All Jobs", isSubView: true };
    }
    if (location.pathname.startsWith("/jobs/")) {
      return { title: "Task Details", isSubView: true };
    }

    return {
      title: (
        <>
          Field <span>Service</span>
        </>
      ),
      isSubView: false,
    };
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { title, isSubView } = usePageMeta();

  const activeTab = location.pathname.startsWith("/jobs")
    ? "jobs"
    : location.pathname.startsWith("/performance")
      ? "performance"
      : location.pathname.startsWith("/profile")
        ? "profile"
        : "home";

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessToken(msalInstance);
      console.log("Access Token:", accessToken);
      const user = await getCurrentUser(accessToken ? accessToken : "");
      getjobsDetails(accessToken, setAllJobs);
      getRecentActivities(accessToken, setRecentActivities);
      getEmployeeDetails(accessToken, setEmployeeDetails, user.mail);
    })();
  }, []);

  const openJobDetails = (jobId: number) => {
    navigate(`/jobs/${jobId}`);
  };
  return (
    <div className="app-container">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-inner">
          {isSubView ? (
            <div className="header-left">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(-1)}
                className="back-button"
              >
                <ArrowLeft size={24} />
              </motion.button>
              <h1 className="app-title">{title}</h1>
            </div>
          ) : (
            <div className="tab-wrapper">
              <NavButton
                active={activeTab === "home"}
                onClick={() => navigate("/home")}
                icon={<Home size={20} />}
                label="Home"
              />
              <NavButton
                active={activeTab === "jobs"}
                onClick={() => navigate("/jobs")}
                icon={<ClipboardList size={20} />}
                label="Jobs"
              />
              <NavButton
                active={activeTab === "performance"}
                onClick={() => navigate("/performance")}
                icon={<TrendingUp size={20} />}
                label="Stats"
              />
              <NavButton
                active={activeTab === "profile"}
                onClick={() => navigate("/profile")}
                icon={<User size={20} />}
                label="Me"
              />
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="notification-button"
          >
            <Bell size={18} />
            <span className="notification-dot"></span>
          </motion.button>
        </div>
      </nav>
      {/* HEADER */}
      {/* <header className="app-header">
        <div className="header-left">
          {isSubView ? (
            <button onClick={() => navigate(-1)} className="back-button">
              <ArrowLeft size={22} />
            </button>
          ) : (
            <div className="settings-box">
              <Settings size={18} color="#fff" />
            </div>
          )}
          <h1 className="app-title">{title}</h1>
        </div>

        {!isSubView && (
          <button className="notification-button">
            <Bell size={20} />
            <span className="notification-dot" />
          </button>
        )}
      </header> */}

      {/* MAIN CONTENT */}
      <main className={`app-main`}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route
            path="/home"
            element={
              <HomeView
                onViewAllActivities={() => navigate("/home/activity-history")}
                onViewTodayJobs={() => navigate("/jobs")}
                openJobDetails={openJobDetails}
                recentActivities={recentActivities}
              />
            }
          />
          <Route
            path="/home/activity-history"
            element={
              <ActivityHistoryView
                recentActivities={recentActivities}
                openJobDetails={openJobDetails}
              />
            }
          />

          <Route
            path="/jobs"
            element={
              <JobsView
                allJobs={allJobs}
                onJobClick={(job) => navigate(`/jobs/${job.id}`)}
                onViewAllJobs={() => navigate("/jobs/all")}
              />
            }
          />
          <Route
            path="/jobs/all"
            element={
              <AllJobsListView
                onJobClick={(job) => navigate(`/jobs/${job.id}`)}
              />
            }
          />
          <Route
            path="/jobs/:jobId"
            element={<TaskDetailView allJobs={allJobs} />}
          />

          <Route path="/performance" element={<PerformanceView />} />
          <Route
            path="/profile"
            element={<ProfileView employeeDetails={employeeDetails[0]} />}
          />
        </Routes>
      </main>

      {/* BOTTOM NAV */}
      {/* {!isSubView && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          className="nav-wrapper"
        >
          <nav className="nav-dock-dark">
            <NavButton
              active={activeTab === "home"}
              onClick={() => navigate("/home")}
              icon={<Home size={20} />}
              label="Home"
            />
            <NavButton
              active={activeTab === "jobs"}
              onClick={() => navigate("/jobs")}
              icon={<ClipboardList size={20} />}
              label="Jobs"
            />
            <NavButton
              active={activeTab === "performance"}
              onClick={() => navigate("/performance")}
              icon={<TrendingUp size={20} />}
              label="Stats"
            />
            <NavButton
              active={activeTab === "profile"}
              onClick={() => navigate("/profile")}
              icon={<User size={20} />}
              label="Me"
            />
          </nav>
        </motion.div>
      )} */}
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  icon: React.ReactElement;
  label: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({
  active,
  icon,
  label,
  onClick,
}) => (
  <button onClick={onClick} className={`nav-item ${active ? "active" : ""}`}>
    <div className={`nav-icon ${active ? "active" : ""}`}>
      {React.cloneElement(icon, {
        strokeWidth: active ? 2.5 : 2,
      } as any)}
    </div>

    {active && (
      <span
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        className="nav-label"
      >
        {label}
      </span>
    )}
  </button>
);

export default NewApp;
