package com.employee.artifice.controller;

import com.employee.artifice.dto.CustomEmployeeDetails;
import com.employee.artifice.dto.GetEmployeeList;
import com.employee.artifice.dto.UpdateTeam;
import com.employee.artifice.model.Department;
import com.employee.artifice.model.EmployeeDetails;
import com.employee.artifice.model.Project;
import com.employee.artifice.service.DepartmentService;
import com.employee.artifice.service.EmployeeDetailsService;
import com.employee.artifice.service.EmployeeUserService;
import com.employee.artifice.service.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    EmployeeDetailsService employeeDetailsService;

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

}
