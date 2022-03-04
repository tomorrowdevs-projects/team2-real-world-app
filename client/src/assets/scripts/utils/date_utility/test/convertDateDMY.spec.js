import { convertDateDMY } from '../date_utility';

//Convert date from YYY-MM-DD in DD/MM/YYYY
test(`It should return the date with the format DD/MM/YYYY if the input value is in the YYY-MM-DD format, or the input value if it is not`, () => {
  expect(convertDateDMY('2022-03-01')).toEqual('01/03/2022');
});

test(`It should return the date with the format DD/MM/YYYY if the input value is in the YYY-MM-DD format, or the input value if it is not`, () => {
  expect(convertDateDMY('2022-13-01')).toEqual('2022-13-01');
});

test(`It should return the date with the format DD/MM/YYYY if the input value is in the YYY-MM-DD format, or the input value if it is not`, () => {
  expect(convertDateDMY('Date not available')).toEqual('Date not available');
});

test(`It should return the date with the format DD/MM/YYYY if the input value is in the YYY-MM-DD format, or the input value if it is not`, () => {
  expect(convertDateDMY('2022-03-0')).toEqual('2022-03-0');
});
