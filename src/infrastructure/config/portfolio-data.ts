export const portfolioData = {
  profile: {
    fullName: "Gustavo Márquez",
    title: "Desarrollador & Negocios Internacionales",
    subtitle: "Desarrollador Full Stack & Especialista en Finanzas",
    email: "gustavosmarquezmedina@gmail.com",
    phone: "(51) 990 055 355",
    location: "Ica, Perú",
    summary: "Profesional híbrido que integra ingeniería de software y estrategia de negocios. Como Desarrollador, creo soluciones ERP y plataformas cloud escalables que optimizan operaciones agroexportadoras. Como Especialista en Comercio Exterior y Finanzas, aplico visión estratégica para abrir mercados internacionales y maximizar rentabilidad. Experto en transformar necesidades complejas de negocio en productos tecnológicos de alto impacto (Full Stack, IA, Data Analytics).",
    avatarUrl: "/assets/images/profile-portrait.jpg",
    education: [
      {
        institution: "Universidad Nacional San Luis Gonzaga de Ica",
        degree: "Bachiller",
        field: "Negocios Internacionales",
        startYear: 2016,
        endYear: 2020,
      },
      {
        institution: "IAT-SUNAT",
        degree: "Especialización",
        field: "Representante Aduanero",
        startYear: 2023,
        endYear: 2023,
      },
      {
        institution: "CAMEX",
        degree: "Experto",
        field: "Exportaciones e Importaciones",
        startYear: 2023,
        endYear: 2023,
      }
    ],
    certifications: [
      {
        name: "Ingeniería de Prompts en IA",
        issuer: "Especialización Aplicada",
        issueDate: "2024-01-01",
      },
      {
        name: "Manejo avanzado de Power BI",
        issuer: "Microsoft Certified",
        issueDate: "2023-01-01",
      },
      {
        name: "Sistema ERP NISIRA",
        issuer: "Certificación NISIRA",
        issueDate: "2021-01-01",
      }
    ],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Intermedio (40%)" }
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/gustavosmarquez/",
      github: "https://github.com/GustavoCollie",
      email: "mailto:gustavosmarquezmedina@gmail.com"
    }
  },
  experiences: [
    {
      id: "exp-1",
      company: "COLLIE VALLEY S.A.C.",
      role: "Desarrollador & Gerente de Comercio",
      description: "Liderazgo dual: Desarrollo tecnológico de ERP propio y gestión comercial de exportaciones.",
      type: "hybrid",
      startDate: "2025-01-01",
      endDate: "2025-08-31",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS", "IA", "Excel Avanzado"],
      achievements: [
        "Lideré el desarrollo Full Stack de 'Collie App', un ERP agrícola de 7 módulos (Comercial, Producción, Logística, Finanzas, RRHH, Calidad)",
        "Dirigí la estrategia comercial de exportaciones de palta Hass a China, Japón y Canadá",
        "Implementé automatización de análisis de mercado con IA e ingeniería de prompts",
        "Desarrollé modelos financieros para control de rentabilidad por contenedor en tiempo real"
      ],
      kpis: [
        { label: "ERP", value: "7 Módulos", improvement: "100% In-house" },
        { label: "Mercados", value: "3", improvement: "Expansión" }
      ],
    },
    {
      id: "exp-2",
      company: "AGROEXPORTADORA VALLE ENCANTADO S.A.C.",
      role: "Gerente de Comercio y Finanzas",
      description: "Gestión financiera y coordinación logística de exportaciones e importaciones.",
      type: "business",
      startDate: "2023-12-01",
      endDate: "2024-11-30",
      technologies: ["Finanzas", "Logística", "Market Analysis", "Incoterms"],
      achievements: [
        "Elaboré proyecciones financieras y análisis de rentabilidad por mercado y producto",
        "Optimicé el flujo de caja y reduje costos logísticos mediante nuevos procesos financieros",
        "Coordiné exportaciones marítimas y aéreas bajo Incoterms FOB y CIF",
        "Planifiqué importaciones de insumos optimizando precios y tiempos de entrega"
      ],
      kpis: [
        { label: "Costos logísticos", value: "Reducción", improvement: "Optimizado" },
        { label: "Flujo caja", value: "Eficiente", improvement: "Optimizado" }
      ],
      certificates: ["/certificates/agroexportadora-valle-encantado-certificate.jpg"]
    },
    {
      id: "exp-3",
      company: "AGRÍCOLA DEL SUR E.I.R.L.",
      role: "Especialista en Comercio Exterior",
      description: "Control logístico y negociación con proveedores internacionales.",
      type: "business",
      startDate: "2022-04-01",
      endDate: "2023-07-31",
      technologies: ["Sourcing", "Logistics", "Negotiation", "Customs"],
      achievements: [
        "Control de costos logísticos y aduaneros para optimizar la cadena de suministro",
        "Negociación con proveedores logísticos para mejorar tiempos y tarifas de flete",
        "Gestión integral de embarques marítimos y aéreos asegurando requisitos fitosanitarios",
        "Planificación de importación de insumos agrícolas con optimización de tiempos"
      ],
      kpis: [
        { label: "Tarifas flete", value: "Competitivas", improvement: "-15%" },
        { label: "Cumplimiento", value: "100%", improvement: "Fitosanitario" }
      ],
      certificates: ["/certificates/agricola-sur-certificate.jpg"]
    },
    {
      id: "exp-4",
      company: "GREENFIELDS MINERALS",
      role: "Asistente de Exportaciones",
      description: "Administración de regímenes aduaneros y recuperación de impuestos.",
      type: "business",
      startDate: "2021-12-01",
      endDate: "2022-08-31",
      technologies: ["DRAWBACK", "VUCE", "Export Docs", "Tax Recovery"],
      achievements: [
        "Administré el régimen DRAWBACK logrando la recuperación eficiente de impuestos",
        "Supervisé protocolos de embarque y certificados de origen vía plataforma VUCE",
        "Coordiné logística de exportaciones bajo Incoterms FOB y CIF",
        "Ejecuté importaciones de materiales optimizando la cadena de valor"
      ],
      kpis: [
        { label: "DRAWBACK", value: "Recuperado", improvement: "Eficiente" },
        { label: "VUCE", value: "Digital", improvement: "Automatizado" }
      ],
      certificates: ["/certificates/greenfields-certificate.jpg"]
    },
    {
      id: "exp-5",
      company: "GREENVIC S.A.",
      role: "Analista de Producción",
      description: "Control de producción y costos operativos.",
      type: "business",
      startDate: "2020-04-01",
      endDate: "2021-02-28",
      technologies: ["NISIRA", "Production Control", "Costs", "Inventory"],
      achievements: [
        "Control de producción y costos en la exportación de uva fresca",
        "Manejo del sistema ERP NISIRA para control de inventarios y procesos productivos",
        "Seguimiento de KPIS de producción para asegurar estándares de exportación"
      ],
      kpis: [
        { label: "Sistema ERP", value: "NISIRA", improvement: "Control Total" },
        { label: "Merma", value: "Mínima", improvement: "Reducida" }
      ],
      certificates: ["/certificates/greenvic-certificate.jpg"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Collie App - ERP Agrícola",
      description: "Sistema integral de gestión para agronegocios con 7 módulos: Comercial, Producción, Logística, Finanzas, RRHH y Calidad. Desarrollado in-house.",
      category: "fullstack",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      imageUrl: "/assets/images/collie-erp-new.png",
      featured: true,
      metrics: [
        { label: "Módulos", value: "7" },
        { label: "Gestión", value: "Integral" }
      ],
      startDate: "2025-01-01",
      link: "https://qapp.collievalley.com/"
    },
    {
      id: "proj-2",
      title: "IcaImporta Almacén",
      description: "Gestor de datos de almacén para control de stock, insumos y trazabilidad de productos.",
      category: "fullstack",
      technologies: ["React", "Firebase", "Real-time DB"],
      imageUrl: "/assets/images/collie-inventory-new.png",
      featured: true,
      metrics: [
        { label: "Precisión", value: "100%" },
        { label: "Trazabilidad", value: "Total" }
      ],
      startDate: "2025-02-01",
      link: "https://almacenes-icaimporta.vercel.app/"
    },
    {
      id: "proj-3",
      title: "IcaImporta Store",
      description: "Plataforma de gestión de importaciones para seguimiento de órdenes, costos y proveedores internacionales.",
      category: "fullstack",
      technologies: ["Next.js", "TypeScript", "Tailwind"],
      imageUrl: "/assets/images/collie-import.png",
      featured: true,
      metrics: [
        { label: "Control", value: "Costos" },
        { label: "Tracking", value: "Live" }
      ],
      startDate: "2025-03-01",
      link: "https://icaimporta-pe.vercel.app/"
    }
  ],
  skills: [
    {
      id: "skill-frontend-1",
      name: "React.js & Next.js",
      category: "frontend",
      proficiency: "expert",
      yearsOfExperience: 1,
      icon: "layout",
      featured: true
    },
    {
      id: "skill-frontend-2",
      name: "TypeScript",
      category: "frontend",
      proficiency: "advanced",
      yearsOfExperience: 1,
      icon: "code",
      featured: true
    },
    {
      id: "skill-frontend-js",
      name: "JavaScript (ES6+)",
      category: "frontend",
      proficiency: "expert",
      yearsOfExperience: 1,
      icon: "javascript",
      featured: false
    },
    {
      id: "skill-frontend-3",
      name: "Tailwind CSS",
      category: "frontend",
      proficiency: "expert",
      yearsOfExperience: 1,
      icon: "palette",
      featured: true
    },
    {
      id: "skill-frontend-4",
      name: "HTML5 & CSS3",
      category: "frontend",
      proficiency: "expert",
      yearsOfExperience: 1,
      icon: "globe",
      featured: false
    },
    {
      id: "skill-backend-1",
      name: "FastAPI & Python",
      category: "backend",
      proficiency: "advanced",
      yearsOfExperience: 2,
      icon: "python",
      featured: true
    },
    {
      id: "skill-backend-2",
      name: "Node.js & Express",
      category: "backend",
      proficiency: "advanced",
      yearsOfExperience: 2,
      icon: "nodejs",
      featured: false
    },
    {
      id: "skill-backend-3",
      name: "APIs REST & GraphQL",
      category: "backend",
      proficiency: "expert",
      yearsOfExperience: 2,
      icon: "server",
      featured: true
    },
    {
      id: "skill-backend-4",
      name: "Security (JWT/OWASP)",
      category: "backend",
      proficiency: "advanced",
      yearsOfExperience: 1,
      icon: "shield",
      featured: false
    },
    {
      id: "skill-backend-5",
      name: "Microservices & Events",
      category: "architecture",
      proficiency: "advanced",
      yearsOfExperience: 1,
      icon: "cpu",
      featured: false
    },
    {
      id: "skill-db-1",
      name: "PostgreSQL & SQL",
      category: "database",
      proficiency: "expert",
      yearsOfExperience: 2,
      icon: "database",
      featured: true
    },
    {
      id: "skill-db-2",
      name: "Redis & Caching",
      category: "database",
      proficiency: "intermediate",
      yearsOfExperience: 2,
      icon: "lightning",
      featured: false
    },

    {
      id: "skill-devops-1",
      name: "Git & GitHub Actions",
      category: "devops",
      proficiency: "expert",
      yearsOfExperience: 2,
      icon: "github",
      featured: true
    },
    {
      id: "skill-arch-1",
      name: "SOLID Principles",
      category: "backend",
      proficiency: "advanced",
      yearsOfExperience: 1,
      icon: "solid",
      featured: true
    },
    {
      id: "skill-arch-2",
      name: "Hexagonal Architecture",
      category: "backend",
      proficiency: "advanced",
      yearsOfExperience: 1,
      icon: "hexagonal",
      featured: true
    },
    {
      id: "skill-method-1",
      name: "Scrum & Agile",
      category: "soft-skills",
      proficiency: "advanced",
      yearsOfExperience: 2,
      icon: "scrum",
      featured: true
    },

    {
      id: "skill-soft-1",
      name: "Liderazgo Técnico",
      category: "soft-skills",
      proficiency: "expert",
      yearsOfExperience: 2,
      icon: "users",
      featured: true
    },
    {
      id: "skill-soft-2",
      name: "Resolución de Problemas",
      category: "soft-skills",
      proficiency: "expert",
      yearsOfExperience: 2,
      icon: "puzzle",
      featured: false
    },
    {
      id: "skill-business-1",
      name: "Comercio Exterior",
      category: "business",
      proficiency: "expert",
      yearsOfExperience: 2,
      icon: "ship",
      featured: true
    },
    {
      id: "skill-business-2",
      name: "Planeación Financiera",
      category: "business",
      proficiency: "advanced",
      yearsOfExperience: 2,
      icon: "calculator",
      featured: true
    },
    {
      id: "skill-tech-3",
      name: "IA & Prompt Engineering",
      category: "tech",
      proficiency: "advanced",
      yearsOfExperience: 2,
      icon: "brain",
      featured: true
    },
    {
      id: "skill-business-3",
      name: "Sistema ERP NISIRA",
      category: "business",
      proficiency: "advanced",
      yearsOfExperience: 2,
      icon: "settings",
      featured: true
    },
    {
      id: "skill-tech-4",
      name: "Power BI & Excel",
      category: "data-analysis",
      proficiency: "expert",
      yearsOfExperience: 2,
      icon: "bar-chart",
      featured: true
    },
    {
      id: "skill-business-4",
      name: "Regímenes Aduaneros (DRAWBACK)",
      category: "business",
      proficiency: "expert",
      yearsOfExperience: 2,
      icon: "file-text",
      featured: false
    }
  ]
};
