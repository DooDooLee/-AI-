package com.bigPicture.backend.payload.response;

import com.nimbusds.jose.shaded.gson.JsonArray;
import com.nimbusds.jose.shaded.gson.JsonObject;
import com.nimbusds.jose.shaded.gson.JsonParser;
import lombok.Getter;

@Getter
public class ImageResponse {
    private String responseString;
    private String imageUrl;
    private Integer seed;

    public ImageResponse(String responseString) {
        this.responseString = responseString;
        extractImageInfo();
    }

    private void extractImageInfo() {
        JsonParser parser = new JsonParser();
        JsonObject jsonResponse = parser.parse(responseString).getAsJsonObject();

        if (jsonResponse.has("output")) {
            JsonArray outputArray = jsonResponse.getAsJsonArray("output");
            if (outputArray.size() > 0) {
                imageUrl = outputArray.get(0).getAsString();
            }
        }

        if (jsonResponse.has("meta")) {
            JsonObject meta = jsonResponse.getAsJsonObject("meta");
            if (meta.has("seed")) {
                seed = meta.get("seed").getAsInt();
            }
        }
    }


}