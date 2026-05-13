import { useEffect, useRef } from "react";
import "./Splash.css";

const RING_SIZE = 120;
const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 276

const Splash = ({ onDone }) => {
  const splashRef = useRef(null);

  useEffect(() => {
    const el = splashRef.current;
    if (!el) return;

    // Start exit animation at 1.5s, call onDone at 1.8s
    const exitTimer = setTimeout(() => {
      el.classList.add("splash--out");
    }, 1500);

    const doneTimer = setTimeout(() => {
      onDone?.();
    }, 1800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div ref={splashRef} className="splash">
      <div className="splash__content">
        <div className="splash__ring-wrap" style={{ width: RING_SIZE, height: RING_SIZE }}>
          <svg
            className="splash__ring-svg"
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            width={RING_SIZE}
            height={RING_SIZE}
          >
            {/* track */}
            <circle
              className="splash__ring-track"
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              fill="none"
              strokeWidth="3"
            />
            {/* animated fill */}
            <circle
              className="splash__ring-fill"
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              fill="none"
              strokeWidth="3"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
              strokeLinecap="round"
            />
          </svg>

          <img
            className="splash__logo"
            src="/images/icons/icon-sismac.png"
            alt="Sismac"
            draggable={false}
          />
        </div>

        <span className="splash__name">SISMAC</span>
      </div>
    </div>
  );
};

export default Splash;
