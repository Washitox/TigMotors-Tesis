package com.tesis.tigmotors.Request.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoResponse {
    private String username;
    private String role;
    private String firstname;
    private String lastname;
    private String country;
    private String email;
    private String phoneNumber;
}
