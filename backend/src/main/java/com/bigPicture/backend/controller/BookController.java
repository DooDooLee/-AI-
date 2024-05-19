package com.bigPicture.backend.controller;

import com.bigPicture.backend.payload.request.BookCreateRequest;
import com.bigPicture.backend.security.CurrentUser;
import com.bigPicture.backend.security.UserPrincipal;
import com.bigPicture.backend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class BookController {

    private final BookService bookService;

    //책 등록
    @PostMapping("/book/create")
    public ResponseEntity<?> createProduct(@CurrentUser UserPrincipal userPrincipal, //User 와 요청 DTO 를 별개로 취급
                                           @RequestBody BookCreateRequest request) {
        bookService.save(userPrincipal, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
