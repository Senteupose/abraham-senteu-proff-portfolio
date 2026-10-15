import React, { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Layers,
  Award,
  GraduationCap,
  Briefcase,
  Code2,
  Building2,
  Sparkles,
  Filter,
  Palette,
  Layout,
  Printer,
  SlidersHorizontal,
  RotateCcw,
  Bookmark,
  LogIn,
  LogOut,
  MessageSquare,
  Globe,
  Clock,
  Flag,
} from 'lucide-react';
import {
  PROFILE_DATA,
  PROJECTS_DATA,
  EXPERIENCE_DATA,
  COMPETENCY_GROUPS,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
  CATEGORY_DESCRIPTIONS,
  ProjectCategory,
  ProjectCaseStudy,
} from './data/portfolioData';
import { ProjectModal } from './components/ProjectModal';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { AIChatModal } from './components/AIChatModal';
import { useAuth } from './context/AuthContext';
import { useUserBookmarks } from './hooks/useUserBookmarks';

type ExtendedCategory = ProjectCategory | 'Saved';

const CATEGORY_TABS: { key: ExtendedCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
  { key: 'All', label: 'All Projects', icon: Layers },
  { key: 'UI/UX', label: 'UI/UX Design', icon: Layout },
  { key: 'Branding', label: 'Branding & Identity', icon: Palette },
  { key: 'Print', label: 'Print & Editorial', icon: Printer },
  { key: 'Design Systems', label: 'Design Systems', icon: SlidersHorizontal },
  { key: 'Saved', label: 'Saved in Firestore', icon: Bookmark },
];

const EQUITY_BRANCHES = [
  { name: 'Ngong Branch', region: 'Kajiado North / Metro', focus: 'High-Volume Retail & Account Onboarding' },
  { name: 'OTC Branch', region: 'Nairobi Central', focus: 'Commercial & High-Velocity Teller Operations' },
  { name: 'Kimathi Branch', region: 'Nairobi CBD', focus: 'Corporate & Digital Banking Migration' },
  { name: 'Mtwapa Branch', region: 'Coastal Region', focus: '#1 Equitel Onboarding & Customer Advisory' },
  { name: 'Nyali Branch', region: 'Mombasa Coastal', focus: 'KYC / AML / FATCA Compliance & Relationship Support' },
  { name: 'Kajiado Branch', region: 'Rift Valley South', focus: 'Supervisory Account Opening & Financial Inclusion' },
];

export default function App() {
  const { currentUser, signInWithGoogle, signOut } = useAuth();
  const { isBookmarked, toggleBookmark, count: savedCount } = useUserBookmarks();

  const [selectedCategory, setSelectedCategory] = useState<ExtendedCategory>('All');
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);
  const [activeCompetencyId, setActiveCompetencyId] = useState<string>(COMPETENCY_GROUPS[0].id);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState<number>(3); // Mtwapa
  const [prefilledContactSubject, setPrefilledContactSubject] = useState<string | undefined>(undefined);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);
  const [projectImgErrors, setProjectImgErrors] = useState<{ [key: string]: boolean }>({});

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ExtendedCategory, number> = {
      All: PROJECTS_DATA.length,
      'UI/UX': 0,
      Branding: 0,
      Print: 0,
      'Design Systems': 0,
      Saved: savedCount,
    };
    PROJECTS_DATA.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [savedCount]);

  // Filter projects by category or saved status
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'Saved') {
      return PROJECTS_DATA.filter((p) => isBookmarked(p.id));
    }
    if (selectedCategory === 'All') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, isBookmarked]);

  const handleInquireProject = (projectTitle: string) => {
    setPrefilledContactSubject(projectTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-zinc-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-8 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-zinc-950 font-display whitespace-nowrap shrink-0"
          >
            Abraham Pose Senteu
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600"
          >
            <a
              href="#projects"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Design Projects
            </a>
            <a
              href="#experience"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Experience
            </a>
            <a
              href="#competencies"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Competencies
            </a>
            <a
              href="#credentials"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Credentials
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action & Firebase Auth status */}
          <div className="flex items-center gap-3 shrink-0">
            {/* AI Assistant Quick Trigger */}
            <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Ask AI Rep</span>
            </button>

            {/* Google Firebase Auth */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-1 border-l border-zinc-200">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-7 h-7 rounded-full border border-zinc-300 object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center">
                    {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="hidden lg:inline text-xs font-medium text-zinc-700 max-w-[100px] truncate">
                  {currentUser.displayName?.split(' ')[0] || 'User'}
                </span>
                <button
                  type="button"
                  onClick={signOut}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
                  title="Sign out of Firebase"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={signInWithGoogle}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-800 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                title="Sign in with Google to save projects and track inquiries in Firestore"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-600" />
                <span>Sign In</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 text-xs font-semibold text-white bg-zinc-950 hover:bg-blue-600 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* HERO SECTION — Split-Screen Hero + Full-Width Quantitative Proof Row */}
        <section className="pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            {/* 2-Column Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Typographic Hierarchy */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8 py-2">
                <div className="space-y-5">
                  <p className="text-xs sm:text-sm font-medium text-blue-600 tracking-tight">
                    {PROFILE_DATA.roleLine}
                  </p>
                  <h1
                    className="text-4xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-zinc-950 leading-[1.08] font-display"
                    style={{ textWrap: 'balance' }}
                  >
                    {PROFILE_DATA.headline}
                  </h1>
                  <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
                    {PROFILE_DATA.bioLead}
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                    {PROFILE_DATA.bioExtended}
                  </p>
                </div>

                {/* Primary & Secondary Actions */}
                <div className="space-y-6 pt-2">
                  <div className="flex flex-wrap items-center gap-3.5">
                    <button
                      type="button"
                      onClick={() => scrollToSection('projects')}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Explore Design Projects</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsChatOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Chat with AI Rep (Search Grounded)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsResumeOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-zinc-900 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Inspect CV</span>
                    </button>
                  </div>

                  {/* Clean Unboxed Metadata */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 font-mono-tabular">
                    <span>Pwani University B.Sc. CS (&apos;25)</span>
                    <span aria-hidden="true">·</span>
                    <span>Equity Leaders Program Scholar</span>
                    <span aria-hidden="true">·</span>
                    <span>Coastal Region #1 Equitel Onboarding Award</span>
                    <span aria-hidden="true">·</span>
                    <span>Firebase Auth &amp; Cloud Firestore Sync</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Visual Container */}
              <div className="lg:col-span-5 flex">
                <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-900 flex flex-col justify-end min-h-[360px] lg:min-h-full">
                  {!heroImgError ? (
                    <img
                      src={PROFILE_DATA.heroImage}
                      alt="Design studio and fintech architecture workspace"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-slate-900 to-blue-950" />
                  )}
                  {/* Scrim Overlay */}
                  <div className="relative z-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6 sm:p-8 pt-24 text-white space-y-2">
                    <div className="text-xs font-mono-tabular text-zinc-300">
                      UI/UX · Brand Systems · Editorial Print
                    </div>
                    <p className="text-base sm:text-lg font-editorial italic text-zinc-100 leading-snug">
                      &ldquo;Translating complex banking operations and algorithmic ideas into intuitive, high-craft interfaces and print publications.&rdquo;
                    </p>
                    <div className="text-xs text-zinc-300 pt-1">
                      {PROFILE_DATA.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Column Proof Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {PROFILE_DATA.keyMetrics.map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-2"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-2xl sm:text-3xl font-bold text-zinc-950 font-mono-tabular tracking-tight">
                      {item.value}
                    </span>
                    <span className="text-xs font-mono-tabular text-blue-600 font-medium">
                      {item.unit}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-snug">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MARQUEE DIVIDER */}
        <div
          aria-hidden="true"
          className="border-y border-zinc-200 bg-white py-3.5 overflow-hidden select-none"
        >
          <div className="animate-marquee flex items-center gap-8 text-xs font-mono-tabular text-zinc-500">
            {[...Array(2)].map((_, groupIdx) => (
              <React.Fragment key={groupIdx}>
                <span>UI/UX &amp; Product Prototyping</span>
                <span>·</span>
                <span>Corporate Brand Guidelines</span>
                <span>·</span>
                <span>Editorial Print Publications</span>
                <span>·</span>
                <span>Design Tokens &amp; Component Systems</span>
                <span>·</span>
                <span>Firebase Auth &amp; Firestore Persistence</span>
                <span>·</span>
                <span>Google Search Grounding (gemini-3.8-flash)</span>
                <span>·</span>
                <span>Complex Architecture Audits (gemini-4-argon)</span>
                <span>·</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* SECTION 01: DESIGN PROJECTS & INTERACTIVE CATEGORY FILTER SYSTEM */}
        <section id="projects" className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
            {/* Section Header */}
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-blue-600 font-medium">
                <Filter className="w-3.5 h-3.5" />
                <span>01 · Design Showcase &amp; Case Studies</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-display"
                style={{ textWrap: 'balance' }}
              >
                Curated design projects across digital products, visual identity, and print media.
              </h2>
              <p className="text-base text-zinc-600">
                Filter by discipline below to inspect dedicated case studies in UI/UX ergonomics, brand identity systems, physical print publications, and reusable design token architectures.
              </p>
            </div>

            {/* DEDICATED CATEGORY FILTER SYSTEM */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Filter Buttons */}
                <div
                  role="tablist"
                  aria-label="Filter design projects by type"
                  className="flex flex-wrap items-center gap-2"
                >
                  {CATEGORY_TABS.map((tab) => {
                    const active = selectedCategory === tab.key;
                    const count = categoryCounts[tab.key];
                    const Icon = tab.icon;

                    return (
                      <button
                        key={tab.key}
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedCategory(tab.key)}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                          active
                            ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                            : 'bg-[#FAF9F6] text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:text-zinc-950'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${active ? 'text-blue-400' : 'text-zinc-400'}`} />
                        <span>{tab.label}</span>
                        <span
                          className={`text-[11px] font-mono-tabular px-1.5 py-0.5 rounded-md ${
                            active
                              ? 'bg-zinc-800 text-zinc-200'
                              : 'bg-zinc-200/80 text-zinc-600'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Reset Action */}
                {selectedCategory !== 'All' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('All')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer self-start md:self-auto whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-3 h-3 text-zinc-400" />
                    <span>Show All ({categoryCounts.All})</span>
                  </button>
                )}
              </div>

              {/* Dynamic Category Context Banner */}
              <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-zinc-900 font-mono-tabular">
                    Current View:
                  </span>
                  <span className="text-zinc-600">
                    {selectedCategory === 'Saved'
                      ? 'Saved projects synced with your Firebase Firestore account in real time.'
                      : CATEGORY_DESCRIPTIONS[selectedCategory as ProjectCategory]}
                  </span>
                </div>
                <div className="text-zinc-500 font-mono-tabular shrink-0">
                  Showing {filteredProjects.length} of {categoryCounts.All} projects
                </div>
              </div>
            </div>

            {/* Empty state for Saved */}
            {selectedCategory === 'Saved' && filteredProjects.length === 0 && (
              <div className="p-12 rounded-2xl bg-white border border-zinc-200 text-center space-y-4">
                <Bookmark className="w-8 h-8 text-zinc-400 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-zinc-950 font-display">
                    No Saved Projects Yet
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto">
                    {currentUser
                      ? 'Click the bookmark icon on any project card to save it to your Firestore database.'
                      : 'Sign in with Google to sync and save your favorite case studies to Cloud Firestore.'}
                  </p>
                </div>
                {!currentUser && (
                  <button
                    type="button"
                    onClick={signInWithGoogle}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign in with Google</span>
                  </button>
                )}
              </div>
            )}

            {/* Dynamic Bento Grid of Filtered Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {filteredProjects.map((project, idx) => {
                const spanClass =
                  selectedCategory === 'All'
                    ? idx === 0 || idx === 3
                      ? 'lg:col-span-7'
                      : 'lg:col-span-5'
                    : filteredProjects.length === 1
                    ? 'lg:col-span-12'
                    : 'lg:col-span-6';

                const hasImgError = projectImgErrors[project.id];
                const saved = isBookmarked(project.id);

                return (
                  <article
                    key={project.id}
                    className={`${spanClass} group rounded-2xl bg-white border border-zinc-200 hover:border-zinc-400 transition-all overflow-hidden flex flex-col justify-between`}
                  >
                    <div>
                      {/* Media Container */}
                      <div
                        onClick={() => setActiveProject(project)}
                        className="relative aspect-16/10 bg-zinc-900 overflow-hidden border-b border-zinc-100 cursor-pointer"
                      >
                        {!hasImgError ? (
                          <img
                            src={project.image}
                            alt={`${project.title} preview`}
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setProjectImgErrors((prev) => ({
                                ...prev,
                                [project.id]: true,
                              }))
                            }
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-zinc-900 text-white">
                            <Layers className="w-8 h-8 text-blue-400 mb-2" />
                            <span className="text-sm font-semibold">{project.title}</span>
                          </div>
                        )}

                        {/* Top-Right Category Pill Badge & Bookmark button */}
                        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!currentUser) {
                                signInWithGoogle();
                              } else {
                                toggleBookmark(project);
                              }
                            }}
                            className={`p-1.5 rounded-md backdrop-blur-md transition-colors cursor-pointer ${
                              saved
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-zinc-950/70 text-zinc-300 hover:text-white hover:bg-zinc-950/90'
                            }`}
                            title={saved ? 'Remove from saved Firestore projects' : 'Save to Firestore'}
                          >
                            <Bookmark className="w-3.5 h-3.5 fill-current" />
                          </button>
                          <div className="bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-white font-mono-tabular">
                            {project.category}
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div
                        onClick={() => setActiveProject(project)}
                        className="p-6 sm:p-8 space-y-4 cursor-pointer"
                      >
                        {/* Metadata row */}
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-500 font-mono-tabular">
                          <span className="font-semibold text-zinc-900">{project.index}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-blue-600 font-medium">{project.role}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.year}</span>
                        </div>

                        <div className="space-y-1.5">
                          <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 group-hover:text-blue-600 transition-colors font-display">
                            {project.title}
                          </h3>
                          <p className="text-sm text-zinc-500 font-editorial italic">
                            {project.subtitle}
                          </p>
                        </div>

                        <p className="text-sm text-zinc-600 leading-relaxed">
                          {project.summary}
                        </p>

                        {/* Project Duration & Milestone Indicator Pill */}
                        {project.timeline && (
                          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono-tabular">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 font-medium">
                              <Clock className="w-3 h-3 text-blue-600" />
                              {project.timeline.durationText.split('(')[0].trim()}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-semibold">
                              <Flag className="w-3 h-3 text-blue-600" />
                              {project.timeline.milestones.length} Milestones ({project.timeline.overallProgress}%)
                            </span>
                          </div>
                        )}

                        {/* Deliverables snippet */}
                        <div className="pt-1 flex flex-wrap items-center gap-1.5">
                          {project.deliverables.slice(0, 2).map((del, dIdx) => (
                            <span
                              key={dIdx}
                              className="text-[11px] px-2 py-0.5 rounded-md bg-[#FAF9F6] border border-zinc-200 text-zinc-700"
                            >
                              {del}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-zinc-100 flex items-center justify-between gap-4">
                      <div className="text-xs text-zinc-500 font-mono-tabular truncate">
                        {project.tools.slice(0, 3).join(' · ')}
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Inspect Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 02: PROFESSIONAL EXPERIENCE */}
        <section
          id="experience"
          className="py-20 sm:py-24 bg-white border-t border-zinc-200"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-14">
            <div className="max-w-3xl space-y-3">
              <div className="text-xs font-mono-tabular text-zinc-500">
                02 · Career Trajectory &amp; Operational Delivery
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-display"
                style={{ textWrap: 'balance' }}
              >
                5+ years of banking operations paired with global AI model evaluation.
              </h2>
              <p className="text-base text-zinc-600 leading-relaxed">
                Combining high-trust front-line banking compliance with rigorous international artificial intelligence evaluation pipelines.
              </p>
            </div>

            {/* Experience Cards */}
            <div className="space-y-8">
              {EXPERIENCE_DATA.map((exp) => (
                <div
                  key={exp.id}
                  className="p-6 sm:p-10 rounded-2xl bg-[#FAF9F6] border border-zinc-200 space-y-8"
                >
                  {/* Top Row: Role & Metrics */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-zinc-200 pb-6">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 font-mono-tabular">
                        <span className="font-semibold text-zinc-900">{exp.index}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-blue-600 font-medium">{exp.domain}</span>
                        <span aria-hidden="true">·</span>
                        <span>{exp.period}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 font-display">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-medium text-zinc-800">
                        {exp.organization}
                      </p>
                      <p className="text-xs text-zinc-500 font-mono-tabular">
                        {exp.location}
                      </p>
                    </div>

                    {/* Quantitative Proof Strip */}
                    <div className="grid grid-cols-3 gap-4 sm:gap-6 bg-white p-4 rounded-xl border border-zinc-200 shrink-0">
                      {exp.metrics.map((m, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <div className="text-sm sm:text-base font-bold text-zinc-950 font-mono-tabular">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-zinc-500 leading-tight">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Responsibilities & Achievements */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-7 space-y-3">
                      <h4 className="text-xs font-bold text-zinc-900 font-mono-tabular">
                        Core Operational Responsibilities
                      </h4>
                      <ul className="space-y-2.5">
                        {exp.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600">
                            <span className="text-xs font-mono-tabular text-zinc-400 mt-0.5 select-none">
                              0{i + 1}.
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="lg:col-span-5 space-y-3 bg-white p-6 rounded-xl border border-zinc-200 self-start">
                      <h4 className="text-xs font-bold text-zinc-950 font-mono-tabular flex items-center gap-2">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span>Verified Career Achievements</span>
                      </h4>
                      <ul className="space-y-3">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Branch Assignment Explorer */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F6] border border-zinc-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono-tabular text-blue-600 font-medium">
                    Branch Operational Deployments (2020 – 2025)
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-950 font-display">
                    Equity Bank Kenya Limited — 6 Branch Assignments
                  </h3>
                </div>
                <span className="text-xs text-zinc-500">
                  Select a branch to inspect service focus
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {EQUITY_BRANCHES.map((branch, idx) => {
                  const isSelected = selectedBranchIndex === idx;
                  return (
                    <button
                      key={branch.name}
                      type="button"
                      onClick={() => setSelectedBranchIndex(idx)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      <div className="text-xs font-mono-tabular opacity-70">
                        0{idx + 1}
                      </div>
                      <div className="text-xs sm:text-sm font-bold mt-1 truncate">
                        {branch.name}
                      </div>
                      <div className="text-[11px] opacity-75 truncate mt-0.5">
                        {branch.region}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-white border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold text-zinc-950">
                      {EQUITY_BRANCHES[selectedBranchIndex].name}
                    </span>{' '}
                    <span className="text-zinc-400" aria-hidden="true">·</span>{' '}
                    <span className="text-zinc-600">
                      {EQUITY_BRANCHES[selectedBranchIndex].region}
                    </span>
                  </div>
                </div>
                <div className="text-xs font-mono-tabular text-blue-600 font-medium">
                  Focus: {EQUITY_BRANCHES[selectedBranchIndex].focus}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: CORE COMPETENCIES */}
        <section
          id="competencies"
          className="py-20 sm:py-24 border-t border-zinc-200"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="text-xs font-mono-tabular text-zinc-500">
                  03 · Core Competencies &amp; Technical Capabilities
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-display"
                  style={{ textWrap: 'balance' }}
                >
                  Multidisciplinary fluency across design, code, data, and banking.
                </h2>
              </div>

              {/* Competency Group Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zinc-200/70 rounded-xl self-start">
                {COMPETENCY_GROUPS.map((group) => {
                  const active = activeCompetencyId === group.id;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setActiveCompetencyId(group.id)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-white text-zinc-950 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-950'
                      }`}
                    >
                      {group.index}. {group.title.split(',')[0].trim()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Competency Spotlight */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 4 Cols: Domain List */}
              <div className="lg:col-span-4 space-y-3">
                {COMPETENCY_GROUPS.map((group) => {
                  const isSelected = group.id === activeCompetencyId;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setActiveCompetencyId(group.id)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      <div className="text-xs font-mono-tabular opacity-70 mb-1">
                        Domain {group.index}
                      </div>
                      <div className="text-base font-bold font-display">
                        {group.title}
                      </div>
                      <p
                        className={`text-xs mt-1.5 leading-relaxed ${
                          isSelected ? 'text-zinc-300' : 'text-zinc-500'
                        }`}
                      >
                        {group.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right 8 Cols: Skill Breakdown */}
              <div className="lg:col-span-8">
                {COMPETENCY_GROUPS.filter((g) => g.id === activeCompetencyId).map(
                  (activeGroup) => (
                    <div
                      key={activeGroup.id}
                      className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-6"
                    >
                      <div className="border-b border-zinc-100 pb-4 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-xs font-mono-tabular text-blue-600 font-semibold">
                            Competency Matrix · Domain {activeGroup.index}
                          </span>
                          <h3 className="text-xl font-bold text-zinc-950 font-display mt-0.5">
                            {activeGroup.title}
                          </h3>
                        </div>
                        <Code2 className="w-5 h-5 text-zinc-400 shrink-0" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeGroup.skills.map((skill, idx) => (
                          <div
                            key={skill.name}
                            className="p-4 rounded-xl bg-[#FAF9F6] border border-zinc-200/80 space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-bold text-zinc-950">
                                {skill.name}
                              </span>
                              <span className="text-xs font-mono-tabular text-zinc-400">
                                0{idx + 1}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-600 leading-relaxed">
                              {skill.context}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04: ACADEMIC CREDENTIALS & CERTIFICATIONS */}
        <section
          id="credentials"
          className="py-20 sm:py-24 bg-white border-t border-zinc-200"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-14">
            <div className="max-w-3xl space-y-3">
              <div className="text-xs font-mono-tabular text-zinc-500">
                04 · Academic Foundation &amp; Professional Certifications
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-display"
                style={{ textWrap: 'balance' }}
              >
                Computer Science degree backed by specialized industry fellowships.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Education (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <h3 className="text-sm font-bold text-zinc-900 font-mono-tabular flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Academic Qualifications</span>
                </h3>

                <div className="space-y-4">
                  {EDUCATION_DATA.map((edu) => (
                    <div
                      key={edu.degree}
                      className="p-6 sm:p-7 rounded-2xl bg-[#FAF9F6] border border-zinc-200 space-y-4"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-mono-tabular text-blue-600 font-medium">
                          {edu.period}
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-zinc-950 font-display">
                          {edu.degree}
                        </h4>
                        <div className="text-sm font-medium text-zinc-700">
                          {edu.institution}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        {edu.highlight}
                      </p>

                      <div className="pt-2 border-t border-zinc-200/80">
                        <div className="text-xs text-zinc-500 mb-1.5">
                          Core Areas of Study:
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono-tabular text-zinc-800">
                          {edu.coursework.map((course, idx) => (
                            <React.Fragment key={course}>
                              {idx > 0 && (
                                <span className="text-zinc-300" aria-hidden="true">
                                  ·
                                </span>
                              )}
                              <span>{course}</span>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <h3 className="text-sm font-bold text-zinc-900 font-mono-tabular flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Professional Certifications &amp; Fellowships</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CERTIFICATIONS_DATA.map((cert) => (
                    <div
                      key={cert.title}
                      className="p-5 rounded-2xl bg-[#FAF9F6] border border-zinc-200 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <div className="text-xs font-mono-tabular text-zinc-500">
                          {cert.year}
                        </div>
                        <h4 className="text-base font-bold text-zinc-950 font-display">
                          {cert.title}
                        </h4>
                        <div className="text-xs font-semibold text-blue-600">
                          {cert.issuer}
                        </div>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {cert.focus}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Values Callout Box */}
                <div className="p-6 rounded-2xl bg-zinc-950 text-white space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular text-blue-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Design Philosophy &amp; Values</span>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed">
                    Committed to accessible human-centered interfaces, disciplined typography, and operational efficiency across East Africa&apos;s financial and technological landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 05: CONTACT SECTION */}
        <ContactSection prefilledSubject={prefilledContactSubject} />
      </main>

      {/* FOOTER */}
      <footer className="bg-[#FAF9F6] border-t border-zinc-200 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-zinc-900 font-display">
              {PROFILE_DATA.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>Design &amp; Banking Operations Portfolio</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Ask AI Rep</span>
            </button>
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="hover:text-zinc-950 transition-colors cursor-pointer"
            >
              Printable CV
            </button>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="hover:text-zinc-950 transition-colors"
            >
              {PROFILE_DATA.email}
            </a>
            <a
              href={PROFILE_DATA.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-950 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* Floating AI Assistant Trigger Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-zinc-950 hover:bg-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all cursor-pointer"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-xs font-semibold whitespace-nowrap">
            Ask AI Rep
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono-tabular px-1.5 py-0.5 rounded bg-zinc-800 group-hover:bg-blue-700 text-zinc-300">
            Search Grounded
          </span>
        </button>
      </div>

      {/* Project Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onInquireProject={handleInquireProject}
      />

      {/* Full Printable CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Gemini AI Multi-Turn Chat Modal with Search Grounding */}
      <AIChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onPrefillInquiry={handleInquireProject}
      />
    </div>
  );
}
