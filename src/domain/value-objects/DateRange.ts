import { InvalidDateRangeError } from '../errors/InvalidDateRangeError';

export class DateRange {
  private readonly startDate: Date;
  private readonly endDate: Date | null;

  private constructor(startDate: Date, endDate: Date | null) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  public static create(startDate: Date, endDate?: Date | null): DateRange {
    if (endDate && startDate > endDate) {
      throw new InvalidDateRangeError('Start date must be before end date');
    }
    return new DateRange(startDate, endDate ?? null);
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  public getEndDate(): Date | null {
    return this.endDate;
  }

  public isOngoing(): boolean {
    return this.endDate === null;
  }

  public getDurationInMonths(): number {
    const end = this.endDate ?? new Date();
    const months =
      (end.getFullYear() - this.startDate.getFullYear()) * 12 +
      (end.getMonth() - this.startDate.getMonth());
    return Math.max(1, months);
  }

  public format(locale = 'en-US'): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    const start = this.startDate.toLocaleDateString(locale, options);
    const end = this.endDate
      ? this.endDate.toLocaleDateString(locale, options)
      : 'Present';
    return `${start} - ${end}`;
  }
}
