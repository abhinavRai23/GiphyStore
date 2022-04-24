import { useCallback, useEffect, useRef, useState } from "react";
import { Limit } from "./apis";
import "./styles.css";
import useFetch from "./useFetch";
import {ThemeContext} from './ThemeContext';
import ThemeTogglerButton from "./ThemeTogglerButton";
import SearchSection from "./SearchSection";

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
    console.log(target);
    if (target.isIntersecting) {
      setOffset((offset) => offset + Limit);
    }
  }, []);
  const observer = new IntersectionObserver(handleObserver, option);

  useEffect(() => {
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  console.log('Render: App');
  return (
    <ThemeContext.Provider value={{theme: theme, toggleTheme: toggleTheme}}>
      <div className="App">
        <h3>Trending Giphy</h3>
        <SearchSection  query={query} handleChange={handleChange}/>
        <ThemeTogglerButton />
        <div className="photo-container">
          {list.map((item) => (
            <div key={item.id}>
              <img src={item.images.preview_webp.url} alt={item.title} />
            </div>
          ))}
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error!</p>}
        <div ref={loader} />
      </div>
    </ThemeContext.Provider>
  );
}
