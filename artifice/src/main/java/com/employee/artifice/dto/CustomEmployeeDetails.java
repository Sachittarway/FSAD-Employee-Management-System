package com.employee.artifice.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomEmployeeDetails {
    private String currentLocation;
    private String permanentAddress;
    private String localAddress;
    private String passportNo;
    private String phoneNumber;
    private int yearsOfExperience;
    private LocalDate passportIssueDate;
    private LocalDate passportExpiryDate;
    private String passportOffice;
    private Long departmentId;
    private Long projectId;
    private String departmentName;
    private String projectCode;
    private String userEmail;
    private Long managerId;
    private String managerName;
    private String employeeName;
    private Long employeeId;
    private String managerEmail;
}
