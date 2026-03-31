interface IProps {
  completed?: number;
}

const Progress: React.FC<IProps> = ({ completed = 0 }) => {
  const pct = Math.min(Math.max(Math.round(completed), 0), 100);

  return (
    <div className="progress">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <span className="progress-label">{pct}%</span>
    </div>
  );
};

export default Progress;