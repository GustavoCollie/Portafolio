export class InvalidExperienceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidExperienceError';
  }
}
