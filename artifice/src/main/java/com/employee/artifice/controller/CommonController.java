package com.employee.artifice.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employee.artifice.dto.CustomEmployeeDetails;
import com.employee.artifice.dto.GetEmployeeList;
import com.employee.artifice.dto.PasswordChangeRequest;
import com.employee.artifice.model.Country;
import com.employee.artifice.model.Department;
import com.employee.artifice.model.EmployeeDetails;
import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.model.Project;
import com.employee.artifice.service.CommonService;
import com.employee.artifice.service.CountryService;
import com.employee.artifice.service.DepartmentService;
import com.employee.artifice.service.EmployeeDetailsService;
import com.employee.artifice.service.EmployeeUserService;
import com.employee.artifice.service.ProjectService;

@RestController
@RequestMapping("/common")
public class CommonController {

    @Autowired
    CommonService commonService;

    @Autowired
    EmployeeDetailsService employeeDetailsService;
 
    @Autowired
    EmployeeUserService employeeUserService;

    @Autowired
    DepartmentService departmentService;

    @Autowired
    ProjectService projectService;

    @Autowired
    CountryService countryService;


    @PostMapping("/updatePassword")
    public String updatePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        return commonService.updatePassword(passwordChangeRequest);
    }

    @PutMapping("/updateDetails")
    public EmployeeDetails updateDetails(@RequestBody EmployeeDetails details) {
        return employeeDetailsService.updateEmployeeDetails(details)
                .orElseThrow(() -> new RuntimeException("Failed to update employee details"));
    }

    @GetMapping("/getEmployeeDetailsByEmail")
    public CustomEmployeeDetails getEmployeeDetailsByEmail() {
        return employeeDetailsService.getDetailsByEmail()
                .orElseThrow(() -> new RuntimeException("Employee details not found for email"));
    }
    @GetMapping("/allUsers")
    public List<EmployeeUser> getAllUsers() {
        return employeeUserService.getAllUsers();
    }

    @GetMapping("/count/employees")
    public Long getEmployeeCount() {
        return employeeUserService.countAllEmployees();
    }

    @GetMapping("/count/managers")
    public Long getManagerCount() {
        return employeeUserService.countManagers();
    }


    @GetMapping("/searchUsers")
    public List<GetEmployeeList> searchUsers(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String employeeName
    ) {
        return employeeUserService.searchUsers(id, email, role, employeeName);
}

    @GetMapping("/employeeList")
    public List<GetEmployeeList> getEmployeeList() {
        return employeeUserService.getAllEmployeesList();
    }

    @GetMapping("/departments")
    public List<Department> getDepartmentList() {
        return departmentService.getAllDepartments();
    }

    @GetMapping("department/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        Optional<Department> department = departmentService.getDepartmentById(id);
        return department.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/projects")
    public List<Project> getProjectList() {
        return projectService.getAllProjects();
    }

    @GetMapping("project/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("project/department/{departmentId}")
    public List<Project> getProjectByDepartment(@PathVariable Long departmentId) {
        List<Project> project = projectService.getAllProjectsInOneDepartment(departmentId);
        return project;
    }

    @GetMapping("/searchDepartments")
    public ResponseEntity<List<Department>> searchDepartments(@RequestParam String name) {
        System.out.println("Searching for departments with name: " + name);
        List<Department> result = departmentService.searchDepartmentsByName(name);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/searchEmployeesByDepartmentId")
    public ResponseEntity<List<GetEmployeeList>> searchEmployeesByDepartmentId(@RequestParam Long departmentId) {
        List<GetEmployeeList> employees = departmentService.searchEmployeesByDepartmentId(departmentId);
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/getEmployeeByRole")
    public List<GetEmployeeList> getEmployeeByRole(@RequestParam String role) {
        return employeeUserService.getEmployeeListByRole(role);
    }

    @GetMapping("/getEmployeeDetailsByCurrentLocation")
    public Optional<List<GetEmployeeList>> getEmployeeDetailsByCurrentLocation(@RequestParam String currentLocation) {
        return employeeDetailsService.getDetailsByCurrentLocation(currentLocation);
    }

    @GetMapping("/getCountryList")
    public List<Country> getCountryList() {
        return countryService.getAllCountries();
    }

    @GetMapping("/getEmployeeDetailsById/{employeeId}")
    public ResponseEntity<CustomEmployeeDetails> getEmployeeDetailsById(@PathVariable Long employeeId) {
        return employeeDetailsService.getCustomDetailsByEmployeeId(employeeId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getEmployeeRoleById/{employeeId}")
    public ResponseEntity<String> getEmployeeRoleById(@PathVariable Long employeeId) {
        return employeeUserService.getRoleByEmployeeId(employeeId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getEmployeeName")
    public ResponseEntity<Map<String, String>> getEmployeeName() {
        String name = employeeDetailsService.getEmployeeName()
                .map(EmployeeDetails::getEmployeeName)
                .orElse("N/A");
        Map<String, String> response = Map.of("name", name);
        return ResponseEntity.ok(response);
    }
}
