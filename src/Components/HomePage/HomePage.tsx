import React, { useEffect, useState } from "react";
import "./HomePage.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import StatusCard from "./StatusCard/StatusCard";
import RecentActivity from "./RecentActivities/RecentActivities";

const HomePage = () => {
  const [index, setIndex] = useState(0);

  const statusData = [
    {
      title: "This Week Status",
      startDate: "17/02",
      endDate: "23/02",
      completed: 10,
      total: 12,
      rating: 4.5,
      status: "Good",
    },
    {
      title: "Last Week Status",
      startDate: "09/02",
      endDate: "16/02",
      completed: 9,
      total: 12,
      rating: 4,
      status: "Excellent",
    },
    {
      title: "This Month Status",
      startDate: "01/02",
      endDate: "29/02",
      completed: 25,
      total: 30,
      rating: 4.2,
      status: "Good",
    },
    {
      title: "Last Month Status",
      startDate: "01/01",
      endDate: "31/01",
      completed: 22,
      total: 30,
      rating: 3.8,
      status: "Average",
    },
    {
      title: "This Year Status",
      startDate: "01/01",
      endDate: "31/12",
      completed: 100,
      total: 150,
      rating: 3.5,
      status: "Poor",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % statusData.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <ProfileHeader
        name="Fateha Nil"
        location="Dubai, Marina, UAE"
        image="https://randomuser.me/api/portraits/women/44.jpg"
      />
      <div
        style={{
          display: "flex",
          padding: "0px 10px",
        }}
      >
        <StatusCard data={statusData[index]} />
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 10px 0px 10px",
        }}
      >
        <RecentActivity />
      </div>
    </div>
  );
};

export default HomePage;
