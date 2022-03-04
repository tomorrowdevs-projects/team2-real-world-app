export const searchList = [
  {
    label: 'Total orders and revenue by product',
    select: true,
    responseLabel: ['Product Name', 'Total orders', 'Revenue'],
    formId: 'search-form-product',
  },
  {
    label: 'Number of customers by date',
    select: false,
    responseLabel: 'Customers',
    formId: 'search-form-customers',
  },
  {
    label: 'Average order value by date',
    select: false,
    responseLabel: 'Average',
    formId: 'search-form-average',
  },
];
