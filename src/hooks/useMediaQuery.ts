import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const handleChange = () => setMatches(media.matches);

    window.addEventListener("change", handleChange);
    return () => window.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
