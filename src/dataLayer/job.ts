import { Document } from 'mongoose';
export interface Ijob extends Document {
  _id: string;
  title: string;
  job_type: string;
  job_category: string;
  job_duration: string;
  job_location: string;
  career_level: string;
  No_position: string;
  industry: string;
  project_type: string;
  expected_start_date: string;
  job_responsibilites: string;
  job_status: string;

  job_approval_status: { approved_by: string };
  remote_work_option: string;
  hourly_rate: {
    min: string;
    max: string;
  };
  skills: [
    {
      title: string;
      no_of_years: string;
      status: string;
    }
  ];
  job_traveling: string;
  consultant_disapproval_status: {
    disapproval_reason: string;
    disapproving_personID: string;
    disapproval_time: string;
  };
  job_posted: [{ job_posted_date: string; cliendID: string }];
  featured_job: [{ clientID: string; jobID: string }];
  createdAt: string;
  updatedAt: string;
  updateby: string;
  createdby: string;
}
