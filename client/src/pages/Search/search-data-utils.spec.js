import { isValidJson, formatList } from './search-data-utils';

const fetchDataFormat = [
  {
    product_id: 1,
    product_name: 'Remote Tuner',
  },
  {
    product_id: 2,
    product_name: 'Direct Case',
  },
  {
    product_id: 3,
    product_name: 'Audible Bridge',
  },
];

//Validate json format
test(`It should return true if the format of the input data is a valid json format and false otherwise`, () => {
  expect(isValidJson(fetchDataFormat)).toEqual(true);
});

test(`It should return true if the format of the input data is a valid json format and false otherwise`, () => {
  expect(isValidJson(undefined)).toEqual(false);
});

test(`It should return true if the format of the input data is a valid json format and false otherwise`, () => {
  expect(isValidJson(null)).toEqual(false);
});

test(`It should return true if the format of the input data is a valid json format and false otherwise`, () => {
  expect(isValidJson([])).toEqual(false);
});

test(`It should return true if the format of the input data is a valid json format and false otherwise`, () => {
  expect(isValidJson([{}])).toEqual(false);
});

test(`It should return true if the format of the input data is a valid json format and false otherwise`, () => {
  expect(isValidJson([{}, {}])).toEqual(false);
});

//Transform the product list contained in the json
test(`It should return an array of objects with a specific format`, () => {
  expect(formatList(fetchDataFormat)).toEqual([
    { value: 'Remote Tuner', label: 'Remote Tuner', id: 1 },
    { value: 'Direct Case', label: 'Direct Case', id: 2 },
    { value: 'Audible Bridge', label: 'Audible Bridge', id: 3 },
  ]);
});

//Test 1
const fetchDataError1 = [
  {
    product_id: undefined,
    product_name: 'Remote Tuner',
  },
  {
    product_id: 2,
    product_name: 'Direct Case',
  },
  {
    product_id: 3,
    product_name: 'Audible Bridge',
  },
];

test(`It should return true if the format of the input data is a valid json format and false otherwise`, () => {
  expect(isValidJson(fetchDataError1)).toEqual(true);
});

test(`It should return an array of objects with a specific format`, () => {
  expect(formatList(fetchDataError1)).toEqual([
    { value: 'Direct Case', label: 'Direct Case', id: 2 },
    { value: 'Audible Bridge', label: 'Audible Bridge', id: 3 },
  ]);
});

//Test 2
const fetchDataError2 = [
  {
    product_id: null,
    product_name: 'Remote Tuner',
  },
  {
    product_id: 2,
    product_name: 'Direct Case',
  },
  {
    product_id: 3,
    product_name: 'Audible Bridge',
  },
];

test(`It should return true if the format of the input data is a valid json format and false otherwise`, () => {
  expect(isValidJson(fetchDataError2)).toEqual(true);
});

test(`It should return an array of objects with a specific format`, () => {
  expect(formatList(fetchDataError2)).toEqual([
    { value: 'Direct Case', label: 'Direct Case', id: 2 },
    { value: 'Audible Bridge', label: 'Audible Bridge', id: 3 },
  ]);
});

//Test 3
const fetchDataError3 = [
  {
    product_id: 1,
    product_name: '',
  },
  {
    product_id: 2,
    product_name: 'Direct Case',
  },
  {
    product_id: 3,
    product_name: 'Audible Bridge',
  },
];

test(`It should return true if the format of the input data is a valid json format and false otherwise`, () => {
  expect(isValidJson(fetchDataError3)).toEqual(true);
});

test(`It should return an array of objects with a specific format`, () => {
  expect(formatList(fetchDataError3)).toEqual([
    { value: 'Direct Case', label: 'Direct Case', id: 2 },
    { value: 'Audible Bridge', label: 'Audible Bridge', id: 3 },
  ]);
});

//Test 4
const fetchDataError4 = [
  {
    product_idx: 1,
    product_name: 'Remote Tuner',
  },
  {
    product_id: 2,
    product_name: 'Direct Case',
  },
  {
    product_id: 3,
    product_name: 'Audible Bridge',
  },
];

test(`It should return true if the format of the input data is a valid json format and false otherwise`, () => {
  expect(isValidJson(fetchDataError4)).toEqual(true);
});

test(`It should return an array of objects with a specific format`, () => {
  expect(formatList(fetchDataError4)).toEqual([
    { value: 'Direct Case', label: 'Direct Case', id: 2 },
    { value: 'Audible Bridge', label: 'Audible Bridge', id: 3 },
  ]);
});

//Test 5
const fetchDataError5 = [
  {
    product_id: 1,
    product_namex: 'Remote Tuner',
  },
  {
    product_id: 2,
    product_name: 'Direct Case',
  },
  {
    product_id: 3,
    product_name: 'Audible Bridge',
  },
];

test(`It should return true if the format of the input data is a valid json format and false otherwise`, () => {
  expect(isValidJson(fetchDataError5)).toEqual(true);
});

test(`It should return an array of objects with a specific format`, () => {
  expect(formatList(fetchDataError5)).toEqual([
    { value: 'Direct Case', label: 'Direct Case', id: 2 },
    { value: 'Audible Bridge', label: 'Audible Bridge', id: 3 },
  ]);
});
