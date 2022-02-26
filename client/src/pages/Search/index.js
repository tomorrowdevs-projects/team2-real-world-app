import { useState, useEffect } from 'react';
import SearchSection from './SearchSection';
import { searchList } from './search-list';
import { useAppContext } from '../../context/appContext';

const Search = () => {
  //react-select control
  //const [inputSelected, setInputSelected] = useState();
  const [accordionSelected, setAccordionSelected] = useState(null);
  const [productSelected, setProductSelected] = useState({});
  //Date range
  //const todayDate = () => new Date().toISOString().slice(0, 10);
  const [dateFrom, setDateFrom] = useState('2022-01-01');
  const [dateTo, setDateTo] = useState('2022-02-20');
  //Context
  const {
    dataFetch,
    isFetchLoading,
    errorFetch,
    dispatch,
    setDispatch,
    //Alerts
    alertSearch,
    //Product list
    productList,
    //Queries
    queryParam,
    queryParamReady,
    responseReady,
    response,
    //URL
    urlGetProducts,
    //localUrlGetProducts,
    //urlGetProduct_Metrics,
    localUrlProduct_metrics,
    urlGetCustomers,
    urlGetAverage,
    //urlError,
  } = useAppContext();

  const [currentUrlQuery, setCurrentUrlQuery] = useState('');

  //Product list
  const handleLabelClick = () => {
    setDispatch('SET_CURRENT_URL', urlGetProducts);
  };

  useEffect(() => {
    if (!dataFetch) return;
    const formattedList = [];
    if (isFetchLoading) return;
    dataFetch.forEach(item => {
      formattedList.push({
        value: item.product_name,
        label: item.product_name,
        id: item.product_id,
      });
    });
    dispatch({ type: 'SET_PRODUCT_LIST', payload: formattedList });
  }, [dataFetch, isFetchLoading, dispatch]);

  //Handle alert search page
  useEffect(() => {
    isFetchLoading && productList.length === 0 && accordionSelected === 0
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [
            true,
            'Loading product list...',
            'primary',
            false,
            'border',
          ],
        })
      : isFetchLoading && productList
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [true, 'Loading...', 'primary', false, 'border'],
        })
      : errorFetch
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [true, `Sorry... ${errorFetch}, try again.`, 'danger', true],
        })
      : !isFetchLoading && productList && accordionSelected === 0
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [true, 'Please, select product and date.', 'primary', false],
        })
      : !isFetchLoading &&
        productList &&
        (accordionSelected === 1 || accordionSelected === 2)
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [true, 'Please, select a date range.', 'primary', false],
        })
      : dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [false],
        });
    errorFetch &&
      setTimeout(
        () =>
          dispatch({
            type: 'HANDLE_ALERT_SEARCH',
            payload: [false],
          }),
        4000
      );
  }, [isFetchLoading, productList, dispatch, accordionSelected, errorFetch]);

  //Fetch query data
  useEffect(() => {
    if (queryParamReady) {
      const getDataFetch = async () => {
        try {
          const response = await fetch(currentUrlQuery + '?' + queryParam);
          if (response.ok) {
            const fetchData = await response.json();
            if (fetchData.length > 0) {
              setDispatch('SET_RESPONSE', fetchData);
              setDispatch('SET_RESPONSE_READY', true);
              setDispatch('SET_QUERY_PARAM_READY', false);
            } else {
              setTimeout(() => {
                setDispatch('SET_RESPONSE_READY', false);
                setDispatch('SET_QUERY_PARAM_READY', false);
              }, 500);
            }
            setDispatch('SET_QUERY_PARAM_READY', false);
          } else {
            setDispatch('SET_QUERY_PARAM_READY', false);
            throw new Error('Sorry, network error... please try again later.');
          }
        } catch (error) {
          console.log(error);
          setDispatch('SET_QUERY_PARAM_READY', false);
        }
      };
      setDispatch('SET_QUERY_PARAM_READY', false);
      getDataFetch();
    }
  }, [setDispatch, queryParamReady, currentUrlQuery, queryParam]);

  useEffect(() => {
    console.log('Product selected: ', productSelected);
  }, [productSelected]);

  //Handle submit
  const handleSubmit = event => {
    event.preventDefault();
    //handleAlertSearch(false);
    switch (event.target.id) {
      case 'search-form-product':
        //Set query parameters
        if (productSelected.value) {
          console.log('Form id: ' + event.target.id);
          setDispatch('SET_QUERY_PARAM', {
            product_name: productSelected.value,
            start_date: dateFrom,
            end_date: dateTo,
          });
          setDispatch('SET_CURRENT_URL', localUrlProduct_metrics);
          setDispatch('SET_QUERY_PARAM_READY', true);
        } else {
          // handleAlertSearch(true, 'Please, select a product.', 'danger', false);
        }
        return;
      case 'search-form-customers':
        //Set query parameters
        setDispatch('SET_QUERY_PARAM', {
          start_date: dateFrom,
          end_date: dateTo,
        });
        setDispatch('SET_CURRENT_URL', urlGetCustomers);
        setDispatch('SET_QUERY_PARAM_READY', true);
        return;
      case 'search-form-average':
        //Set query parameters
        setDispatch('SET_QUERY_PARAM', {
          start_date: dateFrom,
          end_date: dateTo,
        });
        setDispatch('SET_CURRENT_URL', urlGetAverage);
        setDispatch('SET_QUERY_PARAM_READY', true);
        return;
      default:
      // handleAlertSearch(true, 'Please, select your data.', 'primary', false);
    }
  };

  return (
    <SearchSection
      //Alert
      alertSearch={alertSearch}
      //List for render accordion items
      searchList={searchList}
      //Fetch product list
      handleLabelClick={handleLabelClick}
      //react-select control
      productList={productList}
      //setInputSelected={setInputSelected}
      setProductSelected={setProductSelected}
      isFetchLoading={isFetchLoading}
      //Date Component control
      dateFrom={dateFrom}
      setDateFrom={setDateFrom}
      dateTo={dateTo}
      setDateTo={setDateTo}
      //Search alert and submit
      setAccordionSelected={setAccordionSelected}
      handleSubmit={handleSubmit}
      //Queries
      responseReady={responseReady}
      response={response}
    />
  );
};

export default Search;
