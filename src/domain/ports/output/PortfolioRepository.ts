import { Experience } from '../../entities/Experience';
import { Project } from '../../entities/Project';
import { Skill } from '../../entities/Skill';
import { Profile } from '../../entities/Profile';
import { ExperienceId } from '../../value-objects/ExperienceId';
import { ProjectId } from '../../value-objects/ProjectId';

/**
 * Output Port: Repository interface for portfolio data access
 * This port defines the contract that any data persistence adapter must implement.
 * Following the Dependency Inversion Principle, the domain depends on this abstraction,
 * not on concrete implementations (JSON, API, Database, etc.)
 */
export interface PortfolioRepository {
  // Profile operations
  getProfile(): Promise<Profile>;

  // Experience operations
  getAllExperiences(): Promise<Experience[]>;
  getExperienceById(id: ExperienceId): Promise<Experience | null>;
  getExperiencesByType(type: 'tech' | 'business' | 'hybrid'): Promise<Experience[]>;

  // Project operations
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: ProjectId): Promise<Project | null>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;

  // Skill operations
  getAllSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  getFeaturedSkills(): Promise<Skill[]>;
  getTechSkills(): Promise<Skill[]>;
  getBusinessSkills(): Promise<Skill[]>;
}
