import React, { useState, useEffect } from "react";
import bookService from "../services/BookService";
import { Link, useNavigate } from "react-router-dom";
import NoBooksMessage from "../components/NoBooksMessage";
import { useSelector } from "react-redux";

function WishlistBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.authentication.jwtToken);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        console.error("Token not found");
        navigate("/authentication/login");
        return;
      }
      try {
        const response = await bookService.getWishedBooks(token);
        setBooks(response);
      } catch (error) {
        setError(error);
      }
    };
    fetchBooks();
  }, []);

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
                <th className="text-left p-3 px-5">Availability Status</th>
              </tr>
              {books.map((book) => (
                <tr
                  onClick={() => navigate(`/book/${book.id}`)}
                  className={`cursor-pointer ${
                    book.available ? "bg-green-400" : "bg-orange-200"
                  } border-b hover:bg-blue-100`}
                  key={book.id}
                >
                  <td className="p-3 px-5">{book.title}</td>
                  <td className="p-3 px-5">{book.authorName}</td>
                  <td className="p-3 px-5">
                    {book.available ? "available" : "No available"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default WishlistBooks;
