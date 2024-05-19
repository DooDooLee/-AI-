package com.bigPicture.backend.payload.request;

import com.bigPicture.backend.payload.PageDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BookCreateRequest {

    private String title;
    private String cover;
    private Long BookLike;
    private List<PageDto> pages;


}
