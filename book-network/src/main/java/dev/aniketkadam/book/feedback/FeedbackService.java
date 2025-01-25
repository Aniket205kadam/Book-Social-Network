package dev.aniketkadam.book.feedback;

import dev.aniketkadam.book.book.Book;
import dev.aniketkadam.book.book.BookRepository;
import dev.aniketkadam.book.common.PageResponse;
import dev.aniketkadam.book.exception.OperationNotPermittedException;
import dev.aniketkadam.book.user.User;
import dev.aniketkadam.book.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class FeedbackService {
    private final BookRepository bookRepository;
    private final FeedbackRepository feedbackRepository;
    private final FeedbackMapper feedbackMapper;
    private final UserRepository userRepository;

    public FeedbackService(BookRepository bookRepository, FeedbackRepository feedbackRepository, FeedbackMapper feedbackMapper, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.feedbackRepository = feedbackRepository;
        this.feedbackMapper = feedbackMapper;
        this.userRepository = userRepository;
    }

    public String save(FeedbackRequest request, Authentication connectedUser) {
        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new EntityNotFoundException("No Book found with ID:: " + request.getBookId()));
        if (book.isArchived() || !book.isShareable()) {
            throw new OperationNotPermittedException("You cannot give the feedback to the archive or non shareable book");
        }
        User user = (User) connectedUser.getPrincipal();
        if (Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot give a feedback to your own book");
        }
        Feedback feedback = feedbackMapper.toFeedback(request);
        return feedbackRepository.save(feedback).getId();
    }

    public PageResponse<FeedbackResponse> findAllFeedbackByBook(
            String bookId, int page, int size, Authentication connectedUser
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        User user = (User) connectedUser.getPrincipal();
        Page<Feedback> feedbacks = feedbackRepository.findALlByBookId(pageable, bookId);
        List<FeedbackResponse> feedbackResponses = feedbacks.stream()
                .map(feedback -> FeedbackResponse.builder()
                        .note(feedback.getNote())
                        .comment(feedback.getComment())
                        .ownFeedback(Objects.equals(feedback.getCreatedBy(), user.getId()))
                        .fullName(getUsername(feedback.getCreatedBy()).getFullName())
                        .build())
                .toList();
        return PageResponse.<FeedbackResponse>builder()
                .content(feedbackResponses)
                .number(feedbacks.getNumber())
                .size(feedbacks.getSize())
                .totalElements(feedbacks.getTotalElements())
                .totalPages(feedbacks.getTotalPages())
                .first(feedbacks.isFirst())
                .last(feedbacks.isLast())
                .build();
    }

    private User getUsername(@NonNull String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));
    }
}
