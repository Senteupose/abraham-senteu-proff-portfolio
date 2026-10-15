import React, { useEffect, useState } from 'react';
import {
  X,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Palette,
  Eye,
  Calendar,
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ProjectCaseStudy } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onInquireProject: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInquireProject,
}) => {
  const [imageError, setImageError] = useState(false);
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState(0);

  useEffect(() => {
    setImageError(false);
    setSelectedMilestoneIndex(0);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && project.timeline) {
        setSelectedMilestoneIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight' && project.timeline) {
        setSelectedMilestoneIndex((prev) =>
          Math.min(project.timeline.milestones.length - 1, prev + 1)
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const timeline = project.timeline;
  const currentMilestone =
    timeline?.milestones?.[selectedMilestoneIndex] || timeline?.milestones?.[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 backdrop-blur-sm p-4 sm:p-6 md:p-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF9F6] border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-zinc-200 bg-white shrink-0">
          <div className="flex items-center gap-2.5 text-xs text-zinc-500 font-mono-tabular">
            <span className="font-semibold text-zinc-900">Project {project.index}</span>
            <span aria-hidden="true">·</span>
            <span className="text-blue-600 font-medium">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Close project modal"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Title & Role Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-blue-600 font-medium">
              <span>{project.role}</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-500 font-mono-tabular">{project.clientOrContext}</span>
            </div>
            <h2
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 font-display"
              style={{ textWrap: 'balance' }}
            >
              {project.title}
            </h2>
            <p className="text-base text-zinc-600 font-editorial italic">
              {project.subtitle}
            </p>

            {/* Quick Duration & Milestones Pill Strip */}
            {timeline && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50/80 border border-blue-200 text-blue-800 text-xs font-medium font-mono-tabular">
                  <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Duration: {timeline.durationText}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50/80 border border-purple-200 text-purple-800 text-xs font-medium font-mono-tabular">
                  <Flag className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>{timeline.milestones.length} Key Milestones</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50/80 border border-emerald-200 text-emerald-800 text-xs font-medium font-mono-tabular">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{timeline.status}</span>
                </div>
              </div>
            )}
          </div>

          {/* High-Res Visual Preview Container */}
          <div className="relative rounded-xl overflow-hidden border border-zinc-200 bg-zinc-900 aspect-16/10">
            {!imageError ? (
              <img
                src={project.image}
                alt={`${project.title} — visual showcase`}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-zinc-900 text-white text-center">
                <Layers className="w-10 h-10 text-blue-400 mb-3" />
                <p className="text-lg font-semibold font-display">{project.title}</p>
                <p className="text-xs text-zinc-400 mt-1">{project.subtitle}</p>
              </div>
            )}
          </div>

          {/* VISUAL PROGRESS BAR & TIMELINE INDICATOR CARD */}
          {timeline && (
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-6">
              {/* Timeline Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Project Lifecycle, Duration &amp; Milestone Indicator</span>
                  </div>
                  <div className="text-sm font-bold text-zinc-950 font-display">
                    {timeline.durationText}
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium font-mono-tabular">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{timeline.status}</span>
                  </div>
                  <div className="text-xs font-mono-tabular font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    {timeline.overallProgress}% Complete
                  </div>
                </div>
              </div>

              {/* Progress Bar & Interactive Milestone Nodes */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono-tabular">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Start: {timeline.startDate}
                  </span>
                  <span className="font-semibold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-md">
                    Milestone {selectedMilestoneIndex + 1} of {timeline.milestones.length}: {currentMilestone.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    Completion: {timeline.completionDate}
                  </span>
                </div>

                {/* The visual progress bar track with clickable node markers */}
                <div className="relative py-4">
                  {/* Background track */}
                  <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${currentMilestone?.progressPercent || 100}%`,
                      }}
                    />
                  </div>

                  {/* Interactive Marker Nodes along track */}
                  <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-1">
                    {timeline.milestones.map((m, idx) => {
                      const isSelected = selectedMilestoneIndex === idx;
                      const isPassed = idx <= selectedMilestoneIndex;

                      return (
                        <button
                          key={m.phase}
                          type="button"
                          onClick={() => setSelectedMilestoneIndex(idx)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold font-mono-tabular transition-all cursor-pointer shadow-xs focus:outline-none ${
                            isSelected
                              ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-125 z-10 shadow-md'
                              : isPassed
                              ? 'bg-blue-600 text-white hover:scale-110'
                              : 'bg-white border-2 border-zinc-300 text-zinc-500 hover:border-zinc-400 hover:scale-105'
                          }`}
                          title={`Milestone ${idx + 1}: ${m.phase} — ${m.name} (${m.duration})`}
                          aria-label={`Milestone ${idx + 1}: ${m.name}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Progress helper line */}
                <div className="flex items-center justify-between text-[11px] font-mono-tabular text-zinc-400 px-0.5">
                  <span>Phase 01 Kickoff</span>
                  <span className="text-blue-600 font-medium">
                    Active Milestone Progress: {currentMilestone.progressPercent}%
                  </span>
                  <span>Final Delivery</span>
                </div>
              </div>

              {/* Active Milestone Card */}
              {currentMilestone && (
                <div className="p-4 sm:p-5 rounded-xl bg-[#FAF9F6] border border-zinc-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono-tabular font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {currentMilestone.phase}
                      </span>
                      <span className="text-zinc-300" aria-hidden="true">·</span>
                      <span className="text-xs font-mono-tabular text-zinc-600 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        {currentMilestone.duration}
                      </span>
                      <span className="text-zinc-300" aria-hidden="true">·</span>
                      <span className="text-xs font-mono-tabular text-indigo-600 font-semibold">
                        {currentMilestone.progressPercent}% of Project
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      <button
                        type="button"
                        disabled={selectedMilestoneIndex === 0}
                        onClick={() =>
                          setSelectedMilestoneIndex((prev) => Math.max(0, prev - 1))
                        }
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-zinc-600 hover:text-zinc-950 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-200 rounded transition-colors cursor-pointer"
                        aria-label="Previous milestone"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Prev Phase</span>
                      </button>
                      <button
                        type="button"
                        disabled={
                          selectedMilestoneIndex === timeline.milestones.length - 1
                        }
                        onClick={() =>
                          setSelectedMilestoneIndex((prev) =>
                            Math.min(timeline.milestones.length - 1, prev + 1)
                          )
                        }
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-zinc-600 hover:text-zinc-950 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-200 rounded transition-colors cursor-pointer"
                        aria-label="Next milestone"
                      >
                        <span>Next Phase</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-zinc-950 font-display">
                      {currentMilestone.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {currentMilestone.highlight}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs pt-1">
                    <span className="font-semibold text-zinc-900 flex items-center gap-1 font-mono-tabular">
                      <Flag className="w-3.5 h-3.5 text-blue-600" />
                      Key Deliverable:
                    </span>
                    <span className="text-zinc-800 bg-white px-2.5 py-1 rounded border border-zinc-200 font-mono-tabular font-medium text-[11px] sm:text-xs">
                      {currentMilestone.deliverable}
                    </span>
                  </div>
                </div>
              )}

              {/* Clickable Milestone Stage Selector Grid */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-semibold text-zinc-700 flex items-center justify-between">
                  <span>All Key Milestones ({timeline.milestones.length})</span>
                  <span className="text-[11px] text-zinc-400 font-mono-tabular">Click any milestone to inspect</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {timeline.milestones.map((milestone, idx) => {
                    const isCurrent = selectedMilestoneIndex === idx;

                    return (
                      <button
                        key={milestone.phase}
                        type="button"
                        onClick={() => setSelectedMilestoneIndex(idx)}
                        className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                          isCurrent
                            ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600 shadow-xs'
                            : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono-tabular font-bold ${isCurrent ? 'text-blue-600' : 'text-zinc-400'}`}>
                            {milestone.phase}
                          </span>
                          <span className="text-[10px] font-mono-tabular text-zinc-400">
                            {milestone.progressPercent}%
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-zinc-900 truncate mt-1">
                          {milestone.name}
                        </div>
                        <div className="text-[11px] font-mono-tabular text-blue-600 mt-0.5">
                          {milestone.duration}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Metrics & Design Evaluation Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-white border border-zinc-200">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-xs text-zinc-500">{metric.label}</div>
                <div className="text-lg font-bold text-zinc-950 font-mono-tabular">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Deliverables List */}
          <div className="p-6 rounded-xl bg-white border border-zinc-200 space-y-3">
            <h3 className="text-xs font-bold text-zinc-900 font-mono-tabular flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-blue-600" />
              <span>Project Deliverables &amp; Artifacts</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Problem & Design Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            <div className="space-y-2.5">
              <h3 className="text-sm font-semibold text-zinc-950 flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600 shrink-0" />
                <span>01. The Design Challenge</span>
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div className="space-y-2.5">
              <h3 className="text-sm font-semibold text-zinc-950 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                <span>02. The Creative &amp; Ergonomic Solution</span>
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {project.designSolution}
              </p>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-900 font-mono-tabular">
              03. Design &amp; Technical Specifications
            </h3>
            <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-xl bg-white overflow-hidden">
              {project.specifications.map((spec) => (
                <div key={spec.aspect} className="px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="font-semibold text-zinc-900 sm:w-1/3">{spec.aspect}</span>
                  <span className="text-zinc-600 sm:w-2/3">{spec.details}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Measurable Outcomes */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-900 font-mono-tabular">
              04. Quantifiable Outcomes &amp; Impact
            </h3>
            <ul className="space-y-2.5">
              {project.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Bottom CTA */}
          <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 block">Tools &amp; Creative Methodology</span>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-zinc-800 font-mono-tabular">
                {project.tools.map((tool, idx) => (
                  <React.Fragment key={tool}>
                    {idx > 0 && <span className="text-zinc-300" aria-hidden="true">·</span>}
                    <span>{tool}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onInquireProject(project.title);
                onClose();
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Inquire About This Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
