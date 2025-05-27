package com.employee.artifice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.artifice.model.Department;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department,Long>{
    @Query("SELECT d FROM Department d WHERE LOWER(d.department_name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Department> findByDepartmentNameContainingIgnoreCase(@Param("name") String name);
}
