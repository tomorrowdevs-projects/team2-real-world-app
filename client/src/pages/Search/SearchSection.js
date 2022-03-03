import { Accordion, Form, Button, Stack } from 'react-bootstrap';
import './search.scss';
import SelectAutocomplete from '../../components/SelectAutocomplete/SelectAutomplete';
import DateRange from '../../components/DataRange/DateRange';
import SearchResult from '../../components/SearchResult/SearchResult';
import AlertMessageSearch from '../../components/AlertMessageSearch/AlertMessageSearch';

const SearchSection = ({
  //Alert
  alertSearch,
  //List for render accordion items
  searchList,

  //Fetch product list
  handleLabelClick,

  //react-select control
  productList,
  setInputSelected,
  setProductSelected,
  isFetchLoading,
  isFetchLoadingMetrics,
  accordionSelected,
  handleClickReset,

  //Date Component control
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,

  //Queries
  responseReady,
  response,

  //Search alert and submit
  setAccordionSelected,
  handleSubmit,
}) => {
  return (
    <main>
      <section>
        <h1>Search data</h1>
        <div className='search-accordion'>
          <Accordion
            onSelect={event => setAccordionSelected(event)}
            className=''
          >
            {searchList.map((item, index) => {
              return (
                <Accordion.Item
                  eventKey={index}
                  onClick={event =>
                    event.target.innerHTML === searchList[0].label &&
                    handleLabelClick(event)
                  }
                  key={index}
                >
                  <Accordion.Header>{item.label}</Accordion.Header>
                  <Accordion.Body>
                    <Form id={item.formId} onSubmit={handleSubmit}>
                      {item.select && (
                        <SelectAutocomplete
                          options={productList}
                          setInput={setInputSelected}
                          setSelected={setProductSelected}
                          isDisabled={isFetchLoading}
                          isLoading={isFetchLoading}
                          handleClickReset={handleClickReset}
                        />
                      )}
                      <DateRange
                        dateFrom={dateFrom}
                        setDateFrom={setDateFrom}
                        dateTo={dateTo}
                        setDateTo={setDateTo}
                        handleClickReset={handleClickReset}
                      />
                      <Stack
                        className='align-items-start mt-5 ps-3 mb-3'
                        style={{ minHeight: '100px' }}
                        direction='horizontal'
                        gap={3}
                      >
                        <AlertMessageSearch alert={alertSearch} />
                        <Button
                          className='ms-auto'
                          variant='primary'
                          type='submit'
                          disabled={
                            isFetchLoading ||
                            isFetchLoadingMetrics ||
                            (!productList && accordionSelected === 0)
                          }
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
