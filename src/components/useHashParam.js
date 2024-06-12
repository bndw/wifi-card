import { useState, useEffect, useCallback } from 'react';

const getHashSearchParams = (location) => {
  const hash = location.hash.slice(1);
  const [prefix, query] = hash.split('?');

  return [prefix, new URLSearchParams(query)];
};

const getHashParam = (key, location = window.location) => {
  const [_, searchParams] = getHashSearchParams(location);
  return searchParams.get(key);
};

const setHashParam = (key, value, location = window.location) => {
  const [prefix, searchParams] = getHashSearchParams(location);

  if (typeof value === 'undefined') {
    searchParams.delete(key);
  } else {
    searchParams.set(key, value);
  }

  const search = searchParams.toString();
  location.hash = search ? `${prefix}?${search}` : prefix;
};

const useHashParam = (key) => {
  const [innerValue, setInnerValue] = useState();

  useEffect(() => {
    const handleHashChange = () => setInnerValue(getHashParam(key));
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [key]);

  const setValue = useCallback(
    (value) => {
      setHashParam(key, value);
    },
    [key]
  );

  return [innerValue, setValue];
};

export default useHashParam;
