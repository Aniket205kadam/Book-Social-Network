package dev.aniketkadam.book.book;

import dev.aniketkadam.book.common.BaseEntity;
import dev.aniketkadam.book.feedback.Feedback;
import dev.aniketkadam.book.history.BookTransactionHistory;
import dev.aniketkadam.book.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "books")
public class Book extends BaseEntity {
    private String title;
    private String authorName;
    private String isbn; // book identifier
    private String synopsis;
    private String bookCover;
    private boolean archived;
    private boolean shareable;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "book", fetch = FetchType.EAGER)
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "book", fetch = FetchType.EAGER)
    private List<BookTransactionHistory> bookTransactionHistories;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<User> waitingUsers = new HashSet<>();

    @Transient
    public double getRate() {
        if (feedbacks == null || feedbacks.isEmpty()) {
            return 0.0;
        }
        double rate = this.feedbacks.stream()
                .mapToDouble(Feedback::getNote)
                .average()
                .orElse(0.0);
        return Math.round(rate * 10.0) / 10.0;
    }
}
