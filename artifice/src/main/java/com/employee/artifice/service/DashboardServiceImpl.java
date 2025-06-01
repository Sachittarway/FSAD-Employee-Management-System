package com.employee.artifice.service;

import com.employee.artifice.model.EmployeeDetails;
import com.employee.artifice.model.ResourceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.employee.artifice.dto.DashboardCountsDTO;
import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.repository.DepartmentRepository;
import com.employee.artifice.repository.EmployeeUserRepository;
import com.employee.artifice.repository.ResourceRequestRepository;

import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private EmployeeUserRepository employeeUserRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ResourceRequestRepository requestRepository;

    @Autowired
    EmployeeUserRepository userRepository;

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

    @Override
    public DashboardCountsDTO getDashboardManagerCounts(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        EmployeeUser employeeManager = userRepository.findByEmail(email);
        List<EmployeeDetails> deptMembers = employeeManager.getEmployeeDetails().getDepartment().getUsers();
        long teamMemberCount = (long) deptMembers.size();
        long managerCount = deptMembers.stream()
                .filter(member -> member.getUser().getRole() == EmployeeUser.Role.MANAGER)
                .count();

        List<ResourceRequest> requests = requestRepository.findByManagerEmail(email);
        long totalRequestCount = requests.size();

        long approvedRequestCount = requests.stream().filter(ResourceRequest::getAccept).count();
        long pendingRequestCount = totalRequestCount - approvedRequestCount;

        return new DashboardCountsDTO(
                teamMemberCount,
                managerCount,
                0L, // No department count for manager dashboard
                totalRequestCount,
                approvedRequestCount,
                pendingRequestCount
        );

    }
}