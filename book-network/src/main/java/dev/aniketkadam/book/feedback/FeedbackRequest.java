package dev.aniketkadam.book.feedback;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackRequest {
    private String id;

    @Positive(message = "Note must be a positive number.")
    @Min(value = 0, message = "Note must be greater than or equal to 0.")
    @Max(value = 5, message = "Note must be less than or equal to 5.")
    private double note;

    @NotNull(message = "Comment cannot be null.")
    @NotEmpty(message = "Comment cannot be empty.")
    @NotBlank(message = "Comment cannot be blank.")
    private String comment;

    @NotNull(message = "Book ID cannot be null.")
    private String bookId;
}

/*
* if the id is null means create the feedback or
* the id in not null means update the feedback*/
