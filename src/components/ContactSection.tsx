import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Copy,
  Check,
  Send,
  CheckCircle2,
  Clock,
  ExternalLink,
  Trash2,
  Cloud,
  LogIn,
} from 'lucide-react';
import { PROFILE_DATA, REFEREES_DATA } from '../data/portfolioData';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

interface ContactSectionProps {
  prefilledSubject?: string;
}

interface SubmittedInquiry {
  id: string;
  name: string;
  email: string;
  organization: string;
  inquiryType: string;
  subject: string;
  message: string;
  timestamp: string;
  syncedToFirestore?: boolean;
}

const INQUIRY_TYPES = [
  'UI/UX & Product Design Project',
  'Brand Identity & Visual Guidelines',
  'Print & Editorial Publication Design',
  'Design Systems & Frontend Architecture',
  'Banking Operations & Digital Transformation',
];

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledSubject }) => {
  const { currentUser, signInWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [submittedList, setSubmittedList] = useState<SubmittedInquiry[]>([]);
  const [justSubmitted, setJustSubmitted] = useState<SubmittedInquiry | null>(null);

  // Autofill user details when authenticated
  useEffect(() => {
    if (currentUser) {
      if (!name && currentUser.displayName) setName(currentUser.displayName);
      if (!email && currentUser.email) setEmail(currentUser.email);
    }
  }, [currentUser]);

  // Sync inquiries from Firestore for logged in user, or fallback to localStorage
  useEffect(() => {
    if (currentUser) {
      const inquiriesCol = collection(db, 'users', currentUser.uid, 'inquiries');
      const unsubscribe = onSnapshot(
        inquiriesCol,
        (snapshot) => {
          const loaded: SubmittedInquiry[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            loaded.push({
              id: data.id || docSnap.id,
              name: data.name || '',
              email: data.email || '',
              organization: data.organization || '',
              inquiryType: data.inquiryType || '',
              subject: data.subject || '',
              message: data.message || '',
              timestamp: data.createdAt ? new Date(data.createdAt).toLocaleString() : 'Recent',
              syncedToFirestore: true,
            });
          });
          // Sort newest first
          loaded.sort((a, b) => b.id.localeCompare(a.id));
          setSubmittedList(loaded);
        },
        (error) => {
          handleFirestoreError(error, OperationType.LIST, `users/${currentUser.uid}/inquiries`);
        }
      );
      return () => unsubscribe();
    } else {
      try {
        const saved = localStorage.getItem('abraham_portfolio_inquiries');
        if (saved) setSubmittedList(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (prefilledSubject) {
      setSubject(`Inquiry regarding: ${prefilledSubject}`);
      setInquiryType('UI/UX & Product Design Project');
    }
  }, [prefilledSubject]);

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validateForm = () => {
    const nextErrors: { [key: string]: string } = {};
    if (!name.trim()) nextErrors.name = 'Please enter your full name.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please provide a valid email address.';
    }
    if (!message.trim() || message.trim().length < 15) {
      nextErrors.message = 'Please provide a brief message (at least 15 characters).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const finalSubject =
      subject.trim() || `${inquiryType} — Inquiry from ${name.trim()}`;
    const inqId = `INQ-${Date.now().toString().slice(-6)}`;
    const nowIso = new Date().toISOString();

    const newEntry: SubmittedInquiry = {
      id: inqId,
      name: name.trim(),
      email: email.trim(),
      organization: organization.trim() || 'Direct Client',
      inquiryType,
      subject: finalSubject,
      message: message.trim(),
      timestamp: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      syncedToFirestore: Boolean(currentUser),
    };

    // If authenticated, persist to Firestore
    if (currentUser) {
      try {
        const inqDocRef = doc(db, 'users', currentUser.uid, 'inquiries', inqId);
        await setDoc(inqDocRef, {
          id: inqId,
          userId: currentUser.uid,
          name: name.trim(),
          email: email.trim(),
          organization: organization.trim() || 'Direct Client',
          inquiryType,
          subject: finalSubject,
          message: message.trim(),
          status: 'pending',
          createdAt: nowIso,
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `users/${currentUser.uid}/inquiries/${inqId}`);
      }
    } else {
      const updated = [newEntry, ...submittedList];
      setSubmittedList(updated);
      try {
        localStorage.setItem('abraham_portfolio_inquiries', JSON.stringify(updated));
      } catch {
        // ignore
      }
    }

    setJustSubmitted(newEntry);
    setSubject('');
    setMessage('');
    setErrors({});
  };

  const handleDeleteInquiry = async (id: string) => {
    if (currentUser) {
      try {
        const inqDocRef = doc(db, 'users', currentUser.uid, 'inquiries', id);
        await deleteDoc(inqDocRef);
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `users/${currentUser.uid}/inquiries/${id}`);
      }
    } else {
      const updated = submittedList.filter((item) => item.id !== id);
      setSubmittedList(updated);
      try {
        localStorage.setItem('abraham_portfolio_inquiries', JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
    if (justSubmitted?.id === id) setJustSubmitted(null);
  };

  const createMailtoHref = (entry: SubmittedInquiry) => {
    const body = `Hello Abraham,\n\n${entry.message}\n\n---\nSender: ${entry.name}\nOrganization: ${entry.organization}\nEmail: ${entry.email}\nProject Category: ${entry.inquiryType}`;
    return `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
      entry.subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 border-t border-zinc-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs font-mono-tabular text-zinc-500">
            05 · Direct Contact &amp; Professional Referees
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-display"
            style={{ textWrap: 'balance' }}
          >
            Initiate a collaboration on UI/UX, brand identity, or print systems.
          </h2>
          <p className="text-base text-zinc-600 leading-relaxed">
            Available for full-time design and banking operations roles, freelance design commissions, brand system design, and technical consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Channels & Referees (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F6] border border-zinc-200 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-zinc-950 font-display">
                  Direct Communication Channels
                </h3>
                <p className="text-xs text-zinc-500">
                  Instant copy-to-clipboard or direct email and phone access.
                </p>
              </div>

              <div className="space-y-3.5">
                {/* Email */}
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-zinc-200">
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-zinc-500">Email Address</div>
                      <a
                        href={`mailto:${PROFILE_DATA.email}`}
                        className="text-sm font-medium text-zinc-900 hover:text-blue-600 truncate block font-mono-tabular"
                      >
                        {PROFILE_DATA.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE_DATA.email, 'email')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-zinc-200">
                  <div className="flex items-center gap-3 min-w-0">
                    <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-zinc-500">Telephone / WhatsApp</div>
                      <a
                        href={`tel:${PROFILE_DATA.phone.replace(/\s+/g, '')}`}
                        className="text-sm font-medium text-zinc-900 hover:text-blue-600 truncate block font-mono-tabular"
                      >
                        {PROFILE_DATA.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE_DATA.phone, 'phone')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-zinc-200">
                  <div className="flex items-center gap-3 min-w-0">
                    <Linkedin className="w-4 h-4 text-blue-600 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-zinc-500">LinkedIn Profile</div>
                      <a
                        href={PROFILE_DATA.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-zinc-900 hover:text-blue-600 truncate block"
                      >
                        {PROFILE_DATA.linkedin}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE_DATA.linkedinUrl, 'linkedin')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'linkedin' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-zinc-200">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-xs text-zinc-500">Base Location</div>
                    <div className="text-sm font-medium text-zinc-900">
                      {PROFILE_DATA.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Referees Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F6] border border-zinc-200 space-y-5">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-zinc-950 font-display">
                  Institutional Referees
                </h3>
                <p className="text-xs text-zinc-500">
                  Supervisory and academic contacts available for verification.
                </p>
              </div>

              <div className="divide-y divide-zinc-200">
                {REFEREES_DATA.map((referee) => (
                  <div key={referee.name} className="py-4 first:pt-0 last:pb-0 space-y-1">
                    <div className="text-sm font-bold text-zinc-950">
                      {referee.name}
                    </div>
                    <div className="text-xs font-medium text-blue-600">
                      {referee.role} · {referee.organization}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {referee.relationship}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F6] border border-zinc-200 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-950 font-display">
                    Project Inquiry &amp; Message
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Fill in your project brief or role requirements to dispatch directly to Abraham.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono-tabular text-zinc-500 shrink-0">
                  {currentUser ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600">
                      <Cloud className="w-3.5 h-3.5" />
                      <span>Firestore Sync: Active</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={signInWithGoogle}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Sign in to save</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Inquiry Type Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-zinc-800">
                  Project Type / Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INQUIRY_TYPES.map((type) => {
                    const active = inquiryType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInquiryType(type)}
                        className={`text-left px-3.5 py-2.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer truncate ${
                          active
                            ? 'bg-zinc-900 text-white border-zinc-900'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-zinc-800">
                    Your Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Grace Wanjiku"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-blue-600 text-zinc-900"
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-600 font-medium">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-zinc-800">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="name@organization.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-blue-600 text-zinc-900"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 font-medium">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Organization & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-org" className="block text-xs font-semibold text-zinc-800">
                    Organization / Client Name
                  </label>
                  <input
                    id="contact-org"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Agency, Financial Institution, Startup"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-blue-600 text-zinc-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-zinc-800">
                    Subject Line
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Optional custom subject"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-blue-600 text-zinc-900"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-zinc-800">
                    Project Scope &amp; Brief <span className="text-rose-600">*</span>
                  </label>
                  <span className="text-xs text-zinc-400 font-mono-tabular">
                    {message.length} chars
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  placeholder="Share details on your UI/UX requirements, brand identity timeline, print specifications, or banking operations role..."
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-blue-600 text-zinc-900 resize-y"
                />
                {errors.message && (
                  <p className="text-xs text-rose-600 font-medium">{errors.message}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <p className="text-xs text-zinc-500">
                  Recipient: <span className="font-mono-tabular text-zinc-800">{PROFILE_DATA.email}</span>
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>

            {/* Confirmation Banner */}
            {justSubmitted && (
              <div className="p-6 rounded-2xl bg-emerald-950 text-white space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold font-display">
                        Inquiry Recorded ({justSubmitted.id})
                      </h4>
                      <p className="text-xs text-emerald-200">
                        Saved for {justSubmitted.name} · {justSubmitted.inquiryType}
                        {justSubmitted.syncedToFirestore && ' · Synced to Firestore'}
                      </p>
                    </div>
                  </div>
                  <a
                    href={createMailtoHref(justSubmitted)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white text-zinc-950 hover:bg-emerald-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Open in Email App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Your inquiry is recorded below and ready to open in your default mail app with the formatted brief addressed to {PROFILE_DATA.email}.
                </p>
              </div>
            )}

            {/* Inquiries Ledger */}
            {submittedList.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-zinc-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-zinc-900 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Your Recorded Inquiries ({submittedList.length})</span>
                  </h4>
                  <span className="text-xs text-zinc-500 font-mono-tabular">
                    {currentUser ? 'Stored in Firestore' : 'Stored in browser'}
                  </span>
                </div>
                <div className="divide-y divide-zinc-200">
                  {submittedList.map((item) => (
                    <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono-tabular">
                          <span className="font-semibold text-zinc-900">{item.id}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.timestamp}</span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{item.inquiryType}</span>
                        </div>
                        <div className="text-sm font-semibold text-zinc-950">
                          {item.subject}
                        </div>
                        <p className="text-xs text-zinc-600 line-clamp-2">
                          {item.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={createMailtoHref(item)}
                          className="px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors whitespace-nowrap"
                        >
                          Send Mail
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(item.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                          aria-label="Remove inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
