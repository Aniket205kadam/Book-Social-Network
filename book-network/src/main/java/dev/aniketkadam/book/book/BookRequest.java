package dev.aniketkadam.book.book;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookRequest {
    private String id;

    @NotNull(message = "title is mandatory")
    @NotEmpty(message = "title is mandatory")
    private String title;

    @NotNull(message = "authorName is mandatory")
    @NotEmpty(message = "authorName is mandatory")
    private String authorName;

    @NotNull(message = "isbn is mandatory")
    @NotEmpty(message = "isbn is mandatory")
    private String isbn;

    @NotNull(message = "synopsis is mandatory")
    @NotEmpty(message = "synopsis is mandatory")
    private String synopsis;

    private boolean shareable;
}

/*
* If the id is null means this request for the creation the book, or if the
* id in not null then we are update request
* */
