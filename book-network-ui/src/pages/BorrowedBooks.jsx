import React, { useEffect, useId, useState } from "react";
import bookService from "../services/BookService";
import NoBooksMessage from "../components/NoBooksMessage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import mapper from "../services/Mapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsDown,
  faThumbsUp,
  faCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "../components/Popup";
import Pagination from "../components/Pagination";

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setPopup] = useState(null);
  const [status, setStatus] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const id = useId();

  const token = useSelector((state) => state.authentication.jwtToken);
  const navigate = useNavigate();

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const returnRequest = async (bookId) => {
    const response = await bookService.returnBorrowBook(bookId, token);
    if (response === bookId) {
      setPopup(null);
      setPopup(
        <Popup
          bgColor={"bg-blue-500 text-white shadow-lg rounded-lg"}
          heading={
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Book Returned Successfully</span>
            </div>
          }
          msg={
            <div className="flex flex-col space-y-2">
              <p>The book has been successfully returned!</p>
              <p className="text-sm italic">
                Thank you for returning the book on time. We appreciate your
                cooperation.
              </p>
            </div>
          }
        />
      );
      setTimeout(() => {
        setPopup(null);
      }, 5000);
    } else {
      setPopup(null);
      setPopup(
        <Popup
          bgColor={"bg-red-500 text-white shadow-lg rounded-lg"}
          heading={
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Book Return Failed</span>
            </div>
          }
          msg={
            <div className="flex flex-col space-y-2">
              <p>There was an issue while processing your return request.</p>
              <p className="text-sm italic">
                Please try again later or contact support for assistance.
              </p>
            </div>
          }
        />
      );
      setTimeout(() => {
        setPopup(null);
      }, 5000);
    }
    setStatus((prev) => !prev);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        setError("No token available. Please log in.");
        navigate("/authentication/login");
        return;
      }
      try {
        const response = await bookService.getBorrowedBooks(
          token,
          currentPage - 1,
          5
        );
        const dbBooks = response.content;
        const borrowedBookResponse = [];
        setTotalPages(response.totalPages);

        dbBooks.map((book) => {
          borrowedBookResponse.push(mapper.toBorrowedBookResponse(book));
        });
        setBooks(borrowedBookResponse);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch books. Please try again later.");
      }
    };
    fetchBooks();
  }, [token, status, currentPage]);

  if (loading) {
    return <h1 className="min-h-screen">Loading...</h1>;
  }
  return (
    <div className="text-gray-900 bg-gray-200 pt-36 min-h-screen flex flex-col">
      {error && <p className="text-red-500 text-center mt-10">{error}</p>}
      {books.length === 0 ? (
        <NoBooksMessage />
      ) : (
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Title</th>
                <th className="text-left p-3 px-5">Author Name</th>
                <th className="text-left p-3 px-5">Return Status</th>
                <th className="text-left p-3 px-5">Approval Status</th>
              </tr>
              {books.map((book) => (
                <tr
                  className={`border-b hover:bg-blue-300 bg-gray-100 p-4 ${
                    book.returned && book.returnApproved
                      ? `bg-green-400`
                      : book.returned && !book.returnApproved
                      ? `bg-green-100`
                      : `bg-orange-300`
                  }`}
                  key={`${book.id}`}
                >
                  <td className="p-3 px-5">{book.title}</td>
                  <td className="p-3 px-5">{book.authorName}</td>
                  <td className="p-2 justify-center">
                    {book.returned ? (
                      <FontAwesomeIcon icon={faCheck} size="2xl" />
                    ) : (
                      <button
                        onClick={() => {
                          returnRequest(book.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faArrowRight} size="2xl" />
                      </button>
                    )}
                  </td>
                  <td className="p-2 justify-end">
                    {book.returnApproved ? (
                      <FontAwesomeIcon icon={faThumbsUp} size="2xl" />
                    ) : (
                      <FontAwesomeIcon icon={faThumbsDown} size="2xl" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showPopup}
      {books.length === 0 ? null : (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

export default MyBooks;
