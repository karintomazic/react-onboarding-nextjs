import styles from "./MovieFacts.module.scss";

type MovieFactsProps = {
  releaseDate: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  locale?: Parameters<Date["toLocaleDateString"]>[0];
};

export default function MovieFacts({
  releaseDate,
  genres,
  runtime,
  locale = "en-GB",
}: MovieFactsProps) {
  const releaseDateFormatted = new Date(releaseDate).toLocaleDateString(locale, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const listedGenres = genres.map((g) => g.name).join(", ");

  return (
    <div className={styles.facts}>
      {releaseDate && <time dateTime={releaseDate}>{releaseDateFormatted}</time>}
      {listedGenres && <span>{listedGenres}</span>}
      {runtime > 0 && (
        <span>
          {Math.floor(runtime / 60)}h{runtime % 60}m
        </span>
      )}
    </div>
  );
}
