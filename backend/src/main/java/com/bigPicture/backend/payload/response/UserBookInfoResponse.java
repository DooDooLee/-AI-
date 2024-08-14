package com.bigPicture.backend.payload.response;

import com.bigPicture.backend.domain.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class UserBookInfoResponse {

    //목록 보기용임으로 페이지는 응답X
    private Long userId;
    private String userName;
    private String userEmail;
    private Long bookId;
    private String title;
    private String cover;
    private Long bookLike;
    private String createdAt;

    @Builder
    public UserBookInfoResponse(Long userId, String userName, String userEmail, Long bookId, String title, String cover, Long bookLike, String createdAt) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.bookId = bookId;
        this.title = title;
        this.cover = cover;
        this.bookLike = bookLike;
        this.createdAt = createdAt;
    }

    public static UserBookInfoResponse of(Book book) {
        return UserBookInfoResponse.builder()
                .userId(book.getUser().getId())
                .userName(book.getUser().getName())
                .userEmail(book.getUser().getEmail())
                .bookId(book.getId())
                .title(book.getTitle())
                .cover(book.getCover())
                .bookLike(book.getBookLike())
                .createdAt(book.getCreatedAt().toString())
                .build();
    }
}