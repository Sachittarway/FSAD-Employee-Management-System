package com.employee.artifice.service;

import com.employee.artifice.dto.CustomEmployeeDetails;
import com.employee.artifice.model.EmployeeDetails;
import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.repository.EmployeeDetailsRepository;
import com.employee.artifice.repository.EmployeeUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeDetailsServiceImpl implements EmployeeDetailsService{

    @Autowired
    EmployeeDetailsRepository detailsRepository;

    @Autowired
    EmployeeUserRepository userRepository;

    @Override
    public EmployeeDetails createDetails(EmployeeDetails details) {
        Optional<EmployeeUser> user = userRepository.findById(details.getUser().getId());
        if (user.isPresent()) {
            return detailsRepository.save(details);
        }else{
            throw new RuntimeException("User not found with id: " + details.getUser().getId());
        }
    }


    @Override
    public List<EmployeeDetails> getAllDetails() {
        return detailsRepository.findAll();
    }

    @Override
    public Optional<EmployeeDetails> getDetailsById(Long id) {
        return detailsRepository.findById(id);
    }

    @Override
    public Optional<EmployeeDetails> updateEmployeeDetails(EmployeeDetails details) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        EmployeeDetails existingDetails = detailsRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee details not found for user: " + email));

        existingDetails.setCurrentLocation(details.getCurrentLocation());
        existingDetails.setPermanentAddress(details.getPermanentAddress());
        existingDetails.setLocalAddress(details.getLocalAddress());
        existingDetails.setPassportNo(details.getPassportNo());
        existingDetails.setPhoneNumber(details.getPhoneNumber());
        existingDetails.setYearsOfExperience(details.getYearsOfExperience());
        existingDetails.setPassportIssueDate(details.getPassportIssueDate());
        existingDetails.setPassportExpiryDate(details.getPassportExpiryDate());
        existingDetails.setPassportOffice(details.getPassportOffice());
        existingDetails.setDepartment(details.getDepartment());
        existingDetails.setProject(details.getProject());
        return Optional.of(detailsRepository.save(existingDetails));
    }

    @Override
    public Optional<CustomEmployeeDetails> getDetailsByEmail() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return detailsRepository.findByUserEmail(email)
                .map(details -> new CustomEmployeeDetails(
                        details.getCurrentLocation(),
                        details.getPermanentAddress(),
                        details.getLocalAddress(),
                        details.getPassportNo(),
                        details.getPhoneNumber(),
                        details.getYearsOfExperience(),
                        details.getPassportIssueDate(),
                        details.getPassportExpiryDate(),
                        details.getPassportOffice(),
                        details.getDepartment().getId(),
                        details.getProject().getId(),
                        details.getDepartment().getDepartment_name(),
                        details.getProject().getProject_code(),
                        details.getUser().getEmail()
                        ));
    }
}
