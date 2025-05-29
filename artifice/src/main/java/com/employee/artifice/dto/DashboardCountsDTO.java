package com.employee.artifice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardCountsDTO {
    private Long employeeCount;
    private Long managerCount;
    private Long departmentCount;
    private Long totalRequestCount;
    private Long approvedRequestCount;
    private Long pendingRequestCount;
}