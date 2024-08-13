package com.bigPicture.backend.payload;

import com.bigPicture.backend.domain.Page;
import com.bigPicture.backend.payload.request.BookCreateRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PageDto {

    private String image;
    private String contents;
    private Long pageNumber;

    @Builder
    public PageDto(String image, String contents, Long pageNumber) {
        this.image = image;
        this.contents = contents;
        this.pageNumber = pageNumber;
    }

    public static Page toEntity(Page page) {
        return Page.builder()
                .image(page.getImage())
                .contents(page.getContents())
                .pageNumber(page.getPageNumber())
                .build();
    }

    public static PageDto of(Page page) {
        return PageDto.builder()
                .image(page.getImage())
                .contents(page.getContents())
                .pageNumber(page.getPageNumber())
                .build();
    }


}
