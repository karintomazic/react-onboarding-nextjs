import style from "./MovieCard.module.scss";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { StaticImageData } from "next/image";

export type MovieCardProps = {
  id: string;
  imageUrl: StaticImageData | string;
  title: string;
  date?: string;
  content: string;
};

const MovieCard = ({ id, imageUrl, title, date, content }: MovieCardProps) => {
  const movieUrl = `/movie/${id}-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={style.movieCard}>
      <div className={imageUrl ? style.poster : style.placeholder}>
        <Link href={movieUrl}>
          {imageUrl ? (
            <Image src={imageUrl} alt="placeholder image" />
          ) : (
            <FontAwesomeIcon icon={faImage} />
          )}
        </Link>
      </div>
      <div className={style.content}>
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
        <div>
          <p className={style.description}>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
