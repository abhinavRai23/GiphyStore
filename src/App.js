import { useCallback, useEffect, useRef, useState } from "react";
import { Limit } from "./apis";
import "./styles.css";
import useFetch from "./useFetch";
import {ThemeContext} from './ThemeContext';
import ThemeTogglerButton from "./ThemeTogglerButton";
import SearchSection from "./SearchSection";
import ImgGallery from "./ImgGallery";

export default function App() {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)")
  const [theme, setTheme]= useState(isDark?'dark': 'white');
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const { loading, error, list, setList } = useFetch(query, offset); 
  const loader = useRef(null);

  const handleChange = (e) => {
    setList([]);
    setOffset(0);
    setQuery(e.target.value);
  };

  const toggleTheme = () => {
    const style = document.body.style;
    style.backgroundColor = theme === "light" ? "#333" : "#fff";
    style.color = theme === "light" ? "#fff" : "#333";
    setTheme(theme==='dark' ? 'light': 'dark');
  }

  const option = {
    root: null,
    rootMargin: "20px",
    threshold: 1
  };
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setOffset((offset) => offset + Limit);
    }
  }, []);
  const observer = new IntersectionObserver(handleObserver, option);
  useEffect(() => {
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <ThemeContext.Provider value={{theme: theme, toggleTheme: toggleTheme}}>
      <div className="App">
        <h3>Trending Giphy</h3>
        <SearchSection  query={query} handleChange={handleChange}/>
        <ThemeTogglerButton />
        <ImgGallery list={list} loading={loading} error={error}/>
        <div ref={loader} />
      </div>
    </ThemeContext.Provider>
  );
}
