const Pagination = ({ totalPages, paginate, actualPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers.map((number) => (
    <button
      type="button"
      className={actualPage === number - 1 ? "selected" : null}
      onClick={() => {
        paginate(number - 1);
        console.log("Ejecture");
      }}
    >
      {number}
    </button>
  ));
};

export default Pagination;
