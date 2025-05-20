package com.employee.artifice.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;


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

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private EmployeeDetails employeeDetails;
}
