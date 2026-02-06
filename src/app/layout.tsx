import type { Metadata } from 'next';
import '../presentation/styles/globals.css';

export const metadata: Metadata = {
  title: 'Portfolio | Full Stack Developer & BI Analyst',
  description: 'Professional portfolio showcasing expertise in full stack development and business intelligence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
