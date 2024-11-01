package com.bigPicture.backend.controller;

import com.bigPicture.backend.payload.request.BookCreateRequest;
import com.bigPicture.backend.payload.request.ReviewCreateRequest;
import com.bigPicture.backend.security.CurrentUser;
import com.bigPicture.backend.security.UserPrincipal;
import com.bigPicture.backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ReviewController {

    private final ReviewService reviewService;
    //책 등록
    @PostMapping("/book/{bookId}/review")
    public ResponseEntity<?> createBook(@CurrentUser UserPrincipal userPrincipal,
                                        @RequestBody ReviewCreateRequest request,
                                        @PathVariable Long bookId) {
        reviewService.save(userPrincipal,request, bookId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
