// Input Ports (Use Cases)
export type { GetPortfolioDataUseCase, PortfolioData } from './input/GetPortfolioDataUseCase';
export type { GenerateResumeUseCase, ResumeOptions } from './input/GenerateResumeUseCase';

// Output Ports (Adapters)
export type { PortfolioRepository } from './output/PortfolioRepository';
export type { PdfGeneratorService } from './output/PdfGeneratorService';
export type { AnalyticsService, AnalyticsEvent } from './output/AnalyticsService';
