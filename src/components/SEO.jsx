import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": "Home | Foundation",
  "/portfolio": "Work | Foundation",
  "/team": "Team | Foundation",
  "/blog": "Journal | Foundation",
  "/contact": "Contact | Foundation",
};

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (titles[path]) {
      document.title = titles[path];
    }
  }, [location]);

  return null;
}