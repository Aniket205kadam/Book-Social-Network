import BookResponse from "../models/BookResponse";
import BorrowedBookResponse from "../models/BorrowedBookResponse";
import FeedbackRequest from "../models/FeedbackRequest";
import FeedbackResponse from "../models/FeedbackResponse";

class Mapper {
  toBookResponse(book) {
    return new BookResponse(
      book.id,
      book.title,
      book.authorName,
      book.isbn,
      book.synopsis,
      book.owner,
      book.rate,
      book.archived,
      book.shareable,
      book.bookInWishlist
    );
  }

  toBorrowedBookResponse(book) {
    return new BorrowedBookResponse(
      book.id,
      book.title,
      book.authorName,
      book.returned,
      book.returnApproved
    );
  }

  toFeedbackRequest(feedback) {
    return new FeedbackRequest(feedback.id, feedback.comment, feedback.note);
  }

  toFeedbackResponse(feedback) {
    return new FeedbackResponse(
      feedback.fullName,
      feedback.note,
      feedback.comment,
      feedback.ownFeedback
    );
  }
}

export default new Mapper();
