import useSWR from 'swr';

const fetchClientSideData = (url) => fetch(url).then((r) => r.json());

const useAvailability = () => {
  const { data: availability, error } = useSWR(
    `/api/properties/${propertyData.id}/clientSideData`,
    fetchClientSideData
  );

  return availability;
};

export default useAvailability;
