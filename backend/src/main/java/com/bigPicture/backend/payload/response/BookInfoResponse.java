package com.bigPicture.backend.payload.response;

import com.bigPicture.backend.domain.Book;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BookInfoResponse {

    //목록 보기용임으로 페이지는 응답X
    private String email;
    private Long bookId;
    private String title;
    private String cover;
    private Long bookLike;
    private String createdAt;

    public static BookInfoResponse of(Book book) {
        return new BookInfoResponse(
                book.getUser().getEmail(),
                book.getId(),
                book.getTitle(),
                book.getCover(),
                book.getBookLike(),
                book.getCreatedAt().toString()
        );
    }

}