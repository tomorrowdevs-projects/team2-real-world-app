import { getResponseData } from './dataManagement';

//GET RESPONSE DATA
const response = null;

test(`It should return the value of the property if the property exists and is of the expected type, otherwise the default text`, () => {
  expect(
    getResponseData(response, 'product_name', 'string', 'Data not available')
  ).toEqual('');
});

//GET RESPONSE DATA
const response1 = [
  {
    id: 1,
    product_name: 'Remote Tuner',
    total_orders: 30,
    revenue: 350.45,
    start_date: '2022-01-01',
    end_date: '2022-02-20',
  },
];

test(`It should return the value of the property if the property exists and is of the expected type, otherwise the default text`, () => {
  expect(
    getResponseData(response1, 'product_name', 'string', 'Data not available')
  ).toEqual('Remote Tuner');
  expect(
    getResponseData(response1, 'total_orders', 'number', 'Data not available')
  ).toEqual(30);
  expect(
    getResponseData(response1, 'revenue', 'number', 'Data not available')
  ).toEqual(350.45);
  expect(
    getResponseData(
      response1,
      'start_date',
      'string',
      'Data not available',
      'date'
    )
  ).toEqual('2022-01-01');
  expect(
    getResponseData(
      response1,
      'end_date',
      'string',
      'Data not available',
      'date'
    )
  ).toEqual('2022-02-20');
});

//GET RESPONSE DATA
const response2 = [
  {
    id: 1,
    product_name: undefined,
    total_orders: '30',
    revenue: null,
    start_date: '2022-01-1',
    end_dat: '2022-02-20',
  },
];

test(`It should return the value of the property if the property exists and is of the expected type, otherwise the default text`, () => {
  expect(
    getResponseData(response2, 'product_name', 'string', 'Data not available')
  ).toEqual('Data not available');
  expect(
    getResponseData(response2, 'total_orders', 'number', 'Data not available')
  ).toEqual('Data not available');
  expect(
    getResponseData(response2, 'revenue', 'number', 'Data not available')
  ).toEqual('Data not available');
  expect(
    getResponseData(
      response2,
      'start_date',
      'string',
      'Data not available',
      'date'
    )
  ).toEqual('Data not available');
  expect(
    getResponseData(
      response2,
      'start_date',
      'string',
      'Data not available',
      'date'
    )
  ).toEqual('Data not available');
});

//GET RESPONSE DATA
const response3 = [
  {
    id: 1,
    num_clients: 34,
    start_date: '2022-01-01',
    end_date: '2022-02-20',
  },
];

test(`It should return the value of the property if the property exists and is of the expected type, otherwise the default text`, () => {
  expect(
    getResponseData(response3, 'num_clients', 'number', 'Data not available')
  ).toEqual(34);
});

const response4 = [
  {
    id: 1,
    orders_avg: 230.1234,
    start_date: '2022-01-01',
    end_date: '2022-02-20',
  },
];

const response5 = [
  {
    id: 1,
    orders_avg: 230,
    start_date: '2022-01-01',
    end_date: '2022-02-20',
  },
];

const response6 = [
  {
    id: 1,
    orders_avg: 0.6,
    start_date: '2022-01-01',
    end_date: '2022-02-20',
  },
];

test(`It should return the value of the property if the property exists and is of the expected type, otherwise the default text`, () => {
  expect(
    getResponseData(
      response4,
      'orders_avg',
      'number',
      'Data not available',
      'float(2)'
    )
  ).toEqual(230.12);
  expect(
    getResponseData(
      response5,
      'orders_avg',
      'number',
      'Data not available',
      'float(2)'
    )
  ).toEqual(230.0);
  expect(
    getResponseData(
      response6,
      'orders_avg',
      'number',
      'Data not available',
      'float(2)'
    )
  ).toEqual(0.6);
});
