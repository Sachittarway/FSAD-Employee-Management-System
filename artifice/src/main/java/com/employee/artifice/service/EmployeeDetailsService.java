package com.employee.artifice.service;

import java.util.List;
import java.util.Optional;

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
}
