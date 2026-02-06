import { useState, useEffect, useCallback } from 'react';
import { getPortfolioDataUseCase, generateResumeUseCase } from '../../infrastructure/config/container';
import { PortfolioData } from '../../domain/ports/input/GetPortfolioDataUseCase';
import { ResumeOptions } from '../../domain/ports/input/GenerateResumeUseCase';

interface UsePortfolioResult {
  data: PortfolioData | null;
  isLoading: boolean;
  error: Error | null;
  downloadResume: (options?: Partial<ResumeOptions>) => Promise<void>;
  isDownloading: boolean;
}

const defaultResumeOptions: ResumeOptions = {
  includePhoto: false,
  includeTechSkills: true,
  includeBusinessSkills: true,
  includeProjects: true,
  template: 'modern',
};

/**
 * Custom Hook: Portfolio Data Access
 * Provides a clean interface for UI components to access portfolio data
 * and trigger resume generation without knowing about the underlying architecture.
 */
export function usePortfolio(): UsePortfolioResult {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setIsLoading(true);
        const portfolioData = await getPortfolioDataUseCase.execute();
        setData(portfolioData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load portfolio data'));
      } finally {
        setIsLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  const downloadResume = useCallback(async (options?: Partial<ResumeOptions>) => {
    try {
      setIsDownloading(true);
      const mergedOptions = { ...defaultResumeOptions, ...options };
      await generateResumeUseCase.download(mergedOptions);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to generate resume'));
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    downloadResume,
    isDownloading,
  };
}
