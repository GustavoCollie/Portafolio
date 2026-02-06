import { PortfolioRepository } from '../../../domain/ports/output/PortfolioRepository';
import { Experience, ExperienceType } from '../../../domain/entities/Experience';
import { Project } from '../../../domain/entities/Project';
import { Skill } from '../../../domain/entities/Skill';
import { Profile } from '../../../domain/entities/Profile';
import { ExperienceId } from '../../../domain/value-objects/ExperienceId';
import { ProjectId } from '../../../domain/value-objects/ProjectId';
import { SkillId } from '../../../domain/value-objects/SkillId';
import { DateRange } from '../../../domain/value-objects/DateRange';
import { portfolioData } from '../../config/portfolio-data';

/**
 * Infrastructure Adapter: JSON-based Portfolio Repository
 * Implements the PortfolioRepository port using a local JSON file.
 * This adapter can be easily replaced with an API adapter without changing domain logic.
 */
export class JsonPortfolioRepository implements PortfolioRepository {
  async getProfile(): Promise<Profile> {
    const { profile } = portfolioData;
    return Profile.create({
      ...profile,
      education: profile.education.map((edu) => ({
        ...edu,
        endYear: edu.endYear ?? undefined,
      })),
      certifications: profile.certifications.map((cert) => ({
        ...cert,
        issueDate: new Date(cert.issueDate),
        expirationDate: (cert as any).expirationDate ? new Date((cert as any).expirationDate) : undefined,
      })),
    });
  }

  async getAllExperiences(): Promise<Experience[]> {
    return portfolioData.experiences.map((exp) =>
      Experience.create({
        id: ExperienceId.create(exp.id),
        company: exp.company,
        role: exp.role,
        description: exp.description,
        type: exp.type as ExperienceType,
        dateRange: DateRange.create(
          new Date(exp.startDate),
          exp.endDate ? new Date(exp.endDate) : null
        ),
        technologies: exp.technologies,
        achievements: exp.achievements,
        kpis: exp.kpis,
      })
    );
  }

  async getExperienceById(id: ExperienceId): Promise<Experience | null> {
    const experiences = await this.getAllExperiences();
    return experiences.find((exp) => exp.id.equals(id)) ?? null;
  }

  async getExperiencesByType(type: ExperienceType): Promise<Experience[]> {
    const experiences = await this.getAllExperiences();
    return experiences.filter((exp) => exp.type === type);
  }

  async getAllProjects(): Promise<Project[]> {
    return portfolioData.projects.map((proj) =>
      Project.create({
        id: ProjectId.create(proj.id),
        title: proj.title,
        description: proj.description,
        category: proj.category as Project['category'],
        technologies: proj.technologies,
        repositoryUrl: (proj as any).repositoryUrl,
        liveUrl: (proj as any).liveUrl ?? (proj as any).link,
        imageUrl: (proj as any).imageUrl,
        featured: proj.featured,
        metrics: proj.metrics,
        startDate: new Date(proj.startDate),
        endDate: (proj as any).endDate ? new Date((proj as any).endDate) : undefined,
      })
    );
  }

  async getProjectById(id: ProjectId): Promise<Project | null> {
    const projects = await this.getAllProjects();
    return projects.find((proj) => proj.id.equals(id)) ?? null;
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const projects = await this.getAllProjects();
    return projects.filter((proj) => proj.featured);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    const projects = await this.getAllProjects();
    return projects.filter((proj) => proj.category === category);
  }

  async getAllSkills(): Promise<Skill[]> {
    return portfolioData.skills.map((skill) =>
      Skill.create({
        id: SkillId.create(skill.id),
        name: skill.name,
        category: skill.category as Skill['category'],
        proficiency: skill.proficiency as Skill['proficiency'],
        yearsOfExperience: skill.yearsOfExperience,
        icon: skill.icon,
        featured: skill.featured,
      })
    );
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    const skills = await this.getAllSkills();
    return skills.filter((skill) => skill.category === category);
  }

  async getFeaturedSkills(): Promise<Skill[]> {
    const skills = await this.getAllSkills();
    return skills.filter((skill) => skill.featured);
  }

  async getTechSkills(): Promise<Skill[]> {
    const skills = await this.getAllSkills();
    return skills.filter((skill) => skill.isTechSkill());
  }

  async getBusinessSkills(): Promise<Skill[]> {
    const skills = await this.getAllSkills();
    return skills.filter((skill) => skill.isBusinessSkill());
  }
}
