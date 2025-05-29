package com.employee.artifice.service;

import java.util.List;
import java.util.Optional;

import com.employee.artifice.dto.GetEmployeeList;
import com.employee.artifice.dto.UpdateTeam;
import org.springframework.stereotype.Service;

import com.employee.artifice.dto.CustomEmployeeDetails;
import com.employee.artifice.model.EmployeeDetails;

@Service
public interface EmployeeDetailsService {
    public EmployeeDetails createDetails(EmployeeDetails details);
    public List<EmployeeDetails> getAllDetails();
    public Optional<EmployeeDetails> getDetailsById(Long id);
    public Optional<EmployeeDetails> updateEmployeeDetails(EmployeeDetails details);
    public Optional<CustomEmployeeDetails> getDetailsByEmail();
    public Optional<List<GetEmployeeList>> getDetailsByCurrentLocation(String currentLocation);
    public List<GetEmployeeList> getMyTeamMembers();
    public UpdateTeam updateEmployeeTeam(UpdateTeam updateTeam);
    public Optional<CustomEmployeeDetails> updateEmployeeManager(Long employeeId);
}
