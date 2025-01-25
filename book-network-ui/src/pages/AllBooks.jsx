import React, { useEffect, useState } from "react";
import bookService from "../services/BookService";
import NoBooksMessage from "../components/NoBooksMessage";
import BookCard from "../components/BookCard";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import mapper from "../services/Mapper";
import Pagination from "../components/Pagination";

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = useSelector((state) => state.authentication.jwtToken);
  const navigate = useNavigate();

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        setError("No token available. Please log in.");
        navigate("/authentication/login");
        return;
      }
      try {
        const response = await bookService.getAllBooks(
          token,
          currentPage - 1,
          6
        );
        setTotalPages(response.totalPages);
        const dbBooks = response.content;
        const bookResponses = [];

        dbBooks.map((book) => {
          bookResponses.push(mapper.toBookResponse(book));
        });
        setBooks(bookResponses);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchBooks();
  }, [token, currentPage]);

  if (error) {
    return (
      <p className="text-red-500 text-center mt-10 min-h-screen pt-28">
        {error}
      </p>
    );
  }
  return (
    <div tabIndex="0" className="focus:outline-none min-h-screen">
      <div className="mx-auto container py-8">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {books.length === 0 ? (
          <NoBooksMessage />
        ) : (
          <div className="flex flex-wrap items-center lg:justify-between justify-center">
            {books.map((book) => (
              <div key={book.id}>
                <BookCard id={book.id} />
              </div>
            ))}
          </div>
        )}
      </div>
      {books.length === 0 ? null : (
        <div className="flex justify-center mb-2">
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

export default AllBooks;
