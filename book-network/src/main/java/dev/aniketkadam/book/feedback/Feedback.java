package dev.aniketkadam.book.feedback;

import dev.aniketkadam.book.book.Book;
import dev.aniketkadam.book.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "feedbacks")
public class Feedback extends BaseEntity {
    private Double note;
    private String comment;

    //todo -> also add the username

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
}
