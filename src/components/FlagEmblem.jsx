export default function FlagEmblem({
  variant = "hero",
  activeIndex = 0,
  tiltDeg = 0,
}) {
  const uid = `rwFlagBadge_${variant}_${Math.abs(activeIndex)}`;
  const rayCount = 24;

  return (
    <div
      className={`flag-emblem flag-emblem--${variant}`}
      style={{
        transform: `rotate(${tiltDeg}deg)`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 240" className="flag-emblem-svg">
        <defs>
          <clipPath id={`${uid}_clip`}>
            <circle cx="120" cy="120" r="112" />
          </clipPath>

          <linearGradient id={`${uid}_blueGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#19b5f1" />
            <stop offset="100%" stopColor="#0089bf" />
          </linearGradient>

          <linearGradient id={`${uid}_yellowGrad`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffe135" />
            <stop offset="55%" stopColor="#fad201" />
            <stop offset="100%" stopColor="#e5be00" />
          </linearGradient>

          <linearGradient id={`${uid}_greenGrad`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#267349" />
            <stop offset="100%" stopColor="#144229" />
          </linearGradient>

          <linearGradient id={`${uid}_glossTop`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.68" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
          </linearGradient>

          <linearGradient id={`${uid}_glossBottom`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.34" />
          </linearGradient>

          <radialGradient id={`${uid}_rimShade`} cx="50%" cy="50%" r="50%">
            <stop offset="76%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#05080b" stopOpacity="0.42" />
          </radialGradient>
        </defs>

        <g clipPath={`url(#${uid}_clip)`}>
          {/* Sky Blue upper half (50% of flag height) */}
          <rect x="0" y="0" width="240" height="124" fill={`url(#${uid}_blueGrad)`} />

          {/* Sun Yellow middle band (25% of flag height) */}
          <rect x="0" y="124" width="240" height="58" fill={`url(#${uid}_yellowGrad)`} />

          {/* Forest Green lower band (25% of flag height) */}
          <rect x="0" y="182" width="240" height="58" fill={`url(#${uid}_greenGrad)`} />

          {/* 24-ray Rwandan Sun on upper right */}
          <g transform="translate(174, 64)">
            {Array.from({ length: rayCount }).map((_, i) => (
              <polygon
                key={i}
                points="-2.1,-15 2.1,-15 0,-34"
                fill="#fad201"
                transform={`rotate(${i * (360 / rayCount)})`}
              />
            ))}
            <circle cx="0" cy="0" r="13.5" fill="#fad201" />
            <circle
              cx="0"
              cy="0"
              r="13.5"
              fill="none"
              stroke="#e5be00"
              strokeWidth="1"
            />
          </g>

          {/* Upper glossy dome highlight */}
          <ellipse
            cx="120"
            cy="52"
            rx="84"
            ry="38"
            fill={`url(#${uid}_glossTop)`}
          />

          {/* Lower subtle bounce reflection */}
          <ellipse
            cx="120"
            cy="214"
            rx="72"
            ry="22"
            fill={`url(#${uid}_glossBottom)`}
          />

          {/* Edge depth vignette */}
          <circle cx="120" cy="120" r="112" fill={`url(#${uid}_rimShade)`} />
        </g>

        {/* Crisp outer ring */}
        <circle
          cx="120"
          cy="120"
          r="112"
          fill="none"
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}