import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <nav aria-label="Page navigation">
        <ul className="inline-flex -space-x-px">
          <li>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              } border border-gray-300 rounded-l-lg py-2 px-3`}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageClick(page)}
                  className={`${
                    page === currentPage
                      ? "bg-blue-50 text-blue-600"
                      : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  } border border-gray-300 py-2 px-3`}
                >
                  {page}
                </button>
              </li>
            )
          )}
          <li>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              } border border-gray-300 rounded-r-lg py-2 px-3`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
