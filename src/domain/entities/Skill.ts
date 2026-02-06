import { SkillId } from '../value-objects/SkillId';

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'bi-tools'
  | 'data-analysis'
  | 'soft-skills'
  | 'business';

export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface SkillProps {
  id: SkillId;
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  yearsOfExperience: number;
  icon?: string;
  featured: boolean;
}

export class Skill {
  private readonly props: SkillProps;

  private constructor(props: SkillProps) {
    this.props = props;
  }

  public static create(props: SkillProps): Skill {
    return new Skill(props);
  }

  get id(): SkillId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get category(): SkillCategory {
    return this.props.category;
  }

  get proficiency(): ProficiencyLevel {
    return this.props.proficiency;
  }

  get yearsOfExperience(): number {
    return this.props.yearsOfExperience;
  }

  get icon(): string | undefined {
    return this.props.icon;
  }

  get featured(): boolean {
    return this.props.featured;
  }

  public isTechSkill(): boolean {
    return ['frontend', 'backend', 'database', 'devops'].includes(this.props.category);
  }

  public isBusinessSkill(): boolean {
    return ['bi-tools', 'data-analysis', 'soft-skills', 'business'].includes(this.props.category);
  }

  public getProficiencyPercentage(): number {
    const mapping: Record<ProficiencyLevel, number> = {
      beginner: 25,
      intermediate: 50,
      advanced: 75,
      expert: 95,
    };
    return mapping[this.props.proficiency];
  }

  public toPlainObject(): SkillProps {
    return { ...this.props };
  }
}
