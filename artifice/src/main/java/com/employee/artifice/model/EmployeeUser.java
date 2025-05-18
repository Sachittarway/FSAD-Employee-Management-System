package com.employee.artifice.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="employeeuser")
public class EmployeeUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    Long id;


    @Column(name="email",unique = true)
    String email;


    @Column(name="password")
    String password;


    @Enumerated(EnumType.STRING)
    Role role;

    public enum Role {
        USER, MANAGER, ADMIN
    }


}
