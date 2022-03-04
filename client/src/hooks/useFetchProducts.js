import { useEffect, useState } from 'react';

export const useFetchProducts = url => {
  const [dataFetchProducts, setDataFetchProducts] = useState([]);
  const [isFetchLoadingProducts, setIsFetchLoadingProducts] = useState(false);
  const [errorFetchProducts, setErrorFetchProducts] = useState('');

  useEffect(() => {
    if (!url) return;
    setIsFetchLoadingProducts(true);
    console.log('Fetch products started...');
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        console.log('Response products: ', response);
        if (response.ok) {
          const responseBody = await response.json();
          setDataFetchProducts(responseBody);
          setIsFetchLoadingProducts(false);
          console.log('Response body products: ', responseBody);
        } else {
          console.log('Response body products: ', response);
          throw new Error(response.status);
        }
      } catch (error) {
        setIsFetchLoadingProducts(false);
        setErrorFetchProducts(error);
        console.log('Response products request!= 200: ', error);
      }
    };
    fetchData();
  }, [url]);

  return { dataFetchProducts, isFetchLoadingProducts, errorFetchProducts };
};
