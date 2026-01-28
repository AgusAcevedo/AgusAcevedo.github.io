export const es = {
  // ============================================
  // INFORMACIÓN PERSONAL - Edita estos datos
  // ============================================
  personal: {
    name: 'Agustin Ezequiel Acevedo',
    firstName: 'Agustin',
    lastName: 'Acevedo',
    nickname: 'Agus',
    email: 'agus.acevedo2000@gmail.com',
    phone: '', // Opcional: '+54 11 1234-5678'
    location: 'Buenos Aires, Argentina',
    jobTitle: 'Cloud Engineer | Platform Engineer',
    currentCompany: 'Arcos Dorados',
    // URLs y redes sociales
    siteUrl: 'https://agusacevedo.com.ar/',
    linkedin: 'https://linkedin.com/in/agustinezequielacevedo',
    github: 'https://github.com/AgusAcevedo',
    twitter: '', // Opcional: 'https://twitter.com/usuario'
    // Imágenes
    profileImage: '/agus.webp', //'/me.png',
    ogImage: '/agus.webp',
    favicon: '/favicon.svg',
    // Educación
    university: 'UADE',
    degree: 'Ingeniería Informática',
    // Skills para schema.org
    skills: [
      'Cloud Computing',
      'Platform Engineering',
      'Infrastructure Engineering',
      'DevOps',
      'AWS',
      'Azure',
      'Kubernetes',
      'Docker',
      'Terraform',
      'Ansible',
      'Python',
      'Automatización',
    ],
    // Colores del tema
    themeColor: '#7c3aed',
  },

  // Header
  nav: {
    about: 'Sobre mí',
    experience: 'Experiencia',
    education: 'Educación',
    stack: 'Stack',
    projects: 'Certificados',
    myProjects: 'Proyectos',
    blog: 'Blog',
    certifications: 'Certificados',
    contact: 'Contacto',
  },

  // Hero
  hero: {
    greeting: 'Hola, soy',
    available: 'Disponible para trabajar',
    description: '<strong>Cloud & Platform Engineer</strong> con experiencia en diseño, automatización y operación de infraestructura IT para <strong>entornos corporativos de gran escala</strong> en Latinoamérica y Caribe.',
    contact: 'Contáctame',
    cv: 'Descargar CV',
  },

  // Education
  education: {
    title: 'Educación',
    items: [
      {
        institution: 'UADE',
        degree: 'Ingeniería Informática',
        field: 'Ciencias de la Computación',
        date: '2025 - 2028 (en curso)',
      },
    //   {
    //     institution: 'Universidad Tecnológica Nacional',
    //     degree: 'Ingeniería en Sistemas',
    //     field: 'Ingeniería de Sistemas',
    //     date: '2019 - 2021',
    //   },
      {
        institution: 'Casa Salesiana Pio IX',
        degree: 'Técnico en Electrónica',
        field: 'Electrónica y Comunicaciones',
        date: '2013 - 2018',
      },
    ],
  },

  // Experience
  experience: {
    title: 'Experiencia laboral',
    present: 'Actualidad',
    jobs: [
      {
        date: 'Julio 2024 - Presente',
        title: 'Cloud Engineer',
        company: 'Arcos Dorados',
        description: 'Miembro del equipo de Ingeniería, responsable del diseño, operación y evolución de plataformas e infraestructura IT para entornos corporativos de gran escala. Gestión de infraestructura multi-cloud y on-premise (AWS, Azure, OCI, VMware vCenter). Diseño y despliegue de arquitecturas escalables y altamente disponibles. Uso de herramientas de IaC (Terraform, CloudFormation, CDK). Automatización operativa con Python, Bash, PowerShell, Jenkins y Ansible. Desarrollo de soluciones en Python para automatización de procesos del equipo. Contenerización y operación de soluciones con Docker y Kubernetes. Gestión de bases de datos, redes y control de accesos (RBAC/IAM). Optimización de costos, billing y prácticas de cost savings. Cumplimiento de estándares corporativos, seguridad y compliance. Trabajo colaborativo con equipos multidisciplinarios para soporte a mercados de Latinoamérica y Caribe.',
      },
      {
        date: 'Abril 2023 - Junio 2024',
        title: 'Administrador de Sistemas',
        company: 'UTN BA',
        description: 'Integrante del área de Administración de Sistemas, Redes e Infraestructura, responsable de la operación integral de los datacenters de la institución. Administración de virtualización con OpenNebula y gestión de infraestructura on-premise e híbrida con ARSAT. Implementación de prácticas DevOps, pipelines CI/CD con Jenkins y GitLab Runners. Automatización con SaltStack. Migración de aplicaciones monolíticas a arquitecturas containerizadas con Docker, Kubernetes y Traefik. Plataformas de monitoreo con Prometheus, InfluxDB y Grafana.',
      },
      {
        date: 'Abril 2021 - Marzo 2023',
        title: 'Técnico de Soporte IT',
        company: 'UTN BA',
        description: 'Integrante del área de Soporte Técnico, brindando asistencia a usuarios y asegurando la continuidad operativa de los sistemas informáticos. Atención y resolución de incidentes de hardware, software y conectividad. Estandarización y despliegue de imágenes Windows, clonado de equipos por red con Clonezilla. Gestión de dominio, políticas y recursos compartidos. Uso de herramientas de inventario como NetBox y GLPI. Documentación de procedimientos y buenas prácticas.',
      },
      {
        date: 'Julio 2018 - Diciembre 2018',
        title: 'Pasante Soporte Técnico',
        company: 'Casa Salesiana Pio IX',
        description: 'Instalación y activación de programas. Mantenimiento preventivo de redes informáticas. Reparación de PCs defectuosas y control del funcionamiento de equipos. Diseño, reparación y armado de amplificadores de audio.',
      },
    ],
  },

  // Projects/Certifications
  projects: {
    title: 'Certificaciones y Badges',
    filters: {
      featured: 'Destacados',
      cloud: 'Cloud',
      backend: 'Backend',
      python: 'Python',
      networks: 'Redes',
      security: 'Seguridad',
      other: 'Otros',
      all: 'Todos',
    },
    viewCertificate: 'Ver certificado',
    filterByCategory: 'Filtrar certificaciones por categoría',
    filterBy: 'Filtrar por',
    loading: 'Cargando certificaciones...',
    modal: {
      close: 'Cerrar',
      issuedBy: 'Emitido por',
    },
  },

  // Stack
  stack: {
    title: 'Stack Tecnológico',
    description: 'Tecnologías y herramientas que utilizo en mi día a día',
    categories: {
      virtualization: 'Virtualización',
      os: 'Sist. Operativos',
      cloud: 'Cloud',
      containers: 'Contenedores',
      databases: 'Bases de datos',
      monitoring: 'Monitoreo',
      automation: 'Automatización',
      webservers: 'Web & Balanceo',
    },
  },

  // About
  about: {
    title: 'Sobre mí',
    content: [
      '¡Hola, soy Agus! Soy <strong>Cloud & Platform Engineer</strong> con experiencia en diseño, automatización y operación de infraestructura IT para entornos corporativos de gran escala.',
      'Actualmente formo parte del equipo de Ingeniería en <strong>Arcos Dorados</strong>, donde trabajo en la definición, despliegue y operación de arquitecturas sobre infraestructura multi-cloud y on-premise, aplicando prácticas DevOps orientadas a la automatización operativa, confiabilidad y escalabilidad de las plataformas. Además, desarrollo soluciones internas enfocadas en optimizar procesos operativos y flujos de trabajo.',
      'Mi interés por la tecnología comenzó desde una edad temprana. Esta pasión me llevó a estudiar para ser <strong>técnico electrónico en la secundaria</strong>, y finalmente, me guió hacia la ingeniería informática. Empecé mi carrera profesional trabajando en el área de soporte IT, donde pude desarrollar una base sólida en infraestructura y sistemas.',
      'Mis áreas de trabajo e interés principal son <strong>Cloud Computing, Platform Engineering, Infrastructure Engineering, DevOps, Automatización y Arquitecturas Distribuidas</strong>. Busco constantemente ampliar mis conocimientos y enfrentar nuevos desafíos.',
    ],
    stats: {
      yearsInIT: {
        value: '7+',
        label: 'Años en IT',
      },
      courseCertificates: {
        value: '30+',
        label: 'Certificados',
      },
      // Descomentar cuando tengas certificaciones de pago
      // certifications: {
      //   value: '5+',
      //   label: 'Certificaciones',
      // },
    },
  },

  // Blog
  blog: {
    title: 'Blog',
    read: 'lectura',
    viewMore: 'Ver más artículos',
    noArticles: 'No hay artículos disponibles en este momento.',
  },

  // My Projects
  myProjects: {
    title: 'Proyectos',
    items: [
      {
        id: 'container-migration',
        title: 'Migración de Sistemas a Arquitecturas Containerizadas',
        shortDescription: 'Migración de aplicaciones académicas desde VMs hacia arquitecturas basadas en contenedores con Docker Swarm y Kubernetes.',
        description: `
          <p>Participé en la migración de aplicaciones académicas e internas desde entornos tradicionales sobre máquinas virtuales hacia arquitecturas basadas en contenedores.</p>
          <p class="mt-4">Se trabajó tanto con arquitecturas monolíticas como con arquitecturas distribuidas basadas en microservicios, implementando automatización de despliegues y mantenimiento mediante pipelines de CI/CD.</p>
          <p class="mt-4">Para los entornos de testing se diseñaron esquemas de alta disponibilidad utilizando Docker Swarm distribuidos entre ambos datacenters. Además, se implementó un repositorio privado de imágenes para estandarizar y asegurar los despliegues.</p>
          <p class="mt-4">Se desplegó un cluster de kubernetes con kubeadm para pruebas iniciales de entornos de desarrollo y evaluación de funcionamiento.</p>
          <p class="mt-4"><strong>Período:</strong> Enero 2023 - Enero 2024</p>
          <p><strong>Asociado con:</strong> UTN Buenos Aires</p>
        `,
        tags: ['Docker', 'Docker Swarm', 'Kubernetes', 'Jenkins', 'GitLab CI/CD', 'Harbor'],
        image: '/projects/container-migration.webp',
        github: '',
        demo: '',
      },
      {
        id: 'observability-system',
        title: 'Implementación Sistema de Observabilidad y Alertas',
        shortDescription: 'Plataforma integral de observabilidad para monitoreo de infraestructura, servicios y centralización de logs.',
        description: `
          <p>Participé en la implementación de una plataforma integral de observabilidad para los sistemas de la facultad y el equipamiento de los datacenters.</p>
          <p class="mt-4">La solución brindó visibilidad sobre el estado y rendimiento de la infraestructura, incluyendo métricas de servidores físicos y virtuales, contenedores, virtualizadores, redes, UPS, temperaturas de equipos y métricas de servicios críticos.</p>
          <p class="mt-4">Se diseñó un sistema de alertas proactivas y automatizaciones para la detección temprana y remediación inicial de incidentes, mejorando la disponibilidad y reduciendo tiempos de respuesta.</p>
          <p class="mt-4">Además, se implementó una plataforma de centralización y consulta de logs, permitiendo a los equipos de desarrollo acceder a logs de entornos de desarrollo, testing y QA sin necesidad de acceso directo a servidores o contenedores.</p>
          <p class="mt-4"><strong>Período:</strong> Enero 2023 - Enero 2024</p>
          <p><strong>Asociado con:</strong> UTN Buenos Aires</p>
        `,
        tags: ['Grafana', 'Prometheus', 'InfluxDB', 'Telegraf', 'Loki', 'cAdvisor'],
        image: '/projects/observability-system.webp',
        github: '',
        demo: '',
      },
      {
        id: 'opennebula-cluster',
        title: 'Cluster de Virtualización con OpenNebula y Alta Disponibilidad',
        shortDescription: 'Diseño y actualización de plataforma de virtualización institucional con OpenNebula, implementando alta disponibilidad.',
        description: `
          <p>Participé en el diseño, despliegue y evolución de la plataforma de virtualización institucional, basada en OpenNebula, utilizada como infraestructura core para los sistemas académicos y administrativos.</p>
          <p class="mt-4">En el datacenter principal se implementó un cluster de testing compuesto por servidores Dell PowerEdge y storage externo conectado por fibra, validando esquemas de alta disponibilidad ante fallas de nodos.</p>
          <p class="mt-4">Posteriormente, se llevó a cabo la actualización del cluster productivo desde OpenNebula 5.x a la versión 6.12, incorporando alta disponibilidad al cluster, ampliando la capacidad con nuevos nodos y asegurando la continuidad operativa de todos los sistemas durante el proceso.</p>
          <p class="mt-4"><strong>Período:</strong> Enero 2023 - Enero 2024</p>
          <p><strong>Asociado con:</strong> UTN Buenos Aires</p>
        `,
        tags: ['OpenNebula', 'Dell PowerEdge', 'Alta Disponibilidad', 'Storage', 'Virtualización'],
        image: '/projects/opennebula-cluster.webp',
        github: '',
        demo: '',
      },
      {
        id: 'homelab',
        title: 'Homelab de Investigación y Automatización',
        shortDescription: 'Laboratorio personal con cluster de virtualización, Kubernetes y automatización mediante IaC (Terraform, Ansible, Packer).',
        description: `
          <p>Diseño y operación de un homelab personal orientado a pruebas, investigación y validación de tecnologías de infraestructura, cloud y automatización.</p>
          <p class="mt-4">El entorno está compuesto por un cluster de virtualización de 3 nodos con alta disponibilidad, infraestructura de red segmentada mediante VLANs, almacenamiento centralizado y un cluster de Kubernetes liviano para workloads de laboratorio basado en k3s.</p>
          <p class="mt-4">La infraestructura es administrada mediante Infraestructura como Código con terraform y terragrunt; automatización con ansible y finalmente generación automática de templates de sistemas operativos con Packer.</p>
          <p class="mt-4"><strong>Período:</strong> Enero 2023 - Presente</p>
          <p><strong>Proyecto personal</strong></p>
        `,
        tags: ['Proxmox VE', 'UniFi', 'TrueNAS', 'Terraform', 'Ansible', 'Packer', 'K3s'],
        image: '/projects/homelab.webp',
        github: '',
        demo: '',
      },
    ],
    modal: {
      close: 'Cerrar',
      technologies: 'Tecnologías',
      repository: 'Ver repositorio',
      demo: 'Ver demo',
    },
  },

  // Footer
  footer: {
    madeWith: 'Hecho con',
  },

  // Common
  common: {
    loading: 'Cargando...',
    error: 'Error',
    close: 'Cerrar',
    open: 'Abrir',
    more: 'Más',
  },

  // SEO
  seo: {
    title: 'Agustin Ezequiel Acevedo | Cloud Engineer',
    description: 'Cloud & Platform Engineer especializado en DevOps, automatización y administración de infraestructura. +3 años de experiencia.',
    keywords: 'DevOps, SysAdmin, Cloud Computing, AWS, GCP, Kubernetes, Docker, CI/CD, Terraform, Ansible, Linux, Cloud Engineer, Platform Engineer',
    ogTitle: 'Agustin Ezequiel Acevedo - Cloud Engineer',
    ogDescription: 'Portfolio profesional de Agustin Ezequiel Acevedo. Especializado en DevOps, automatización de infraestructura y Cloud Computing.',
  },
};

export type Translations = typeof es;
