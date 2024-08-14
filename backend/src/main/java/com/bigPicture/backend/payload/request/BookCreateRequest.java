package com.bigPicture.backend.payload.request;

import com.bigPicture.backend.domain.Book;
import com.bigPicture.backend.domain.Page;
import com.bigPicture.backend.domain.User;
import com.bigPicture.backend.payload.PageDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class BookCreateRequest {

    private String title;
    private String cover;
    private Long bookLike;
    private List<PageDto> pages;

    @Builder
    public BookCreateRequest(String title, String cover, Long bookLike, List<PageDto> pages) {
        this.title = title;
        this.cover = cover;
        this.bookLike = bookLike;
        this.pages = pages;
    }

    // Book 엔티티 생성자 역할
    public Book toEntity(User user) {
        List<Page> pageEntities = pages.stream()
                .map(PageDto::toEntity)
                .collect(Collectors.toList());

        // 클래스 내에 필드들이 있으니까 .title(request.getTitle()) 할 필요 없음
        return Book.builder()
                .user(user)
                .title(title)
                .cover(cover)
                .bookLike(bookLike)
                .pages(pageEntities)
                .build();
    }

}
