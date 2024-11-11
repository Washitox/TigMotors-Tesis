package com.tesis.tigmotors.service;

import com.tesis.tigmotors.models.User;
import com.tesis.tigmotors.repository.UserRepository;
import com.tesis.tigmotors.Request.response.UserInfoResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserInfoService {

    private final UserRepository userRepository;

    // Metodo para obtener la información del usuario autenticado
    public UserInfoResponse getUserInfo(Authentication authentication) {
        // Obtener el username del contexto de autenticación
        String username = authentication.getName();

        // Cargar el usuario desde la base de datos
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("models not found"));

        // Retornar una instancia de UserInfoResponse con los datos específicos
        return new UserInfoResponse(
                user.getRole().name(),
                user.getUsername(),
                user.getFirstname(),
                user.getLastname(),
                user.getCountry(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }
}
