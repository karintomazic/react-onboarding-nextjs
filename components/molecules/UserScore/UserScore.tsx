import styles from "./UserScore.module.scss";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ScoreCircle from "../../atoms/ScoreCircle/ScoreCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Reactions from "../../atoms/Reactions/Reactions";
import { userScoreLabels } from "@/data/labels";

type UserScoreProps = { score: number };

export default function UserScore({ score }: UserScoreProps) {
  function onClickHandler() {}

  const userScore = Math.max(0, Math.min(100, Math.round(score * 10)));

  return (
    <div className={styles.scoreWrapper}>
      <ScoreCircle score={userScore} />
      <span className={styles.scoreLabel}>
        {userScoreLabels.user}
        <br />
        {userScoreLabels.score}
      </span>
      <Reactions />
      <button className={styles.vibeButton} onClick={onClickHandler}>
        {userScoreLabels.vibeButton}
        <span className={styles.tooltipWrapper}>
          <FontAwesomeIcon icon={faCircleInfo} />
          <span className={styles.tooltip}>{userScoreLabels.vibeTooltip}</span>
        </span>
      </button>
    </div>
  );
}
