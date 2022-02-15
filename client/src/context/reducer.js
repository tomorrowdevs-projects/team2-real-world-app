const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
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
      throw new Error('no action with that name!');
  }
};

export default reducer;
