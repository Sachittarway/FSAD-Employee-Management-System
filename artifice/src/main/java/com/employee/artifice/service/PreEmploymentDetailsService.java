package com.employee.artifice.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.artifice.model.EmployeeDetails;
import com.employee.artifice.model.PreEmploymentDetails;
import com.employee.artifice.repository.EmployeeDetailsRepository;
import com.employee.artifice.repository.PreEmploymentDetailsRepository;


@Service
public class PreEmploymentDetailsService {

    @Autowired
    private PreEmploymentDetailsRepository preEmploymentDetailsRepository;

    @Autowired
    private EmployeeDetailsRepository employeeDetailsRepository;

    public void savePreEmploymentDetails(Long userId, List<PreEmploymentDetails> preEmploymentDetailsList) {
    EmployeeDetails employee = employeeDetailsRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("EmployeeDetails not found for user ID: " + userId));

    for (PreEmploymentDetails details : preEmploymentDetailsList) {
        details.setEmployee(employee);
    }

    preEmploymentDetailsRepository.saveAll(preEmploymentDetailsList);
}

   public List<PreEmploymentDetails> getPreEmploymentDetailsForUser(Long userId) {
        return preEmploymentDetailsRepository.findByEmployee_User_Id(userId);
    }
}