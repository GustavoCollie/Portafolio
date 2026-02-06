import { pdf } from '@react-pdf/renderer';
import { PdfGeneratorService } from '../../../domain/ports/output/PdfGeneratorService';
import { ResumeData } from '../../../application/dtos/ResumeData';
import { ResumeDocument } from './templates/ResumeDocument';

/**
 * Infrastructure Adapter: React-PDF based PDF Generator
 * Implements the PdfGeneratorService port using @react-pdf/renderer.
 * This adapter can be replaced with jsPDF, Puppeteer, or any other PDF library.
 */
export class ReactPdfGeneratorService implements PdfGeneratorService {
  async generateResume(data: ResumeData): Promise<Blob> {
    const document = ResumeDocument({ data });
    const blob = await pdf(document as any).toBlob();
    return blob;
  }

  async downloadResume(data: ResumeData, filename: string): Promise<void> {
    const blob = await this.generateResume(data);
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  async generatePreview(data: ResumeData): Promise<string> {
    const blob = await this.generateResume(data);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
