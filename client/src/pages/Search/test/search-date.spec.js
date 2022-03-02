import { isValidDate, isValidDateRange } from '../search-utils';

const fetchDate = '2022-03-01';

//Validate single date
test(`It should return true if the format of the input date is correct and false otherwise`, () => {
  expect(isValidDate('2022-03-01')).toEqual(true);
});

test(`It should return true if the format of the input date is correct and false otherwise`, () => {
  expect(isValidDate('0000-01-01')).toEqual(true);
});

test(`It should return true if the format of the input date is correct and false otherwise`, () => {
  expect(isValidDate('2022-13-10')).toEqual(false);
});

test(`It should return true if the format of the input date is correct and false otherwise`, () => {
  expect(isValidDate('2022-13-1')).toEqual(false);
});

test(`It should return true if the format of the input date is correct and false otherwise`, () => {
  expect(isValidDate('2022-3-1')).toEqual(false);
});

test(`It should return true if the format of the input date is correct and false otherwise`, () => {
  expect(isValidDate('2022-03-1')).toEqual(false);
});

test(`It should return true if the format of the input date is correct and false otherwise`, () => {
  expect(isValidDate('2022-03')).toEqual(false);
});

test(`It should return true if the format of the input date is correct and false otherwise`, () => {
  expect(isValidDate('2022-03-1')).toEqual(false);
});

test(`It should return true if the format of the input date is correct and false otherwise`, () => {
  expect(isValidDate('0000-00-00')).toEqual(false);
});

test(`It should return true if the format of the input date is correct and false otherwise`, () => {
  expect(isValidDate('2022-01-0a')).toEqual(false);
});

test(`It should return true if the format of the input date is correct and false otherwise`, () => {
  expect(isValidDate(2020)).toEqual(false);
});

test(`It should return true if the format of the input date is correct and false otherwise`, () => {
  expect(isValidDate(2020 - 10)).toEqual(false);
});

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
