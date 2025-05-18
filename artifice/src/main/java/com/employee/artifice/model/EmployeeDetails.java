package com.employee.artifice.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="employeedetails")
public class EmployeeDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @OneToOne
    @JoinColumn(name = "id")
    EmployeeUser user;

    String employeeName;

    String employeeNumber;

    String projectCode;

    String currentLocation;

    String currentIbu;

    String permanentAddress;

    String localAddress;

    String passportNo;

    LocalDate passportIssueDate;

    LocalDate passportExpiryDate;

    String passportOffice;

    String phoneNumber;

    int yearsOfExperience;

}
