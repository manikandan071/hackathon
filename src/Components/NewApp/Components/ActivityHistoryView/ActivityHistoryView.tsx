// ActivityHistoryView.tsx

import React from "react";
// import { motion } from "framer-motion";
import { FileText, Filter, Calendar, CheckCircle2 } from "lucide-react";
import "./ActivityHistoryView.css";
import { IActivities } from "../../NewApp";
import { getTimeAgo } from "../../../../Asset/Utils/commonUtils";

interface ActivityHistoryViewProps {
  openJobDetails: (jobId: number) => void;
  recentActivities: IActivities[];
}

const ActivityHistoryView: React.FC<ActivityHistoryViewProps> = ({
  recentActivities,
  openJobDetails,
}) => {
  return (
    <div
      //   initial={{ opacity: 0 }}
      //   animate={{ opacity: 1 }}
      //   transition={{ duration: 0.4 }}
      className="activity-container"
    >
      {/* Header */}
      <div className="activity-header">
        <div>
          <h2 className="activity-title">Activity Stream</h2>
          <p className="activity-subtitle">Logged events for this cycle</p>
        </div>

        <button className="filter-button">
          <Filter size={20} />
        </button>
      </div>

      {/* Timeline */}
      <div className="timeline">
        {recentActivities?.map((activity: IActivities, idx: number) => (
          <div
            key={`${activity.id}-${idx}`}
            //   initial={{ opacity: 0, x: -10 }}
            //   animate={{ opacity: 1, x: 0 }}
            //   transition={{ delay: idx * 0.05 }}
            className="timeline-item"
            onClick={() => openJobDetails(activity.job)}
          >
            <div className="timeline-dot">
              <CheckCircle2 size={18} color="#16a34a" />
            </div>
            <div className="activity-card">
              <div className="card-header">
                <span className="activity-type">{activity.title}</span>

                <div className="activity-time">
                  <Calendar size={10} />
                  {getTimeAgo(activity.created)}
                </div>
              </div>

              <p className="activity-description">{activity.description}</p>

              <button className="audit-button">
                <FileText size={12} />
                Detailed Audit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityHistoryView;
