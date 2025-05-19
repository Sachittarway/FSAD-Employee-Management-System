package com.employee.artifice.controller;

import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.service.EmployeeUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;


@RestController
public class InitialController {

    @Autowired
    EmployeeUserService service;

    @GetMapping
    public String greet(HttpServletRequest request) {
        return "Welcome to Artifice Management System : "+request.getSession().getId();
    }

    @PostMapping("/login")
    public Map<String, String> loginUser(@RequestBody EmployeeUser user){
        String token = service.verify(user);
        String role = service.getRoleByEmail(user.getEmail());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", role);
        return response;
    }

    @PostMapping("/registerAdmin")
    public String registerAdmin(@RequestBody EmployeeUser user){
        return service.registerAdmin(user);
    }
}
