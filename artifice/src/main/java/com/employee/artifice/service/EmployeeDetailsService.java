package com.employee.artifice.service;

import com.employee.artifice.model.EmployeeDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface EmployeeDetailsService {
    public EmployeeDetails createDetails(EmployeeDetails details);
    public List<EmployeeDetails> getAllDetails();
    public Optional<EmployeeDetails> getDetailsById(Long id);
}
