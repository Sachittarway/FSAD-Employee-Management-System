package com.employee.artifice.controller;

import com.employee.artifice.service.EmployeeUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/manager")
@CrossOrigin(origins = "*")
public class ManagerController {

    @Autowired
    EmployeeUserService employeeUserService;

    @GetMapping("/employeeList")
    public List<Map<String, Object>> getEmployeeList() {
        return employeeUserService.getAllEmployeesList();
    }
}
