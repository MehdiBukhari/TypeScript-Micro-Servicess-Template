import { Document } from 'mongoose';

export interface Iconsaltant extends Document {
  _id: string;
  consultant_profile_picture: string;
  consultant_first_name: string;
  consultant_last_name: string;
  consultant_profile_title: string;
  consultant_career_level: string;
  summary: string;
  pictureID_verification: string;
  joining_date: string;
  career_leve: string;
  work_authorization: string;
  expected_hourly_rate: {
    min: string;
    max: string;
  };
  email: string;
  rating: string;
  desired_industry: string;
  desired_location: string;
  is_featured: boolean;
  work_location: string;
  consultant_approval_status: string;
  consultant_disapproval_status: {
    disapproval_reason: string;
    disapproving_personID: string;
    disapproval_time: string;
  };
  Work_Authorization: {
    work_auth_main_type: string;
    work_auth_sub_type: string;
    wor_auth_sub_type_other: string;
  };
  iAgility_Personality_Type: string;

  Current_Location: {
    address: string;
    Country: string;
    Zip_Postal_Code: string;
  };
  Contact_Information: {
    cell: string;
    Adress: string;
    LinkedIn_URL: string;
    Facebook_URL: string;
    Twitter_URL: string;
  };

  Availability: {
    availability_date: string;
    status: string;
  };
  approval: {
    approval_status: string;
    approved_by: string;
    disapproval_reason: string;
  };
  Feed_back_form: {
    desired_title: string;
    flexibility: boolean;
    expected_hourly_rate: string;
    consultant_point_view: string;
    attitued: string;
    recruiter_feedback: string;
  };
  jobs_shared: [{ consultantID: string; jonID: string }];
  interview_request: [{ consultantID: string; jonID: string }];
  phone: {
    cell: string;
    extention: string;
  };
  submissions: [{ submission: string; submissions_status: string }];
  proffesional_experience: [];
  Personal_Assessment: {
    Dealing_with_Pressure_Stress: {
      Self_Control: string;
      Competitive: string;
      Stress_Tolerance: string;
    };
    Energy_Drive: {
      Energy: string;
      Ambition: string;
      Leadership_Potential: string;
      Social_Confidence: string;
      Persuasion: string;
      Flexibility: string;
    };
    Working_with_others: {
      Outgoing: string;
      Teamwork: string;
      Concern_for_others: string;
      Democratic: string;
    };
    Work_Style: {
      Dependability: string;
      Persistence: string;
      Attention_to_Detail: string;
      Rule_Following: string;
      Planning: string;
      Cooperative: string;
      Courteous: string;
      Calm: string;
      Creative: string;
      Efficient: string;
      Technological: string;
    };
    Problem_Solving: {
      Innovation: string;
      Analytical_Thinking: string;
    };
  };
  bussniess_skill: [
    {
      _id?: string;
      business_skill_type: string;
      skill_name: string;
    }
  ];
  technical_skill: [
    {
      _id?: string;
      technical_skill_type: string;
      technical_name: string;
    }
  ];

  notes: [{ note_date: string; note_personID: string; note_text: string }];
  featured_status: boolean;
  Employment_History: [
    {
      _id: string;
      Emp_Job_Title: string;
      Company_Name: string;
      Emp_Location: string;
      Emp_Description: string;
      Emp_Experience_Duration: {
        Emp_DateFrom: string;
        Emp_DateTo: string;
        Emp_Current_Job_check: string;
      };
    }
  ];
  Education: [
    {
      _id: string;
      E_Degree_Level: string;
      E_Majors: string;
      E_School: string;
      E_Completion_Year: string;
    }
  ];
  Ceritifications: [
    {
      _id: string;
      Cert_Name: string;
      Cert_Expiry: string;
      Life_Time_Check: string;
      Cert_Completion_Year: string;
    }
  ];
  Resumes: [
    {
      _id?: string;
      Resume_Title: string;
      Resume_File_URL: string;
    }
  ];
  featured_for_clients: [
    {
      _id?: string;
      Client_id: string;
    }
  ];
  Agreement: {
    Agreement_Title: string;
    Agreement_File_URL: string;
    Agreement_Status: string;
    Reminder_Date: Date;
  };

  Portfolos: [
    {
      _id?: string;
      Portfolio_Title: string;
      Portfolio_File_URL: string;
    }
  ];
  Technical_Skills: [
    {
      _id?: string;
      Tech_skill_type: string;
      Tech_skill_id_if_type_defulat?: string;
      Tech_skill_name_other: string;
    }
  ];
  projects_list: [
    {
      _id: '1';
      duration: {
        date_from: string;
        date_to: string;
      };
      title: string;
      achievements: string;
    }
  ];
  userId: string;
  createdAt: string;
  updatedAt: string;
  updateby: string;
  createdby: string;
}
