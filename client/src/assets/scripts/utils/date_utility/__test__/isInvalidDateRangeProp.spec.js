import { isInvalidDateRangeProp } from '../date_utility';

//Validate date range prop
test(`It should return true if the date format is correct and the date range is incorrect, otherwise false`, () => {
  expect(isInvalidDateRangeProp('2022-02-02', '2022-02-01')).toEqual(true);
  expect(isInvalidDateRangeProp(null, '2022-02-01')).toEqual(false);
  expect(isInvalidDateRangeProp('2022-02-01', null)).toEqual(false);
  expect(isInvalidDateRangeProp('2022-02-01', null)).toEqual(false);
  expect(isInvalidDateRangeProp('', null)).toEqual(false);
  expect(isInvalidDateRangeProp('', '')).toEqual(false);
  expect(isInvalidDateRangeProp('2022-02-01', '2022-02-02')).toEqual(false);
  expect(isInvalidDateRangeProp('2022-02-01', '2022-02-01')).toEqual(false);
});
