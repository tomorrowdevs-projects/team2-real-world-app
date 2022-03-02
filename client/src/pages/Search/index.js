import { useState, useEffect } from 'react';
import SearchSection from './SearchSection';
import { searchList } from './search-list';
import { useAppContext } from '../../context/appContext';
import { isValidJson, formatList } from './search-data-utils';

const Search = () => {
  //react-select control
  const [inputSelected, setInputSelected] = useState('');
  const [accordionSelected, setAccordionSelected] = useState(null);
  const [productSelected, setProductSelected] = useState(null);
  //Date range
  //const todayDate = () => new Date().toISOString().slice(0, 10);
  const [dateFrom, setDateFrom] = useState('2022-01-01');
  const [dateTo, setDateTo] = useState('2022-02-20');
  //Context
  const {
    //Reducer
    dispatch,
    setDispatch,
    //Fetch data
    alreadyRequested,
    dataFetchProducts,
    isFetchLoadingProducts,
    errorFetchProducts,
    dataFetchMetrics,
    isFetchLoadingMetrics,
    errorFetchMetrics,
    //Alerts
    alertSearch,
    //Product list
    productList,
    //Queries
    queryParam,
    responseReady,
    response,
    //URL
    urlGetProducts,
    urlGetProductMetrics,
    urlGetCustomerCount,
    urlGetOrderAvg,
    urlCurrentProducts,
    urlCurrentMetrics,
    //urlError,
  } = useAppContext();

  //Handle alert search page
  useEffect(() => {
    isFetchLoadingProducts && !productList && accordionSelected === 0
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
      : isFetchLoadingProducts || isFetchLoadingMetrics
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [true, 'Loading...', 'primary', false, 'border'],
        })
      : errorFetchProducts
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [
            true,
            `Sorry... ${errorFetchProducts}, try again.`,
            'danger',
            false,
          ],
        })
      : errorFetchMetrics
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [
            true,
            `Sorry... ${errorFetchMetrics}, try again.`,
            'danger',
            false,
          ],
        })
      : !isValidJson(dataFetchProducts) &&
        urlCurrentProducts &&
        accordionSelected === 0
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [
            true,
            '...sorry, unavailable or invalid product list, try later.',
            'danger',
            false,
          ],
        })
      : !isFetchLoadingProducts &&
        productList &&
        accordionSelected === 0 &&
        !productSelected &&
        (alreadyRequested || responseReady)
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [true, 'Please choose a product.', 'danger', false],
        })
      : !isFetchLoadingMetrics &&
        !isValidJson(dataFetchMetrics) &&
        alreadyRequested
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [true, 'Sorry, no result...', 'danger', false],
        })
      : !isFetchLoadingProducts && accordionSelected === 0
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [true, 'Please, select product and date.', 'primary', false],
        })
      : !isFetchLoadingProducts &&
        (accordionSelected === 1 || accordionSelected === 2)
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [true, 'Please, select a date range.', 'primary', false],
        })
      : dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [false],
        });
  }, [
    urlCurrentProducts,
    isFetchLoadingProducts,
    isFetchLoadingMetrics,
    dataFetchProducts,
    dataFetchMetrics,
    alreadyRequested,
    responseReady,
    productSelected,
    productList,
    accordionSelected,
    errorFetchProducts,
    errorFetchMetrics,
    dispatch,
  ]);

  //Set product list
  useEffect(() => {
    console.log('Current url products: ', urlCurrentProducts);
  }, [urlCurrentProducts]);

  useEffect(() => {
    if (isFetchLoadingProducts) return;
    if (isValidJson(dataFetchProducts))
      dispatch({
        type: 'SET_PRODUCT_LIST',
        payload: formatList(dataFetchProducts),
      });
  }, [dataFetchProducts, isFetchLoadingProducts, dispatch]);

  useEffect(() => {
    console.log('Product list: ', productList);
  }, [productList]);

  const handleLabelClick = () => {
    dispatch({ type: 'SET_CURRENT_URL', payload: urlGetProducts });
  };

  //Set metrics response
  useEffect(() => {
    dispatch({ type: 'SET_ALREADY_REQUESTED', payload: true });
    if (isFetchLoadingMetrics) return;
    if (isValidJson(dataFetchMetrics)) {
      dispatch({ type: 'SET_RESPONSE', payload: dataFetchMetrics });
    }
  }, [isFetchLoadingMetrics, dataFetchMetrics, dispatch]);

  useEffect(() => {
    if (response) {
      dispatch({ type: 'SET_RESPONSE_READY', payload: true });
      dispatch({ type: 'SET_ALREADY_REQUESTED', payload: false });
    } else {
      dispatch({ type: 'SET_RESPONSE_READY', payload: false });
    }
    dispatch({ type: 'SET_CURRENT_METRICS_URL', payload: '' });
  }, [
    response,
    // urlCurrentMetrics,
    alreadyRequested,
    responseReady,
    dispatch,
  ]);

  useEffect(() => {
    console.log('Request result: ', response);
    console.log('Result ready? ', responseReady);
  }, [response, responseReady]);

  //Set query parameters
  useEffect(() => {
    console.log('Query param: ', queryParam);
    console.log('Current url metrics: ', urlCurrentMetrics);

    switch (accordionSelected) {
      case 0:
        if (productSelected) {
          dispatch({
            type: 'SET_QUERY_PARAM',
            payload: {
              product_name: productSelected.id,
              start_date: dateFrom,
              end_date: dateTo,
            },
          });
        }
        return;
      case 1:
        dispatch({
          type: 'SET_QUERY_PARAM',
          payload: {
            start_date: dateFrom,
            end_date: dateTo,
          },
        });
        return;
      case 2:
        dispatch({
          type: 'SET_QUERY_PARAM',
          payload: {
            start_date: dateFrom,
            end_date: dateTo,
          },
        });
        return;
      default:
        dispatch({
          type: 'SET_QUERY_PARAM',
          payload: {},
        });
    }
  }, [
    accordionSelected,
    productSelected,
    dateFrom,
    dateTo,
    queryParam,
    urlCurrentMetrics,
    dispatch,
  ]);

  //Reset url metrics and response ready
  const handleClickReset = () => {
    console.log('Reset Click!');
    dispatch({ type: 'SET_CURRENT_METRICS_URL', payload: '' });
    dispatch({ type: 'SET_ALREADY_REQUESTED', payload: false });
    dispatch({ type: 'SET_RESPONSE_READY', payload: false });
    dispatch({ type: 'HANDLE_ALERT_SEARCH', payload: [false] });
    dispatch({ type: 'SET_RESPONSE', payload: null });
  };

  useEffect(() => {
    dispatch({ type: 'SET_CURRENT_METRICS_URL', payload: '' });
    dispatch({ type: 'SET_RESPONSE_READY', payload: false });
    dispatch({ type: 'SET_ALREADY_REQUESTED', payload: false });
    dispatch({ type: 'SET_RESPONSE', payload: null });
  }, [accordionSelected, dispatch]);

  useEffect(() => {
    console.log('Input selected: ', inputSelected);
    console.log('Product selected: ', productSelected);
    console.log('Already requested? ', alreadyRequested);
  }, [inputSelected, productSelected, accordionSelected, alreadyRequested]);

  //Submit queries
  const handleSubmit = event => {
    //dispatch({ type: 'SET_ALREADY_REQUESTED', payload: true });

    event.preventDefault();
    switch (event.target.id) {
      case 'search-form-product':
        if (productSelected) {
          setDispatch(
            'SET_CURRENT_METRICS_URL',
            urlGetProductMetrics + '?' + queryParam
          );
        } else {
          dispatch({ type: 'SET_ALREADY_REQUESTED', payload: true });
        }
        return;
      case 'search-form-customers':
        setDispatch(
          'SET_CURRENT_METRICS_URL',
          urlGetCustomerCount + '?' + queryParam
        );
        return;
      case 'search-form-average':
        setDispatch(
          'SET_CURRENT_METRICS_URL',
          urlGetOrderAvg + '?' + queryParam
        );
        return;
      default:
        return;
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
      setInputSelected={setInputSelected}
      setProductSelected={setProductSelected}
      isFetchLoadingProducts={isFetchLoadingProducts}
      isFetchLoadingMetrics={isFetchLoadingMetrics}
      accordionSelected={accordionSelected}
      handleClickReset={handleClickReset}
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
