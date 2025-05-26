package com.employee.artifice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.artifice.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long>{

    List<Project> findByDepartmentId(Long departmentId);
}
