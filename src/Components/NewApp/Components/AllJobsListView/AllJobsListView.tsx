// AllJobsListView.tsx

import React, { useState } from "react";
// import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  ChevronRight,
  SlidersHorizontal,
  Clock,
  CheckCircle,
  Hourglass,
  AlertCircle,
} from "lucide-react";
import { MOCK_JOBS } from "../../constants";
import { Job, JobStatus } from "../../types";
import "./AllJobsListView.css";

interface AllJobsListViewProps {
  onJobClick: (job: Job) => void;
}

const AllJobsListView: React.FC<AllJobsListViewProps> = ({ onJobClick }) => {
  const [query, setQuery] = useState<string>("");

  const filtered: Job[] = MOCK_JOBS.filter((j: Job) =>
    j.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div
      //   initial={{ opacity: 0 }}
      //   animate={{ opacity: 1 }}
      //   transition={{ duration: 0.4 }}
      className="jobs-container"
    >
      {/* Search Section */}
      <div className="search-section">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search full registry..."
            className="search-input"
          />

          <button className="filter-btn">
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Tags */}
        <div className="tags-container">
          {[
            "Not Started",
            "In Progress",
            "Completed",
            "High",
            "Medium",
            "Low",
          ].map((tag) => (
            <button key={tag} className="tag-btn">
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="results-section">
        <h3 className="results-title">Results ({filtered.length})</h3>

        {filtered.map((job: Job, idx: number) => {
          const priorityClass =
            job.priority === "High"
              ? "priority-high"
              : job.priority === "Medium"
                ? "priority-medium"
                : "priority-low";

          const statusClass =
            job.status === JobStatus.COMPLETED
              ? "completed"
              : job.status === JobStatus.IN_PROGRESS
                ? "in-progress"
                : "pending";

          return (
            <div
              key={idx}
              // initial={{ opacity: 0, y: 10 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ delay: idx * 0.05 }}
              className="job-card"
              onClick={() => onJobClick(job)}
            >
              <div className={`job-icon ${statusClass}`}>
                {job.status === "Completed" ? (
                  <CheckCircle size={20} />
                ) : job.status === "In Progress" ? (
                  <Hourglass size={20} rotate={15} />
                ) : (
                  <AlertCircle size={20} />
                )}
              </div>
              <div className="job-info">
                <div className="job-top">
                  <span className="view-job-id">{job.id}</span>
                  <span className={`view-priority-badge ${priorityClass}`}>
                    {job.priority}
                  </span>
                </div>

                <h4 className="job-title">{job.title}</h4>

                <div className="job-meta">
                  <span>
                    <MapPin size={12} /> {job.customer}
                  </span>
                  <span>
                    <Clock size={12} /> {job.time}
                  </span>
                </div>
              </div>

              <ChevronRight className="chevron" size={20} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllJobsListView;
