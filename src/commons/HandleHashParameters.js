const getHashSearchParams = (location) => {
  const hash = location.hash.slice(1);
  const [prefix, query] = hash.split('?');

  return [prefix, new URLSearchParams(query)];
};

export const getHashParam = (location = window.location) => {
  const [, searchParams] = getHashSearchParams(location);
  return searchParams;
};

export const setHashParam = (key, value, location = window.location) => {
  const [prefix, searchParams] = getHashSearchParams(location);

  if (typeof value === 'undefined') {
    searchParams.delete(key);
  } else {
    searchParams.set(key, value);
  }

  const search = searchParams.toString();
  location.hash = search ? `${prefix}?${search}` : prefix;
};

export const setHash = (settings) => {
  Object.entries(settings).forEach(([k, v]) => {
    setHashParam(k, v);
  });
};

export const stringToBoolean = (stringValue) => {
  switch (stringValue?.toLowerCase()?.trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;

    case 'false':
    case 'no':
    case '0':
    case null:
    case undefined:
      return false;

    default:
      return false;
  }
};
