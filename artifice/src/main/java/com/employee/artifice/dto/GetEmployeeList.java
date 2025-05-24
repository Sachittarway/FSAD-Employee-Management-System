package com.employee.artifice.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GetEmployeeList {

    @Getter
    String employeeId;
    String employeeName;
    String employeeEmail;
    String employeeRole;
    String employeePosition;

    public GetEmployeeList() {
    }
    public GetEmployeeList(String employeeId, String employeeName, String employeeEmail, String employeeRole, String employeePosition) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.employeeEmail = employeeEmail;
        this.employeeRole = employeeRole;
        this.employeePosition = employeePosition;
    }

}
