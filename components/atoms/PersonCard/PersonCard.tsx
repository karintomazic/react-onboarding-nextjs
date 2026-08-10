import styles from "./PersonCard.module.scss";
import profileIcon from "../../../assets/profile.svg";
import Image from "next/image";
import { StaticImageData } from "next/image";

type PersonCardProps = {
  name: string;
  department: string;
  profileImg: StaticImageData | string;
  known_for: string[];
};

export default function PersonCard({
  name,
  department,
  profileImg,
  known_for,
}: PersonCardProps) {
  return (
    <div className={styles.personCard}>
      <div className={profileImg ? styles.image : styles.placeholder}>
        {profileImg ? (
          <Image src={profileImg} alt={name} width="80" height="80" />
        ) : (
          <Image src={profileIcon} alt={""} width="80" height="80" />
        )}
      </div>
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>
          <span className={styles.bold}>{department}</span>
          <span className={styles.spacer}>•</span>
          {known_for}
        </p>
      </div>
    </div>
  );
}
