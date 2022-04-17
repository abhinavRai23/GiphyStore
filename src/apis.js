import axios from "axios";

const API_KEY = "x6sV5kNZAZP6YXIQSzMZm4e16eLrokbJ";
const basePoint = "https://api.giphy.com/v1/gifs";
const commonParams = `api_key=${API_KEY}&limit=25&rating=g`;

export const TrendingApi = `${basePoint}/trending?${commonParams}`;
export const SearchApi = `${basePoint}/search?${commonParams}`;

export function getData(url) {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
