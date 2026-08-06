// Another example:
// import { useEffect, type RefObject } from "react";

// export function useClickOutside(
//   ref: RefObject<HTMLElement | null>,
//   onClickOutside: () => void,
// ): void {
//   useEffect(() => {

//     const handleMouseDown = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         onClickOutside();
//       }
//     };

//     document.addEventListener("mousedown", handleMouseDown);
//     return () => {
//       document.removeEventListener("mousedown", handleMouseDown);
//     };
//   }, [ref, onClickOutside]);
// }

// returns a boolean
import { useEffect, useState, type RefObject } from "react";

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  extraRef?: RefObject<HTMLElement | null>,
): boolean {
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;

      const isInside =
        ref.current?.contains(target) || extraRef?.current?.contains(target);

      setIsClickedOutside(!isInside);
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as Node;

      const isInside =
        ref.current?.contains(target) || extraRef?.current?.contains(target);

      if (isInside) {
        setIsClickedOutside(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [ref, extraRef]);

  return isClickedOutside;
}
