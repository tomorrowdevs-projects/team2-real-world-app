import { useEffect } from 'react';
import SearchSection from './SearchSection';
import { searchList } from './search-list';
import { useAppContext } from '../../context/appContext';

const Search = () => {
  const {
    setDispatch,
    showProductList,
    urlGetProduct,
    //localUrlGetProduct,
    productList,
  } = useAppContext();
  const responseReady = true;
  const response =
    //'';
    [
      {
        product_name: 'samsung_s20',
        orders: '10',
        price: '4500',
        date_from: '2022-01-01',
        date_to: '2022-01-31',
        customers: '12',
        average: '10',
      },
    ];

  const handleLabelClick = () => {
    setDispatch('SHOW_PRODUCT_LIST', true);
  };
  //Fetch productlist
  //Product list
  useEffect(() => {
    console.log(productList);
    console.log(showProductList);
  }, [productList, showProductList]);

  useEffect(() => {
    const getProductList = async () => {
      try {
        const FetchResponse = await fetch(urlGetProduct);
        if (FetchResponse.ok) {
          const fetchData = await FetchResponse.json();
          const formattedList = [];
          fetchData.forEach(item => {
            formattedList.push({
              value: item.product_name,
              label: item.product_name,
              id: item.product_id,
            });
          });
          setDispatch('SET_PRODUCT_LIST', formattedList);
        } else {
          throw new Error('Sorry, no order data.');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setDispatch('SHOW_PRODUCT_LIST', false);
      }
    };

    if (showProductList) {
      getProductList();
    }
  }, [setDispatch, showProductList, urlGetProduct]);

  return (
    <SearchSection
      searchList={searchList}
      handleLabelClick={handleLabelClick}
      productList={productList}
      responseReady={responseReady}
      response={response}
    />
  );
};

export default Search;
