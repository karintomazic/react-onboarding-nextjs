import styles from "./ScoreCircle.module.scss";

type MoviesProps = { score: number };

export default function ScoreCircle({ score }: MoviesProps) {
  const clampedScore = Math.max(0, Math.min(100, score));

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const scoreOffset = ((100 - clampedScore) / 100) * circumference;
  const scoreColor =
    clampedScore >= 70 ? "#21d07a" : clampedScore >= 40 ? "#d2d531" : "#db2360";

  return (
    <div className={styles.scoreCircleContainer}>
      <svg viewBox="0 0 100 100" className={styles.scoreCircle}>
        <circle cx="50" cy="50" r="48" className={styles.scoreBg} />
        <circle cx="50" cy="50" r={radius} className={styles.scoreTrack} />
        <circle
          cx="50"
          cy="50"
          r={radius}
          className={styles.scoreProgress}
          strokeDasharray={circumference}
          strokeDashoffset={scoreOffset}
          stroke={scoreColor}
        />
      </svg>
      <span className={styles.scoreText}>
        {clampedScore}
        <sup>%</sup>
      </span>
    </div>
  );
}
