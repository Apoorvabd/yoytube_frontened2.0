import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../layout/AppShell";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "Account Issues",
    emoji: "🔐",
    content: 'If you are having trouble accessing your account, such as login issues, password recovery, or account verification, please try resetting your password using the "Forgot Password" option on the login page.',
  },
  {
    title: "Uploading Videos",
    emoji: "📤",
    content: "Users can upload videos by navigating to the upload section. Ensure your video follows our community guidelines and supported file formats.",
    list: [
      "Supported formats: MP4, MOV, AVI",
      "Maximum upload size may vary depending on your account.",
      "Ensure your video does not violate copyright rules.",
    ],
  },
  {
    title: "Video Playback Problems",
    emoji: "▶️",
    content: "If videos are not playing properly, try the following steps:",
    list: [
      "Refresh the page.",
      "Check your internet connection.",
      "Clear your browser cache.",
      "Try using a different browser.",
    ],
  },
  {
    title: "Community Guidelines",
    emoji: "🤝",
    content: "Our platform encourages respectful and safe interactions. Content that promotes violence, hate speech, harassment, or illegal activities may be removed and could result in account suspension.",
  },
  {
    title: "Reporting Content",
    emoji: "🚩",
    content: "If you find content that violates our guidelines, you can report it using the report button available on the video page.",
  },
  {
    title: "Contact Support",
    emoji: "📩",
    content: "If you cannot find the answer to your question, feel free to contact our support team.",
    extra: ["📧 support@navyaeakshan.com", "⏱️ Response time: 24–48 hours"],
  },
];

function HelpSupport() {
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const scrollToSection = (i) => {
    const el = document.getElementById(`help-section-${i}`);
    if (el && contentRef.current) {
      contentRef.current.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
    }
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-pink-950/10 py-10 px-4 sm:px-6">
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
              <p className="text-xs font-black uppercase tracking-widest text-pink-500 mb-0.5">Settings</p>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Help & Support</h1>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Sidebar TOC */}
            <nav className="hidden md:flex flex-col gap-1 w-52 shrink-0 sticky top-6 self-start">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-2">Topics</p>
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
            <div ref={contentRef} className="flex-1 space-y-4">
              {sections.map((s, i) => (
                <div
                  key={i}
                  id={`help-section-${i}`}
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
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-pink-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.extra && (
                    <div className="mt-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 space-y-1.5">
                      {s.extra.map((line, j) => (
                        <p key={j} className="text-sm font-semibold text-slate-600 dark:text-slate-300">{line}</p>
                      ))}
                    </div>
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

export default HelpSupport;