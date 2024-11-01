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
@AllArgsConstructor
@Builder
public class BookInfoResponse {

    //목록 보기용임으로 페이지는 응답X
    private Long userId;
    private String userName;
    private String userEmail;
    private Long bookId;
    private String title;
    private String cover;
    private Long bookLike;
    private String createdAt;

    public static BookInfoResponse of(Book book) {
        return BookInfoResponse.builder()
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