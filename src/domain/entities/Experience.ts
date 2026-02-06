import { ExperienceId } from '../value-objects/ExperienceId';
import { DateRange } from '../value-objects/DateRange';
import { InvalidExperienceError } from '../errors/InvalidExperienceError';

export type ExperienceType = 'tech' | 'business' | 'hybrid';

export interface ExperienceProps {
  id: ExperienceId;
  company: string;
  role: string;
  description: string;
  type: ExperienceType;
  dateRange: DateRange;
  technologies?: string[];
  achievements: string[];
  kpis?: { label: string; value: string; improvement?: string }[];
  certificates?: string[];
}

export class Experience {
  private readonly props: ExperienceProps;

  private constructor(props: ExperienceProps) {
    this.props = props;
  }

  public static create(props: ExperienceProps): Experience {
    Experience.validate(props);
    return new Experience(props);
  }

  private static validate(props: ExperienceProps): void {
    if (!props.company || props.company.trim().length === 0) {
      throw new InvalidExperienceError('Company name is required');
    }
    if (!props.role || props.role.trim().length === 0) {
      throw new InvalidExperienceError('Role is required');
    }
    if (!props.achievements || props.achievements.length === 0) {
      throw new InvalidExperienceError('At least one achievement is required');
    }
  }

  get id(): ExperienceId {
    return this.props.id;
  }

  get company(): string {
    return this.props.company;
  }

  get role(): string {
    return this.props.role;
  }

  get description(): string {
    return this.props.description;
  }

  get type(): ExperienceType {
    return this.props.type;
  }

  get dateRange(): DateRange {
    return this.props.dateRange;
  }

  get technologies(): string[] {
    return this.props.technologies ?? [];
  }

  get achievements(): string[] {
    return this.props.achievements;
  }

  get kpis(): { label: string; value: string; improvement?: string }[] {
    return this.props.kpis ?? [];
  }

  get certificates(): string[] {
    return this.props.certificates ?? [];
  }

  public isTechRole(): boolean {
    return this.props.type === 'tech' || this.props.type === 'hybrid';
  }

  public isBusinessRole(): boolean {
    return this.props.type === 'business' || this.props.type === 'hybrid';
  }

  public getDurationInMonths(): number {
    return this.props.dateRange.getDurationInMonths();
  }

  public toPlainObject(): ExperienceProps {
    return { ...this.props };
  }
}
