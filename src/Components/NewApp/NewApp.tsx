import React, { useState } from "react";
import {
  Home,
  ClipboardList,
  TrendingUp,
  User,
  Bell,
  Settings,
  ArrowLeft,
} from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import HomeView from "./Components/HomeView/HomeView";

import "./NewApp.css";
import JobsView from "./Components/JobsView/JobsView";
import PerformanceView from "./Components/PerformanceView/PerformanceView";
import ProfileView from "./Components/ProfileView/ProfileView";
import ActivityHistoryView from "./Components/ActivityHistoryView/ActivityHistoryView";
import AllJobsListView from "./Components/AllJobsListView/AllJobsListView";
import { TabType, Job } from "./types";
import TaskDetailView from "./Components/TaskDetailView/TaskDetailView";
type ViewState = "tabs" | "activityHistory" | "allJobs" | "taskDetail";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [viewStack, setViewStack] = useState<ViewState[]>(["tabs"]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const currentView = viewStack[viewStack.length - 1];
  const isSubView = currentView !== "tabs";
  console.log("Current View:", currentView, "Is SubView:", isSubView);

  const navigateTo = (view: ViewState, job?: Job) => {
    if (job) setSelectedJob(job);

    if (view === "tabs") {
      setViewStack(["tabs"]);
    } else {
      setViewStack((prev) => [...prev, view]);
    }
  };

  const goBack = () => {
    if (viewStack.length > 1) {
      setViewStack((prev) => prev.slice(0, -1));
    }
  };

  const handleJobClick = (job: Job) => {
    navigateTo("taskDetail", job);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeView onViewAllActivities={() => navigateTo("activityHistory")} />
        );
      case "jobs":
        return (
          <JobsView
            onViewAllJobs={() => navigateTo("allJobs")}
            onJobClick={handleJobClick}
          />
        );
      case "performance":
        return <PerformanceView />;
      case "profile":
        return <ProfileView />;
      default:
        return (
          <HomeView onViewAllActivities={() => navigateTo("activityHistory")} />
        );
    }
  };

  // const isSubView = currentView !== "tabs";

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          {isSubView ? (
            <button
              //   whileTap={{ scale: 0.9 }}
              onClick={goBack}
              className="back-button"
            >
              <ArrowLeft size={22} />
            </button>
          ) : (
            <div className="settings-box">
              <Settings size={18} color="#fff" />
            </div>
          )}
          <h1 className="app-title">
            {currentView === "activityHistory" ? (
              "Logs"
            ) : currentView === "allJobs" ? (
              "All Jobs"
            ) : currentView === "taskDetail" ? (
              "Task Details"
            ) : (
              <>
                Field <span>Service</span>
              </>
            )}
          </h1>
        </div>

        {!isSubView && (
          <button
            // whileTap={{ scale: 0.95 }}
            className="notification-button"
          >
            <Bell size={20} />
            <span className="notification-dot" />
          </button>
        )}
      </header>

      {/* Main View */}
      <main className="app-main">
        <div>
          {currentView === "tabs" ? (
            <div
              key={activeTab}
              // initial={{ opacity: 0, scale: 0.98 }}
              // animate={{ opacity: 1, scale: 1 }}
              // exit={{ opacity: 0, scale: 0.98 }}
              // transition={{ duration: 0.2 }}
              className="tab-content"
            >
              {renderTabContent()}
            </div>
          ) : currentView === "activityHistory" ? (
            <ActivityHistoryView />
          ) : currentView === "allJobs" ? (
            <AllJobsListView onJobClick={handleJobClick} />
          ) : (
            <TaskDetailView job={selectedJob} />
          )}
        </div>
      </main>
      {/* Dark Flat Navigation */}
      <div>
        {!isSubView && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="nav-wrapper"
          >
            <nav className="nav-dock-dark">
              <NavButton
                active={activeTab === "home"}
                onClick={() => setActiveTab("home")}
                icon={<Home size={20} />}
                label="Home"
              />
              <NavButton
                active={activeTab === "jobs"}
                onClick={() => setActiveTab("jobs")}
                icon={<ClipboardList size={20} />}
                label="Tasks"
              />
              <NavButton
                active={activeTab === "performance"}
                onClick={() => setActiveTab("performance")}
                icon={<TrendingUp size={20} />}
                label="Stats"
              />
              <NavButton
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
                icon={<User size={20} />}
                label="Me"
              />
            </nav>
          </motion.div>
        )}
      </div>
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

export default App;
