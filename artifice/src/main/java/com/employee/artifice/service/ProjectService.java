package com.employee.artifice.service;

import java.util.List;
import java.util.Optional;

import com.employee.artifice.model.Project;

public interface ProjectService {

    public Project createProject(Project project);

    public List<Project> getAllProjects();
    
    public List<Project> getAllProjectsInOneDepartment(Long departmentId);

    public Optional<Project> getProjectById(Long id);
}
