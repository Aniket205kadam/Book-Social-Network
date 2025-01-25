package dev.aniketkadam.book.user;

import dev.aniketkadam.book.book.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("users")
@Tag(name = "User")
public class UserController {
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final BookMapper mapper;

    public UserController(BookRepository bookRepository, UserRepository userRepository, BookMapper mapper) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    @PostMapping("/wish-list/{book-id}")
    public ResponseEntity<String> addBookToWishlist(
            @PathVariable("book-id") String bookId,
            Authentication connectedUser
    ) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("The book with id: " + bookId + " is not found!"));
        User user = (User) connectedUser.getPrincipal();
        return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(addBookToWishList(user, book)
                );
    }

    @GetMapping("/wish-list")
    public ResponseEntity<List<WishedBookResponse>> getWishlistBooks(Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        List<WishedBookResponse> bookResponses = new ArrayList<>();
        user.getWishList()
                .forEach(book -> {
                    bookResponses.add(mapper.toWishedBookResponse(book));
                });
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(bookResponses);
    }

    @PatchMapping("/books/wish-list/{book-id}")
    public ResponseEntity<String> changeWishedStatus(
            @PathVariable("book-id") String bookId,
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("The book with id: " + bookId + " is not found!"));
        boolean status = user
                .getWishList()
                .stream()
                .anyMatch(wishedBook -> {
                     return wishedBook.getId().equals(bookId);
                });
        if (status) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(removeBookFromWishList(user, book));
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(addBookToWishList(user, book));
    }

    private String addBookToWishList(User user, Book book) {
        Set<Book> wishList =  user.getWishList();
        wishList.add(book);
        user.setWishList(wishList);
        Set<User> waitingUsers = book.getWaitingUsers();
        waitingUsers.add(user);
        userRepository.save(user);
        return bookRepository.save(book).getId();
    }

    private String removeBookFromWishList(User user, Book book) {
        Set<Book> books = user
                .getWishList()
                .stream()
                .filter(wishedBook -> !wishedBook.getId().equals(book.getId()))
                .collect(Collectors.toSet());
        Set<User> users = book
                .getWaitingUsers()
                .stream()
                .filter(waitingUser -> !waitingUser.getId().equals(user.getId()))
                .collect(Collectors.toSet());
        user.setWishList(books);
        book.setWaitingUsers(users);
        userRepository.save(user);
        return bookRepository.save(book).getId();
    }
}
