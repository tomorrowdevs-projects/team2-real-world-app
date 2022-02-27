import { useEffect, useState } from 'react';

export const useFetch = url => {
  const [dataFetch, setDataFetch] = useState([]);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState('');

  useEffect(() => {
    let didCancel = false;
    if (!url) return;
    setIsFetchLoading(true);
    const fetchData = async () => {
      const response = await fetch(url);
      console.log('Product fetch');
      try {
        if (response.ok) {
          const responseBody = await response.json();
          if (didCancel) return;
          setTimeout(() => {
            setDataFetch(responseBody);
            setIsFetchLoading(false);
          }, 5000);
        } else {
          if (didCancel) return;
          console.log(response);
          throw new Error(response.status);
        }
      } catch (error) {
        if (didCancel) return;
        setIsFetchLoading(false);
        console.log(error);
        setErrorFetch(error);
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);

  return { dataFetch, isFetchLoading, errorFetch };
};
