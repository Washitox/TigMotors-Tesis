package com.tesis.tigmotors.Config;

import com.tesis.tigmotors.Jwt.JwtAuthenticationFilter;
import com.tesis.tigmotors.security.CustomAccessDeniedHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authRequest -> authRequest
                        // Permitir acceso sin autenticación a los endpoints iniciales de registro y login
                        .requestMatchers("/user/register", "/user/login").permitAll()
                        .requestMatchers("admin/login").permitAll()
                        // Protección basada en roles para otros endpoints
                        .requestMatchers("/admin/**").hasAuthority("ADMIN")                       // Solo ADMIN puede acceder a /admin/**
                        .requestMatchers("/user/**").hasAuthority("USER")                         // Solo USER puede acceder a /user/**
                        .requestMatchers("/service-staff/**").hasAuthority("PERSONAL_CENTRO_DE_SERVICIOS") // Solo Personal de Servicios puede acceder a /service-staff/**
                        .anyRequest().authenticated())                                            // Requiere autenticación para cualquier otra solicitud
                .sessionManagement(sessionManager -> sessionManager
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exception -> exception
                        .accessDeniedHandler(customAccessDeniedHandler))
                .build();
    }
}
