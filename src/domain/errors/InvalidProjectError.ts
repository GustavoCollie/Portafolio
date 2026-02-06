export class InvalidProjectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidProjectError';
  }
}
