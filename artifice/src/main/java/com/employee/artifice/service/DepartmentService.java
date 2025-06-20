package com.employee.artifice.service;

import java.util.List;
import java.util.Optional;

import com.employee.artifice.dto.GetEmployeeList;
import com.employee.artifice.model.Department;

public interface DepartmentService {

    public Department createDepartment(Department department);
    public List<Department> getAllDepartments();
    public Optional<Department> getDepartmentById(Long id);
    public List<Department> searchDepartmentsByName(String name);
    public List<GetEmployeeList> searchEmployeesByDepartmentId(Long departmentId);
}
