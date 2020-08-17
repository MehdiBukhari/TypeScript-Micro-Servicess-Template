import { Document } from 'mongoose';

export interface Iclient extends Document {
  _id: string;
  client_name: string;
  client_career_level: string;
  bussniess_email: string;
  phone: {
    cell: string;
    office_phone: string;
  };
  joinDate: string;
  adress: string;
  approvel_status: string;
  approved_date: string;
  contact_person_id: string;
  disapproval: {
    disapproval_reason: string;
    disapproving_personID: string;
    disapproval_date: string;
  };
  userId: string;
  Industry: string;
  jobs_posted_by: [
    {
      job_type: string;
      job_industry: string;
      job_category: string;
      job_project_type: string;
      job_career_level: string;
      skill_required: [];
      job_no_positions: [];
      job_duration: string;
      job_starting_date: string;
      job_travel_requirement: string;
    }
  ];
  job_posted: [{ job_posted_date: string; cliendID: string }];
  job_featured_status: boolean;
  job_application_status: string;
  contract_aggreement: string;
  contract_preference: [
    {
      Expected_start_date: string;
      remote_work_option: boolean;
      travel_requirements: boolean;
      consultant_rate_preference: { min: string; max: string };
    }
  ];
  notes: [{ note_date: string; note_personID: string; note_text: string }];
  client_approval_status: string;
  client_disapproval_status: {
    disapproval_reason: string;
    disapproving_personID: string;
    disapproval_time: string;
  };
  shared_job: { consultantID: string; jobID: string };
}
