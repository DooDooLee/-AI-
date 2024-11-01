package com.bigPicture.backend.payload.response;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.payload.PageDto;
import com.bigPicture.backend.payload.ReviewDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.validation.beanvalidation.SpringValidatorAdapter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class BookDetailResponse {

    private Long userId;
    private String userName;
    private String userEmail;
    private Long bookId;
    private String title;
    private String cover;
    private Long bookLike;
    private String createdAt;
    private List<PageDto> pages;
    private List<ReviewDto> reviews;


    public static BookDetailResponse of(Book book) {
        return BookDetailResponse.builder()
                .userId(book.getUser().getId())
                .userName(book.getUser().getName())
                .userEmail(book.getUser().getEmail())
                .bookId(book.getId())
                .title(book.getTitle())
                .cover(book.getCover())
                .bookLike(book.getBookLike())
                .createdAt(book.getCreatedAt().toString())
                .pages(book.getPages().stream()
                        .map(PageDto::of)
                        .collect(Collectors.toList()))
                .reviews(book.getReviews().stream()
                        .map(ReviewDto::of)
                        .collect(Collectors.toList()))
                .build();
    }

}
