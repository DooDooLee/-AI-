package com.bigPicture.backend.payload;

import com.bigPicture.backend.domain.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ReviewDto {
    private String userName;
    private String contents;
    private String createdAt;

    public static ReviewDto of(Review review) {
        return ReviewDto.builder()
                .contents(review.getContents())
                .userName(review.getUser().getName())
                .createdAt(review.getCreatedAt().toString())
                .build();
    }

}
