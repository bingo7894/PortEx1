import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./ProfileCard.css";

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
};

const clamp = (value, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const round = (value, precision = 3) => parseFloat(value.toFixed(precision));

const adjust = (value, fromMin, fromMax, toMin, toMax) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCardComponent = ({
  avatarUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;

    const updateCardTransform = (offsetX, offsetY, card, wrap) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (duration, startX, startY, card, wrap) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !animationHandlers) return;
      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap,
      );
    },
    [animationHandlers],
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;
    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !animationHandlers) return;
      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap,
      );
      wrap.classList.remove("active");
      card.classList.remove("active");
    },
    [animationHandlers],
  );

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerleave", handlePointerLeave);

    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;

    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap,
    );

    return () => {
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
      animationHandlers.cancelAnimation();
    };
  }, [
    enableTilt,
    animationHandlers,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
  ]);

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper group relative w-[360px] h-[480px] rounded-[24px] [perspective:1000px] ${className}`}
    >
      {/* ใส่ overflow-hidden กลับเข้ามาที่นี่ เพื่อให้ขอบตัดรูปที่ล้นออกไป */}
      <section
        ref={cardRef}
        className="pc-card relative w-full h-full rounded-[24px] border border-white/20 bg-[#0a0a0a] overflow-hidden transition-all duration-500 ease-out 
                   hover:border-yellow-500/80 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]"
      >
        {/* เลเยอร์รูปภาพ */}
        <div className="absolute inset-0 w-full h-full bg-[#141414]">
          <img
            className="w-full h-full object-cover transition-all duration-700 ease-in-out
                       brightness-[0.85] contrast-[1.1] saturate-[0.8] 
                       /* แค่ scale ไม่ต้องใส่ -translate-y */
                       group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-125 group-hover:saturate-100"
            src={avatarUrl}
            alt={name}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        {/* เลเยอร์ Content */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-0 left-0 w-full p-6 pb-24 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
            <h3 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              {name}
            </h3>
            <p className="text-yellow-400 font-bold mt-1 tracking-widest uppercase text-xs drop-shadow-sm">
              {title}
            </p>
          </div>

          {/* ข้อมูลด้านล่าง (ใส่ pointer-events-auto เพื่อให้กดปุ่มได้) */}
          {showUserInfo && (
            <div
              className="absolute bottom-5 left-5 right-5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-between pointer-events-auto
                            transition-all duration-500 group-hover:translate-y-[-8px] group-hover:bg-black/60 group-hover:border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-yellow-500/70 shadow-inner">
                  <img
                    className="w-full h-full object-cover"
                    src={miniAvatarUrl || avatarUrl}
                    alt={name}
                  />
                </div>
                <div>
                  <div className="text-white font-bold text-sm tracking-wide">
                    @{handle}
                  </div>
                  <div className="text-yellow-400 text-[10px] font-black flex items-center gap-1.5 mt-0.5 uppercase tracking-tighter">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.8)]"></span>
                    {status}
                  </div>
                </div>
              </div>

              <button
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xs px-5 py-2.5 rounded-xl 
                           transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/20"
                onClick={onContactClick}
                type="button"
              >
                {contactText}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default React.memo(ProfileCardComponent);
