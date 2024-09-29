package com.example.market_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Укажите пути, для которых разрешены CORS
                        .allowedOrigins("http://localhost:3000") // Разрешённые источники
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Разрешённые HTTP методы
                        .allowedHeaders("*") // Разрешённые заголовки
                        .allowCredentials(true); // Разрешить передачу куки и авторизационных заголовков
            }
        };
    }
}
