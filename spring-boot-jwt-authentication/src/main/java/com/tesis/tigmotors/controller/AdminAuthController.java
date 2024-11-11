package com.tesis.tigmotors.controller;

import com.tesis.tigmotors.Request.LoginRequest;
import com.tesis.tigmotors.Request.response.AuthResponse;
import com.tesis.tigmotors.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AuthService authService;

    // Endpoint de inicio de sesión para administradores
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> adminLogin(@Valid @RequestBody LoginRequest request) {
        return authService.loginAsAdmin(request);
    }

}
