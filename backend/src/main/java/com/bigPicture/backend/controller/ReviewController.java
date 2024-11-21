package com.bigPicture.backend.controller;

import com.bigPicture.backend.payload.request.BookCreateRequest;
import com.bigPicture.backend.payload.request.ReviewCreateRequest;
import com.bigPicture.backend.security.CurrentUser;
import com.bigPicture.backend.security.UserPrincipal;
import com.bigPicture.backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ReviewController {

    private final ReviewService reviewService;
    //리뷰 등록
    @PostMapping("/book/{bookId}/review")
    public ResponseEntity<?> createReview(@CurrentUser UserPrincipal userPrincipal,
                                        @RequestBody ReviewCreateRequest request,
                                        @PathVariable Long bookId) {
        reviewService.save(userPrincipal,request, bookId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //리뷰 삭제
    @DeleteMapping("/review/{reviewId}")
    public ResponseEntity<?> deleteReview(@CurrentUser UserPrincipal userPrincipal,
                                        @PathVariable Long reviewId) {
        boolean isDeleted = reviewService.deleteReview(userPrincipal, reviewId);
        if (isDeleted) {
            return ResponseEntity.ok("서평이 삭제되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("삭제할 권한이 없습니다.");
        }
    }


}
