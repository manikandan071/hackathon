import React, { useState, useMemo } from "react";
// import { motion } from "framer-motion";
import {
  Search,
  ListTodo,
  MapPin,
  Clock,
  ChevronRight,
  AlertCircle,
  PlayCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { MOCK_JOBS } from "../../constants";
import { JobStatus, Job } from "../../types";
import "./JobsView.css";

interface JobsViewProps {
  onViewAllJobs: () => void;
  onJobClick: (job: Job) => void;
}

const JobsView: React.FC<JobsViewProps> = ({ onViewAllJobs, onJobClick }) => {
  const [activeFilter, setActiveFilter] = useState<JobStatus | "Overall">(
    "Overall",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const stats = useMemo(
    () => ({
      total: MOCK_JOBS.length,
      notStarted: MOCK_JOBS.filter((j) => j.status === JobStatus.NOT_STARTED)
        .length,
      inProgress: MOCK_JOBS.filter((j) => j.status === JobStatus.IN_PROGRESS)
        .length,
      completed: MOCK_JOBS.filter((j) => j.status === JobStatus.COMPLETED)
        .length,
    }),
    [],
  );

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      const matchesFilter =
        activeFilter === "Overall" || job.status === activeFilter;
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.customer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <div>
          <h2>Daily Assignments</h2>
          <p>Current Load Management</p>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricCard
          label="Overall"
          count={stats.total}
          active={activeFilter === "Overall"}
          onClick={() => setActiveFilter("Overall")}
          color="#5B5FC7"
          icon={<ListTodo size={16} />}
        />
        <MetricCard
          label="Not Started"
          count={stats.notStarted}
          active={activeFilter === JobStatus.NOT_STARTED}
          onClick={() => setActiveFilter(JobStatus.NOT_STARTED)}
          color="#ec2f2f"
          icon={<AlertCircle size={16} />}
        />

        <MetricCard
          label="In Progress"
          count={stats.inProgress}
          active={activeFilter === JobStatus.IN_PROGRESS}
          onClick={() => setActiveFilter(JobStatus.IN_PROGRESS)}
          color="#F5A623"
          icon={<PlayCircle size={16} />}
        />
        <MetricCard
          label="Completed"
          count={stats.completed}
          active={activeFilter === JobStatus.COMPLETED}
          onClick={() => setActiveFilter(JobStatus.COMPLETED)}
          color="#10B981"
          icon={<CheckCircle size={16} />}
        />
      </div>

      <div className="search-container">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Filter your tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="task-section">
        <div className="task-header">
          <h3>{activeFilter} Tasks</h3>
          <button onClick={onViewAllJobs} className="inventory-btn">
            All jobs <ArrowRight size={14} />
          </button>
        </div>

        {filteredJobs.slice(0, 4).map((job) => (
          <CompactJobCard
            key={job.id}
            job={job}
            onClick={() => onJobClick(job)}
          />
        ))}

        {filteredJobs.length > 4 && (
          <button onClick={onViewAllJobs} className="view-more">
            + View {filteredJobs.length - 4} more assignments
          </button>
        )}
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  color: string;
  icon: React.ReactNode;
}> = ({ label, count, active, onClick, color, icon }) => (
  <button
    // whileTap={{ scale: 0.96 }}
    onClick={onClick}
    className={`metric-card ${active ? "active" : ""}`}
    // style={{ borderLeft: `4px solid ${active ? color : "transparent"}` }}
  >
    <div className="metric-icon" style={{ color: active ? color : "" }}>
      {icon}
    </div>
    <span className="metric-count">{count}</span>
    <span className="metric-label">{label}</span>
  </button>
);

const CompactJobCard: React.FC<{ job: Job; onClick: () => void }> = ({
  job,
  onClick,
}) => {
  const priorityClass =
    job.priority === "High"
      ? "priority-high"
      : job.priority === "Medium"
        ? "priority-medium"
        : "priority-low";

  const statusClass =
    job.status === JobStatus.COMPLETED
      ? "status-completed"
      : job.status === JobStatus.IN_PROGRESS
        ? "status-progress"
        : "status-default";

  return (
    <div className="job-view-card" onClick={onClick}>
      <div className={`status-bar ${statusClass}`} />
      <div className="job-content">
        <div className="job-top">
          <span className="view-job-id">{job.id}</span>
          <span className={`view-priority-badge ${priorityClass}`}>
            {job.priority}
          </span>
        </div>
        <h4>{job.title}</h4>
        <div className="job-meta">
          <span>
            <MapPin size={12} /> {job.customer}
          </span>
          <span>
            <Clock size={12} /> {job.time}
          </span>
        </div>
      </div>
      <div className="job-arrow">
        <ChevronRight size={20} />
      </div>
    </div>
  );
};

export default JobsView;
