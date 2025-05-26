package com.employee.artifice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employee.artifice.dto.CustomEmployeeDetails;
import com.employee.artifice.dto.PasswordChangeRequest;
import com.employee.artifice.model.EmployeeDetails;
import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.service.CommonService;
import com.employee.artifice.service.EmployeeDetailsService;
import com.employee.artifice.service.EmployeeUserService;

@RestController
@RequestMapping("/common")
public class CommonController {

    @Autowired
    CommonService commonService;

    @Autowired
    EmployeeDetailsService employeeDetailsService;

    @Autowired
    EmployeeUserService employeeUserService; 

    @PostMapping("/updatePassword")
    public String updatePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        return commonService.updatePassword(passwordChangeRequest);
    }

    @PutMapping("/updateDetails")
    public EmployeeDetails updateDetails(@RequestBody CustomEmployeeDetails details) {
        return employeeDetailsService.updateEmployeeDetails(details)
                .orElseThrow(() -> new RuntimeException("Failed to update employee details"));
    }

    @GetMapping("/getEmployeeDetailsByEmail")
    public EmployeeDetails getEmployeeDetailsByEmail() {
        return employeeDetailsService.getDetailsByEmail()
                .orElseThrow(() -> new RuntimeException("Employee details not found for email"));
    }
    @GetMapping("/allUsers")
    public List<EmployeeUser> getAllUsers() {
        return employeeUserService.getAllUsers();
    }

    @GetMapping("/searchUsers")
    public List<EmployeeUser> searchUsers(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String name
    ) {
        return employeeUserService.searchUsers(id, email, role, name);
    }
}
