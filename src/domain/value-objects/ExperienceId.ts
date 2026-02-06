import { v4 as uuidv4 } from 'uuid';

export class ExperienceId {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value?: string): ExperienceId {
    return new ExperienceId(value ?? uuidv4());
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: ExperienceId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
