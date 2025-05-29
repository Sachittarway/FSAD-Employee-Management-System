package com.employee.artifice.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="resourceRequest")
public class ResourceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    Long id;

    @Column(name="item")
    String item;

    @Column(name="employeeEmail")
    String employeeEmail;

    @Column(name="managerEmail")
    String managerEmail;

    @Column(name="message")
    String message;

    @Column(name="action")
    Boolean accept;
}
