import { useState, useEffect } from 'react';
import SearchSection from './SearchSection';
import { searchList } from './search-list';
import { useAppContext } from '../../context/appContext';
import { formatList } from './search-utils';
import { isValidJson } from '../../assets/scripts/utils/json_utility/json_utility';
import {
  isValidDateRange,
  isInvalidDateRangeProp,
} from '../../assets/scripts/utils/date_utility/date_utility';
import { getResponseData } from '../../assets/scripts/utils/dataManagement';
import { convertDateDMY } from '../../assets/scripts/utils/date_utility/date_utility';

const Search = () => {
  //react-select control
  const [inputSelected, setInputSelected] = useState('');
  const [accordionSelected, setAccordionSelected] = useState(null);
  const [productSelected, setProductSelected] = useState(null);
  //Date range
  const todayDate = () => new Date().toISOString().slice(0, 10);
  const [dateFrom, setDateFrom] = useState(todayDate);
  const [dateTo, setDateTo] = useState(todayDate);
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
    metricsResult,
    //URL
    urlGetProducts,
    urlGetProductMetrics,
    urlGetCustomerCount,
    urlGetOrderAvg,
    urlCurrentProducts,
    urlCurrentMetrics,
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
      : errorFetchProducts && accordionSelected === 0
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [
            true,
            `Sorry... ${errorFetchProducts}. Unavailable product list, try later.`,
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
            'Sorry, invalid product list, try later.',
            'danger',
            false,
          ],
        })
      : errorFetchMetrics
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [true, `Sorry... ${errorFetchMetrics}.`, 'danger', false],
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
      : !isFetchLoadingProducts && !isValidDateRange(dateFrom, dateTo)
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [true, 'Please choose a valid date range.', 'danger', false],
        })
      : !isFetchLoadingMetrics &&
        !isValidJson(dataFetchMetrics) &&
        alreadyRequested
      ? dispatch({
          type: 'HANDLE_ALERT_SEARCH',
          payload: [true, 'Sorry, no result. Try again.', 'danger', false],
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
    dateFrom,
    dateTo,
    dispatch,
  ]);

  //Set product list
  useEffect(() => {
    console.log('Current url products: ', urlCurrentProducts);
  }, [urlCurrentProducts]);

  useEffect(() => {
    if (isFetchLoadingProducts) return;
    if (errorFetchProducts) {
      dispatch({ type: 'SET_CURRENT_PRODUCTS_URL', payload: '' });
    }
    if (isValidJson(dataFetchProducts))
      dispatch({
        type: 'SET_PRODUCT_LIST',
        payload: formatList(dataFetchProducts),
      });
  }, [dataFetchProducts, isFetchLoadingProducts, errorFetchProducts, dispatch]);

  useEffect(() => {
    console.log('Product list: ', productList);
  }, [productList]);

  const handleLabelClick = () => {
    dispatch({ type: 'SET_CURRENT_PRODUCTS_URL', payload: urlGetProducts });
  };

  //Set metrics result
  useEffect(() => {
    dispatch({ type: 'SET_ALREADY_REQUESTED', payload: true });
    if (isFetchLoadingMetrics) return;
    if (isValidJson(dataFetchMetrics)) {
      dispatch({ type: 'SET_METRICS_RESULT', payload: dataFetchMetrics });
    }
  }, [isFetchLoadingMetrics, dataFetchMetrics, dispatch]);

  useEffect(() => {
    if (metricsResult) {
      dispatch({ type: 'SET_RESPONSE_READY', payload: true });
      dispatch({ type: 'SET_ALREADY_REQUESTED', payload: false });
    } else {
      dispatch({ type: 'SET_RESPONSE_READY', payload: false });
    }
    dispatch({ type: 'SET_CURRENT_METRICS_URL', payload: '' });
  }, [metricsResult, alreadyRequested, responseReady, dispatch]);

  useEffect(() => {
    console.log('Request result: ', metricsResult);
    console.log('Result ready? ', responseReady);
  }, [metricsResult, responseReady]);

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
    dispatch({ type: 'SET_METRICS_RESULT', payload: null });
    errorFetchProducts &&
      dispatch({ type: 'SET_CURRENT_PRODUCTS_URL', payload: urlGetProducts });
  };

  useEffect(() => {
    dispatch({ type: 'SET_CURRENT_METRICS_URL', payload: '' });
    dispatch({ type: 'SET_RESPONSE_READY', payload: false });
    dispatch({ type: 'SET_ALREADY_REQUESTED', payload: false });
    dispatch({ type: 'SET_METRICS_RESULT', payload: null });
  }, [accordionSelected, dispatch]);

  useEffect(() => {
    console.log('Input selected: ', inputSelected);
    console.log('Product selected: ', productSelected);
    console.log('Already requested? ', alreadyRequested);
  }, [inputSelected, productSelected, accordionSelected, alreadyRequested]);

  //Submit queries
  const handleSubmit = event => {
    event.preventDefault();
    switch (event.target.id) {
      case 'search-form-product':
        if (productSelected && isValidDateRange(dateFrom, dateTo)) {
          setDispatch(
            'SET_CURRENT_METRICS_URL',
            urlGetProductMetrics + '?' + queryParam
          );
        } else {
          dispatch({ type: 'SET_ALREADY_REQUESTED', payload: true });
        }
        return;
      case 'search-form-customers':
        if (isValidDateRange(dateFrom, dateTo)) {
          setDispatch(
            'SET_CURRENT_METRICS_URL',
            urlGetCustomerCount + '?' + queryParam
          );
        }
        return;
      case 'search-form-average':
        if (isValidDateRange(dateFrom, dateTo)) {
          setDispatch(
            'SET_CURRENT_METRICS_URL',
            urlGetOrderAvg + '?' + queryParam
          );
        }
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
      errorFetchProducts={errorFetchProducts}
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
      //Product name presence validation
      isInvalidProductName={
        getResponseData(
          metricsResult,
          'product_name',
          'string',
          '<data not available>'
        ) === '<data not available>' && accordionSelected === 0
      }
      //Correct data range validation
      isInvalidDateRangeProp={isInvalidDateRangeProp(
        getResponseData(
          metricsResult,
          'start_date',
          'string',
          '<data not available>',
          'date'
        ),
        getResponseData(
          metricsResult,
          'end_date',
          'string',
          '<data not available>',
          'date'
        )
      )}
      //Queries props
      startDate={convertDateDMY(
        getResponseData(
          metricsResult,
          'start_date',
          'string',
          '<data not available>',
          'date'
        )
      )}
      endDate={convertDateDMY(
        getResponseData(
          metricsResult,
          'end_date',
          'string',
          '<data not available>',
          'date'
        )
      )}
      productName={getResponseData(
        metricsResult,
        'product_name',
        'string',
        '<data not available>'
      )}
      totalOrders={getResponseData(
        metricsResult,
        'total_orders',
        'number',
        '<data not available>'
      )}
      revenue={getResponseData(
        metricsResult,
        'revenue',
        'number',
        '<data not available>',
        'float(2)'
      )}
      numberOfClients={getResponseData(
        metricsResult,
        'num_clients',
        'number',
        '<data not available>'
      )}
      ordersAvg={getResponseData(
        metricsResult,
        'orders_avg',
        'number',
        '<data not available>',
        'float(2)'
      )}
    />
  );
};

export default Search;
