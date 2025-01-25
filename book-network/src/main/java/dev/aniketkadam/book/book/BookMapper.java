package dev.aniketkadam.book.book;

import dev.aniketkadam.book.file.FileUtils;
import dev.aniketkadam.book.history.BookTransactionHistory;
import dev.aniketkadam.book.history.BookTransactionHistoryRepository;
import dev.aniketkadam.book.user.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class BookMapper {
    private final BookTransactionHistoryRepository bookTransactionHistoryRepository;

    public BookMapper(BookTransactionHistoryRepository bookTransactionHistoryRepository) {
        this.bookTransactionHistoryRepository = bookTransactionHistoryRepository;
    }

    public Book toBook(BookRequest request) {
        return Book.builder()
                .id(request.getId())
                .title(request.getTitle())
                .authorName(request.getAuthorName())
                .isbn(request.getIsbn())
                .synopsis(request.getSynopsis())
                .shareable(request.isShareable())
                .archived(false)
                .build();
    }

    public BookResponse toBookResponse(Book book) {
        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        boolean status = book
                .getWaitingUsers()
                .stream()
                .anyMatch(waitingUser -> waitingUser
                        .getFullName()
                        .equals(user.getFullName())
                );
        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .authorName(book.getAuthorName())
                .isbn(book.getIsbn())
                .synopsis(book.getSynopsis())
                .owner(book.getOwner().getFullName())
                .cover(FileUtils.readFileFromLocation(book.getBookCover()))
                .rate(book.getRate())
                .archived(book.isArchived())
                .shareable(book.isShareable())
                .isBookInWishlist(status)
                .build();
    }

    public BorrowedBookResponse toBorrowedBookResponse(BookTransactionHistory bookTransactionHistory) {
        return BorrowedBookResponse.builder()
                .id(bookTransactionHistory.getBook().getId())
                .title(bookTransactionHistory.getBook().getTitle())
                .authorName(bookTransactionHistory.getBook().getAuthorName())
                .isbn(bookTransactionHistory.getBook().getIsbn())
                .rate(bookTransactionHistory.getBook().getRate())
                .returned(bookTransactionHistory.isReturned())
                .returnApproved(bookTransactionHistory.isReturnApproved())
                .build();
    }

    public WishedBookResponse toWishedBookResponse(Book book) {
        return WishedBookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .authorName(book.getAuthorName())
                .available(!bookTransactionHistoryRepository.isAlreadyBorrowedByOtherUser(book.getId()))
                .build();
    }
}
