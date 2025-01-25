package dev.aniketkadam.book.feedback;

import dev.aniketkadam.book.book.Book;
import org.springframework.stereotype.Service;

@Service
public class FeedbackMapper {
    public Feedback toFeedback(FeedbackRequest request) {
        return Feedback.builder()
                .id(request.getId())
                .note(request.getNote())
                .comment(request.getComment())
                .book(Book.builder()
                        .id(request
                                .getBookId()
                        )
                        .build()
                )
                .build();
    }
}
