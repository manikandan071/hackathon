export enum JobStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export type TabType = "home" | "jobs" | "performance" | "profile";

export interface Job {
  id: string;
  title: string;
  customer: string;
  address: string;
  time: string;
  status: JobStatus;
  priority: "High" | "Medium" | "Low";
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  time: string;
}

export interface PerformanceStats {
  period: string;
  completed: number;
  rating: number;
}
