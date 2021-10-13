import useSWR from 'swr';

const fetchClientSideData = (url) => fetch(url).then((r) => r.json());

const useAvailability = (propID) => {
  const { data: availability, error } = useSWR(
    `/api/properties/${propID}/clientSideData`,
    fetchClientSideData
  );

  return availability;
};

export default useAvailability;
