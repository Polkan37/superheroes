import React from "react";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";

function Pagination({ nPages, currentPage, setCurrentPage }) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  return (
    <nav aria-label="...">
      <MDBPagination size="sm" className="mb-0">
        {pageNumbers.map((pgNumber) => {
          if (currentPage === pgNumber) {
            return (
              <MDBPaginationItem key={pgNumber} active>
                <MDBPaginationLink
                  tag="span"
                  onClick={() => setCurrentPage(pgNumber)}
                >
                  {pgNumber}
                </MDBPaginationLink>
              </MDBPaginationItem>
            );
          } else {
            return (
              <MDBPaginationItem key={pgNumber}>
                <MDBPaginationLink
                  href="#"
                  onClick={() => setCurrentPage(pgNumber)}
                >
                  {pgNumber}
                </MDBPaginationLink>
              </MDBPaginationItem>
            );
          }
        })}
      </MDBPagination>
    </nav>
  );
}

export default Pagination;
