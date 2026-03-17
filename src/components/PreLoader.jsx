import Aurora from "./Aurora/Aurora";
import { useState, useEffect } from "react";
import CountUp from "./CountUp/CountUp";

const PreLoader = () => {
  const [loading, setLoading] = useState(true);
  const [countDone, setCountDone] = useState(false);
  const [fadeText, setFadeText] = useState(false);
  const [fadeScreen, setFadeScreen] = useState(false);

  useEffect(() => {
    if (countDone) {
      const fadeTextTimer = setTimeout(() => setFadeText(true), 3000);
      const fadeScreenTimer = setTimeout(() => setFadeScreen(true), 2000);
      const hideTimer = setTimeout(() => setLoading(false), 3000);

      return () => {
        clearTimeout(fadeTextTimer);
        clearTimeout(fadeScreenTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [countDone]);

  return (
    loading && (
      <div
        className={`w-screen h-screen fixed flex items-center justify-center bg-[#050505] z-[10000] overflow-hidden transition-opacity duration-1000 ${
          fadeScreen ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* เปลี่ยนสี Aurora เป็นโทน Midnight Violet */}
        <Aurora
          colorStops={["#4c1d95", "#7c3aed", "#c026d3"]}
          blend={0.6}
          amplitude={1.2}
          speed={0.6}
        />
        <div
          className={`absolute text-white text-7xl font-extrabold tracking-tighter transition-all duration-1000 ${
            fadeText
              ? "opacity-0 -translate-y-10 scale-110"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          <CountUp
            from={0}
            to={100}
            separator=","
            direction="up"
            duration={1.5}
            className="count-up-text"
            onEnd={() => setCountDone(true)}
          />
        </div>
      </div>
    )
  );
};

export default PreLoader;
