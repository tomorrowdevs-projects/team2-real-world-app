import { Accordion, Form, Button, Stack } from 'react-bootstrap';
import SelectAutocomplete from '../../components/SelectAutocomplete/SelectAutomplete';
import DateRange from '../../components/DataRange/DateRange';
import SearchResult from '../../components/SearchResult/SearchResult';
import AlertMessageSearch from '../../components/AlertMessageSearch/AlertMessageSearch';

const SearchSection = ({
  //Alert
  alertSearch,
  handleAlertSearch,
  //List for render accordion items
  searchList,

  //Fetch product list
  handleLabelClick,

  //react-select control
  productList,
  //setInput,
  setProductSelected,

  //Date Component control
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,

  //Queries
  responseReady,
  response,

  //Search alert and submit
  handleAccordionAlert,
  handleSubmit,
}) => {
  return (
    <main>
      <section>
        <h1>Search data</h1>
        <div className='forms-search'>
          <Accordion onSelect={handleAccordionAlert}>
            {searchList.map((item, index) => {
              return (
                <Accordion.Item
                  eventKey={index}
                  onClick={event =>
                    event.target.innerHTML === searchList[0].label &&
                    handleLabelClick()
                  }
                  key={index}
                >
                  <Accordion.Header>{item.label}</Accordion.Header>
                  <Accordion.Body>
                    <Form id={item.formId} onSubmit={handleSubmit}>
                      {item.select && (
                        <SelectAutocomplete
                          options={productList}
                          // setInput={setInput}
                          setProductSelected={setProductSelected}
                        />
                      )}
                      <DateRange
                        dateFrom={dateFrom}
                        setDateFrom={setDateFrom}
                        dateTo={dateTo}
                        setDateTo={setDateTo}
                      />
                      <Stack className='mt-4' direction='horizontal' gap={3}>
                        <AlertMessageSearch
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
