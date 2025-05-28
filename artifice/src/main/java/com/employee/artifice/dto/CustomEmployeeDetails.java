package com.employee.artifice.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

    public CustomEmployeeDetails(String currentLocation1, String permanentAddress1, String localAddress1, String passportNo1, String phoneNumber1, int yearsOfExperience1, LocalDate passportIssueDate1, LocalDate passportExpiryDate1, String passportOffice1, Long id, Long id1, String departmentName1) {
    }
    public CustomEmployeeDetails(String currentLocation, String permanentAddress, String localAddress, String passportNo, String phoneNumber, int yearsOfExperience, LocalDate passportIssueDate, LocalDate passportExpiryDate, String passportOffice, Long departmentId, Long projectId, String departmentName, String projectCode, String userEmail) {
        this.currentLocation = currentLocation;
        this.permanentAddress = permanentAddress;
        this.localAddress = localAddress;
        this.passportNo = passportNo;
        this.phoneNumber = phoneNumber;
        this.yearsOfExperience = yearsOfExperience;
        this.passportIssueDate = passportIssueDate;
        this.passportExpiryDate = passportExpiryDate;
        this.passportOffice = passportOffice;
        this.departmentId = departmentId;
        this.projectId = projectId;
        this.departmentName = departmentName;
        this.projectCode = projectCode;
        this.userEmail = userEmail;
    }
}
