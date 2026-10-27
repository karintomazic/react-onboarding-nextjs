import style from "./MovieCard.module.scss";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { StaticImageData } from "next/image";
import ScoreCircle from "../ScoreCircle/ScoreCircle";
import { buildMovieUrl } from "@/utils/buildMovieUrl";
import { cardLabels } from "@/data/labels";

export type MovieCardProps = {
  id: number;
  imageUrl: StaticImageData | string | null;
  title: string;
  date?: string;
  content: string;
  score?: number;
};

const MovieCard = ({
  id,
  imageUrl,
  title,
  date,
  content,
  score,
}: MovieCardProps) => {
  const movieUrl = buildMovieUrl({ id, title });

  const userScore = score && Math.max(0, Math.min(100, Math.round(score * 10)));

  return (
    <div className={style.movieCard}>
      <div className={imageUrl ? style.poster : style.placeholder}>
        <Link href={movieUrl}>
          {imageUrl ? (
            <Image src={imageUrl} alt={cardLabels.placeholderImageAlt} fill />
          ) : (
            <FontAwesomeIcon icon={faImage} />
          )}
        </Link>
      </div>
      <div className={style.content}>
        <div className={style.titleWrapper}>
          <div>
            {userScore && <ScoreCircle score={userScore} variant="small" />}
          </div>
          <div>
            <h3>
              <Link href={movieUrl}>{title}</Link>
            </h3>
            {date && (
              <time className={style.date} dateTime={date}>
                {formatDate(date)}
              </time>
            )}
          </div>
        </div>
        <div>
          <p className={style.description}>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
