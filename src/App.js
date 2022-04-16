import { useEffect, useState } from "react";
import { getData, TrendingApi } from "./apis";
import "./styles.css";

export default function App() {
  const [giphyData, updateGiphyData] = useState([]);
  const [paginationData, updatePaginationData] = useState({});
  useEffect(() => {
    getData(TrendingApi).then((res) => {
      const { data, pagination } = res;
      updateGiphyData([...giphyData, ...data]);
      updatePaginationData(pagination);
    });
  }, []);
  return (
    <div className="App">
      <h3>Trending Giphy</h3>
      <div className="photo-container">
        {giphyData.map((d) => {
          return (
            <div key={d.title}>
              <img src={d.images.preview_webp.url} alt={d.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
