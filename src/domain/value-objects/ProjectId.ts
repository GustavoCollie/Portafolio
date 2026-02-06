import { v4 as uuidv4 } from 'uuid';

export class ProjectId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value?: string): ProjectId {
    return new ProjectId(value ?? uuidv4());
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: ProjectId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
