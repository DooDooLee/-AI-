package com.bigPicture.backend.payload.response;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.payload.PageDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.validation.beanvalidation.SpringValidatorAdapter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
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

    public static BookDetailResponse of(Book book) {
        return new BookDetailResponse(
                book.getUser().getId(),
                book.getUser().getName(),
                book.getUser().getEmail(),
                book.getId(),
                book.getTitle(),
                book.getCover(),
                book.getBookLike(),
                book.getCreatedAt().toString(),
                book.getPages().stream()
                        .map(page -> new PageDto(page.getImage(), page.getContents(), page.getPageNumber()))
                        .collect(Collectors.toList())
        );
    }
}
