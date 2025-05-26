package com.employee.artifice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.service.EmployeeUserService;

@RestController
@RequestMapping("/user")
public class GeneralUserController {

    @Autowired
    private EmployeeUserService employeeUserService;

    // ✅ Endpoint to get all users
    @GetMapping
    public List<EmployeeUser> getAllUsers() {
        return employeeUserService.getAllUsers();
    }

    @GetMapping("/search")
    public List<EmployeeUser> searchUsers(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String role
    ) {
        return employeeUserService.searchUsers(id, email, role);
    }

}