import React, { useEffect, useState } from "react";
import bookService from "../services/BookService";
import NoBooksMessage from "../components/NoBooksMessage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import mapper from "../services/Mapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUnlock,
  faFolderOpen,
  faFolder,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "../components/Popup";
import Pagination from "../components/Pagination";

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(null);
  const [status, setStatus] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1);

  const token = useSelector((state) => state.authentication.jwtToken);
  const navigate = useNavigate();

  const onPageChange = (page) => {
    setCurrentPage(page);
  }

  const toggleShareable = async (bookId) => {
    try {
      const response = await bookService.toggleShareable(bookId, token);
      if (response === bookId) {
        setShowPopup(null);
        setShowPopup(
          <Popup
            bgColor={"bg-green-500 text-white shadow-lg rounded-lg"}
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
                <span>Shareable Status Updated</span>
              </div>
            }
            msg={
              <div className="flex flex-col space-y-2">
                <p>Your changes have been successfully saved!</p>
                <p className="text-sm italic">
                  Thank you for updating the shareable status.
                </p>
              </div>
            }
          />
        );
        setTimeout(() => {
          setShowPopup(null);
        }, 5000);
      } else {
        setShowPopup(null);
        setShowPopup(
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
                <span>Update Failed</span>
              </div>
            }
            msg={
              <div className="flex flex-col space-y-2">
                <p>
                  Oops! Something went wrong while updating the shareable
                  status.
                </p>
                <p className="text-sm italic">
                  Please try again or contact support if the problem persists.
                </p>
              </div>
            }
          />
        );
        setTimeout(() => {
          setShowPopup(null);
        }, 5000);
      }
    } catch (error) {
      setError(error.message);
      setShowPopup(null);
      setShowPopup(
        <Popup
          bgColor="bg-red-500 text-white shadow-lg rounded-lg p-4"
          heading={
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold">Error Occurred</span>
            </div>
          }
          msg={
            <div className="mt-2 space-y-2">
              <p className="text-sm">{error.message}</p>
              <p className="text-xs italic">
                If the issue persists, contact support for assistance.
              </p>
            </div>
          }
        />
      );
      setTimeout(() => {
        setShowPopup(null);
      }, 5000);
    }
    setStatus((prev) => !prev);
  };

  const toggleArchived = async (bookId) => {
    try {
      const response = await bookService.toggleArchived(bookId, token);
      if (response === bookId) {
        setShowPopup(null);
        setShowPopup(
          <Popup
            bgColor={"bg-green-500 text-white shadow-lg rounded-lg"}
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
                <span>Archived Status Updated</span>
              </div>
            }
            msg={
              <div className="flex flex-col space-y-2">
                <p>Your changes have been successfully saved!</p>
                <p className="text-sm italic">
                  Thank you for updating the archived status.
                </p>
              </div>
            }
          />
        );
        setTimeout(() => {
          setShowPopup(null);
        }, 5000);
      } else {
        setShowPopup(null);
        setShowPopup(
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
                <span>Update Failed</span>
              </div>
            }
            msg={
              <div className="flex flex-col space-y-2">
                <p>
                  Oops! Something went wrong while updating the archived status.
                </p>
                <p className="text-sm italic">
                  Please try again or contact support if the problem persists.
                </p>
              </div>
            }
          />
        );
        setTimeout(() => {
          setShowPopup(null);
        }, 5000);
      }
    } catch (error) {
      setError(error.message);
      setShowPopup(null);
      setShowPopup(
        <Popup
          bgColor="bg-red-500 text-white shadow-lg rounded-lg p-4"
          heading={
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold">Error Occurred</span>
            </div>
          }
          msg={
            <div className="mt-2 space-y-2">
              <p className="text-sm">{error.message}</p>
              <p className="text-xs italic">
                If the issue persists, contact support for assistance.
              </p>
            </div>
          }
        />
      );
      setTimeout(() => {
        setShowPopup(null);
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
        const response = await bookService.getMyBooks(token, currentPage - 1, 5);
        const dbBooks = response.content;
        setTotalPages(response.totalPages);
        const bookResponses = [];

        dbBooks.map((book) => {
          bookResponses.push(mapper.toBookResponse(book));
        });
        setBooks(bookResponses);
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
    <div className="text-gray-900 bg-gray-200 pt-36 min-h-screen relative">
      {error && <p className="text-red-500 text-center mt-10">{error}</p>}
      <div className="px-3 py-0 flex absolute">
        <button
          onClick={() => navigate("/add-book")}
          className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full shadow-md text-white hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {books.length === 0 ? (
        <NoBooksMessage />
      ) : (
        <div className="px-3 py-14 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Title</th>
                <th className="text-left p-3 px-5">Isbn</th>
                <th className="text-left p-3 px-5">Archived</th>
                <th className="text-left p-3 px-5">Shareable</th>
                <th></th>
              </tr>
              {books.map((book) => (
                <tr
                  className={`border-b hover:bg-blue-300 bg-gray-100 p-4 ${
                    book.shareable && !book.archived
                      ? `bg-green-300`
                      : `bg-orange-300`
                  }`}
                  key={book.id}
                >
                  <td className="p-3 px-5">{book.title}</td>
                  <td className="p-3 px-5">{book.isbn}</td>
                  <td className="p-2 justify-center">
                    {book.archived ? (
                      <button
                        onClick={() => {
                          toggleArchived(book.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faFolder} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          toggleArchived(book.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faFolderOpen} />
                      </button>
                    )}
                  </td>
                  <td className="p-2 flex justify-center">
                    {book.shareable ? (
                      <button
                        onClick={() => {
                          toggleShareable(book.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faUnlock} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          toggleShareable(book.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faLock} />
                      </button>
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
            totalPages={totalPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

export default MyBooks;
