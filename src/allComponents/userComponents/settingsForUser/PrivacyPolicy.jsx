import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../layout/AppShell";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "Introduction",
    emoji: "👋",
    content: "Welcome to our Video Sharing Platform. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.",
  },
  {
    title: "Information We Collect",
    emoji: "📋",
    content: "We may collect several types of information including:",
    list: [
      "Personal information such as name, email address, and profile details.",
      "Account information including username and password.",
      "Uploaded content such as videos, thumbnails, and comments.",
      "Device information including browser type, IP address, and operating system.",
      "Usage data including watch history, likes, and engagement.",
    ],
  },
  {
    title: "How We Use Your Information",
    emoji: "⚙️",
    list: [
      "To provide and maintain our services.",
      "To personalize your content recommendations.",
      "To improve platform performance and security.",
      "To communicate with users regarding updates and support.",
      "To detect and prevent fraudulent activity.",
    ],
  },
  {
    title: "Cookies & Tracking",
    emoji: "🍪",
    content: "We use cookies and similar tracking technologies to enhance user experience, analyze site traffic, and remember user preferences.",
  },
  {
    title: "Third-Party Services",
    emoji: "🔗",
    content: "Our platform may use third-party services such as analytics providers, payment processors, and cloud storage providers. These services may collect information according to their own privacy policies.",
  },
  {
    title: "Data Security",
    emoji: "🛡️",
    content: "We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.",
  },
  {
    title: "Your Privacy Rights",
    emoji: "⚖️",
    content: "Depending on your location, you may have rights regarding your personal data such as access, correction, deletion, and restriction of processing.",
  },
  {
    title: "Children's Privacy",
    emoji: "👶",
    content: "Our platform is not intended for children under the age of 13. We do not knowingly collect personal information from children.",
  },
  {
    title: "Policy Updates",
    emoji: "🔄",
    content: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.",
  },
  {
    title: "Contact Us",
    emoji: "📩",
    content: "If you have any questions about this Privacy Policy, you can contact us at: support@navyaeakshan.com",
  },
];

function PrivacyPolicy() {
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const scrollToSection = (i) => {
    const el = document.getElementById(`priv-section-${i}`);
    if (el && contentRef.current) {
      contentRef.current.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
    }
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/10 py-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => navigate("/settings")}
              className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shrink-0"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-0.5">Settings</p>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Privacy Policy</h1>
            </div>
            <span className="ml-auto text-xs text-slate-400 font-medium shrink-0">Last updated: Mar 2026</span>
          </div>

          <div className="flex gap-6">
            {/* Sidebar TOC */}
            <nav className="hidden md:flex flex-col gap-1 w-52 shrink-0 sticky top-6 self-start">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-2">Contents</p>
              {sections.map((s, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(i)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-left"
                >
                  <span className="text-base leading-none">{s.emoji}</span>
                  <span className="truncate">{s.title}</span>
                </button>
              ))}
            </nav>

            {/* Main Content */}
            <div ref={contentRef} className="flex-1 space-y-6">
              {sections.map((s, i) => (
                <div
                  key={i}
                  id={`priv-section-${i}`}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl leading-none">{s.emoji}</span>
                    <h2 className="text-base font-black text-slate-800 dark:text-slate-100">{s.title}</h2>
                  </div>
                  {s.content && <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.content}</p>}
                  {s.list && (
                    <ul className="mt-3 space-y-2">
                      {s.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
}

export default PrivacyPolicy;