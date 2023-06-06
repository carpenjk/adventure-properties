import useSWR from 'swr';
import { useState, useEffect } from 'react';

const fetchProperties = (url) => fetch(url).then((res) => res.json());

const useProperties = (propertyIDs) => {
  const [propIDs, setPropIDs] = useState(propertyIDs);
  const [properties, setProperties] = useState(null);
  const readyToFetch = propIDs && propIDs.length > 0;

  const { data } = useSWR(
    readyToFetch ? `/api/properties/${propIDs}` : null,
    fetchProperties
  );

  useEffect(() => {
    setProperties(data);
  }, [data]);

  return { properties, setPropIDs };
};

export default useProperties;
