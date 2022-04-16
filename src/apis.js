import axios from "axios";

const API_KEY = "x6sV5kNZAZP6YXIQSzMZm4e16eLrokbJ";

export const TrendingApi =
  "https://api.giphy.com/v1/gifs/trending?api_key=x6sV5kNZAZP6YXIQSzMZm4e16eLrokbJ&limit=25&rating=g";

export function getData(url) {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
