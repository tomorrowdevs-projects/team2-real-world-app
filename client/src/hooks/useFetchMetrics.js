import { useEffect, useState } from 'react';

export const useFetchMetrics = url => {
  const [dataFetchMetrics, setDataFetchMetrics] = useState(null);
  const [isFetchLoadingMetrics, setIsFetchLoadingMetrics] = useState(false);
  const [errorFetchMetrics, setErrorFetchMetrics] = useState('');

  useEffect(() => {
    if (!url) {
      setDataFetchMetrics(null);
      return;
    }
    setIsFetchLoadingMetrics(true);
    console.log('Fetch metrics started...');
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        console.log('Response metrics: ', response);
        if (response.ok) {
          const responseBody = await response.json();
          setDataFetchMetrics(responseBody);
          setIsFetchLoadingMetrics(false);
          console.log('Response body metrics: ', responseBody);
        } else {
          console.log('Response body metrics: ', response);
          throw new Error(response.status);
        }
      } catch (error) {
        setErrorFetchMetrics(error);
        setIsFetchLoadingMetrics(false);
        console.log('Response metrics request != 200 metrics: ', error);
      } finally {
        setTimeout(() => setErrorFetchMetrics(''), 2000);
      }
    };
    fetchData();
  }, [url]);

  return { dataFetchMetrics, isFetchLoadingMetrics, errorFetchMetrics };
};
