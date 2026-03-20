import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GiCrossedBones } from "react-icons/gi";

const sections = [
  {
    title: "1. Account Issues",
    content:
      'If you are having trouble accessing your account, such as login issues, password recovery, or account verification, please try resetting your password using the "Forgot Password" option on the login page.',
  },
  {
    title: "2. Uploading Videos",
    content:
      "Users can upload videos by navigating to the upload section of the platform. Ensure that your video follows our community guidelines and supported file formats.",
    list: [
      "Supported formats: MP4, MOV, AVI",
      "Maximum upload size may vary depending on account limits.",
      "Ensure your video does not violate copyright rules.",
    ],
  },
  {
    title: "3. Video Playback Problems",
    content: "If videos are not playing properly, try the following steps:",
    list: [
      "Refresh the page.",
      "Check your internet connection.",
      "Clear browser cache.",
      "Try using another browser.",
    ],
  },
  {
    title: "4. Community Guidelines",
    content:
      "Our platform encourages respectful and safe interactions. Content that promotes violence, hate speech, harassment, or illegal activities may be removed and could result in account suspension.",
  },
  {
    title: "5. Reporting Content",
    content:
      "If you find content that violates our guidelines, you can report it using the report button available on the video page.",
  },
  {
    title: "6. Contact Support",
    content:
      "If you cannot find the answer to your question, feel free to contact our support team.",
    extra: ["Email: support@yourplatform.com", "Response Time: 24 - 48 hours"],
  },
];

function HelpSupport() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scrollToSection = (i) => {
    const el = document.getElementById(`section-${i}`);
    if (el && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: el.offsetTop - 20,
        behavior: "smooth",
      });
    }
  };

  return (
    <div  className="flex justify-center items-start min-h-screen mt-12 mb-12 px-4">

      {/* main container */}
      <div className="w-[85%] bg-neutral-200 rounded-2xl shadow-2xl flex p-4 animate-fade-up">

        {/* left navigation */}
        <div className="w-72 flex-shrink-0 flex flex-col items-center pt-12 border-r border-neutral-800">

          <h2 className="text-3xl font-bold text-black mb-2 tracking-wide text-center">
            Help & Support
          </h2>

          <p className="text-neutral-600 text-sm mb-10 text-center px-4">
            Find answers or contact our team.
          </p>

          <nav className="flex flex-col gap-3 w-full px-6">
            {sections.map((s, i) => (
              <button
                key={i}
                className="navBtn text-sm text-left"
                onClick={() => scrollToSection(i)}
              >
                {s.title}
              </button>
            ))}
          </nav>

        </div>

        {/* right content — scrollable */}
        <div
          ref={scrollRef}
          className="flex-1 relative p-12 text-black overflow-y-auto max-h-[85vh]"
        >

          <button
            className="absolute top-6 right-6 text-red-500 hover:text-red-400 transition"
            onClick={() => navigate(-1)}
          >
            <GiCrossedBones className="text-3xl" />
          </button>

          <h1 className="text-4xl font-bold mb-2">Help & Support</h1>
          <p className="text-neutral-600 mb-10">
            Need help? Find answers to common questions or contact our support team.
          </p>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <section
                key={i}
                id={`section-${i}`}
                className="space-y-3 border-b border-neutral-400 pb-6 last:border-none"
              >
                <h2 className="text-xl font-semibold text-black">{s.title}</h2>

                {s.content && (
                  <p className="text-neutral-800 leading-relaxed">{s.content}</p>
                )}

                {s.list && (
                  <ul className="list-disc pl-6 text-neutral-800 space-y-1">
                    {s.list.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}

                {s.extra && (
                  <div className="space-y-1">
                    {s.extra.map((line, j) => (
                      <p key={j} className="text-neutral-800">{line}</p>
                    ))}
                  </div>
                )}

              </section>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default HelpSupport;