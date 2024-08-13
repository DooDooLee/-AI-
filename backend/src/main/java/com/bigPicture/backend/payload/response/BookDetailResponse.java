package com.bigPicture.backend.payload.response;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.payload.PageDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.validation.beanvalidation.SpringValidatorAdapter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
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

    @Builder
    public BookDetailResponse(Long userId, String userName, String userEmail, Long bookId, String title, String cover, Long bookLike, String createdAt, List<PageDto> pages) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.bookId = bookId;
        this.title = title;
        this.cover = cover;
        this.bookLike = bookLike;
        this.createdAt = createdAt;
        this.pages = pages;
    }

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
                .build();
    }

}
