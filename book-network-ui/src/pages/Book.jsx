import React, { useEffect, useState } from "react";
import ReadMoreParagraph from "../components/ReadMoreParagraph";
import Button from "../components/Button";
import Rating from "../components/Rating";
import { set, useForm } from "react-hook-form";
import Textarea from "../components/Textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Feedback from "../components/Feedback";
import { useParams } from "react-router-dom";
import bookService from "../services/BookService";
import mapper from "../services/Mapper";
import { useSelector } from "react-redux";
import Popup from "../components/Popup";
import Input from "../components/Input";
import FeedbackRequest from "../models/FeedbackRequest";
import feedbackService from "../services/FeedbackService";

function Book() {
  const { register, handleSubmit, reset } = useForm();
  const [borrowBtnLoading, setBorrowBtnLoading] = useState(false);
  const [feedbackBtnLoading, setFeedbackBtnLoading] = useState(false);
  const { bookId } = useParams();
  const [error, setError] = useState();
  const [book, setBook] = useState();
  const [feedbackList, setFeedbackList] = useState([]);
  const token = useSelector((state) => state.authentication.jwtToken);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(null);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async function getBookById() {
      if (!token) {
        setError("No token available. Please log in.");
        navigate("/authentication/login");
        return;
      }
      try {
        const response = await bookService.getBookById(bookId, token);
        setBook(mapper.toBookResponse(response));
        const imageResponse = await bookService.getBookCover(bookId, token);
        const imageUrl = URL.createObjectURL(imageResponse);
        setImageUrl(imageUrl);

        const feedbackResponse = await feedbackService.findAllFeedbackByBook(
          bookId,
          token
        );
        const feedbacks = [];
        feedbackResponse.content.map((feedback) => {
          feedbacks.push(mapper.toFeedbackResponse(feedback));
        });
        setFeedbackList(feedbacks);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    })();
  }, [bookId, token, status]);

  const handleFeedbackSubmit = async (data) => {
    const feedbackRequest = new FeedbackRequest(
      null,
      data.comment,
      data.note,
      book.id
    );
    try {
      setFeedbackBtnLoading(true);
      const response = await feedbackService.saveFeedback(
        feedbackRequest,
        token
      );
      if (response === book.id) {
        setPopup(
          <Popup
            bgColor={`bg-green-300`}
            heading={"Feedback Added"}
            msg={"Feedback added successfully"}
          />
        );
      }
    } catch (error) {
      setError(error.message);
      setPopup(
        <Popup
          bgColor="bg-red-300"
          heading="Failed to add feedback"
          msg={`${error.message}`}
        />
      );
    }
    setFeedbackBtnLoading(false);
    setStatus((prevStatus) => !prevStatus);
  };

  const borrowBookHandler = async () => {
    setBorrowBtnLoading(true);
    try {
      const response = await bookService.borrowBook(book.id, token);
      if (response === book.id) {
        setPopup(
          <Popup
            bgColor={`bg-green-300`}
            heading={"Book Borrow"}
            msg={"Book borrow successfully"}
          />
        );
      }
    } catch (error) {
      if (
        error.message ===
        "The requested book is currently borrowed by another user"
      ) {
        const response = await bookService.addToWishList(token, bookId);
        if (response === bookId) {
          setPopup(
            <Popup
              bgColor="bg-orange-500"
              heading="Success!"
              msg="The book has been added to your wishlist."
            />
          );
        }
      } else {
        setPopup(
          <Popup
            bgColor="bg-red-300"
            heading="Failed to borrow the book"
            msg={`${error.message}`}
          />
        );
      }
    }
    setBorrowBtnLoading(false);
  };

  return loading ? (
    <h1 className="min-h-screen pt-28">Loading...!</h1>
  ) : (
    <div className="min-w-screen min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center p-5 lg:p-10 pt-36" key={book.id}>
      {error && <p className="text-red-500">{error}</p>}
      <div className="p-10 w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gray-100">
            <div className="p-5 md:p-10 flex justify-center items-center h-full">
              <img
                src={imageUrl}
                alt={book.title}
                className="rounded-lg shadow-lg max-h-96 object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2 p-6 lg:p-10 flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              {book.title}
            </h1>
            <div className="flex items-center mb-4">
              <Rating rating={book.rate} />
            </div>
            <div className="text-sm text-gray-600 mb-6">
              <div>
                <strong className="font-medium text-gray-700">Author:</strong>{" "}
                {book.authorName}
              </div>
              <div>
                <strong className="font-medium text-gray-700">Owner:</strong>{" "}
                {book.owner}
              </div>
            </div>
            <div className="text-gray-700 leading-relaxed mb-6">
              <ReadMoreParagraph
                paragraph={book.synopsis}
                previewParaLength={150}
              />
            </div>
            <div className="mt-auto mb-6">
              <button
                onClick={borrowBookHandler}
                className="w-56 mt-3 ml-48 px-6 py-2 text-xl font-medium text-center text-white bg-indigo-500
                          rounded-lg transition duration-200 hover:bg-indigo-600 ease"
              >
                {borrowBtnLoading ? (
                  <FontAwesomeIcon icon={faGear} spin spinReverse />
                ) : (
                  <span>Let Me Borrow</span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Feedback</h2>
          <form onSubmit={handleSubmit(handleFeedbackSubmit)} className="mb-6">
            <Textarea
              rows="4"
              placeholder="Write you feedback..."
              {...register("comment", {
                required: true,
              })}
            />
            <Input
              label="Rating: "
              type="text"
              placeholder="4.5"
              {...register("note", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="mt-3 px-6 py-2 text-xl font-medium text-center text-white bg-indigo-500
                          rounded-lg transition duration-200 hover:bg-indigo-600 ease"
            >
              {feedbackBtnLoading ? (
                <FontAwesomeIcon icon={faGear} spin spinReverse />
              ) : (
                <span>Submit Feedback</span>
              )}
            </Button>
          </form>
          <div>
            {feedbackList.length > 0 ? (
              feedbackList.map((feedback, index) => (
                <div className="p-2" key={index}>
                  <Feedback key={index} feedback={feedback} />
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No feedback yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </div>
      </div>
      {popup}
    </div>
  );
}

export default Book;
