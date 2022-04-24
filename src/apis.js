export const Limit = 20;
const API_KEY = "x6sV5kNZAZP6YXIQSzMZm4e16eLrokbJ";
const basePoint = "https://api.giphy.com/v1/gifs";
const commonParams = `api_key=${API_KEY}&limit=${Limit}&rating=g`;

export const TrendingApi = `${basePoint}/trending?${commonParams}`;
export const SearchApi = `${basePoint}/search?${commonParams}`;
