import {
  GenerateResumeUseCase,
  ResumeOptions,
} from '../../domain/ports/input/GenerateResumeUseCase';
import { PortfolioRepository } from '../../domain/ports/output/PortfolioRepository';
import { PdfGeneratorService } from '../../domain/ports/output/PdfGeneratorService';
import { ResumeDataMapper } from '../mappers/ResumeDataMapper';
import { ResumeData } from '../dtos/ResumeData';

/**
 * Use Case Implementation: Generate Resume
 * Orchestrates the resume generation process following Clean Architecture principles.
 * Depends only on abstractions (ports), not on concrete implementations.
 */
export class GenerateResumeUseCaseImpl implements GenerateResumeUseCase {
  constructor(
    private readonly portfolioRepository: PortfolioRepository,
    private readonly pdfGeneratorService: PdfGeneratorService,
    private readonly resumeDataMapper: ResumeDataMapper
  ) {}

  async execute(options: ResumeOptions): Promise<Blob> {
    const resumeData = await this.getResumeData(options);
    return this.pdfGeneratorService.generateResume(resumeData);
  }

  async download(options: ResumeOptions, filename?: string): Promise<void> {
    const resumeData = await this.getResumeData(options);
    const defaultFilename = `${resumeData.contact.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
    await this.pdfGeneratorService.downloadResume(resumeData, filename ?? defaultFilename);
  }

  async preview(options: ResumeOptions): Promise<string> {
    const resumeData = await this.getResumeData(options);
    return this.pdfGeneratorService.generatePreview(resumeData);
  }

  async getResumeData(options: ResumeOptions): Promise<ResumeData> {
    const [profile, experiences, skills, projects] = await Promise.all([
      this.portfolioRepository.getProfile(),
      this.portfolioRepository.getAllExperiences(),
      this.portfolioRepository.getAllSkills(),
      options.includeProjects
        ? this.portfolioRepository.getFeaturedProjects()
        : Promise.resolve([]),
    ]);

    const filteredExperiences = options.experienceLimit
      ? experiences.slice(0, options.experienceLimit)
      : experiences;

    const techSkills = options.includeTechSkills
      ? skills.filter((s) => s.isTechSkill())
      : [];

    const businessSkills = options.includeBusinessSkills
      ? skills.filter((s) => s.isBusinessSkill())
      : [];

    return this.resumeDataMapper.toResumeData({
      profile,
      experiences: filteredExperiences,
      techSkills,
      businessSkills,
      projects,
      includePhoto: options.includePhoto,
    });
  }
}
