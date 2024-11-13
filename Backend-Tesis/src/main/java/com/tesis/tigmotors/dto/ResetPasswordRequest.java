package com.tesis.tigmotors.dto;

import lombok.Data;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;


@Data
public class ResetPasswordRequest {
    @NotBlank(message = "El token no puede estar vacío")
    private String token;

    @NotBlank(message = "La nueva contraseña no puede estar vacía")
    private String newPassword;
}
