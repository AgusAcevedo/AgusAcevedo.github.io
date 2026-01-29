import type { Translations } from './es';

export const en = {
  // ============================================
  // PERSONAL INFORMATION - Edit this data
  // ============================================
  personal: {
    name: 'Agustin Ezequiel Acevedo',
    firstName: 'Agustin',
    lastName: 'Acevedo',
    nickname: 'Agus',
    email: 'agus.acevedo2000@gmail.com',
    phone: '', // Optional: '+54 11 1234-5678'
    location: 'Buenos Aires, Argentina',
    jobTitle: 'Cloud Engineer | Platform Engineer',
    currentCompany: 'Arcos Dorados',
    // URLs and social networks
    siteUrl: 'https://agusacevedo.com.ar/',
    linkedin: 'https://linkedin.com/in/agustinezequielacevedo',
    github: 'https://github.com/AgusAcevedo',
    twitter: '', // Optional: 'https://twitter.com/username'
    // Images
    profileImage: '/agus.webp', //'/me.png',
    ogImage: '/android-chrome-512x512.png', // Social share image and search engines
    favicon: '/favicon.svg',
    // Education
    university: 'UADE',
    degree: 'Computer Engineering',
    // Skills for schema.org
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
      'Automation',
    ],
    // Theme colors
    themeColor: '#7c3aed',
  },

  // Header
  nav: {
    about: 'About',
    experience: 'Experience',
    education: 'Education',
    stack: 'Stack',
    projects: 'Certifications',
    myProjects: 'Projects',
    blog: 'Blog',
    certifications: 'Certifications',
    contact: 'Contact',
  },

  // Hero
  hero: {
    greeting: "Hi, I'm",
    available: 'Available for work',
    description: '<strong>Cloud & Platform Engineer</strong> with experience in design, automation, and operation of IT infrastructure for <strong>large-scale corporate environments</strong> in Latin America and the Caribbean.',
    contact: 'Contact me',
    cv: 'Download Resume',
  },

  // Education
  education: {
    title: 'Education',
    items: [
      {
        institution: 'UADE',
        degree: 'Computer Engineering',
        field: 'Computer Science',
        date: '2025 - 2028 (in progress)',
      },
    //   {
    //     institution: 'National Technological University',
    //     degree: 'Systems Engineering',
    //     field: 'Systems Engineering',
    //     date: '2019 - 2021',
    //   },
      {
        institution: 'Casa Salesiana Pio IX',
        degree: 'Electronics Technician',
        field: 'Electronics and Communications',
        date: '2013 - 2018',
      },
    ],
  },

  // Experience
  experience: {
    title: 'Work Experience',
    present: 'Present',
    jobs: [
      {
        date: 'July 2024 - Present',
        title: 'Cloud Engineer',
        company: 'Arcos Dorados',
        description: 'Member of the Engineering team, responsible for designing, operating, and evolving IT platforms and infrastructure for large-scale corporate environments. Multi-cloud and on-premise infrastructure management (AWS, Azure, OCI, VMware vCenter). Design and deployment of scalable and highly available architectures. Use of IaC tools (Terraform, CloudFormation, CDK). Operational automation with Python, Bash, PowerShell, Jenkins, and Ansible. Development of Python solutions for team process automation. Containerization and operation of solutions with Docker and Kubernetes. Database management, networking, and access control (RBAC/IAM). Cost optimization, billing, and cost savings practices. Compliance with corporate standards, security, and compliance. Collaborative work with multidisciplinary teams supporting Latin America and Caribbean markets.',
      },
      {
        date: 'April 2023 - June 2024',
        title: 'System Administrator',
        company: 'UTN BA',
        description: 'Member of the Systems, Networks and Infrastructure Administration team, responsible for the integral operation of the institution\'s datacenters. Virtualization administration with OpenNebula and on-premise/hybrid infrastructure management with ARSAT. DevOps practices implementation, CI/CD pipelines with Jenkins and GitLab Runners. Automation with SaltStack. Migration of monolithic applications to containerized architectures with Docker, Kubernetes, and Traefik. Monitoring platforms with Prometheus, InfluxDB, and Grafana.',
      },
      {
        date: 'April 2021 - March 2023',
        title: 'IT Support Technician',
        company: 'UTN BA',
        description: 'Member of the Technical Support team, providing assistance to users and ensuring operational continuity of computer systems. Resolution of hardware, software, and connectivity incidents. Windows image standardization and deployment, network cloning with Clonezilla. Domain management, policies, and shared resources. Use of inventory tools like NetBox and GLPI. Documentation of procedures and best practices.',
      },
      {
        date: 'July 2018 - December 2018',
        title: 'Technical Support Intern',
        company: 'Casa Salesiana Pio IX',
        description: 'Software installation and activation. Preventive maintenance of computer networks. Repair of defective PCs and equipment operation control. Design, repair, and assembly of audio amplifiers.',
      },
    ],
  },

  // Projects/Certifications
  projects: {
    title: 'Certifications and Badges',
    filters: {
      featured: 'Featured',
      cloud: 'Cloud',
      backend: 'Backend',
      python: 'Python',
      networks: 'Networks',
      security: 'Security',
      other: 'Other',
      all: 'All',
    },
    viewCertificate: 'View certificate',
    filterByCategory: 'Filter certifications by category',
    filterBy: 'Filter by',
    loading: 'Loading certifications...',
    modal: {
      close: 'Close',
      issuedBy: 'Issued by',
    },
  },

  // Stack
  stack: {
    title: 'Tech Stack',
    description: 'Technologies and tools I use daily',
    categories: {
      virtualization: 'Virtualization',
      os: 'Operating Systems',
      cloud: 'Cloud',
      containers: 'Containers',
      databases: 'Databases',
      monitoring: 'Monitoring',
      automation: 'Automation',
      webservers: 'Web & Load Balancing',
    },
  },

  // About
  about: {
    title: 'About me',
    content: [
      'Hi, I\'m Agus! I\'m a <strong>Cloud & Platform Engineer</strong> with experience in design, automation, and operation of IT infrastructure for large-scale corporate environments.',
      'I\'m currently part of the Engineering team at <strong>Arcos Dorados</strong>, where I work on defining, deploying, and operating architectures on multi-cloud and on-premise infrastructure, applying DevOps practices focused on operational automation, reliability, and platform scalability. Additionally, I develop internal solutions focused on optimizing operational processes and workflows.',
      'My interest in technology started at an early age. This passion led me to study to become an <strong>electronics technician in high school</strong>, and eventually guided me towards computer engineering. I started my professional career working in IT support, where I was able to develop a solid foundation in infrastructure and systems.',
      'My main areas of work and interest are <strong>Cloud Computing, Platform Engineering, Infrastructure Engineering, DevOps, Automation, and Distributed Architectures</strong>. I\'m constantly seeking to expand my knowledge and face new challenges.',
    ],
    stats: {
      yearsInIT: {
        value: '7+',
        label: 'Years in IT',
      },
      courseCertificates: {
        value: '30+',
        label: 'Certificates',
      },
      // Uncomment when you have paid certifications
      // certifications: {
      //   value: '5+',
      //   label: 'Certifications',
      // },
    },
  },

  // Blog
  blog: {
    title: 'Blog',
    read: 'read',
    viewMore: 'View more articles',
    noArticles: 'No articles available at this time.',
  },

  // My Projects
  myProjects: {
    title: 'Projects',
    items: [
      {
        id: 'container-migration',
        title: 'Migration of Systems to Containerized Architectures',
        shortDescription: 'Migration of academic applications from VMs to container-based architectures with Docker Swarm and Kubernetes.',
        description: `
          <p>I participated in the migration of academic and internal applications from traditional virtual machine environments to container-based architectures.</p>
          <p class="mt-4">I worked with both monolithic architectures and distributed architectures based on microservices, implementing deployment and maintenance automation through CI/CD pipelines.</p>
          <p class="mt-4">For testing environments, high availability schemes were designed using Docker Swarm distributed across both datacenters. Additionally, a private image repository was implemented to standardize and secure deployments.</p>
          <p class="mt-4">A kubernetes cluster was deployed with kubeadm for initial testing of development environments and functionality evaluation.</p>
          <p class="mt-4"><strong>Period:</strong> January 2023 - January 2024</p>
          <p><strong>Associated with:</strong> UTN Buenos Aires</p>
        `,
        tags: ['Docker', 'Docker Swarm', 'Kubernetes', 'Jenkins', 'GitLab CI/CD', 'Harbor'],
        image: '/projects/container-migration.webp',
        github: '',
        demo: '',
      },
      {
        id: 'observability-system',
        title: 'Implementation of Observability and Alerting System',
        shortDescription: 'Comprehensive observability platform for infrastructure monitoring, services, and log centralization.',
        description: `
          <p>I participated in the implementation of a comprehensive observability platform for the faculty's systems and datacenter equipment.</p>
          <p class="mt-4">The solution provided visibility into the status and performance of the infrastructure, including metrics from physical and virtual servers, containers, virtualizers, networks, UPS, equipment temperatures, and critical service metrics.</p>
          <p class="mt-4">A proactive alerting system and automations were designed for early detection and initial remediation of incidents, improving availability and reducing response times.</p>
          <p class="mt-4">Additionally, a log centralization and query platform was implemented, allowing development teams to access logs from development, testing, and QA environments without requiring direct access to servers or containers.</p>
          <p class="mt-4"><strong>Period:</strong> January 2023 - January 2024</p>
          <p><strong>Associated with:</strong> UTN Buenos Aires</p>
        `,
        tags: ['Grafana', 'Prometheus', 'InfluxDB', 'Telegraf', 'Loki', 'cAdvisor'],
        image: '/projects/observability-system.webp',
        github: '',
        demo: '',
      },
      {
        id: 'opennebula-cluster',
        title: 'Virtualization Cluster with OpenNebula and High Availability',
        shortDescription: 'Design and upgrade of institutional virtualization platform with OpenNebula, implementing high availability.',
        description: `
          <p>I participated in the design, deployment, and evolution of the institutional virtualization platform, based on OpenNebula, used as core infrastructure for academic and administrative systems.</p>
          <p class="mt-4">In the main datacenter, a testing cluster was implemented consisting of Dell PowerEdge servers and external storage connected by fiber, validating high availability schemes in case of node failures.</p>
          <p class="mt-4">Subsequently, the production cluster was upgraded from OpenNebula 5.x to version 6.12, incorporating high availability to the cluster, expanding capacity with new nodes, and ensuring operational continuity of all systems during the process.</p>
          <p class="mt-4"><strong>Period:</strong> January 2023 - January 2024</p>
          <p><strong>Associated with:</strong> UTN Buenos Aires</p>
        `,
        tags: ['OpenNebula', 'Dell PowerEdge', 'High Availability', 'Storage', 'Virtualization'],
        image: '/projects/opennebula-cluster.webp',
        github: '',
        demo: '',
      },
      {
        id: 'homelab',
        title: 'Research and Automation Homelab',
        shortDescription: 'Personal lab with virtualization cluster, Kubernetes, and automation through IaC (Terraform, Ansible, Packer).',
        description: `
          <p>Design and operation of a personal homelab oriented to testing, research, and validation of infrastructure, cloud, and automation technologies.</p>
          <p class="mt-4">The environment consists of a 3-node virtualization cluster with high availability, network infrastructure segmented by VLANs, centralized storage, and a lightweight Kubernetes cluster for lab workloads based on k3s.</p>
          <p class="mt-4">The infrastructure is managed through Infrastructure as Code with terraform and terragrunt; automation with ansible and finally automatic generation of operating system templates with Packer.</p>
          <p class="mt-4"><strong>Period:</strong> January 2023 - Present</p>
          <p><strong>Personal project</strong></p>
        `,
        tags: ['Proxmox VE', 'UniFi', 'TrueNAS', 'Terraform', 'Ansible', 'Packer', 'K3s'],
        image: '/projects/homelab.webp',
        github: '',
        demo: '',
      },
    ],
    modal: {
      close: 'Close',
      technologies: 'Technologies',
      repository: 'View repository',
      demo: 'View demo',
    },
  },

  // Footer
  footer: {
    madeWith: 'Made with',
  },

  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    close: 'Close',
    open: 'Open',
    more: 'More',
  },

  // SEO
  seo: {
    title: 'Agustin Ezequiel Acevedo | Cloud Engineer',
    description: 'Cloud & Platform Engineer specialized in DevOps, automation, and infrastructure management. +3 years of experience.',
    keywords: 'DevOps, SysAdmin, Cloud Computing, AWS, GCP, Kubernetes, Docker, CI/CD, Terraform, Ansible, Linux, Cloud Engineer, Platform Engineer',
    ogTitle: 'Agustin Ezequiel Acevedo - Cloud Engineer',
    ogDescription: 'Professional portfolio of Agustin Ezequiel Acevedo. Specialized in DevOps, infrastructure automation, and Cloud Computing.',
  },
} satisfies Translations;
