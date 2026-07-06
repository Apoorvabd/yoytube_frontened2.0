export const Loader = () => {
    return (
        <div
            className="min-h-[90vh] flex items-center justify-center px-4 py-20"
            style={{
                background:
                    "radial-gradient(circle at top, rgba(4, 20, 46, 0.18) 0%, rgba(15, 23, 42, 0) 42%), linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)",
            }}
        >
            <div
                className="relative flex flex-col items-center gap-6 rounded-3xl border px-10 py-12 text-center shadow-[0_32px_96px_rgba(30,64,175,0.18)]"
                style={{
                    background: "rgba(245, 245, 245, 0.96)", // Off-white contrast
                    borderColor: "rgba(96, 165, 250, 0.28)",
                    backdropFilter: "blur(20px)",
                }}
            >
                {/* Bigger & Premium Animated Loader Container */}
                <div className="relative h-28 w-28 flex items-center justify-center">
                    {/* Outer Ring - Clockwise Spin */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background:
                                "conic-gradient(from 0deg, #1d4ed8 0deg, #3b82f6 180deg, transparent 270deg, transparent 360deg)",
                            animation: "loader-spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                            WebkitMask:
                                "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px))",
                            mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px))",
                        }}
                    />
                    
                    {/* Middle Ring - Counter-Clockwise Spin */}
                    <div
                        className="absolute h-20 w-20 rounded-full"
                        style={{
                            background:
                                "conic-gradient(from 180deg, #60a5fa 0deg, #3b82f6 180deg, transparent 270deg, transparent 360deg)",
                            animation: "loader-spin-reverse 1s linear infinite",
                            WebkitMask:
                                "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px))",
                            mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px))",
                        }}
                    />

                    {/* Inner Orbiting Orb / Core */}
                    <div
                        className="absolute h-10 w-10 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                        style={{
                            background: "linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%)",
                            animation: "loader-pulse 1.5s ease-in-out infinite",
                        }}
                    />
                </div>

                <div>
                    <h2 className="text-xl font-bold tracking-tight" style={{ color: "#0f255c" }}>
                        Loading...
                    </h2>
                    <p className="mt-2 text-sm max-w-xs leading-relaxed" style={{ color: "#4c638c" }}>
                        Please wait while we gather the best experience for you.
                    </p>
                </div>

                {/* Dots with a smoother bouncing physics effect */}
                <div className="flex items-center gap-2 mt-2">
                    <span className="h-3 w-3 rounded-full bg-blue-700 shadow-sm" style={{ animation: "loader-bounce-smooth 1.2s infinite ease-in-out" }} />
                    <span className="h-3 w-3 rounded-full bg-blue-500 shadow-sm" style={{ animation: "loader-bounce-smooth 1.2s infinite ease-in-out 0.2s" }} />
                    <span className="h-3 w-3 rounded-full bg-sky-400 shadow-sm" style={{ animation: "loader-bounce-smooth 1.2s infinite ease-in-out 0.4s" }} />
                </div>

                <style>{`
                    @keyframes loader-spin {
                        to { transform: rotate(360deg); }
                    }
                    @keyframes loader-spin-reverse {
                        to { transform: rotate(-360deg); }
                    }
                    @keyframes loader-pulse {
                        0%, 100% { transform: scale(0.92); opacity: 0.85; filter: drop-shadow(0 0 8px rgba(59,130,246,0.4)); }
                        50% { transform: scale(1.08); opacity: 1; filter: drop-shadow(0 0 16px rgba(59,130,246,0.7)); }
                    }
                    @keyframes loader-bounce-smooth {
                        0%, 80%, 100% { transform: translateY(0); }
                        40% { transform: translateY(-8px); }
                    }
                `}</style>
            </div>
        </div>
    );
};