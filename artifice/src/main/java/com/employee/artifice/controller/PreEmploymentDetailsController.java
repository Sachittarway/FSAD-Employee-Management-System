package com.employee.artifice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee.artifice.model.PreEmploymentDetails;
import com.employee.artifice.repository.EmployeeUserRepository;
import com.employee.artifice.service.PreEmploymentDetailsService;

@RestController
@RequestMapping("/employees")
public class PreEmploymentDetailsController {

    @Autowired
    private PreEmploymentDetailsService preEmploymentDetailsService;
    
    @Autowired
    private EmployeeUserRepository employeeUserRepository;

    @PostMapping("/pre-employment-details")
    public ResponseEntity<String> savePreEmploymentDetailsForLoggedInUser(
        @RequestBody List<PreEmploymentDetails> preEmploymentDetailsList) {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            Long userId = employeeUserRepository.findByEmail(email)
                        .getId();
                if (userId == null) {
                    throw new RuntimeException("User not found for email: " + email);
                }
            preEmploymentDetailsService.savePreEmploymentDetails(userId, preEmploymentDetailsList);
            return ResponseEntity.ok("Pre-employment details saved successfully.");

    }

    @GetMapping("/pre-employment-details")
    public ResponseEntity<List<PreEmploymentDetails>> getPreEmploymentDetailsForLoggedInUser() {
        // Get logged-in user's email
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // Find user ID from email
        Long userId = employeeUserRepository.findByEmail(email)
                        .getId();
                if (userId == null) {
                    throw new RuntimeException("User not found for email: " + email);
                }

        // Fetch pre-employment details using userId
        List<PreEmploymentDetails> preEmploymentDetails = preEmploymentDetailsService.getPreEmploymentDetailsForUser(userId);
        return ResponseEntity.ok(preEmploymentDetails);
    }

    @GetMapping("/pre-employment-details/{employeeId}")
    public ResponseEntity<List<PreEmploymentDetails>> getPreEmploymentDetailsByEmployeeId(@PathVariable Long employeeId) {
        // Fetch pre-employment details using employeeId
        List<PreEmploymentDetails> preEmploymentDetails = preEmploymentDetailsService.getPreEmploymentDetailsByEmployeeId(employeeId);
        return ResponseEntity.ok(preEmploymentDetails);
    }
}