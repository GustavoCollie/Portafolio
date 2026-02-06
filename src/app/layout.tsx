import type { Metadata, Viewport } from 'next';
import '../presentation/styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e1b4b',
};

export const metadata: Metadata = {
  title: 'Gustavo Márquez | Desarrollador Full Stack & Negocios Internacionales',
  description: 'Portafolio profesional de Gustavo Márquez. Desarrollador Full Stack (React, Next.js, Node.js, PostgreSQL) y Especialista en Comercio Exterior y Finanzas. Ica, Perú.',
  keywords: ['Desarrollador Full Stack', 'React', 'Next.js', 'Node.js', 'TypeScript', 'Comercio Exterior', 'Negocios Internacionales', 'Portafolio', 'Gustavo Márquez'],
  authors: [{ name: 'Gustavo Márquez' }],
  openGraph: {
    title: 'Gustavo Márquez | Desarrollador Full Stack & Negocios Internacionales',
    description: 'Profesional híbrido que integra ingeniería de software y estrategia de negocios. ERP, plataformas cloud y comercio exterior.',
    type: 'website',
    locale: 'es_PE',
    images: [{ url: '/assets/images/profile-portrait.jpg', width: 400, height: 400, alt: 'Gustavo Márquez' }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
