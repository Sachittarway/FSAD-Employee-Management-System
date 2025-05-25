package com.employee.artifice.controller;

import com.employee.artifice.dto.CustomEmployeeDetails;
import com.employee.artifice.dto.PasswordChangeRequest;
import com.employee.artifice.model.EmployeeDetails;
import com.employee.artifice.service.CommonService;
import com.employee.artifice.service.EmployeeDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/common")
public class CommonController {

    @Autowired
    CommonService commonService;

    @Autowired
    EmployeeDetailsService employeeDetailsService;


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
}
