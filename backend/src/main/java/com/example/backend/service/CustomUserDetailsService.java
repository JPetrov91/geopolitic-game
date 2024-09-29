//package com.example.backend.service;
//
//import com.example.backend.entity.User;
//import com.example.backend.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.*;
//import org.springframework.stereotype.Service;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByUsername(username)
//                .exceptionally(exc -> {
//                    return new UsernameNotFoundException("User not found with username: " + username);
//                });
//
//        return org.springframework.security.core.userdetails.User.builder()
//                .username(user.getUsername())
//                .password(user.getPassword()) // Пароль должен быть зашифрован
//                .roles("USER") // Роли при необходимости
//                .build();
//    }
//}
