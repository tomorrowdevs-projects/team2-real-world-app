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
    default:
      throw new Error(`no action with that name! ${type}`);
  }
};

export default reducer;
