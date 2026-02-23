import React from "react";
import "./RecentActivities.css";

interface RecentActivityProps {}

const RecentActivity: React.FC<RecentActivityProps> = () => {
  // activityData.js

  const activityData = [
    {
      id: 1,
      day: "Today",
      title: "Work Order Completed",
      description: "AC Maintenance - Office Building",
      time: "10:30 AM",
      icon: "🔧",
    },
    {
      id: 2,
      day: "Today",
      title: "New Service Request",
      description: "Generator Inspection",
      time: "08:45 AM",
      icon: "📋",
    },
    {
      id: 3,
      day: "Yesterday",
      title: "Task Assigned",
      description: "Electrical Panel Check",
      time: "04:20 PM",
      icon: "⚡",
    },
    {
      id: 4,
      day: "Yesterday",
      title: "Service Visit Scheduled",
      description: "HVAC Cleaning",
      time: "11:15 AM",
      icon: "📅",
    },
    {
      id: 4,
      day: "18/02",
      title: "Service Visit Scheduled",
      description: "HVAC Cleaning",
      time: "11:15 AM",
      icon: "📅",
    },
    {
      id: 4,
      day: "18/02",
      title: "Service Visit Scheduled",
      description: "HVAC Cleaning",
      time: "11:15 AM",
      icon: "📅",
    },
  ];

  const groupByDay = (data: any) => {
    return data.reduce((acc: any, item: any) => {
      acc[item.day] = acc[item.day] || [];
      acc[item.day].push(item);
      return acc;
    }, {});
  };
  const grouped = groupByDay(activityData);
  console.log(grouped);
  return (
    <div className="activity-container">
      <div className="activity-header">
        <h3>Recent Activities</h3>
        <span className="see-all">See all</span>
      </div>

      {Object.keys(grouped).map((day) => (
        <div key={day}>
          <h4 className="day-header">{day}</h4>

          {grouped[day].map((item: any) => (
            <div key={item.id} className="activity-item">
              <div className="timeline">
                <span className="dot"></span>
              </div>
              <div className="activity-card">
                <div className="content">
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                  <span className="time">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
