package com.bigPicture.backend.service;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.domain.Page;
import com.bigPicture.backend.domain.User;
import com.bigPicture.backend.domain.Wish;
import com.bigPicture.backend.exception.ResourceNotFoundException;
import com.bigPicture.backend.payload.PageDto;
import com.bigPicture.backend.payload.request.BookCreateRequest;
import com.bigPicture.backend.payload.response.*;
import com.bigPicture.backend.repository.BookRepository;
import com.bigPicture.backend.repository.UserRepository;
import com.bigPicture.backend.repository.WishRepository;
import com.bigPicture.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final WishRepository wishRepository;

    @Transactional
    public void save(UserPrincipal userPrincipal, BookCreateRequest request) {

        //요청토큰에 해당하는 user 를 꺼내옴
        User user = userRepository.findById(userPrincipal.getId()).get();

        // BookCreateRequest 의 toEntity 메서드를 이용하여 엔티티를 생성
        Book book = request.toEntity(user);

        // 양방향 연관관계 데이터 일관성 유지
        book.getPages().forEach(page -> page.updateBook(book));

        bookRepository.save(book);
    }

    public BookDetailResponse getBookDetails(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
        return BookDetailResponse.of(book);
    }

    // 페이지네이션된 책 리스트 가져오기
    public List<BookInfoResponse> getRecentPaginatedBooks(int page, int size) {
        int offset = (page - 1) * size;
        List<Book> books = bookRepository.findAllByOrderByIdDesc();
        return books.stream()
                .skip(offset)
                .limit(size)
                .map(BookInfoResponse::of)
                .collect(Collectors.toList());
    }

    public List<BookInfoResponse> getOldPaginatedBooks(int page, int size) {
        int offset = (page - 1) * size;
        List<Book> books = bookRepository.findAllByOrderByIdAsc();
        return books.stream()
                .skip(offset)
                .limit(size)
                .map(BookInfoResponse::of)
                .collect(Collectors.toList());
    }

    @Transactional
    public boolean deleteBookById(Long bookId, Long userId) {
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            if (book.getUser().getId().equals(userId)) {
                bookRepository.delete(book);
                return true;
            }
        }
        return false;
    }

    public List<BookInfoResponse> searchAndPaginateBooks(String name, int page, int size) {
        int offset = (page - 1) * size;
        List<Book> books = bookRepository.findBooksByNameContainingIgnoreCaseOrderByIdAsc(name);
        List<BookInfoResponse> bookInfoResponses = books.stream()
                .skip(offset)
                .limit(size)
                .map(BookInfoResponse::of)
                .collect(Collectors.toList());
        return bookInfoResponses;
    }

    @Transactional
    public void likeBook(Long bookId, UserPrincipal currentUser) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Wish wish = wishRepository.findByBookAndUser(book, user)
                .orElse(Wish.builder()
                            .book(book)
                            .user(user)
                            .build());

        // wish 엔티티의 liked 가 1인지 0인지 여부에 따라서 book 엔티티의 like 를 올리고 내림
        if (wish.getLiked() == 0) {
            wish.updateLiked(1);
            book.increaseLiked();
        } else {
            wish.updateLiked(0);
            book.decreaseLiked();
        }

        wishRepository.save(wish);
        bookRepository.save(book);
    }
}