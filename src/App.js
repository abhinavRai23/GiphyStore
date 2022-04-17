import { useCallback, useEffect, useRef, useState } from "react";
// import { getData, TrendingApi } from "./apis";
import "./styles.css";
import useFetch from "./useFetch";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, list } = useFetch(query, page);
  const loader = useRef(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  console.log(list);
  return (
    <div className="App" id="root">
      <h3>Trending Giphy</h3>
      <input type="text" value={query} onChange={handleChange} />
      <div className="photo-container">
        {/* {list.map((item) => (
          <div key={item.title}>
            <img src={item.images.preview_webp.url} alt={item.title} />
          </div>
        ))} */}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </div>
  );
}
