import {
  GetPortfolioDataUseCase,
  PortfolioData,
} from '../../domain/ports/input/GetPortfolioDataUseCase';
import { PortfolioRepository } from '../../domain/ports/output/PortfolioRepository';

/**
 * Use Case Implementation: Get Portfolio Data
 * Retrieves all portfolio information for display in the UI
 */
export class GetPortfolioDataUseCaseImpl implements GetPortfolioDataUseCase {
  constructor(private readonly portfolioRepository: PortfolioRepository) {}

  async execute(): Promise<PortfolioData> {
    const [profile, experiences, projects, skills] = await Promise.all([
      this.portfolioRepository.getProfile(),
      this.portfolioRepository.getAllExperiences(),
      this.portfolioRepository.getAllProjects(),
      this.portfolioRepository.getAllSkills(),
    ]);

    return {
      profile,
      experiences,
      projects,
      skills,
    };
  }
}
