export const Loader = () => {
    return (
        <div
            className="min-h-[75vh] flex items-center justify-center px-4 py-20"
            style={{
                background:
                    "radial-gradient(circle at top, rgba(59, 130, 246, 0.18) 0%, rgba(15, 23, 42, 0) 42%), linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)",
            }}
        >
            <div
                className="relative flex flex-col items-center gap-5 rounded-3xl border px-8 py-10 text-center shadow-[0_24px_80px_rgba(30,64,175,0.16)]"
                style={{
                    background: "rgba(255, 255, 255, 0.88)",
                    borderColor: "rgba(96, 165, 250, 0.28)",
                    backdropFilter: "blur(18px)",
                }}
            >
                <div className="relative h-18 w-18">
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background:
                                "conic-gradient(from 0deg, #1d4ed8 0deg, #3b82f6 130deg, rgba(59, 130, 246, 0.08) 240deg, rgba(59, 130, 246, 0.05) 360deg)",
                            animation: "loader-spin 1s linear infinite",
                            WebkitMask:
                                "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 7px))",
                            mask: "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 7px))",
                        }}
                    />
                    <div
                        className="absolute inset-4 rounded-full"
                        style={{
                            background: "linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%)",
                            boxShadow: "0 0 0 10px rgba(59, 130, 246, 0.08)",
                            animation: "loader-pulse 1.4s ease-in-out infinite",
                        }}
                    />
                </div>

                <div>
                    <h2 className="text-lg font-semibold tracking-tight" style={{ color: "#12306b" }}>
                        Loading
                    </h2>
                    <p className="mt-1 text-sm" style={{ color: "#54709c" }}>
                        Please wait while we prepare everything for you.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-700" style={{ animation: "loader-bounce 1s ease-in-out infinite" }} />
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" style={{ animation: "loader-bounce 1s ease-in-out infinite 0.15s" }} />
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-400" style={{ animation: "loader-bounce 1s ease-in-out infinite 0.3s" }} />
                </div>

                <style>{`
                    @keyframes loader-spin {
                        to { transform: rotate(360deg); }
                    }

                    @keyframes loader-pulse {
                        0%, 100% { transform: scale(0.98); opacity: 0.82; }
                        50% { transform: scale(1.06); opacity: 1; }
                    }

                    @keyframes loader-bounce {
                        0%, 80%, 100% { transform: translateY(0); opacity: 0.55; }
                        40% { transform: translateY(-6px); opacity: 1; }
                    }
                `}</style>
            </div>
        </div>
    );
};