export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  gpa?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: Date;
  expirationDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface ProfileProps {
  fullName: string;
  title: string;
  subtitle: string;
  email: string;
  phone?: string;
  location: string;
  summary: string;
  avatarUrl?: string;
  education: Education[];
  certifications: Certification[];
  languages: { name: string; level: string }[];
  socialLinks: SocialLinks;
}

export class Profile {
  private readonly props: ProfileProps;

  private constructor(props: ProfileProps) {
    this.props = props;
  }

  public static create(props: ProfileProps): Profile {
    return new Profile(props);
  }

  get fullName(): string {
    return this.props.fullName;
  }

  get title(): string {
    return this.props.title;
  }

  get subtitle(): string {
    return this.props.subtitle;
  }

  get email(): string {
    return this.props.email;
  }

  get phone(): string | undefined {
    return this.props.phone;
  }

  get location(): string {
    return this.props.location;
  }

  get summary(): string {
    return this.props.summary;
  }

  get avatarUrl(): string | undefined {
    return this.props.avatarUrl;
  }

  get education(): Education[] {
    return this.props.education;
  }

  get certifications(): Certification[] {
    return this.props.certifications;
  }

  get languages(): { name: string; level: string }[] {
    return this.props.languages;
  }

  get socialLinks(): SocialLinks {
    return this.props.socialLinks;
  }

  public getActiveCertifications(): Certification[] {
    const now = new Date();
    return this.props.certifications.filter(
      (cert) => !cert.expirationDate || cert.expirationDate > now
    );
  }

  public toPlainObject(): ProfileProps {
    return { ...this.props };
  }
}
