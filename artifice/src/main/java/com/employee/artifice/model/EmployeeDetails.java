package com.employee.artifice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private EmployeeUser user;

    String employeeName;

    String employeeNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @JsonIgnore
    private Project project;

    @OneToOne
    @JoinColumn(name = "manager_id", referencedColumnName = "id")
    private EmployeeUser manager;

    String currentLocation;

    String permanentAddress;

    String localAddress;

    String passportNo;

    LocalDate passportIssueDate;

    LocalDate passportExpiryDate;

    String passportOffice;

    String phoneNumber;

    String position;

    int yearsOfExperience;

}
