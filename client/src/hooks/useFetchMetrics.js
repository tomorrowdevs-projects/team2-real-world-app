import { useEffect, useState } from 'react';

export const useFetchMetrics = url => {
  const [dataFetchMetrics, setDataFetchMetrics] = useState(null);
  const [isFetchLoadingMetrics, setIsFetchLoadingMetrics] = useState(false);
  const [errorFetchMetrics, setErrorFetchMetrics] = useState('');

  useEffect(() => {
    let didCancel = false;
    if (!url) return;
    setIsFetchLoadingMetrics(true);
    console.log('Fetch metrics started...');
    const fetchData = async () => {
      const response = await fetch(url);
      console.log('Response metrics: ', response);
      try {
        if (response.ok) {
          const responseBody = await response.json();
          if (didCancel) return;
          setTimeout(() => {
            setDataFetchMetrics(responseBody);
            setIsFetchLoadingMetrics(false);
          }, 3000);
          console.log('Response body metrics: ', responseBody);
        } else {
          if (didCancel) return;
          console.log('Response body metrics: ', response);
          throw new Error(response.status);
        }
      } catch (error) {
        if (didCancel) return;
        setTimeout(() => {
          setErrorFetchMetrics(error);
          setIsFetchLoadingMetrics(false);
        }, 3000);
        console.log('Response metrics request != 200 metrics: ', error);
      } finally {
        setTimeout(() => setErrorFetchMetrics(''), 5000);
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);

  return { dataFetchMetrics, isFetchLoadingMetrics, errorFetchMetrics };
};
