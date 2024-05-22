package com.bigPicture.backend.config;

import lombok.RequiredArgsConstructor;
import okhttp3.*;
import com.google.gson.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class SendImage {

    private final ApiKeyConfig apiKeyConfig;

    private static final OkHttpClient client = new OkHttpClient();
    private static final Gson gson = new Gson();



    public String sendImageRequest(String prompt, Long seed) throws IOException {
        String translatedPrompt = translatePrompt(prompt);

        return sendToStableDiffusion(translatedPrompt, seed);
    }

    private String translatePrompt(String prompt) throws IOException {
        MediaType mediaType = MediaType.parse("application/json");
        JsonObject json = new JsonObject();
        json.addProperty("model", "gpt-3.5-turbo");
        JsonArray messages = new JsonArray();
        JsonObject systemMessage = new JsonObject();
        systemMessage.addProperty("role", "system");
        systemMessage.addProperty("content", "Translate the following Korean text to English.");
        messages.add(systemMessage);
        JsonObject userMessage = new JsonObject();
        userMessage.addProperty("role", "user");
        userMessage.addProperty("content", prompt);
        messages.add(userMessage);
        json.add("messages", messages);

        RequestBody body = RequestBody.create(json.toString(), mediaType);
        Request request = new Request.Builder()
                .url("https://api.openai.com/v1/chat/completions")
                .post(body)
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "Bearer " + apiKeyConfig.getChatGptApiKey())
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }
            JsonObject responseBody = gson.fromJson(response.body().string(), JsonObject.class);
            String translatedText = responseBody.getAsJsonArray("choices").get(0).getAsJsonObject().get("message").getAsJsonObject().get("content").getAsString();
            return translatedText.trim();
        }
    }

    private String sendToStableDiffusion(String prompt, Long seed) throws IOException {
        MediaType mediaType = MediaType.parse("application/json");
        JsonObject json = new JsonObject();
        json.addProperty("key", apiKeyConfig.getStableDiffusionApiKey());
        json.addProperty("prompt", prompt);
        json.addProperty("negative_prompt", "extra fingers, mutated hands, pixelated, blurry, poorly Rendered face, poorly drawn face, poor facial details, poorly drawn hands, poorly rendered hands, bad anatomy, fused fingers, extra digits, fewer digits, extra (arms / legs / limbs / hands)");
        json.addProperty("width", 720);
        json.addProperty("height", 1024);
        json.addProperty("samples", 1);
        json.addProperty("num_inference_steps", 51);
        json.addProperty("seed", seed);
        json.addProperty("guidance_scale", 7.5);
        json.addProperty("safety_checker", "yes");
        json.addProperty("multi_lingual", "no");
        json.addProperty("panorama", "yes");
        json.addProperty("self_attention", "yes");
        json.addProperty("upscale", 3);
        json.addProperty("embeddings_model", "no");
        json.addProperty("enhance_prompt", "no");
        json.add("webhook", JsonNull.INSTANCE);
        json.add("track_id", JsonNull.INSTANCE);

        // 로그 추가: 요청 JSON 출력
        System.out.println("Request JSON: " + json.toString());

        RequestBody body = RequestBody.create(json.toString(), mediaType);
        Request request = new Request.Builder()
                .url("https://stablediffusionapi.com/api/v3/text2img")
                .post(body)
                .addHeader("Content-Type", "application/json")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }
            // 로그 추가: 응답 JSON 출력
            String responseBody = response.body().string();
            System.out.println("Response JSON: " + responseBody);
            return responseBody;
        }
    }
}