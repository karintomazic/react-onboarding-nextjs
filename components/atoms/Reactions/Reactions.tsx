import styles from "./Reactions.module.scss";
import Image from "next/image";
import { icons } from "@/assets/icons";

export default function Reactions() {
  return (
    <div className={styles.reactions}>
      <div>
        <Image src={icons.emoji1} alt="" />
      </div>
      <div>
        <Image src={icons.emoji2} alt="" />
      </div>
      <div>
        <Image src={icons.emoji3} alt="" />
      </div>
    </div>
  );
}
