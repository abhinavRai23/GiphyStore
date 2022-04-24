import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SearchApi, TrendingApi } from "./apis";
import { debounce } from "./utils";

const optimizedFetch = debounce();

function useFetch(query='', offset=0) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [total, updateTotal] = useState(1);

  const sendQuery = useCallback(async (url,offset,query) => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(`${url}&offset=${offset}${query?`&q=${query}`:''}`);
      updateTotal(res.data.pagination.total_count);
      await setList((prev) => [ ...new Set([...prev, ...res.data.data])] );
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [query,offset]);

  useEffect(() => {
    let url;
    if(query){
      url = SearchApi
    }else{
      url = TrendingApi
    }
    if(total>offset){
      optimizedFetch(sendQuery,url, offset, query)
    }
  }, [query, offset]);

  return { loading, error, list, setList };
}

export default useFetch;
