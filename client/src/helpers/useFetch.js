import { useEffect, useState, useRef } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });
  const isCurrent = useRef(true);

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setState((state) => ({ ...state, loading: true }));
    const getData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (isCurrent.current) {
          setState((state) => ({
            ...state,
            data,
            loading: false,
            error: null,
          }));
        }
      } catch (error) {
        setState((state) => ({ ...state, error: error }));
      }
    };

    getData();
  }, [url]);

  return state;
};