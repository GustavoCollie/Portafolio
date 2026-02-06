import { ResumeData } from '../../../application/dtos/ResumeData';

/**
 * Output Port: PDF Generator Service interface
 * This port defines the contract for PDF generation.
 * The domain/application layer depends on this abstraction,
 * allowing different implementations (@react-pdf/renderer, jsPDF, server-side, etc.)
 */
export interface PdfGeneratorService {
  /**
   * Generates a PDF resume from the provided resume data
   * @param data - The structured resume data to render
   * @returns A Promise that resolves to the PDF as a Blob
   */
  generateResume(data: ResumeData): Promise<Blob>;

  /**
   * Generates a PDF resume and triggers a download in the browser
   * @param data - The structured resume data to render
   * @param filename - The name of the downloaded file
   */
  downloadResume(data: ResumeData, filename: string): Promise<void>;

  /**
   * Generates a base64 encoded PDF for preview
   * @param data - The structured resume data to render
   * @returns A Promise that resolves to the PDF as a base64 string
   */
  generatePreview(data: ResumeData): Promise<string>;
}
