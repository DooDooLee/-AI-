package com.bigPicture.backend.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@Getter
@PropertySource("classpath:application.properties")
public class ApiKeyConfig {

    @Value("${chatgpt.api.key}")
    private String chatGptApiKey;

    @Value("${stable.diffusion.api.key}")
    private String stableDiffusionApiKey;

}
