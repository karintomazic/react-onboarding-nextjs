import styles from "./CrewGrid.module.scss";

type CrewDetailsProps = {
  crewDetails: Array<{ job: string; name: string; id: number }>;
};

export default function CrewGrid({ crewDetails }: CrewDetailsProps) {
  const director = crewDetails.find((c) => c.job === "Director");

  const directorJobs = crewDetails
    .filter((c) => c.id === director?.id)
    .map((c) => c.job);

  const story = crewDetails.find((c) => c.job === "Story");
  const storyJobs = crewDetails
    .filter((c) => c.id === story?.id)
    .map((c) => c.job);

  const screenplays = crewDetails
    .filter((c) => c.job === "Screenplay")
    .slice(0, 3);

  const screenplayInfo = screenplays.map((s) => {
    const jobs = crewDetails
      .filter((crew) => crew.id === s.id)
      .map((crew) => crew.job);
    return (
      <div key={s.id} className={styles.crewMember}>
        <p>{s.name}</p>
        <p>{jobs.join(", ")}</p>
      </div>
    );
  });

  return (
    <div className={styles.crewGrid}>
      <div className={styles.crewMember}>
        <p>{director?.name}</p>
        <p>{directorJobs.join(", ")}</p>
      </div>

      {screenplayInfo}

      <div className={styles.crewMember}>
        <p>{story?.name}</p>
        <p>{storyJobs.join(", ")}</p>
      </div>
    </div>
  );
}
