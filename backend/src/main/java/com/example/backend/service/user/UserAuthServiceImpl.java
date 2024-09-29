package com.example.backend.service.user;

import com.example.backend.entity.User;
import com.example.backend.model.auth.RegistrationStatus;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserAuthServiceImpl implements UserAuthService {

    private static final Logger logger = LoggerFactory.getLogger(UserAuthServiceImpl.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserAuthServiceImpl(UserRepository userRepository,
                               PasswordEncoder passwordEncoder,
                               JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    @Transactional
    public CompletableFuture<RegistrationStatus> registerUser(User user) {
        logger.info("Начало регистрации пользователя: {}", user.getUsername());

        // Запуск асинхронных проверок
        CompletableFuture<Optional<User>> usernameFuture = CompletableFuture.completedFuture(userRepository.findByUsername(user.getUsername()));
        CompletableFuture<Optional<User>> emailFuture = CompletableFuture.completedFuture(userRepository.findByEmail(user.getEmail()));

        // Компоновка результатов обеих проверок
        return usernameFuture.thenCombine(emailFuture, (existingUserByUsername, existingUserByEmail) -> {
            if (existingUserByUsername.isPresent()) {
                logger.warn("Имя пользователя '{}' уже занято.", user.getUsername());
                return new RegistrationStatus(false, "Username is already taken.");
            }

            if (existingUserByEmail.isPresent()) {
                logger.warn("Email '{}' уже зарегистрирован.", user.getEmail());
                return new RegistrationStatus(false, "User with this email is already registered.");
            }

            // Хеширование пароля
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            logger.debug("Пароль пользователя '{}' был успешно захеширован.", user.getUsername());

            // Сохранение пользователя в репозитории
            userRepository.save(user);
            logger.info("Пользователь '{}' успешно зарегистрирован.", user.getUsername());

            return new RegistrationStatus(true, "User registration is successful");
        }).exceptionally(ex -> {
            logger.error("Ошибка при регистрации пользователя '{}': {}", user.getUsername(), ex.getMessage());
            return new RegistrationStatus(false, "Registration failed due to an internal error.");
        });
    }

    @Override
    public CompletableFuture<String> authUser(User user) {
        logger.info("Попытка аутентификации пользователя: {}", user.getUsername());

        CompletableFuture<Optional<User>> authorizedUserFuture = CompletableFuture.completedFuture(userRepository.findByUsername(user.getUsername()));
        return authorizedUserFuture
                .thenApply(optionalUser -> {
                    String jwtToken = null;
                    if (optionalUser.isPresent()) {
                        User foundUser = optionalUser.get();
                        boolean matches = passwordEncoder.matches(user.getPassword(), foundUser.getPassword());
                        if (matches) {
                            logger.info("Пользователь '{}' успешно аутентифицирован.", user.getUsername());
                            jwtToken = jwtUtil.generateToken(foundUser.getUsername());
                        } else {
                            logger.warn("Неверный пароль для пользователя '{}'.", user.getUsername());
                        }
                        return jwtToken;
                    } else {
                        logger.warn("Пользователь '{}' не найден.", user.getUsername());
                        return jwtToken;
                    }
                }).exceptionally(ex -> {
                    logger.error("Ошибка при аутентификации пользователя '{}': {}", user.getUsername(), ex.getMessage());
                    return null;
                });
    }
}
