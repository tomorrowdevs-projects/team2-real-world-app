import { isValidDate } from '../date_utility';

//Validate single date
test(`It should return true if the format of the input date is correct and false otherwise`, () => {
  expect(isValidDate('2022-03-01')).toEqual(true);
  expect(isValidDate('0000-01-01')).toEqual(true);
  expect(isValidDate('2022-13-10')).toEqual(false);
  expect(isValidDate('2022-13-1')).toEqual(false);
  expect(isValidDate('2022-3-1')).toEqual(false);
  expect(isValidDate('2022-03-1')).toEqual(false);
  expect(isValidDate('2022-03')).toEqual(false);
  expect(isValidDate('2022-03-1')).toEqual(false);
  expect(isValidDate('0000-00-00')).toEqual(false);
  expect(isValidDate('2022-01-0a')).toEqual(false);
  expect(isValidDate(2020)).toEqual(false);
  expect(isValidDate(2020 - 10)).toEqual(false);
  expect(isValidDate(null)).toEqual(false);
  expect(isValidDate(undefined)).toEqual(false);
  expect(isValidDate('')).toEqual(false);
});
