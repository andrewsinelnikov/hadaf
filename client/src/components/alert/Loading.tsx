const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-inner">
        <svg
          className="loading-clock"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          {/* Clock face */}
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="var(--primary-color)"
            strokeOpacity="0.2"
            strokeWidth="1.5"
          />
          {/* Spinning arc */}
          <circle
            className="loading-arc"
            cx="32"
            cy="32"
            r="28"
            stroke="var(--primary-color)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="44 132"
          />
          {/* Hour hand */}
          <line
            className="loading-hour"
            x1="32"
            y1="32"
            x2="32"
            y2="18"
            stroke="var(--lightdark-color)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Minute hand */}
          <line
            className="loading-minute"
            x1="32"
            y1="32"
            x2="44"
            y2="32"
            stroke="var(--primary-color)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Center dot */}
          <circle cx="32" cy="32" r="2.5" fill="var(--lightdark-color)" />
        </svg>
      </div>
    </div>
  );
};

export default Loading;