package com.bigPicture.backend.controller;

import com.bigPicture.backend.payload.request.BookCreateRequest;
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

    //메인페이지 책 목록 조회
    @GetMapping("/book/list")
    public ResponseEntity<?> findAllUserBooks() {
        List<BookInfoResponse> books = bookService.getAllBooks();
        BooksResponse response = new BooksResponse(books);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}