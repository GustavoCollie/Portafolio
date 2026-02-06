/**
 * Output Port: Analytics Service interface
 * Tracks user interactions for portfolio insights
 */
export interface AnalyticsEvent {
  category: 'resume' | 'project' | 'contact' | 'navigation';
  action: string;
  label?: string;
  value?: number;
}

export interface AnalyticsService {
  trackEvent(event: AnalyticsEvent): void;
  trackPageView(path: string): void;
  trackResumeDownload(format: 'pdf' | 'print'): void;
  trackProjectView(projectId: string): void;
}
