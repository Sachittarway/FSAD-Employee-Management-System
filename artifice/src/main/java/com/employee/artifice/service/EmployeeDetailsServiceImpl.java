package com.employee.artifice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.employee.artifice.dto.CustomEmployeeDetails;
import com.employee.artifice.dto.GetEmployeeList;
import com.employee.artifice.dto.UpdateTeam;
import com.employee.artifice.model.Department;
import com.employee.artifice.model.EmployeeDetails;
import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.model.Project;
import com.employee.artifice.repository.EmployeeDetailsRepository;
import com.employee.artifice.repository.EmployeeUserRepository;

@Service
public class EmployeeDetailsServiceImpl implements EmployeeDetailsService{

    @Autowired
    EmployeeDetailsRepository detailsRepository;

    @Autowired
    EmployeeUserRepository userRepository;

    @Autowired
    DepartmentService departmentService;

    @Autowired
    ProjectService projectService;

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
        existingDetails.setPosition(details.getPosition());
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
                        details.getDepartment() != null ? details.getDepartment().getId() : null,
                        details.getProject() != null ? details.getProject().getId() : null,
                        details.getDepartment() != null ? details.getDepartment().getDepartment_name() : "",
                        details.getProject() != null ? details.getProject().getProject_code() : "",
                        details.getUser().getEmail()
                ));
    }

    @Override
    public Optional<List<GetEmployeeList>> getDetailsByCurrentLocation(String currentLocation) {
        return detailsRepository.findByCurrentLocation(currentLocation)
                .map(detailsList -> detailsList.stream()
                        .map(details -> new GetEmployeeList(
                                details.getUser().getId(),
                                details.getEmployeeName(),
                                details.getUser().getEmail(),
                                details.getUser().getRole().toString(),
                                details.getPosition()
                        )).toList());
    }

    @Override
    public List<GetEmployeeList> getMyTeamMembers() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Long departmentId = detailsRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee details not found for user: " + email))
                .getDepartment().getId();
        System.out.println("Department ID: " + departmentId);
        return departmentService.searchEmployeesByDepartmentId(departmentId);
    }

    /* Update Employee Department and Project by the Manager */
    @Override
    public UpdateTeam updateEmployeeTeam(UpdateTeam updateTeam) {
        EmployeeDetails details = detailsRepository.findByUserEmail(updateTeam.getEmail())
                .orElseThrow(() -> new RuntimeException("Employee details not found for email: " + updateTeam.getEmail()));

        if (updateTeam.getDepartmentId() != null) {
            Department department = departmentService.getDepartmentById(updateTeam.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found with id: " + updateTeam.getDepartmentId()));
            details.setDepartment(department);
        }

        if (updateTeam.getProjectId() != null) {
            Project project = projectService.getProjectById(updateTeam.getProjectId())
                    .orElseThrow(() -> new RuntimeException("Project not found with id: " + updateTeam.getProjectId()));
            details.setProject(project);
        }

        detailsRepository.save(details);
        return updateTeam;
    }
}
