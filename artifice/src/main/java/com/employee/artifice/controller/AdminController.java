package com.employee.artifice.controller;

import com.employee.artifice.dto.CreateUser;
import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.service.EmployeeUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    EmployeeUserService service;

    @PostMapping("/register")
    public ResponseEntity<EmployeeUser> createUser(@RequestBody CreateUser user) {
        EmployeeUser newuser = service.createUser(user);
        return ResponseEntity.ok(newuser);
    }

    @GetMapping("/hello")
    public String getAllUsers(){
        return "Hello";
    }

}
