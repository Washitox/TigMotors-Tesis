package com.tesis.tigmotors.service;

import com.tesis.tigmotors.models.User;
import com.tesis.tigmotors.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class PasswordResetService {
    private static final Logger log = LoggerFactory.getLogger(PasswordResetService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final Map<String, String> resetTokens = new HashMap<>();

    @Autowired
    public PasswordResetService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public String sendResetToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ese correo"));

        String token = UUID.randomUUID().toString().substring(0, 6); // Genera un código de 6 caracteres
        resetTokens.put(token, email);

        emailService.sendEmail(email, "Código de recuperación de contraseña", "Su código de verificación es: " + token);

        return "Código de recuperación enviado al correo";
    }

    public String resetPassword(String token, String newPassword) {
        String email = resetTokens.get(token);

        if (email == null) {
            log.error("Token inválido o caducado: {}", token);
            throw new RuntimeException("Token inválido o caducado");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        resetTokens.remove(token); // Remover token una vez utilizado

        log.info("Contraseña actualizada correctamente para el usuario: {}", email);
        return "Contraseña actualizada correctamente";
    }

    public boolean isTokenValid(String token) {
        return resetTokens.containsKey(token);
    }
}