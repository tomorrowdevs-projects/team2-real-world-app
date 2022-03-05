import { isValidDateRange } from '../date_utility';

//Validate date range
test(`It should return true if the format of the date range is correct and false otherwise`, () => {
  expect(isValidDateRange('2022-01-01', '2022-02-01')).toEqual(true);
});

test(`It should return true if the format of the date range is correct and false otherwise`, () => {
  expect(isValidDateRange('2022-03-01', '2022-03-01')).toEqual(true);
});

test(`It should return true if the format of the date range is correct and false otherwise`, () => {
  expect(isValidDateRange('2022-03-01', '2022-02-01')).toEqual(false);
});

test(`It should return true if the format of the date range is correct and false otherwise`, () => {
  expect(isValidDateRange('2022-01-0a', '2022-02-01')).toEqual(false);
});

test(`It should return true if the format of the date range is correct and false otherwise`, () => {
  expect(isValidDateRange('2022-01-01', '2022-02-1')).toEqual(false);
});
