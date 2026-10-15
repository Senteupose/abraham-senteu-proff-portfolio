import React, { useEffect } from 'react';
import { X, Printer, Mail, Phone, MapPin } from 'lucide-react';
import {
  PROFILE_DATA,
  EXPERIENCE_DATA,
  PROJECTS_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
  REFEREES_DATA,
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 backdrop-blur-sm p-4 sm:p-6 md:p-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-zinc-200 bg-[#FAF9F6] shrink-0">
          <div className="text-xs font-mono-tabular text-zinc-600">
            Curriculum Vitae · {PROFILE_DATA.name}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 bg-zinc-200/70 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-zinc-900">
          {/* Header */}
          <div className="border-b border-zinc-200 pb-6 space-y-3">
            <h2
              id="cv-modal-title"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 font-display"
            >
              {PROFILE_DATA.name}
            </h2>
            <p className="text-sm font-medium text-blue-600">
              {PROFILE_DATA.roleLine}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600 font-mono-tabular">
              <span className="inline-flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                {PROFILE_DATA.phone}
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                {PROFILE_DATA.email}
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {PROFILE_DATA.location}
              </span>
            </div>
          </div>

          {/* Profile */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-500 font-mono-tabular">
              01. Professional Profile
            </h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
              {PROFILE_DATA.bioLead} {PROFILE_DATA.bioExtended}
            </p>
          </div>

          {/* Design Projects by Category */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 font-mono-tabular">
              02. Design Projects (UI/UX, Branding, Print &amp; Design Systems)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS_DATA.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl border border-zinc-200 bg-[#FAF9F6] space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-blue-600">
                    <span>{proj.category}</span>
                    <span>{proj.year}</span>
                  </div>
                  <div className="text-sm font-bold text-zinc-950 font-display">
                    {proj.title}
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {proj.summary}
                  </p>
                  <div className="text-xs font-mono-tabular text-zinc-500 pt-1">
                    {proj.tools.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 font-mono-tabular">
              03. Professional Experience
            </h3>
            <div className="space-y-6">
              {EXPERIENCE_DATA.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="text-base font-bold text-zinc-950 font-display">
                      {exp.role}
                    </h4>
                    <span className="text-xs font-mono-tabular text-zinc-500">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-blue-600">
                    {exp.organization} · {exp.location}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-700 pt-1">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-500 font-mono-tabular">
                04. Education
              </h3>
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.degree} className="space-y-1">
                  <div className="text-sm font-bold text-zinc-950">{edu.degree}</div>
                  <div className="text-xs text-zinc-600">
                    {edu.institution} · {edu.period}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-500 font-mono-tabular">
                05. Certifications &amp; Referees
              </h3>
              <div className="space-y-1.5 text-xs text-zinc-700">
                {CERTIFICATIONS_DATA.map((cert) => (
                  <div key={cert.title}>
                    <span className="font-semibold text-zinc-950">{cert.title}</span> — {cert.issuer} ({cert.year})
                  </div>
                ))}
              </div>
              <div className="pt-2 space-y-1 text-xs text-zinc-600 border-t border-zinc-200">
                {REFEREES_DATA.map((ref) => (
                  <div key={ref.name}>
                    <span className="font-semibold text-zinc-900">{ref.name}</span> · {ref.role}, {ref.organization}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
