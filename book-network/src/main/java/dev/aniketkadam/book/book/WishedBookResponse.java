package dev.aniketkadam.book.book;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishedBookResponse {
    private String id;
    private String title;
    private String authorName;
    private boolean available;
}
