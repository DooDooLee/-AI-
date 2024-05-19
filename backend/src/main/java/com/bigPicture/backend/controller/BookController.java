package com.bigPicture.backend.controller;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.payload.request.BookCreateRequest;
import com.bigPicture.backend.payload.response.BookResponse;
import com.bigPicture.backend.security.CurrentUser;
import com.bigPicture.backend.security.UserPrincipal;
import com.bigPicture.backend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        BookResponse response = bookService.getBookDetails(bookId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}