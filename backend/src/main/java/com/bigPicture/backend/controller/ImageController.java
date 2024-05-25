package com.bigPicture.backend.controller;


import com.bigPicture.backend.config.SendImage;
import com.bigPicture.backend.payload.request.ImageRequest;
import com.bigPicture.backend.payload.response.ImageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class ImageController {

    private final SendImage sendImage;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/image")
    public ImageResponse getImage(@RequestBody ImageRequest request) throws IOException {
        String responseString = sendImage.sendImageRequest(request.getPrompt(),request.getSeed());
        return new ImageResponse(responseString);
    }

}