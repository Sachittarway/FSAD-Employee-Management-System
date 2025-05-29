package com.employee.artifice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee.artifice.dto.ResourceRequestDto;
import com.employee.artifice.model.EmployeeDetails;
import com.employee.artifice.model.ResourceRequest;
import com.employee.artifice.repository.EmployeeDetailsRepository;
import com.employee.artifice.service.ResourceRequestService;

@RestController
@RequestMapping("/user")
public class GeneralUserController {

    @Autowired
    private ResourceRequestService resourceRequestService;

    @Autowired
    private EmployeeDetailsRepository employeeDetailsRepository;

    @PostMapping("/createResourceRequest")
    public ResponseEntity<ResourceRequest> createResourceRequest(@RequestBody ResourceRequestDto resourceRequestDto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        EmployeeDetails details = employeeDetailsRepository.findByUserEmail(email).orElseThrow(() -> new RuntimeException("Employee details not found for user: " + email));

        ResourceRequest resourceRequest = new ResourceRequest();
        resourceRequest.setItem(resourceRequestDto.getItem());
        resourceRequest.setEmployeeEmail(email);
        resourceRequest.setManagerEmail(details.getManager().getEmail());
        resourceRequest.setMessage(resourceRequestDto.getMessage());
        resourceRequest.setAccept(false);
        
        ResourceRequest newResourceRequest = resourceRequestService.createResourceRequest(resourceRequest);
        return ResponseEntity.ok(newResourceRequest);
    }

    @GetMapping("/resourceRequests")
    public ResponseEntity<List<ResourceRequest>> getRequests() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        List<ResourceRequest> requests = resourceRequestService.getRequestsByEmployeeEmail(email);
        return ResponseEntity.ok(requests);
    }

}