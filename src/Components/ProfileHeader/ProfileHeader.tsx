import React from "react";
import "./ProfileHeader.css";
import { EnvironmentOutlined, BellOutlined } from "@ant-design/icons";

interface Props {
  name: string;
  location: string;
  image: string;
  hasNotification?: boolean;
}
const ProfileHeader: React.FC<Props> = ({
  name,
  location,
  image,
  hasNotification = true,
}) => {
  return (
    <div className="profile_header_wrapper">
      <div className="profile_header">
        <div className="profile_left">
          <img src={image} alt="profile" className="profile_avatar" />

          <div>
            <div className="profile_name">{name}</div>
            <div className="profile_location">
              <EnvironmentOutlined className="location_icon" />
              {location}
            </div>
          </div>
        </div>

        <div className="notification_wrapper">
          <BellOutlined className="notification_icon" />
          {hasNotification && <span className="notification_dot"></span>}
        </div>
      </div>

      <div className="banner-content">
        <p>Welcome Back! 👋</p>
        <span>
          Your field service dashboard provides real-time insights into
          performance, productivity, and progress — helping you stay ahead every
          day.
        </span>
      </div>
    </div>
  );
};

export default ProfileHeader;
