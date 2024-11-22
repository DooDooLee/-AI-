package com.bigPicture.backend.controller;

import com.bigPicture.backend.payload.request.BookCreateRequest;
import com.bigPicture.backend.payload.request.BookUpdateRequest;
import com.bigPicture.backend.payload.response.*;
import com.bigPicture.backend.security.CurrentUser;
import com.bigPicture.backend.security.UserPrincipal;
import com.bigPicture.backend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class BookController {

    private final BookService bookService;

    //책 등록
    @PostMapping("/book/create")
    public ResponseEntity<?> createBook(@CurrentUser UserPrincipal userPrincipal, //User 와 요청 DTO 를 별개로 취급
                                        @RequestBody BookCreateRequest request) {
        bookService.save(userPrincipal, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //책 열람
    @GetMapping("/book/{bookId}")
    public ResponseEntity<?> getBookDetails(@PathVariable Long bookId) {
        BookDetailResponse response = bookService.getBookDetails(bookId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // ex) page=1 을보내면  최신순으로 첫번째 에서 20번째까지 책 목록을 리스트로 반환함 , page=2 는 21번째부터 20개
    @GetMapping("/book/list/recent")
    public ResponseEntity<?> findRecentUserBooks(@RequestParam int page) {
        int size = 20; // 페이지 당 책의 수
        List<BookInfoResponse> bookInfoResponses = bookService.getRecentPaginatedBooks(page, size);
//        BooksResponse response = new BooksResponse(bookInfoResponses);
        return new ResponseEntity<>(bookInfoResponses, HttpStatus.OK);
    }

    @GetMapping("/book/list/old")
    public ResponseEntity<?> findOldUserBooks(@RequestParam int page) {
        int size = 20; // 페이지 당 책의 수
        List<BookInfoResponse> bookInfoResponses = bookService.getOldPaginatedBooks(page, size);
//        BooksResponse response = new BooksResponse(bookInfoResponses);
        return new ResponseEntity<>(bookInfoResponses, HttpStatus.OK);
    }


    @GetMapping("/book/list/like")
    public ResponseEntity<?> findLikeUserBooks(@RequestParam int page) {
        int size = 20; // 페이지 당 책의 수
        List<BookInfoResponse> bookInfoResponses = bookService.getLikePaginatedBooks(page, size);
//        BooksResponse response = new BooksResponse(bookInfoResponses);
        return new ResponseEntity<>(bookInfoResponses, HttpStatus.OK);
    }


    @GetMapping("/book/search")
    public ResponseEntity<?> searchBooks(@RequestParam String bookName, @RequestParam int page) {

        int size = 20; // 페이지 당 책의 수
        List<BookInfoResponse> bookInfoResponses = bookService.searchAndPaginateBooks(bookName, page, size);
        return new ResponseEntity<>(bookInfoResponses, HttpStatus.OK);
    }


    @GetMapping("/book/update/{bookId}")
    public ResponseEntity<?> getBookDetailsForUpdate(@PathVariable Long bookId, @CurrentUser UserPrincipal userPrincipal) {
        try {
            // 책 상세 정보를 가져오는 서비스 호출
            BookDetailResponse response = bookService.getBookDetailsForUpdate(bookId, userPrincipal);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException ex) {
            // 유효하지 않은 유저 ID
            return ResponseEntity.status(403).body("수정 권한이 없습니다.");
        }
    }

    @PutMapping("/book/update/{bookId}")
    public ResponseEntity<?> updateBook(@PathVariable Long bookId, @CurrentUser UserPrincipal userPrincipal, @RequestBody BookUpdateRequest request) {
        bookService.update(bookId, userPrincipal, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @DeleteMapping("/book/delete/{bookId}")
    public ResponseEntity<String> deleteBook(@PathVariable Long bookId, @CurrentUser UserPrincipal userPrincipal) {
        Long userId = userPrincipal.getId();
        boolean isDeleted = bookService.deleteBookById(bookId, userId);
        if (isDeleted) {
            return ResponseEntity.ok("Book deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to delete this book");
        }
    }

    // 좋아요 기능
    @PostMapping("/book/{bookId}/like")
    public ResponseEntity<String> likeBook(@PathVariable Long bookId, @CurrentUser UserPrincipal currentUser) {
        String message = bookService.likeBook(bookId, currentUser);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}