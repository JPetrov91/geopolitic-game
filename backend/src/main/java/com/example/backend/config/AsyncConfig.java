package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2); // Минимальное количество потоков
        executor.setMaxPoolSize(5);  // Максимальное количество потоков
        executor.setQueueCapacity(500); // Размер очереди задач
        executor.setThreadNamePrefix("Async-");
        executor.initialize();
        return executor;
    }
}
