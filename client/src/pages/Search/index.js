import SearchSection from './SearchSection';
import { searchList } from './search-list';

const Search = () => {
  const responseReady = true;
  const response =
    //'';
    [
      {
        product_name: 'samsung_s20',
        orders: '10',
        price: '4500',
        date_from: '2022-01-01',
        date_to: '2022-01-31',
        customers: '12',
        average: '10',
      },
    ];
  return (
    <SearchSection
      searchList={searchList}
      responseReady={responseReady}
      response={response}
    />
  );
};

export default Search;
