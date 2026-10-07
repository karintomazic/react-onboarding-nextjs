import styles from "./MovieFacts.module.scss";

type MovieFactsProps = {
  releaseDate: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
};

export default function MovieFacts({
  releaseDate,
  genres,
  runtime,
}: MovieFactsProps) {
  const releaseDateFormated = releaseDate
    ? new Date(releaseDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : "";

  const listedGenres = genres.map((g) => g.name).join(", ");

  return (
    <div className={styles.facts}>
      <time dateTime={releaseDate}>{releaseDateFormated}</time>
      <span>{listedGenres}</span>
      <span>
        {Math.floor(runtime / 60)}h{runtime % 60}m
      </span>
    </div>
  );
}
