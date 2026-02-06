import { JsonPortfolioRepository } from '../adapters/persistence/JsonPortfolioRepository';
import { ReactPdfGeneratorService } from '../adapters/pdf-generator/ReactPdfGeneratorService';
import { GenerateResumeUseCaseImpl } from '../../application/use-cases/GenerateResumeUseCaseImpl';
import { GetPortfolioDataUseCaseImpl } from '../../application/use-cases/GetPortfolioDataUseCaseImpl';
import { ResumeDataMapper } from '../../application/mappers/ResumeDataMapper';

/**
 * Dependency Injection Container
 * Wires all dependencies following the Composition Root pattern.
 * This is the only place where concrete implementations are instantiated.
 */

// Output Adapters (Infrastructure -> Domain)
const portfolioRepository = new JsonPortfolioRepository();
const pdfGeneratorService = new ReactPdfGeneratorService();

// Mappers
const resumeDataMapper = new ResumeDataMapper();

// Use Cases (Application Layer)
export const generateResumeUseCase = new GenerateResumeUseCaseImpl(
  portfolioRepository,
  pdfGeneratorService,
  resumeDataMapper
);

export const getPortfolioDataUseCase = new GetPortfolioDataUseCaseImpl(
  portfolioRepository
);

// Export for testing/mocking
export const container = {
  portfolioRepository,
  pdfGeneratorService,
  generateResumeUseCase,
  getPortfolioDataUseCase,
};
