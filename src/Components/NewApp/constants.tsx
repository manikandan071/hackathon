import { JobStatus, Activity, PerformanceStats } from "./types";

export const MOCK_JOBS: any[] = [
  {
    id: "JOB-001",
    title: "AC Maintenance & Filter Replacement",
    customer: "John Doe",
    address: "123 Emerald St, Silicon Valley",
    time: "09:00 AM",
    status: JobStatus.COMPLETED,
    priority: "High",
  },
  {
    id: "JOB-002",
    title: "Smart Lock Installation",
    customer: "Sarah Jenkins",
    address: "456 Sapphire Ave, Downtown",
    time: "11:30 AM",
    status: JobStatus.IN_PROGRESS,
    priority: "Medium",
  },
  {
    id: "JOB-003",
    title: "CCTV Camera Setup",
    customer: "Modern Tech Solutions",
    address: "789 Crystal Blvd, North Sector",
    time: "02:00 PM",
    status: JobStatus.NOT_STARTED,
    priority: "High",
  },
  {
    id: "JOB-004",
    title: "Network Rack Organization",
    customer: "Private Clinic",
    address: "101 Health Ln, West Side",
    time: "04:30 PM",
    status: JobStatus.NOT_STARTED,
    priority: "Low",
  },
  {
    id: "JOB-005",
    title: "Router Configuration",
    customer: "Cafe Nero",
    address: "22 Brew St, South Mall",
    time: "05:30 PM",
    status: JobStatus.NOT_STARTED,
    priority: "Medium",
  },
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "1",
    type: "Job Completed",
    description: "You completed JOB-001 at 10:15 AM",
    time: "2h ago",
  },
  {
    id: "2",
    type: "System Alert",
    description: "New high priority job assigned for 2:00 PM",
    time: "4h ago",
  },
  {
    id: "3",
    type: "Rating Received",
    description: "Received 5 stars from Sarah Jenkins",
    time: "Yesterday",
  },
];

export const WEEKLY_PERFORMANCE: PerformanceStats[] = [
  { period: "Mon", completed: 4, rating: 4.8 },
  { period: "Tue", completed: 6, rating: 4.9 },
  { period: "Wed", completed: 3, rating: 4.5 },
  { period: "Thu", completed: 7, rating: 5.0 },
  { period: "Fri", completed: 5, rating: 4.7 },
  { period: "Sat", completed: 2, rating: 4.8 },
  { period: "Sun", completed: 0, rating: 0 },
];
