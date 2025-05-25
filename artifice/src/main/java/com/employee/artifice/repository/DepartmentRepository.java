package com.employee.artifice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.artifice.model.Department;

public interface DepartmentRepository extends JpaRepository<Department,Long>{

}
