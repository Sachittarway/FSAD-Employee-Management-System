package com.employee.artifice.controller;

import com.employee.artifice.dto.CreateUser;
import com.employee.artifice.dto.DashboardCountsDTO;
import com.employee.artifice.model.*;
import com.employee.artifice.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    EmployeeUserService service;

    @Autowired
    DepartmentService departmentService;

    @Autowired
    ProjectService projectService;

    @Autowired
    ResourceRequestService resourceRequestService;

    @Autowired
    CountryService countryService;

    @Autowired
    DashboardService dashboardService;

    @PostMapping("/register")
    public ResponseEntity<EmployeeUser> createUser(@RequestBody CreateUser user) {
        EmployeeUser newuser = service.createUser(user);
        return ResponseEntity.ok(newuser);
    }

    @GetMapping("/hello")
    public String getAllUsers(){
        return "Hello";
    }
    
    @PostMapping("/createDepartment")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        Department newDepartment = departmentService.createDepartment(department);
        return ResponseEntity.ok(newDepartment);
    }

    @PostMapping("/createProject")
    public ResponseEntity<Project> createProject(@RequestBody Map<String, Object> payload) {
        String projectCode = (String) payload.get("project_code");
        Long departmentId = ((Number) payload.get("department_id")).longValue();
        Project newProject = projectService.createProject(projectCode, departmentId);
        return ResponseEntity.ok(newProject);
    }

    @GetMapping("/resourceRequests")
    public ResponseEntity<List<ResourceRequest>> getResourceRequests() {
        List<ResourceRequest> requests = resourceRequestService.getAllResourceRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/resourceRequests/{managerEmail}")
    public ResponseEntity<List<ResourceRequest>> getRequestsUnderOneManager(@PathVariable String managerEmail) {
        List<ResourceRequest> requests = resourceRequestService.getRequestsByManagerEmail(managerEmail);
        return ResponseEntity.ok(requests);
    }

    @PostMapping("/createCountries")
    public ResponseEntity<List<Country>> createCountries(@RequestBody List<Country> countries) {
        List<Country> createdCountries = countryService.postAllCountries(countries);
        return ResponseEntity.ok(createdCountries);
    }

    @GetMapping("/dashboardCounts")
    public ResponseEntity<DashboardCountsDTO> getDashboardCounts(){
        DashboardCountsDTO counts = dashboardService.getDashboardCounts();
        return ResponseEntity.ok(counts);
    }
}