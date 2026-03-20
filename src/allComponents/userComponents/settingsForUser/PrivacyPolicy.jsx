import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GiCrossedBones } from "react-icons/gi";

const sections = [
  {
    title: "1. Introduction",
    content:
      "Welcome to our Video Sharing Platform. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.",
  },
  {
    title: "2. Information We Collect",
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
    title: "3. How We Use Your Information",
    list: [
      "To provide and maintain our services.",
      "To personalize your content recommendations.",
      "To improve platform performance and security.",
      "To communicate with users regarding updates and support.",
      "To detect and prevent fraudulent activity.",
    ],
  },
  {
    title: "4. Cookies and Tracking Technologies",
    content:
      "We use cookies and similar tracking technologies to enhance user experience, analyze site traffic, and remember user preferences.",
  },
  {
    title: "5. Third-Party Services",
    content:
      "Our platform may use third-party services such as analytics providers, payment processors, and cloud storage providers. These services may collect information according to their own privacy policies.",
  },
  {
    title: "6. Data Security",
    content:
      "We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.",
  },
  {
    title: "7. Your Privacy Rights",
    content:
      "Depending on your location, you may have rights regarding your personal data such as access, correction, deletion, and restriction of processing.",
  },
  {
    title: "8. Children's Privacy",
    content:
      "Our platform is not intended for children under the age of 13. We do not knowingly collect personal information from children.",
  },
  {
    title: "9. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.",
  },
  {
    title: "10. Contact Us",
    content:
      "If you have any questions about this Privacy Policy, you can contact us at: support@yourplatform.com",
  },
];

function PrivacyPolicy() {
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
    <div className="flex justify-center items-start min-h-screen mt-12 mb-12 px-4">

      {/* main container */}
      <div className="w-[85%] bg-neutral-200 rounded-2xl shadow-2xl flex p-4 animate-fade-up">

        {/* left navigation */}
        <div className="w-72 flex-shrink-0 flex flex-col items-center pt-12 border-r border-neutral-800">

          <h2 className="text-3xl font-bold text-black mb-2 tracking-wide text-center">
            Privacy Policy
          </h2>

          <p className="text-neutral-600 text-sm mb-10">Last Updated: March 2026</p>

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
            onClick={() => navigate("/settings")}
          >
            <GiCrossedBones className="text-3xl" />
          </button>

          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-neutral-600 mb-10 text-sm">Last Updated: March 2026</p>

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
              </section>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;