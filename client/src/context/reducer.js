const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    //User
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        currentUser: payload,
      };
    //Upload file
    case 'FILE_UPLOADED':
      return {
        ...state,
        isFileUploaded: payload,
      };
    //Product list
    case 'SHOW_PRODUCT_LIST':
      return {
        ...state,
        showProductList: payload,
      };
    case 'SET_PRODUCT_LIST':
      console.log(payload);
      return {
        ...state,
        productList: payload,
      };
    //Queries
    case 'SET_QUERY_PARAM':
      console.log('Query object:', payload);
      const param = new URLSearchParams(payload).toString();
      console.log('Query parameters:', param);
      return {
        ...state,
        queryParam: param,
      };
    case 'SET_CURRENT_URL':
      console.log('Current url', payload);
      return {
        ...state,
        urlCurrent: payload,
      };
    case 'SET_QUERY_PARAM_READY':
      console.log('Query ready?', payload);
      return {
        ...state,
        queryParamReady: payload,
      };
    case 'SET_RESPONSE':
      console.log('Response Object:', payload);
      return {
        ...state,
        response: payload,
      };
    case 'SET_RESPONSE_READY':
      return {
        ...state,
        responseReady: payload,
      };
    //Loader
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    //Alert
    case 'HANDLE_ALERT':
      const [show, message, variant, dismissible, animation] = payload;
      return {
        ...state,
        alert: {
          show: show,
          message: message,
          variant: variant,
          dismissible: dismissible,
          animation: animation,
        },
      };
    case 'HANDLE_ALERT_SEARCH':
      const [
        showSearch,
        messageSearch,
        variantSearch,
        dismissibleSearch,
        animationSearch,
      ] = action.payload;
      return {
        ...state,
        alertSearch: {
          show: showSearch,
          message: messageSearch,
          variant: variantSearch,
          dismissible: dismissibleSearch,
          animation: animationSearch,
        },
      };
    default:
      throw new Error(`no action with that name! ${type}`);
  }
};

export default reducer;
