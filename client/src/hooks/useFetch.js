import { useEffect, useState } from 'react';

export const useFetch = url => {
  const [dataFetch, setDataFetch] = useState([]);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState('');

  useEffect(() => {
    let didCancel = false;
    if (!url) return;
    setIsFetchLoading(true);
    console.log('Fetch started...');
    const fetchData = async () => {
      const response = await fetch(url);
      console.log('Response: ', response);
      try {
        if (response.ok) {
          const responseBody = await response.json();
          if (didCancel) return;
          setDataFetch(responseBody);
          setIsFetchLoading(false);
          console.log('Response body: ', responseBody);
        } else {
          if (didCancel) return;
          console.log('Response body: ', response);
          throw new Error(response.status);
        }
      } catch (error) {
        if (didCancel) return;
        setIsFetchLoading(false);
        setErrorFetch(error);
        console.log('Response != 200: ', error);
      } finally {
        setTimeout(() => setErrorFetch(''), 5000);
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);

  return { dataFetch, isFetchLoading, errorFetch };
};
