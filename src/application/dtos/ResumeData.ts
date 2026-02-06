/**
 * Data Transfer Object for Resume Generation
 * This DTO is framework-agnostic and can be consumed by any PDF adapter
 */
export interface ResumeContactInfo {
  fullName: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface ResumeExperience {
  company: string;
  role: string;
  location?: string;
  dateRange: string;
  achievements: string[];
  technologies?: string[];
}

export interface ResumeProject {
  title: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  field: string;
  year: string;
  gpa?: string;
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeSkillCategory {
  category: string;
  skills: string[];
}

export interface ResumeData {
  contact: ResumeContactInfo;
  summary: string;
  experiences: ResumeExperience[];
  education: ResumeEducation[];
  certifications: ResumeCertification[];
  technicalSkills: ResumeSkillCategory[];
  businessSkills: ResumeSkillCategory[];
  projects: ResumeProject[];
  languages: { name: string; level: string }[];
}
