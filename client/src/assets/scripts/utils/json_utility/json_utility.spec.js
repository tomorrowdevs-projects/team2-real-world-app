import { isValidJson } from './json_utility';

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
