import { useEffect, useState } from "react";

import { CLIP_CLASS, HTML_TAG } from "./clip.constant";
import { ClipHook } from "./clip.model";

export default function useClip(): ClipHook {
  const [html, setHtml] = useState<HTMLHtmlElement | null>(null);

  useEffect(() => {
    const element = document.querySelector(HTML_TAG);
    setHtml(element);
  }, []);

  function isHtmlClipped(): boolean {
    return !!html?.classList.contains(CLIP_CLASS);
  }

  function clipHtml(): void {
    if (!isHtmlClipped()) {
      html?.classList.add(CLIP_CLASS);
    }
  }

  function removeClipHtml(): void {
    if (isHtmlClipped()) {
      html?.classList.remove(CLIP_CLASS);
    }
  }

  return { clipHtml, removeClipHtml };
}
