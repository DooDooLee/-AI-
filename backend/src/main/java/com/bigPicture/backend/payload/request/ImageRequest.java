package com.bigPicture.backend.payload.request;

import lombok.Getter;

@Getter
public class ImageRequest {
    private String prompt;
    private Long seed;

}