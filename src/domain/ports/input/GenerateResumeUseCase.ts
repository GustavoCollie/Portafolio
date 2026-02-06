import { ResumeData } from '../../../application/dtos/ResumeData';

export interface ResumeOptions {
  includePhoto: boolean;
  includeTechSkills: boolean;
  includeBusinessSkills: boolean;
  includeProjects: boolean;
  experienceLimit?: number;
  template: 'modern' | 'classic' | 'minimal';
}

/**
 * Input Port: Use case interface for resume generation
 * Defines the contract for generating and downloading resumes
 */
export interface GenerateResumeUseCase {
  execute(options: ResumeOptions): Promise<Blob>;
  download(options: ResumeOptions, filename?: string): Promise<void>;
  preview(options: ResumeOptions): Promise<string>;
  getResumeData(options: ResumeOptions): Promise<ResumeData>;
}
