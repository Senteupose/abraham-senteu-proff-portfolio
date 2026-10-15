export type ProjectCategory = 'All' | 'UI/UX' | 'Branding' | 'Print' | 'Design Systems';

export interface ProjectMilestone {
  phase: string;
  name: string;
  duration: string;
  deliverable: string;
  progressPercent: number;
  highlight: string;
}

export interface ProjectTimeline {
  durationText: string;
  startDate: string;
  completionDate: string;
  status: 'Completed & Deployed' | 'Active Production' | 'Published & Distributed';
  overallProgress: number;
  milestones: ProjectMilestone[];
}

export interface ProjectCaseStudy {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'UI/UX' | 'Branding' | 'Print' | 'Design Systems';
  year: string;
  role: string;
  clientOrContext: string;
  image: string;
  timeline: ProjectTimeline;
  summary: string;
  deliverables: string[];
  challenge: string;
  designSolution: string;
  outcomes: string[];
  tools: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  specifications: {
    aspect: string;
    details: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  index: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  domain: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  metrics: {
    value: string;
    label: string;
  }[];
}

export interface CompetencyGroup {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  skills: {
    name: string;
    context: string;
  }[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  focus: string;
}

export interface RefereeItem {
  name: string;
  role: string;
  organization: string;
  relationship: string;
}

export const PROFILE_DATA = {
  name: 'Abraham Pose Senteu',
  headline: 'Crafting thoughtful digital interfaces, corporate branding systems, and high-impact print collateral.',
  roleLine: 'Designer · Computer Science Graduate · Banking Operations & AI Specialist',
  location: 'Kenya (Nairobi · Mombasa · Ngong · Kajiado)',
  phone: '+254 113 243 615',
  email: 'sentepose@gmail.com',
  linkedin: 'linkedin.com/in/abraham-pose-senteu-p0113243615',
  linkedinUrl: 'https://www.linkedin.com/in/abraham-pose-senteu-p0113243615',
  heroImage: '/src/assets/images/hero_fintech_workspace_1792092684097.jpg',
  bioLead:
    'Multidisciplinary designer and Computer Science graduate combining over 5 years of banking operations and customer onboarding expertise with human-centered UI/UX design, brand identity systems, and print publication crafts.',
  bioExtended:
    'Awarded Best Equitel Onboarding Officer across the Coastal Region at Equity Bank Kenya, Abraham applies ergonomic design and strict regulatory clarity (KYC, AML, CBK compliance) to software products, design systems, and physical customer touchpoints.',
  keyMetrics: [
    {
      value: '4 Domains',
      unit: 'UI/UX · Branding · Print · Systems',
      label: 'Core Design & Visual Capabilities',
    },
    {
      value: '5+ Years',
      unit: '6 Branch Deployments',
      label: 'Banking Service Design & Front-Line Ops',
    },
    {
      value: '1,000 / Mo',
      unit: 'Rank #1 Coastal Region',
      label: 'Digital Banking Customer Onboardings',
    },
    {
      value: '$7,000+',
      unit: '7 Global Platforms',
      label: 'International AI & Model Evaluation Delivery',
    },
  ],
};

export const CATEGORY_DESCRIPTIONS: Record<ProjectCategory, string> = {
  All: 'Comprehensive curation of digital product interfaces, visual identity programs, print collateral, and structural design systems.',
  'UI/UX': 'Responsive web and mobile application interfaces, interactive prototypes, user journeys, and student-centric portals.',
  Branding: 'Visual identity suites, brand guideline manuals, corporate stationery, iconography, and fintech campaign collateral.',
  Print: 'Editorial publications, branch operations compliance booklets, structured typography manuals, and physical onboarding collateral.',
  'Design Systems': 'Reusable component architectures, token systems, accessibility patterns, and multi-platform style guides.',
};

export const PROJECTS_DATA: ProjectCaseStudy[] = [
  {
    id: 'study-assistant-uiux',
    index: '01',
    title: 'Smart Study Assistant — Adaptive Learning UI/UX',
    subtitle: 'Cross-platform study companion interface with real-time retention telemetry',
    category: 'UI/UX',
    year: '2025',
    role: 'Lead Product Designer & UX Researcher',
    clientOrContext: 'EdTech Research Initiative',
    image: '/src/assets/images/project_uiux_study_1792092684061.jpg',
    timeline: {
      durationText: '5 Months (Jan 2025 – May 2025)',
      startDate: 'Jan 2025',
      completionDate: 'May 2025',
      status: 'Active Production',
      overallProgress: 100,
      milestones: [
        {
          phase: 'Phase 01',
          name: 'Discovery & Cognitive Research',
          duration: 'Weeks 1–4',
          deliverable: 'User Interview Synthesis & Persona Maps',
          progressPercent: 20,
          highlight: 'Audited 40+ student revision habits to isolate key triggers of cognitive fatigue.',
        },
        {
          phase: 'Phase 02',
          name: 'Information Architecture & Wireframes',
          duration: 'Weeks 5–8',
          deliverable: 'Low-Fidelity Flows & Wireframe Prototypes',
          progressPercent: 45,
          highlight: 'Structured calm 45-minute active recall blocks and concept tree navigation.',
        },
        {
          phase: 'Phase 03',
          name: 'Design System & Component Library',
          duration: 'Weeks 9–13',
          deliverable: 'Figma Token Library & Dual Themes',
          progressPercent: 70,
          highlight: 'Crafted WCAG 2.1 AAA accessible color tokens and distraction-free dark theme.',
        },
        {
          phase: 'Phase 04',
          name: 'Interactive Prototyping & Usability Testing',
          duration: 'Weeks 14–17',
          deliverable: 'React Prototypes & Usability Report',
          progressPercent: 90,
          highlight: 'Achieved 94/100 usability score with university student focus cohort.',
        },
        {
          phase: 'Phase 05',
          name: 'Production Rollout & Telemetry QA',
          duration: 'Weeks 18–20',
          deliverable: 'Live Web App & Design Tokens',
          progressPercent: 100,
          highlight: 'Full deployment with real-time retention telemetry and responsive layout engine.',
        },
      ],
    },
    summary:
      'A human-centered educational web and mobile application designed to eliminate student cognitive fatigue through adaptive revision schedules, interactive concept trees, and distraction-free study cards.',
    deliverables: [
      'Interactive Figma prototypes & design tokens',
      'Adaptive study card component library',
      'Cross-platform responsive layouts (Desktop & Mobile)',
      'High-contrast accessible color scheme (WCAG AA)',
    ],
    challenge:
      'Students frequently experience burnout when navigating disorganized syllabi and static flashcards. The design challenge was presenting complex mastery graphs without overwhelming the user with unnecessary visual clutter.',
    designSolution:
      'Engineered a calm, card-based interface with high typographic hierarchy, muted slate surfaces, and a dynamic 45-minute revision block indicator that guides students through targeted active recall.',
    outcomes: [
      'Increased session focus duration by 35% during usability testing with university undergraduates.',
      'Designed a lightweight dark/light theme supporting late-night study sessions with zero eye strain.',
      'Achieved 100% WCAG 2.1 AA accessibility compliance across contrast and touch targets.',
    ],
    tools: ['Figma', 'React.js', 'Tailwind CSS', 'Component Tokens', 'User Journey Mapping'],
    metrics: [
      { label: 'Usability Score', value: '94 / 100' },
      { label: 'Contrast Ratio', value: '7.8:1 AAA' },
      { label: 'Responsive Breakpoints', value: 'Mobile · Tablet · Web' },
    ],
    specifications: [
      { aspect: 'Typography', details: 'Bricolage Grotesque & Plus Jakarta Sans' },
      { aspect: 'Grid Framework', details: '12-column desktop (1440px) & 4-column mobile' },
      { aspect: 'Color Palette', details: 'Deep Slate, Travertine Cream, Cobalt Accent' },
    ],
  },
  {
    id: 'equitel-branding-suite',
    index: '02',
    title: 'Equitel Digital Banking — Brand Identity Suite',
    subtitle: 'Unified visual identity, stationery, customer collateral, and app branding',
    category: 'Branding',
    year: '2024',
    role: 'Brand Identity Designer & Operations Lead',
    clientOrContext: 'Equity Bank Kenya Branches (Coastal Region)',
    image: '/src/assets/images/project_branding_digital_1792092684866.jpg',
    timeline: {
      durationText: '6 Months (Aug 2024 – Jan 2025)',
      startDate: 'Aug 2024',
      completionDate: 'Jan 2025',
      status: 'Completed & Deployed',
      overallProgress: 100,
      milestones: [
        {
          phase: 'Phase 01',
          name: 'Customer Perception & Branch Audits',
          duration: 'Weeks 1–4',
          deliverable: 'Audience Perception Synthesis & Competitor Matrix',
          progressPercent: 20,
          highlight: 'Analyzed customer hesitation across Mtwapa, Nyali, and OTC branch desks.',
        },
        {
          phase: 'Phase 02',
          name: 'Visual Identity & Geometry Design',
          duration: 'Weeks 5–9',
          deliverable: 'Brand Mark Explorations & Vector Master Files',
          progressPercent: 45,
          highlight: 'Engineered geometric badge symbolizing financial upward mobility and security.',
        },
        {
          phase: 'Phase 03',
          name: 'Stationery & Packaging Prototypes',
          duration: 'Weeks 10–14',
          deliverable: 'Stationery Suite & SIM Pack Mockups',
          progressPercent: 70,
          highlight: 'Designed 350gsm uncoated textured cotton stationery and welcome kit packaging.',
        },
        {
          phase: 'Phase 04',
          name: 'Brand Guidelines Manual (48 Pages)',
          duration: 'Weeks 15–19',
          deliverable: 'Comprehensive Brand Standards Manual',
          progressPercent: 88,
          highlight: 'Formulated strict rules for typography, clear space, and bilingual collateral.',
        },
        {
          phase: 'Phase 05',
          name: 'Regional Branch Rollout & Training',
          duration: 'Weeks 20–24',
          deliverable: '6-Branch Deployment & Staff Workshop',
          progressPercent: 100,
          highlight: 'Supported regional adoption leading to #1 Equitel Onboarding award.',
        },
      ],
    },
    summary:
      'A cohesive corporate identity and brand asset program developed to modernize digital banking perception, including brand guidelines, stationery, SIM packaging, and onboarding banners.',
    deliverables: [
      'Complete Brand Guidelines Manual (48 pages)',
      'Executive stationery suite & embossed card specifications',
      'Digital asset kit for mobile onboarding kiosks',
      'Bilingual customer welcome packet (English & Swahili)',
    ],
    challenge:
      'Branch customers had diverse digital literacy levels and perceived mobile banking as vulnerable or complex. The branding needed to radiate institutional security, clarity, and welcoming warmth.',
    designSolution:
      'Crafted a sharp geometric symbol paired with rich navy and warm gold accents, complemented by step-by-step pictorial guides that instill immediate confidence during the first account opening interaction.',
    outcomes: [
      'Recognized with the Coastal Region #1 Equitel Onboarding award for record adoption.',
      'Standardized branding materials deployed across 6 regional and metropolitan bank branches.',
      'Reduced initial customer onboarding friction by 40% through clear pictorial guides.',
    ],
    tools: ['Adobe Illustrator', 'InDesign', 'Photoshop', 'Brand System Guidelines', 'Print Production'],
    metrics: [
      { label: 'Branch Deployment', value: '6 Locations' },
      { label: 'Onboarding Velocity', value: '60 SIMs / Day' },
      { label: 'Brand Consistency', value: '100% Compliant' },
    ],
    specifications: [
      { aspect: 'Primary Colors', details: 'Pantone 289C Navy & Warm Metallic Gold' },
      { aspect: 'Stationery Stock', details: '350gsm uncoated textured cotton stock' },
      { aspect: 'Iconography', details: 'Custom 24px stroke icon system' },
    ],
  },
  {
    id: 'banking-compliance-manuals',
    index: '03',
    title: 'Banking Operations & KYC Compliance Manual',
    subtitle: 'Editorial publication, tabular compliance matrices, and branch SOP guides',
    category: 'Print',
    year: '2023',
    role: 'Editorial & Information Designer',
    clientOrContext: 'Equity Bank Kenya Limited Operations',
    image: '/src/assets/images/project_print_editorial_1792092684878.jpg',
    timeline: {
      durationText: '8 Months (Mar 2023 – Oct 2023)',
      startDate: 'Mar 2023',
      completionDate: 'Oct 2023',
      status: 'Published & Distributed',
      overallProgress: 100,
      milestones: [
        {
          phase: 'Phase 01',
          name: 'CBK & Regulatory Policy Synthesis',
          duration: 'Weeks 1–6',
          deliverable: 'Regulatory Corpus & Gap Analysis Matrix',
          progressPercent: 20,
          highlight: 'Mapped complex KYC/AML, FATCA, and CRS mandates into operational workflows.',
        },
        {
          phase: 'Phase 02',
          name: 'Information Architecture & Tabular Specs',
          duration: 'Weeks 7–14',
          deliverable: 'SOP Logic Flowcharts & Tabular Templates',
          progressPercent: 45,
          highlight: 'Structured decision trees allowing tellers to verify account criteria in seconds.',
        },
        {
          phase: 'Phase 03',
          name: 'Swiss Typography & Dual-Column Layout',
          duration: 'Weeks 15–22',
          deliverable: 'Complete 120-Page Layout Drafts',
          progressPercent: 70,
          highlight: 'Implemented Avenir and Garamond pairings with tabular numerals for limits.',
        },
        {
          phase: 'Phase 04',
          name: 'Pre-Press Color Proofing & Thumb Indexing',
          duration: 'Weeks 23–27',
          deliverable: 'Physical CMYK Proofs & Dummy Bindings',
          progressPercent: 88,
          highlight: 'Engineered color-coded thumb tabs for rapid under-pressure desk reference.',
        },
        {
          phase: 'Phase 05',
          name: 'Production Print Run & Branch Distribution',
          duration: 'Weeks 28–32',
          deliverable: 'Bound Manuals & Laminated Quick Sheets',
          progressPercent: 100,
          highlight: 'Delivered lay-flat stitch bound manuals resulting in zero audit discrepancies.',
        },
      ],
    },
    summary:
      'A master editorial publication and quick-reference handbook for branch tellers, customer service desks, and compliance supervisors covering KYC, AML, FATCA, and CRS procedures.',
    deliverables: [
      'Bound 120-page master operations manual with Japanese stitch binding',
      'Laminated quick-reference desk charts for transaction limits',
      'Step-by-step account opening decision trees',
      'CBK regulatory checklist pocket brochure',
    ],
    challenge:
      'Regulatory compliance documents are typically dense, hard to navigate under pressure, and lead to operational errors during peak branch traffic (up to 600 transactions/day).',
    designSolution:
      'Designed an editorial layout utilizing Swiss typography grids, tabular numbers, dual-column reference notes, and color-coded section tabs that allow tellers to verify document validity in under 15 seconds.',
    outcomes: [
      'Zero regulatory audit discrepancies across verified branch assignments.',
      'Adopted by new onboarding cohorts as standard training and reference collateral.',
      'High print durability using scuff-resistant matte lamination and lay-flat binding.',
    ],
    tools: ['Adobe InDesign', 'Typography Layout', 'Print Pre-press', 'Color Separation', 'CMYK Specs'],
    metrics: [
      { label: 'Page Extent', value: '120 Pages' },
      { label: 'Lookup Speed', value: '< 15 Seconds' },
      { label: 'Audit Compliance', value: '100% Accurate' },
    ],
    specifications: [
      { aspect: 'Format', details: 'A4 lay-flat wire-o & stitch binding' },
      { aspect: 'Stock', details: '140gsm Munken Lynx text / 350gsm cover' },
      { aspect: 'Typography', details: 'Avenir & Garamond editorial pairing' },
    ],
  },
  {
    id: 'university-portal-uiux',
    index: '04',
    title: 'University Registration Portal & Design System',
    subtitle: 'Institutional academic dashboard, timetable scheduler, and records UI',
    category: 'UI/UX',
    year: '2025',
    role: 'UI/UX Lead & Frontend Architect',
    clientOrContext: 'Pwani University Academic Systems',
    image: '/src/assets/images/project_uiux_portal_1792092685720.jpg',
    timeline: {
      durationText: '6 Months (Feb 2025 – Jul 2025)',
      startDate: 'Feb 2025',
      completionDate: 'Jul 2025',
      status: 'Active Production',
      overallProgress: 100,
      milestones: [
        {
          phase: 'Phase 01',
          name: 'Academic Ledger & Bottleneck Audits',
          duration: 'Weeks 1–5',
          deliverable: 'Process Flow Diagrams & Prerequisite Matrix',
          progressPercent: 20,
          highlight: 'Interviewed department chairs and registrars to map course registration bottlenecks.',
        },
        {
          phase: 'Phase 02',
          name: 'Timetable Grid & Conflict Prevention Engine',
          duration: 'Weeks 6–10',
          deliverable: 'Interactive Timetable Prototyping',
          progressPercent: 45,
          highlight: 'Architected real-time clash warning visualization for concurrent unit slots.',
        },
        {
          phase: 'Phase 03',
          name: 'Student Dashboard & Advisor Approval UI',
          duration: 'Weeks 11–16',
          deliverable: 'Figma Design System (40+ Tokens)',
          progressPercent: 70,
          highlight: 'Built 3-step progressive clearance wizard with status check indicators.',
        },
        {
          phase: 'Phase 04',
          name: 'Mobile Usability & Low-Bandwidth Testing',
          duration: 'Weeks 17–20',
          deliverable: 'Responsive React Application Test Build',
          progressPercent: 88,
          highlight: 'Optimized performance for low-power smartphones and unstable campus WiFi.',
        },
        {
          phase: 'Phase 05',
          name: 'Campus Pilot & Institutional Handover',
          duration: 'Weeks 21–24',
          deliverable: 'Production Deployment & Admin Documentation',
          progressPercent: 100,
          highlight: 'Slashed average registration time from 45 minutes down to 6 minutes.',
        },
      ],
    },
    summary:
      'A comprehensive student information and semester registration interface featuring an intuitive timetable matrix, real-time clash detection, and fee clearance workflows.',
    deliverables: [
      'Interactive course registration matrix & scheduler',
      'Student profile & academic transcript dashboard',
      'Advisor approval and clearance workflow UI',
      'Modular component library in React & Tailwind CSS',
    ],
    challenge:
      'Previous enrollment portals suffered from labyrinthine navigation, lack of timetable conflict warnings, and unreadable schedules on mobile screens.',
    designSolution:
      'Architected a modular calendar grid with instant visual slotting, color-differentiated unit status badges, and a progressive 3-step clearance wizard with clear verification checklists.',
    outcomes: [
      'Eliminated course timetable clashes through visual feedback before registration submission.',
      'Reduced average student registration time from 45 minutes to under 6 minutes.',
      'Fully responsive UI adapting seamlessly from desktop displays down to low-end smartphones.',
    ],
    tools: ['Figma', 'React.js', 'Tailwind CSS', 'Responsive Grid', 'Information Architecture'],
    metrics: [
      { label: 'Enrollment Speed', value: '6 min vs 45 min' },
      { label: 'Timetable Clashes', value: '0 Confirmed' },
      { label: 'Device Support', value: '100% Responsive' },
    ],
    specifications: [
      { aspect: 'Interface Density', details: 'Compact institutional mode & expansive view' },
      { aspect: 'Accessibility', details: 'Keyboard navigable with high-contrast state styling' },
      { aspect: 'Components', details: 'Over 40 modular design tokens' },
    ],
  },
  {
    id: 'fintech-design-system',
    index: '05',
    title: 'Omnichannel Banking UI Component Library',
    subtitle: 'Unified design tokens, transaction cards, and compliance input patterns',
    category: 'Design Systems',
    year: '2024',
    role: 'Design System Architect',
    clientOrContext: 'Digital Banking Systems Framework',
    image: '/src/assets/images/hero_fintech_workspace_1792092684097.jpg',
    timeline: {
      durationText: '4 Months (Sep 2024 – Dec 2024)',
      startDate: 'Sep 2024',
      completionDate: 'Dec 2024',
      status: 'Completed & Deployed',
      overallProgress: 100,
      milestones: [
        {
          phase: 'Phase 01',
          name: 'Fintech Component Audit & Token Taxonomy',
          duration: 'Weeks 1–3',
          deliverable: 'Atomic Token Specification Document',
          progressPercent: 25,
          highlight: 'Cataloged transaction inputs, currency states, and KYC upload interfaces.',
        },
        {
          phase: 'Phase 02',
          name: 'Semantic Tokens & Accessibility Contrast',
          duration: 'Weeks 4–7',
          deliverable: 'Figma Variables & CSS Custom Properties',
          progressPercent: 50,
          highlight: 'Guaranteed WCAG AAA tabular legibility on monetary amounts and balance tags.',
        },
        {
          phase: 'Phase 03',
          name: '65+ Atomic Component Implementations',
          duration: 'Weeks 8–11',
          deliverable: 'React + Tailwind Tokenized UI Library',
          progressPercent: 75,
          highlight: 'Created deterministic state machines preventing accidental double submissions.',
        },
        {
          phase: 'Phase 04',
          name: 'Motion Latency Budgets (< 150ms)',
          duration: 'Weeks 12–14',
          deliverable: 'Micro-Interaction Documentation & Storybook',
          progressPercent: 90,
          highlight: 'Strict compositor-only animation budgets ensuring zero perceived input lag.',
        },
        {
          phase: 'Phase 05',
          name: 'Developer Documentation & Version 1.0 Release',
          duration: 'Weeks 15–16',
          deliverable: 'Living Documentation Site & NPM Package',
          progressPercent: 100,
          highlight: 'Reduced frontend handoff latency by 50% across development teams.',
        },
      ],
    },
    summary:
      'A production-grade design system crafted for high-reliability fintech applications, standardizing transaction cards, account balance displays, secure PIN inputs, and KYC document upload zones.',
    deliverables: [
      'Figma token library with semantic variables',
      'React + Tailwind CSS component implementation',
      'Accessibility audit documentation & interaction states',
      'Micro-interaction guidelines with motion budgets (< 200ms)',
    ],
    challenge:
      'Fintech products require strict zero-latency feedback, clear numerical legibility, and bulletproof error recovery during money movements.',
    designSolution:
      'Established a strict token architecture with tabular numerals, WCAG AAA contrast ratios on financial values, and deterministic error states that prevent accidental double submissions.',
    outcomes: [
      'Standardized 65+ reusable atomic components and layout primitives.',
      'Reduced design-to-development handoff time by 50%.',
      'Integrated tactile confirmation patterns for high-value branch operations.',
    ],
    tools: ['Figma Tokens', 'React.js', 'Storybook', 'Tailwind CSS', 'Motion'],
    metrics: [
      { label: 'Tokens & Atoms', value: '65+ Components' },
      { label: 'Interaction Latency', value: '< 150ms' },
      { label: 'Handoff Efficiency', value: '+50% Faster' },
    ],
    specifications: [
      { aspect: 'Typography Token', details: 'Tabular numerals for currency & date strings' },
      { aspect: 'Focus States', details: '2px offset electric cobalt focus rings' },
      { aspect: 'Elevation', details: 'Single-tier subtle hairline borders' },
    ],
  },
  {
    id: 'househelp-branding-uiux',
    index: '06',
    title: 'Househelp Smart Management — Brand & App UX',
    subtitle: 'Trust-centered mobile UX, vetting checklists, and identity branding',
    category: 'UI/UX',
    year: '2024',
    role: 'Product Designer & Brand Creator',
    clientOrContext: 'Community Workforce Platform',
    image: '/src/assets/images/project_branding_digital_1792092684866.jpg',
    timeline: {
      durationText: '5 Months (May 2024 – Sep 2024)',
      startDate: 'May 2024',
      completionDate: 'Sep 2024',
      status: 'Completed & Deployed',
      overallProgress: 100,
      milestones: [
        {
          phase: 'Phase 01',
          name: 'Trust Factor & Safety Field Discovery',
          duration: 'Weeks 1–4',
          deliverable: 'Field Research Insights & Trust Rubric',
          progressPercent: 20,
          highlight: 'Investigated domestic worker vulnerabilities and employer verification hurdles.',
        },
        {
          phase: 'Phase 02',
          name: 'Brand Identity & Credential Styling',
          duration: 'Weeks 5–8',
          deliverable: 'Identity Suite & Verification Badges',
          progressPercent: 45,
          highlight: 'Formulated welcoming, professional identity radiating integrity and warmth.',
        },
        {
          phase: 'Phase 03',
          name: '3-Step Vetting & Contract Flows',
          duration: 'Weeks 9–13',
          deliverable: 'Mobile Prototype & Contract Generator',
          progressPercent: 70,
          highlight: 'Designed straightforward 3-stage onboarding wizard with document verification.',
        },
        {
          phase: 'Phase 04',
          name: 'Field Usability Testing (50+ Cohort)',
          duration: 'Weeks 14–17',
          deliverable: 'Usability Evaluation & Revision Report',
          progressPercent: 90,
          highlight: 'Earned 4.8/5.0 clarity rating across domestic workers and household employers.',
        },
        {
          phase: 'Phase 05',
          name: 'Community Launch & Campaign Materials',
          duration: 'Weeks 18–20',
          deliverable: 'Public Mobile Web App & Print Flyer Kit',
          progressPercent: 100,
          highlight: 'Successfully established trusted digital domestic matching in pilot communities.',
        },
      ],
    },
    summary:
      'Brand identity and mobile product design for a domestic workforce verification platform, empowering households and workers through transparent profile credentials.',
    deliverables: [
      'Logo mark, color palette, and mobile iconography',
      'End-to-end mobile app prototype for employers & workers',
      'Verified credential display card and contract flow',
      'Digital onboarding flyer and social promo kit',
    ],
    challenge:
      'Domestic recruitment is plagued by lack of verified history and safety concerns. The design needed to build bilateral trust immediately between employers and job seekers.',
    designSolution:
      'Designed a verified badge hierarchy, transparent review cards with reference contact checks, and simple scheduling calendars that make contracts clear and straightforward.',
    outcomes: [
      'Tested with 50+ domestic workers and employers with positive clarity feedback.',
      'Streamlined onboarding checklist down to 3 intuitive photo-upload stages.',
      'Created cohesive physical and digital branding for community recruitment drives.',
    ],
    tools: ['Figma', 'UI/UX Prototyping', 'Brand Identity', 'Adobe Illustrator', 'Mobile Design'],
    metrics: [
      { label: 'Onboarding Stages', value: '3 Guided Steps' },
      { label: 'User Rating', value: '4.8 / 5.0' },
      { label: 'Scope', value: 'Brand + Mobile UI' },
    ],
    specifications: [
      { aspect: 'Mobile Target', details: 'iOS & Android responsive viewport' },
      { aspect: 'Visual Style', details: 'Warm trustworthy teal and clean sandstone' },
      { aspect: 'Assets', details: 'Vector icon kit and social media campaign cards' },
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'ai-data-specialist',
    index: '01',
    role: 'AI Data Annotation & Model Evaluation Specialist',
    organization: 'TELUS Digital · iMerit · OneForma · Alignerr · AfterQuery · Fleet AI · Uber AI',
    period: '2024 – Present',
    location: 'Remote · International Platforms',
    domain: 'AI & Data Systems',
    summary:
      'Evaluating large language models, ranking complex multi-turn prompts, and executing rigorous data quality assurance across seven global artificial intelligence platforms.',
    responsibilities: [
      'Evaluated AI-generated responses for quality, factual accuracy, contextual relevance, and instruction adherence across technical and general domains.',
      'Annotated multimodal image, text, and language datasets to improve machine learning model alignment and reasoning performance.',
      'Conducted side-by-side prompt evaluation, rubric scoring, and response ranking following strict project guidelines.',
      'Performed end-to-end data quality assurance through systematic validation, taxonomy categorization, and edge-case error identification.',
      'Collaborated remotely on high-priority international AI pipelines while consistently exceeding quality and throughput benchmarks.',
    ],
    achievements: [
      'Earned over USD 7,000+ through sustained high-accuracy delivery across international AI and digital evaluation platforms.',
      'Maintained top-tier evaluator quality scores across code, analytical reasoning, and domain-specific LLM alignment benchmarks.',
    ],
    metrics: [
      { value: 'USD 7,000+', label: 'International AI Earnings' },
      { value: '7 Platforms', label: 'Global AI Partners' },
      { value: 'LLM & Multimodal', label: 'Evaluation Scope' },
    ],
  },
  {
    id: 'equity-bank-specialist',
    index: '02',
    role: 'Banking Operations & Digital Banking Support Specialist',
    organization: 'Equity Bank Kenya Limited',
    period: 'April 2020 – January 2025',
    location: 'Ngong · OTC · Kimathi · Mtwapa · Nyali · Kajiado Branches',
    domain: 'Banking Operations & Service Design',
    summary:
      'Over 5 years of front-line and supervisory banking operations across six high-volume branches, driving digital banking adoption, transaction accuracy, and strict regulatory compliance.',
    responsibilities: [
      'Served as primary point of contact delivering high-trust customer service across six metropolitan and regional Equity Bank branches.',
      'Processed account opening documentation in full compliance with KYC, AML, FATCA, CRS, and Central Bank of Kenya (CBK) policies.',
      'Executed high-volume teller and back-office transactions including deposits, withdrawals, cheque processing, cash balancing, and verification.',
      'Managed ATM card issuance, PIN generation, card replacement, and rapid resolution of digital channel escalations.',
      'Promoted and onboarded customers onto Equitel, Equity Mobile, and self-service digital banking channels while cross-selling financial products.',
      'Supported branch operational controls, risk mitigation, and internal audit readiness.',
    ],
    achievements: [
      'Recognized as the Best Equitel Onboarding Officer across the Coastal Region.',
      'Successfully onboarded up to 1,000 customers per month onto digital banking platforms.',
      'Consistently sold an average of 60 Equitel SIM cards per day, surpassing branch targets.',
      'Processed up to 600 customer transactions daily with exceptional accuracy and zero compliance breaches.',
      'Frequently entrusted with Account Opening Supervisor responsibilities and selected for multi-branch taskforce assignments.',
    ],
    metrics: [
      { value: '600 / Day', label: 'Transactions Processed' },
      { value: '1,000 / Mo', label: 'Digital Onboardings' },
      { value: '60 / Day', label: 'Equitel SIMs Activated' },
    ],
  },
];

export const COMPETENCY_GROUPS: CompetencyGroup[] = [
  {
    id: 'design-creative',
    index: '01',
    title: 'Product Design, UI/UX & Brand Systems',
    subtitle: 'Ergonomic wireframing, high-fidelity prototypes, typography, and print pre-press',
    skills: [
      { name: 'UI/UX & Interactive Prototyping', context: 'Wireframing, user flows, responsive layouts, Figma & components' },
      { name: 'Visual Identity & Branding', context: 'Brand guidelines, corporate stationery, logo mark geometry, tone of voice' },
      { name: 'Print Production & Editorial Design', context: 'Multi-page books, Swiss typography grids, pre-press CMYK, binding specs' },
      { name: 'Design Systems & Tokens', context: 'Atomic design, accessibility standards (WCAG 2.1 AA), typography tokens' },
      { name: 'Information Architecture', context: 'Hierarchical categorization, intuitive navigation, customer journeys' },
      { name: 'User Testing & Usability Metrics', context: 'Task completion analysis, cognitive load reduction, qualitative feedback' },
    ],
  },
  {
    id: 'software-ai',
    index: '02',
    title: 'Frontend Engineering & AI Data Systems',
    subtitle: 'Modern web development, component architecture, and LLM evaluation',
    skills: [
      { name: 'React.js & Modern TypeScript', context: 'Component hierarchies, SPAs, clean state management, modular hooks' },
      { name: 'Tailwind CSS & Web Ergonomics', context: 'Responsive layout grids, design token mapping, clean typography' },
      { name: 'Node.js & RESTful APIs', context: 'Backend endpoints, authentication workflows, structured data stores' },
      { name: 'SQL, PostgreSQL & MongoDB', context: 'Relational data integrity, schema modeling, query performance' },
      { name: 'AI Model & Prompt Evaluation', context: 'RLHF ranking, factual consistency checks, multimodal dataset QA' },
      { name: 'Git, GitHub & Build Tooling', context: 'Version control, Vite, modern frontend deployment pipelines' },
    ],
  },
  {
    id: 'banking-compliance',
    index: '03',
    title: 'Banking Operations & Risk Management',
    subtitle: 'High-volume teller operations, regulatory compliance, and customer advisory',
    skills: [
      { name: 'KYC, AML, FATCA & CRS Compliance', context: 'Customer due diligence, document verification, CBK alignment' },
      { name: 'Teller & Cash Management', context: 'Processing up to 600 daily transactions, cash balancing, clearing' },
      { name: 'Digital Banking & Equitel Onboarding', context: '1,000+ monthly activations, SIM provisioning, mobile apps' },
      { name: 'Supervisory Account Opening', context: 'Workflow oversight, operational risk mitigation, audit readiness' },
      { name: 'ATM & Card Lifecycle Operations', context: 'Card issuance, PIN generation, dispute handling, replacement' },
      { name: 'Cross-Selling & Relationship Management', context: 'Non-funded income growth, customer advisory, retention' },
    ],
  },
];

export const EDUCATION_DATA = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Pwani University',
    period: 'Graduated October 2025',
    highlight: 'Comprehensive foundation in Software Engineering, Human-Computer Interaction, Database Systems, Artificial Intelligence, and System Analysis.',
    coursework: [
      'Software Engineering',
      'Database Systems',
      'Artificial Intelligence',
      'System Analysis & Design',
      'Computer Networks',
      'Data Structures & Algorithms',
    ],
  },
  {
    degree: 'Kenya Certificate of Secondary Education (KCSE)',
    institution: 'Koilel High School',
    period: '2019',
    highlight: 'Graduated with Grade B+ and a strong foundation in analytical thinking, mathematics, and sciences.',
    coursework: ['Grade: B+', 'Mathematics & Sciences', 'Analytical Reasoning'],
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    title: 'Equity Leaders Program (ELP)',
    issuer: 'Equity Group Foundation',
    year: '2020 – Present',
    focus: 'Leadership development, operational excellence, financial inclusion, and executive mentorship.',
  },
  {
    title: 'Software Engineering Certification',
    issuer: 'Power Learn Project (PLP)',
    year: '2024',
    focus: 'Full-stack software engineering, modern web technologies, Python, and practical product design.',
  },
  {
    title: 'Virtual Assistant (AI & Automation)',
    issuer: 'ALX Africa',
    year: '2024',
    focus: 'AI-augmented workflows, digital operations, process automation, and executive communication.',
  },
  {
    title: 'Ajira Digital Program',
    issuer: 'Ministry of ICT & Digital Economy',
    year: '2024',
    focus: 'Data Analysis with Excel, Data Entry & Management, and SEO & Digital Marketing.',
  },
];

export const REFEREES_DATA: RefereeItem[] = [
  {
    name: 'Mr. Isaac Maina Mwangi',
    role: 'Regional Manager',
    organization: 'Equity Bank Kenya Limited',
    relationship: 'Regional Banking Operations Leadership & Supervisory Reference',
  },
  {
    name: 'Dr. Msagha J. Mbogholi, PhD',
    role: 'Chair, Department of Mathematics & Computer Science',
    organization: 'Pwani University',
    relationship: 'Academic & Computer Science Faculty Reference',
  },
];
