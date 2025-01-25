import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather, faUser, faBook } from "@fortawesome/free-solid-svg-icons";
import Rating from "./Rating";
import WishListIcon from "./WishListIcon";
import bookService from "../services/BookService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import mapper from "../services/Mapper";

function BookCard({ id }) {
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState(false);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.authentication.jwtToken);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBookCover() {
      if (!token) {
        console.log("No token available. Please log in.");
        navigate("/authentication/login");
        return;
      }
      const response = await bookService.getBookById(id, token);
      setBook(mapper.toBookResponse(response));
      const imageResponse = await bookService.getBookCover(id, token);
      const imageUrl = URL.createObjectURL(imageResponse);
      setImageUrl(imageUrl);
      setLoading(false);
    }
    getBookCover();
  }, [id, token, status]);

  const handleWishlistbtn = async (event, bookId) => {
    event.stopPropagation();
    const response = await bookService.toggleWishListIcon(token, bookId);
    if (response === bookId) {
      setStatus((prev) => !prev);
    }
  };

  if (loading) {
    return <div className="pt-28">Loading....</div>;
  } else {
    return (
      <div
        className="flex justify-center items-center pt-20"
        onClick={() => navigate(`/book/${book.id}`)}
      >
        <div className="max-w-[400px] min-w-[400px] h-[500px] mx-auto">
          <div className="relative flex flex-col w-full h-full rounded-xl bg-white text-gray-700 shadow-lg hover:cursor-pointer">
            <div className="relative w-full h-4/5 overflow-hidden text-white shadow-lg rounded-t-xl">
              <img
                src={imageUrl}
                alt={book.title}
                className="w-full h-100 object-cover"
              />
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faBook}
                  bounce
                  style={{ color: "#74C0FC" }}
                  className="p-1"
                />
                <h5 className="text-lg font-extrabold text-blue-900 ml-2">
                  {book.title}
                </h5>
              </div>
              <p className="text-sm text-gray-700">
                <FontAwesomeIcon
                  icon={faFeather}
                  bounce
                  style={{ color: "#74C0FC" }}
                />{" "}
                <b>{book.authorName}</b> <br />
                <FontAwesomeIcon
                  icon={faUser}
                  beatFade
                  style={{ color: "#74C0FC" }}
                />{" "}
                <b>{book.owner}</b>
              </p>
              <div className="mt-4 flex justify-between items-center">
                <Rating rating={book.rate} />
                <div onClick={(event) => handleWishlistbtn(event, book.id)}>
                  <WishListIcon type={book.isBookInWishlist} />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookCard;
