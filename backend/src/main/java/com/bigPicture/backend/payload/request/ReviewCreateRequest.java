package com.bigPicture.backend.payload.request;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.domain.Review;
import com.bigPicture.backend.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewCreateRequest {

    private String contents;


    // Dto -> Entity
    public Review toEntity(User user, Book book) {
        return Review.builder()
                .user(user)
                .book(book)
                .contents(contents)
                .build();

    }
}
