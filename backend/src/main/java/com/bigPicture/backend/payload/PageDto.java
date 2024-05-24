package com.bigPicture.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PageDto {

    private String image;
    private String content;
    private Long pageNumber;

}
