package com.employee.artifice.service;

import java.util.List;
import java.util.Optional;

import com.employee.artifice.dto.GetEmployeeList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.artifice.model.Department;
import com.employee.artifice.repository.DepartmentRepository;

@Service
public class DepartmentServiceImpl implements DepartmentService{

    @Autowired
    DepartmentRepository departmentRepository;

    @Override
    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }
    
    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public Optional<Department> getDepartmentById(Long id) {
        return departmentRepository.findById(id);
    }

    @Override
    public List<Department> searchDepartmentsByName(String name) {
        return departmentRepository.findByDepartmentNameContainingIgnoreCase(name);
    }

    @Override
    public List<GetEmployeeList> searchEmployeesByDepartmentId(Long departmentId) {
        return departmentRepository.findById(departmentId)
                .map(department -> department.getUsers().stream()
                        .map(user-> new GetEmployeeList(
                                user.getId(),
                                user.getEmployeeName(),
                                user.getUser().getEmail(),
                                user.getUser().getRole().toString(),
                                user.getPosition()))
                        .toList())
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + departmentId));
    }
}
