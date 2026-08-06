"use client";

import styles from "./UserScore.module.scss";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ScoreCircle from "../../atoms/ScoreCircle/ScoreCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Reactions from "../../atoms/Reactions/Reactions";

type ScoreProps = { score: number };

export default function UserScore({ score }: ScoreProps) {
  function onClickHandler() {
    console.log("clicked");
  }

  const userScore = Math.max(0, Math.min(100, Math.round(score * 10)));

  return (
    <div className={styles.scoreWrapper}>
      <ScoreCircle score={userScore} />
      <span className={styles.scoreLabel}>
        User
        <br />
        Score
      </span>
      <Reactions />
      <button className={styles.vibeButton} onClick={onClickHandler}>
        What&apos your Vibe?
        <span className={styles.tooltipWrapper}>
          <FontAwesomeIcon icon={faCircleInfo} />
          <span className={styles.tooltip}>
            Login to use TMDBs new rating system.
          </span>
        </span>
      </button>
    </div>
  );
}
