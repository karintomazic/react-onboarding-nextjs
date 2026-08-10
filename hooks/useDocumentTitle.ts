import { useEffect } from "react";

export function UseDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
