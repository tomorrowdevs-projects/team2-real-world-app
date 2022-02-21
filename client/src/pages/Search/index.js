import { useState, useEffect, useCallback } from 'react';
import SearchSection from './SearchSection';
import { searchList } from './search-list';
import { useAppContext } from '../../context/appContext';

const Search = () => {
  //react-select control
  //const [input, setInput] = useState();
  const [productSelected, setProductSelected] = useState({});
  //Date range
  //const todayDate = () => new Date().toISOString().slice(0, 10);
  const [dateFrom, setDateFrom] = useState('2022-01-01');
  const [dateTo, setDateTo] = useState('2022-02-20');
  //Context
  const {
    setDispatch,
    //Alerts
    alertSearch,
    //Product list
    showProductList,
    productList,
    //Queries
    queryParam,
    queryParamReady,
    responseReady,
    response,
    //url
    urlGetProduct,
    //localUrlGetProduct,
    urlGetProduct_Metrics,
    //localUrlProduct_metrics,
    urlGetCustomers,
    urlGetAverage,
    urlCurrent,
  } = useAppContext();

  const handleAlertSearch = useCallback(
    (...value) => {
      setDispatch('HANDLE_ALERT_SEARCH', value);
    },
    [setDispatch]
  );

  //Product list
  const handleLabelClick = () => {
    setDispatch('SHOW_PRODUCT_LIST', true);
  };
  useEffect(() => {
    console.log('Product list:', productList);
  }, [productList]);

  //Fetch productlist
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

  //Fetch query data
  useEffect(() => {
    if (queryParamReady) {
      handleAlertSearch(true, 'Loading...', 'primary', false, 'border');
      const getDataFetch = async () => {
        try {
          const response = await fetch(urlCurrent + '?' + queryParam);
          if (response.ok) {
            const fetchData = await response.json();
            if (fetchData.length > 0) {
              setDispatch('SET_RESPONSE', fetchData);
              setDispatch('SET_RESPONSE_READY', true);
              handleAlertSearch(false);
              setDispatch('SET_QUERY_PARAM_READY', false);
              setTimeout(
                () =>
                  handleAlertSearch(
                    true,
                    'It is possible to do a new search.',
                    'primary',
                    false
                  ),
                500
              );
            } else {
              handleAlertSearch(false);
              setTimeout(() => {
                handleAlertSearch(
                  true,
                  'Sorry, no data for the selected product...',
                  'danger',
                  false
                );
                setDispatch('SET_RESPONSE_READY', false);
                setDispatch('SET_QUERY_PARAM_READY', false);
              }, 500);
            }
            setDispatch('SET_QUERY_PARAM_READY', false);
          } else {
            handleAlertSearch(
              true,
              'Sorry, network error...',
              'Danger',
              true,
              'border'
            );
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
  }, [setDispatch, handleAlertSearch, queryParamReady, urlCurrent, queryParam]);

  //Handle accordion alert
  const handleAcordionAlert = event => {
    setDispatch('SET_RESPONSE_READY', false);
    switch (event.toString()) {
      case '0':
        handleAlertSearch(
          true,
          'Please, select product and date.',
          'primary',
          false
        );
        break;
      case '1':
        handleAlertSearch(
          true,
          'Please, select a date range.',
          'primary',
          false
        );
        break;
      case '2':
        handleAlertSearch(
          true,
          'Please, select a date range.',
          'primary',
          false
        );
        break;
      case null:
        break;
      default:
        handleAlertSearch(
          true,
          'Please, select product and date.',
          'primary',
          false
        );
    }
  };

  useEffect(() => {
    console.log('Product selected: ', productSelected);
  }, [productSelected]);

  //Handle submit
  const handleSubmit = event => {
    event.preventDefault();
    handleAlertSearch(false);
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
          setDispatch('SET_CURRENT_URL', urlGetProduct_Metrics);
          setDispatch('SET_QUERY_PARAM_READY', true);
        } else {
          handleAlertSearch(true, 'Please, select a product.', 'danger', false);
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
        handleAlertSearch(
          true,
          'Please, select a your data.',
          'primary',
          false
        );
    }
  };

  return (
    <SearchSection
      //Alert
      alertSearch={alertSearch}
      handleAlertSearch={handleAlertSearch}
      //List for render accordion items
      searchList={searchList}
      //Fetch product list
      handleLabelClick={handleLabelClick}
      //react-select control
      productList={productList}
      //setInput={setInput}
      setProductSelected={setProductSelected}
      //Date Component control
      dateFrom={dateFrom}
      setDateFrom={setDateFrom}
      dateTo={dateTo}
      setDateTo={setDateTo}
      //Search alert and submit
      handleAccordionAlert={handleAcordionAlert}
      handleSubmit={handleSubmit}
      //Queries
      responseReady={responseReady}
      response={response}
    />
  );
};

export default Search;
