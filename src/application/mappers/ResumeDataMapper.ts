import { Profile } from '../../domain/entities/Profile';
import { Experience } from '../../domain/entities/Experience';
import { Skill, SkillCategory } from '../../domain/entities/Skill';
import { Project } from '../../domain/entities/Project';
import {
  ResumeData,
  ResumeExperience,
  ResumeSkillCategory,
  ResumeProject,
} from '../dtos/ResumeData';

interface ResumeMapperInput {
  profile: Profile;
  experiences: Experience[];
  techSkills: Skill[];
  businessSkills: Skill[];
  projects: Project[];
  includePhoto: boolean;
}

/**
 * Mapper: Transforms domain entities to Resume DTO
 * Single Responsibility: Only handles the mapping logic
 */
export class ResumeDataMapper {
  toResumeData(input: ResumeMapperInput): ResumeData {
    const { profile, experiences, techSkills, businessSkills, projects } = input;

    return {
      contact: {
        fullName: profile.fullName,
        title: `${profile.title} | ${profile.subtitle}`,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        linkedin: profile.socialLinks.linkedin,
        github: profile.socialLinks.github,
        website: profile.socialLinks.website,
      },
      summary: profile.summary,
      experiences: experiences.map(this.mapExperience),
      education: profile.education.map((edu) => ({
        institution: edu.institution,
        degree: edu.degree,
        field: edu.field,
        year: edu.endYear?.toString() ?? 'Present',
        gpa: edu.gpa,
      })),
      certifications: profile.getActiveCertifications().map((cert) => ({
        name: cert.name,
        issuer: cert.issuer,
        date: cert.issueDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        }),
      })),
      technicalSkills: this.groupSkillsByCategory(techSkills),
      businessSkills: this.groupSkillsByCategory(businessSkills),
      projects: projects.map(this.mapProject),
      languages: profile.languages,
    };
  }

  private mapExperience(experience: Experience): ResumeExperience {
    return {
      company: experience.company,
      role: experience.role,
      dateRange: experience.dateRange.format(),
      achievements: experience.achievements,
      technologies: experience.technologies,
    };
  }

  private mapProject(project: Project): ResumeProject {
    return {
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      url: project.liveUrl ?? project.repositoryUrl,
    };
  }

  private groupSkillsByCategory(skills: Skill[]): ResumeSkillCategory[] {
    const grouped = skills.reduce(
      (acc, skill) => {
        const category = this.formatCategoryName(skill.category);
        if (!acc[category]) {
          acc[category] = [];
        }
        const formatExperience = (years: number, cat: Skill['category']) => {
          if (cat === 'business') return '3a';
          if (cat === 'soft-skills') return '2a';
          if (cat === 'data-analysis') return '3a';

          if (years < 1) return `${Math.round(years * 12)}m`;
          return `${years}a`;
        };

        acc[category].push(`${skill.name} (${formatExperience(skill.yearsOfExperience, skill.category)})`);
        return acc;
      },
      {} as Record<string, string[]>
    );

    return Object.entries(grouped).map(([category, skillNames]) => ({
      category,
      skills: skillNames,
    }));
  }

  private formatCategoryName(category: SkillCategory): string {
    const categoryNames: Record<SkillCategory, string> = {
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Databases',
      devops: 'DevOps & Cloud',
      'bi-tools': 'BI Tools',
      'data-analysis': 'Data Analysis',
      'soft-skills': 'Soft Skills',
      business: 'Business Strategy',
    };
    return categoryNames[category];
  }
}
