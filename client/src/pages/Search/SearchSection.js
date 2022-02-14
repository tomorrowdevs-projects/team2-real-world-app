import { Accordion, Form, Button, Stack } from 'react-bootstrap';
import SelectAutocomplete from '../../components/SelectAutocomplete/SelectAutomplete';
import DateRange from '../../components/DataRange/DateRange';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import SearchResult from '../../components/SearchResult/SearchResult';

const SearchSection = ({
  handleSubmit,
  handleAccordion,
  searchList,

  //react-select control
  setSelected,

  //Date Component control
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,

  //Context
  productsList,
  responseReady,
  response,
  alertSearch,
  handleAlertSearch,
}) => {
  return (
    <main>
      <section>
        <h1>Search data</h1>
        <div className='forms-search'>
          <Accordion onSelect={handleAccordion}>
            {searchList.map((item, index) => {
              return (
                <Accordion.Item key={index} eventKey={index}>
                  <Accordion.Header>{item.label}</Accordion.Header>
                  <Accordion.Body>
                    <Form id='search-form-product' onSubmit={handleSubmit}>
                      {item.select && (
                        <SelectAutocomplete
                          options={productsList}
                          setValue={setSelected}
                        />
                      )}
                      <DateRange
                        dateFrom={dateFrom}
                        setDateFrom={setDateFrom}
                        dateTo={dateTo}
                        setDateTo={setDateTo}
                      />
                      <Stack className='mt-4' direction='horizontal' gap={3}>
                        <AlertMessage
                          alert={alertSearch}
                          handleAlert={handleAlertSearch}
                        />
                        <Button
                          className='ms-auto'
                          variant='primary'
                          type='submit'
                        >
                          Submit
                        </Button>
                      </Stack>
                    </Form>
                    {responseReady && (
                      <SearchResult
                        response={response}
                        select={item.select}
                        responseLabel={item.responseLabel}
                      />
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </section>
    </main>
  );
};

export default SearchSection;
