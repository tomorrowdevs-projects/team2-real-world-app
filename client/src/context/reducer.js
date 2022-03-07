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
    case 'SET_DATA_AVAILABLE':
      return {
        ...state,
        isDataAvailable: payload,
      };
    case 'SET_ALREADY_REQUESTED_UPLOAD':
      return {
        ...state,
        alreadyRequestedUpload: payload,
      };
    case 'SET_FILE_TO_UPLOAD':
      return {
        ...state,
        fileToUpload: payload,
      };
    case 'SET_CURRENT_FILE_UPLOAD_URL':
      return {
        ...state,
        urlCurrentFileUpload: payload,
      };
    case 'SHOW_PROGRESS_BAR':
      return {
        ...state,
        showProgressBar: payload,
      };
    case 'SET_PROGRESS_BAR':
      return {
        ...state,
        progressBarValue: payload,
      };
    case 'SET_RESPONSE_LAST_UPLOAD':
      return {
        ...state,
        responseLastUpload: payload,
      };
    //Product list
    case 'SET_PRODUCT_LIST':
      return {
        ...state,
        productList: payload,
      };
    case 'SET_CURRENT_PRODUCTS_URL':
      return {
        ...state,
        urlCurrentProducts: payload,
      };
    //Queries
    case 'SET_ALREADY_REQUESTED':
      return {
        ...state,
        alreadyRequested: payload,
      };
    case 'SET_QUERY_PARAM':
      const param = new URLSearchParams(payload).toString();
      return {
        ...state,
        queryParam: param,
      };
    case 'SET_CURRENT_METRICS_URL':
      return {
        ...state,
        urlCurrentMetrics: payload,
      };
    case 'SET_METRICS_RESULT':
      return {
        ...state,
        metricsResult: payload,
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
      ] = payload;
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
