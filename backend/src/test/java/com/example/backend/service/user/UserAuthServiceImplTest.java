package com.example.backend.service.user;

import com.example.backend.entity.User;
import com.example.backend.model.auth.RegistrationStatus;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserAuthServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private UserAuthServiceImpl userAuthService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Тест успешной регистрации нового пользователя.
     */
    @Test
    void registerUser_Success() {
        // Arrange
        User newUser = new User("testuser", "password123", "testuser@example.com");

        when(userRepository.findByUsername("testuser"))
                .thenReturn(Optional.empty());
        when(userRepository.findByEmail("testuser@example.com"))
                .thenReturn(Optional.empty());
        when(passwordEncoder.encode("password123")).thenReturn("hashedPassword123");
        when(userRepository.save(any(User.class))).thenReturn(newUser);

        // Act
        CompletableFuture<RegistrationStatus> future = userAuthService.registerUser(newUser);
        RegistrationStatus status = future.join();

        // Assert
        assertTrue(status.isRegistered());
        assertEquals("User registration is successful", status.getMessage());

        verify(userRepository, times(1)).findByUsername("testuser");
        verify(userRepository, times(1)).findByEmail("testuser@example.com");
        verify(passwordEncoder, times(1)).encode("password123");
        verify(userRepository, times(1)).save(any(User.class));
    }

    /**
     * Тест регистрации пользователя с уже существующим именем пользователя.
     */
    @Test
    void registerUser_UsernameAlreadyTaken() {
        // Arrange
        User existingUser = new User("testuser", "hashedPassword123", "existing@example.com");
        User newUser = new User("testuser", "password123", "newuser@example.com");

        when(userRepository.findByUsername("testuser"))
                .thenReturn(Optional.of(existingUser));
        when(userRepository.findByEmail("newuser@example.com"))
                .thenReturn(Optional.empty());

        // Act
        CompletableFuture<RegistrationStatus> future = userAuthService.registerUser(newUser);
        RegistrationStatus status = future.join();

        // Assert
        assertFalse(status.isRegistered());
        assertEquals("Username is already taken.", status.getMessage());

        verify(userRepository, times(1)).findByUsername("testuser");
        verify(userRepository, times(1)).findByEmail("newuser@example.com");
        verify(passwordEncoder, never()).encode(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    /**
     * Тест регистрации пользователя с уже существующим email.
     */
    @Test
    void registerUser_EmailAlreadyRegistered() {
        // Arrange
        User existingUser = new User("existinguser", "hashedPassword123", "testuser@example.com");
        User newUser = new User("newuser", "password123", "testuser@example.com");

        when(userRepository.findByUsername("newuser"))
                .thenReturn(Optional.empty());
        when(userRepository.findByEmail("testuser@example.com"))
                .thenReturn(Optional.of(existingUser));

        // Act
        CompletableFuture<RegistrationStatus> future = userAuthService.registerUser(newUser);
        RegistrationStatus status = future.join();

        // Assert
        assertFalse(status.isRegistered());
        assertEquals("User with this email is already registered.", status.getMessage());

        verify(userRepository, times(1)).findByUsername("newuser");
        verify(userRepository, times(1)).findByEmail("testuser@example.com");
        verify(passwordEncoder, never()).encode(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    /**
     * Тест аутентификации существующего пользователя с корректным паролем.
     */
    @Test
    void authUser_Success() {
        // Arrange
        User existingUser = new User("testuser", "hashedPassword123", "testuser@example.com");
        existingUser.setPassword("hashedPassword123");

        when(userRepository.findByUsername("testuser"))
                .thenReturn(Optional.of(existingUser));
        when(passwordEncoder.matches("password123", "hashedPassword123"))
                .thenReturn(true);
        when(jwtUtil.generateToken("testuser"))
                .thenReturn("jwtToken123");

        // Act
        CompletableFuture<String> future = userAuthService.authUser(newUser("testuser", "password123"));
        String token = future.join();

        // Assert
        assertNotNull(token);
        assertEquals("jwtToken123", token);

        verify(userRepository, times(1)).findByUsername("testuser");
        verify(passwordEncoder, times(1)).matches("password123", "hashedPassword123");
        verify(jwtUtil, times(1)).generateToken("testuser");
    }

    /**
     * Тест аутентификации несуществующего пользователя.
     */
    @Test
    void authUser_UserNotFound() {
        // Arrange
        when(userRepository.findByUsername("unknownuser"))
                .thenReturn(Optional.empty());

        // Act
        CompletableFuture<String> future = userAuthService.authUser(newUser("unknownuser", "password123"));
        String token = future.join();

        // Assert
        assertNull(token);

        verify(userRepository, times(1)).findByUsername("unknownuser");
        verify(passwordEncoder, never()).matches(anyString(), anyString());
        verify(jwtUtil, never()).generateToken(anyString());
    }

    /**
     * Тест аутентификации пользователя с неверным паролем.
     */
    @Test
    void authUser_InvalidPassword() {
        // Arrange
        User existingUser = new User("testuser", "hashedPassword123", "testuser@example.com");
        existingUser.setPassword("hashedPassword123");

        when(userRepository.findByUsername("testuser"))
                .thenReturn(Optional.of(existingUser));
        when(passwordEncoder.matches("wrongpassword", "hashedPassword123"))
                .thenReturn(false);

        // Act
        CompletableFuture<String> future = userAuthService.authUser(newUser("testuser", "wrongpassword"));
        String token = future.join();

        // Assert
        assertNull(token);

        verify(userRepository, times(1)).findByUsername("testuser");
        verify(passwordEncoder, times(1)).matches("wrongpassword", "hashedPassword123");
        verify(jwtUtil, never()).generateToken(anyString());
    }

    /**
     * Вспомогательный метод для создания объекта User.
     *
     * @param username имя пользователя
     * @param password пароль пользователя
     * @return объект User
     */
    private User newUser(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(username + "@example.com");
        return user;
    }
}
