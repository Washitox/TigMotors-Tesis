package com.tesis.tigmotors.Request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Username cannot be blank")
    @Size(min = 5, max = 20, message = "Username must be between 5 and 20 characters")
    @Pattern(regexp = "^[a-zA-Z0-9._-]+$", message = "Username can only contain letters, numbers, '.', '_', and '-'")
    String username;

    @NotBlank(message = "Password cannot be blank")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
            message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )

    @Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters long")
    @Column(nullable = false)
    private String password;

    @NotBlank(message = "First name cannot be blank")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @Pattern(regexp = "^[A-Za-zÀ-ÿ]+(\\s[A-Za-zÀ-ÿ]+)*$", message = "First name can only contain letters and single spaces between words")
    String firstname;

    @NotBlank(message = "Last name cannot be blank")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    @Pattern(regexp = "^[A-Za-zÀ-ÿ]+(\\s[A-Za-zÀ-ÿ]+)*$", message = "Last name can only contain letters and single spaces between words")
    String lastname;


    @NotBlank(message = "Email cannot be blank")
    @Pattern(
            regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$",
            message = "Invalid email format"
    )
    @NotBlank(message = "Country cannot be blank")
    String email;

    @NotBlank(message = "Country cannot be blank")
    String country;

    @Pattern(
            regexp = "^\\+593\\d{9}$",
            message = "Phone number must start with +593 and be followed by exactly 9 digits"
    )
    String phoneNumber;
}
