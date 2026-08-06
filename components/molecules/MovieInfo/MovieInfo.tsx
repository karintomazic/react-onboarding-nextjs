import styles from "./MovieInfo.module.scss";

type MovieInfoProps = {
  tagline: string;
  overview: string;
  overviewHeading: string;
};

export default function MovieInfo({
  tagline,
  overview,
  overviewHeading,
}: MovieInfoProps) {
  return (
    <div className={styles.info}>
      <p className={styles.tagline}>{tagline}</p>
      <h3>{overviewHeading}</h3>
      <p>{overview}</p>
    </div>
  );
}
