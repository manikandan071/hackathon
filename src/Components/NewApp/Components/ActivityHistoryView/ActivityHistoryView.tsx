// ActivityHistoryView.tsx

import React from "react";
// import { motion } from "framer-motion";
import { FileText, Filter, Calendar } from "lucide-react";
import { MOCK_ACTIVITIES } from "../../constants";
import "./ActivityHistoryView.css";

interface ActivityItem {
  id: string;
  type: string;
  time: string;
  description: string;
}

const ActivityHistoryView: React.FC = () => {
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
        {[...MOCK_ACTIVITIES, ...MOCK_ACTIVITIES].map(
          (activity: ActivityItem, idx: number) => (
            <div
              key={`${activity.id}-${idx}`}
              //   initial={{ opacity: 0, x: -10 }}
              //   animate={{ opacity: 1, x: 0 }}
              //   transition={{ delay: idx * 0.05 }}
              className="timeline-item"
            >
              <div className="timeline-dot" />

              <div className="activity-card">
                <div className="card-header">
                  <span className="activity-type">{activity.type}</span>

                  <div className="activity-time">
                    <Calendar size={10} />
                    {activity.time}
                  </div>
                </div>

                <p className="activity-description">{activity.description}</p>

                <button className="audit-button">
                  <FileText size={12} />
                  Detailed Audit
                </button>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default ActivityHistoryView;
