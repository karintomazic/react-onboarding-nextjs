import styles from "./Cards.module.scss";
import Card from "../Card/Card";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import { StaticImageData } from "next/image";

type CardsProps = {
  movies: Array<{
    id: number;
    url: StaticImageData | string;
    title: string;
    date: string;
  }>;
  isLoading: boolean;
  variant?: "showcase" | "popular";
  loadingLabel: string;
  optionsPromptLabel: string;
  loginLabel: string;
  notAMemberLabel: string;
  signUpLabel: string;
};

export default function Cards({
  movies,
  isLoading,
  variant = "showcase",
  loadingLabel,
  optionsPromptLabel,
  loginLabel,
  notAMemberLabel,
  signUpLabel,
}: CardsProps) {
  const eagerCardCount = 8;

  return (
    <div className={styles.Cards}>
      {isLoading
        ? Array.from({ length: 8 }).map((item, index) => (
            <CardSkeleton
              key={index}
              loadingLabel={loadingLabel}
              variant={variant}
            />
          ))
        : movies.map((movie, index) => {
            return (
              <Card
                key={movie.id}
                id={movie.id}
                image={movie.url}
                title={movie.title}
                date={movie.date}
                variant={variant}
                optionsPromptLabel={optionsPromptLabel}
                loginLabel={loginLabel}
                notAMemberLabel={notAMemberLabel}
                signUpLabel={signUpLabel}
                loading={index < eagerCardCount ? "eager" : "lazy"}
              />
            );
          })}
    </div>
  );
}
