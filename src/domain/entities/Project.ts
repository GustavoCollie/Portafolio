import { ProjectId } from '../value-objects/ProjectId';
import { InvalidProjectError } from '../errors/InvalidProjectError';

export type ProjectCategory = 'fullstack' | 'frontend' | 'backend' | 'bi' | 'data';

export interface ProjectProps {
  id: ProjectId;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  startDate: Date;
  endDate?: Date;
}

export class Project {
  private readonly props: ProjectProps;

  private constructor(props: ProjectProps) {
    this.props = props;
  }

  public static create(props: ProjectProps): Project {
    Project.validate(props);
    return new Project(props);
  }

  private static validate(props: ProjectProps): void {
    if (!props.title || props.title.trim().length === 0) {
      throw new InvalidProjectError('Project title is required');
    }
    if (!props.technologies || props.technologies.length === 0) {
      throw new InvalidProjectError('At least one technology is required');
    }
  }

  get id(): ProjectId {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get category(): ProjectCategory {
    return this.props.category;
  }

  get technologies(): string[] {
    return this.props.technologies;
  }

  get repositoryUrl(): string | undefined {
    return this.props.repositoryUrl;
  }

  get liveUrl(): string | undefined {
    return this.props.liveUrl;
  }

  get imageUrl(): string | undefined {
    return this.props.imageUrl;
  }

  get featured(): boolean {
    return this.props.featured;
  }

  get metrics(): { label: string; value: string }[] {
    return this.props.metrics ?? [];
  }

  public isDataRelated(): boolean {
    return this.props.category === 'bi' || this.props.category === 'data';
  }

  public toPlainObject(): ProjectProps {
    return { ...this.props };
  }
}
