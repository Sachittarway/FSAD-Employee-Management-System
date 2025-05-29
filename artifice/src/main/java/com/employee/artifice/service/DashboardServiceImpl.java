package com.employee.artifice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.artifice.dto.DashboardCountsDTO;
import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.repository.DepartmentRepository;
import com.employee.artifice.repository.EmployeeUserRepository;
import com.employee.artifice.repository.ResourceRequestRepository;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private EmployeeUserRepository employeeUserRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ResourceRequestRepository requestRepository;

    @Override
    public DashboardCountsDTO getDashboardCounts() {
        Long employeeCount = employeeUserRepository.countByRole(EmployeeUser.Role.USER);
        Long managerCount = employeeUserRepository.countByRole(EmployeeUser.Role.MANAGER);
        Long departmentCount = departmentRepository.count();
        Long totalRequestCount = requestRepository.count();
        Long approvedRequestCount = requestRepository.countByAccept(true);
        Long pendingRequestCount = requestRepository.countByAccept(false);;

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