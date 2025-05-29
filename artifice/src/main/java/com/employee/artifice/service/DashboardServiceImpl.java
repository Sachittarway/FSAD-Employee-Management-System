package com.employee.artifice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.artifice.dto.DashboardCountsDTO;
import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.repository.DepartmentRepository;
import com.employee.artifice.repository.EmployeeUserRepository;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private EmployeeUserRepository employeeUserRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    // @Autowired
    // private RequestRepository requestRepository;

    @Override
    public DashboardCountsDTO getDashboardCounts() {
        Long employeeCount = employeeUserRepository.countByRole(EmployeeUser.Role.USER);
        Long managerCount = employeeUserRepository.countByRole(EmployeeUser.Role.MANAGER);
        Long departmentCount = departmentRepository.count();
        Long totalRequestCount = null;
        Long approvedRequestCount = null;
        Long pendingRequestCount = null;

        return new DashboardCountsDTO(
                employeeCount,
                managerCount,
                departmentCount,
                totalRequestCount,
                approvedRequestCount,
                pendingRequestCount
        );
    }
}