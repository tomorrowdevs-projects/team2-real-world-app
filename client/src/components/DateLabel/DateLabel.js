import './date-label.scss';

const DateLabel = ({ dateFrom, dateTo }) => {
  return (
    <>
      <p className='date-range-label'>
        from <span>{dateFrom}</span> to <span>{dateTo}</span>
      </p>
    </>
  );
};

export default DateLabel;
