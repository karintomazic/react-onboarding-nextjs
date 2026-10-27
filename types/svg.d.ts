
// declaration file - contains only types
declare module "@/assets/*.svg" { // more specific than next.jss
  import type { StaticImageData } from "next/image";

  const content: StaticImageData;
  export default content;
}
