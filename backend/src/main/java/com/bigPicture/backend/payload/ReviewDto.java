package com.bigPicture.backend.payload;

import com.bigPicture.backend.domain.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ReviewDto {
    private String contents;

    public static ReviewDto of(Review review) {
        return ReviewDto.builder()
                .contents(review.getContents())
                .build();
    }

}
