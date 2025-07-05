import ReactPaginate from "react-paginate";
import "./Pagination.css";

export default function PaginatedItems({ itemsPerPage, total, setPage }) {
  const pageCount = total / itemsPerPage;

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={Math.ceil(pageCount)}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center justify-content-end m-0"
        pageLinkClassName="pagination-tag-anchor mx-2 rounded-circle"
        activeLinkClassName="acitvelike"
        nextClassName="pagination-arrow"
        previousClassName="pagination-arrow"
      />
    </>
  );
}
