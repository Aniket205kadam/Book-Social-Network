package dev.aniketkadam.book.book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookRepository extends JpaRepository<Book, String>, JpaSpecificationExecutor<Book> {
    @Query("""
            SELECT book
            FROM Book book
            WHERE book.archived = false
            AND book.shareable = true
            AND book.owner.id != :userId
            """)
    Page<Book> findALlDisplayableBooks(Pageable pageable, @Param("userId") String userId);

    @Query("""
            SELECT book FROM Book book
            WHERE book.archived = false
            AND book.shareable = true
            AND book.owner.id = :userId
            """)
    Page<Book> findAllOwnerAvailableBooks(Pageable pageable, @Param("userId") String userId);
}
