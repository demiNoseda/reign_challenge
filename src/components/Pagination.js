const Pagination = ({ totalPages, paginate, actualPage, initialPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages - initialPage && i < 10; i++) {
    pageNumbers.push(initialPage + i - 1);
  }

  return pageNumbers.map((number) => (
    <button
      key={number}
      type="button"
      className={actualPage === number ? "selected" : null}
      onClick={() => {
        paginate(number);
      }}
    >
      {number}
    </button>
  ));
};

export default Pagination;
