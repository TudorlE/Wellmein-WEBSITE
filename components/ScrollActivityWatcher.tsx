"use client";

import { useEffect } from "react";

export default function ScrollActivityWatcher() {
  useEffect(() => {
    let timeoutId: number | undefined;

    const markScrolling = () => {
      document.body.classList.add("is-scrolling");
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 220);
    };

    window.addEventListener("scroll", markScrolling, { passive: true });

    return () => {
      window.removeEventListener("scroll", markScrolling);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
