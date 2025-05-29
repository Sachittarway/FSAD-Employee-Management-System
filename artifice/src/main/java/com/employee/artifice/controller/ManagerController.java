package com.employee.artifice.controller;

import com.employee.artifice.dto.CustomEmployeeDetails;
import com.employee.artifice.dto.GetEmployeeList;
import com.employee.artifice.dto.UpdateTeam;
import com.employee.artifice.service.EmployeeDetailsService;
import com.employee.artifice.model.ResourceRequest;
import com.employee.artifice.service.ResourceRequestService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    EmployeeDetailsService employeeDetailsService;

    @Autowired
    ResourceRequestService resourceRequestService;

    @GetMapping("/myTeam")
    public List<GetEmployeeList> getMyTeamMembers() {
        return employeeDetailsService.getMyTeamMembers();
    }

    @PatchMapping("/updateTeam")
    public ResponseEntity<UpdateTeam> updateTeam(@RequestBody UpdateTeam updateTeam){
        return ResponseEntity.ok(employeeDetailsService.updateEmployeeTeam(updateTeam));
    }

    /*
        * Endpoint to update the manager of an employee!!
     */
    @PatchMapping("/updateManager/{employeeId}")
    public ResponseEntity<CustomEmployeeDetails> updateManager(@PathVariable Long employeeId){
        return employeeDetailsService.updateEmployeeManager(employeeId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/resourceRequests")
    public ResponseEntity<List<ResourceRequest>> getRequests() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        List<ResourceRequest> requests = resourceRequestService.getRequestsByManagerEmail(email);
        return ResponseEntity.ok(requests);
        
    }
}
