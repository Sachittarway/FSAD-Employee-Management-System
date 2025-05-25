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
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private EmployeeUser user;

    String employeeName;

    String employeeNumber;

    // @Column(name = "projectCode")
    @ManyToOne
    @JoinColumn(name = "project_code_id", referencedColumnName = "id")
    private Project project;
    // String projectCode;

    String currentLocation;

    // @Column(name = "currentIbu")
    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department department;
    // String currentIbu;

    String permanentAddress;

    String localAddress;

    String passportNo;

    LocalDate passportIssueDate;

    LocalDate passportExpiryDate;

    String passportOffice;

    String phoneNumber;

    int yearsOfExperience;

}
