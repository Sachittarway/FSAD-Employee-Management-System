package com.employee.artifice.service;

import java.util.List;
import java.util.Optional;

import com.employee.artifice.model.Department;
import com.employee.artifice.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.artifice.model.Project;
import com.employee.artifice.repository.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService{
    
    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    DepartmentRepository departmentRepository;

    @Override
    public Project createProject(String projectName, Long departmentId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        Project project = new Project();
        project.setProject_code(projectName);
        project.setDepartment(department);
        return projectRepository.save(project);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public List<Project> getAllProjectsInOneDepartment(Long departmentId) {
        return projectRepository.findByDepartmentId(departmentId);
    }

    @Override
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

}
