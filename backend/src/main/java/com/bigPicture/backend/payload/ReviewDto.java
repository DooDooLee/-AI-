package com.bigPicture.backend.payload;

import com.bigPicture.backend.domain.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ReviewDto {
    private Long reviewId;
    private String userName;
    private String userEmail;
    private String contents;
    private String createdAt;

    public static ReviewDto of(Review review) {
        return ReviewDto.builder()
                .reviewId(review.getId())
                .contents(review.getContents())
                .userName(review.getUser().getName())
                .userEmail(review.getUser().getEmail())
                .createdAt(review.getCreatedAt().toString())
                .build();
    }

}
