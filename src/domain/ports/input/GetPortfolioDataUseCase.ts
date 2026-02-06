import { Profile } from '../../entities/Profile';
import { Experience } from '../../entities/Experience';
import { Project } from '../../entities/Project';
import { Skill } from '../../entities/Skill';

/**
 * Input Port: Use case interface for retrieving portfolio data
 * This defines what the application layer exposes to the outside world (UI, API, etc.)
 */
export interface PortfolioData {
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
}

export interface GetPortfolioDataUseCase {
  execute(): Promise<PortfolioData>;
}
