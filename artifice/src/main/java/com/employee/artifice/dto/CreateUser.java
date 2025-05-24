package com.employee.artifice.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateUser {

    private String name;
    private String email;
    private String password;
    private String role;

    public CreateUser() {
    }

    public CreateUser(String name, String email, String password, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
