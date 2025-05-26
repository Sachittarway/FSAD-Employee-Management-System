package com.employee.artifice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.artifice.model.Project;
import com.employee.artifice.repository.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService{
    
    @Autowired
    ProjectRepository projectRepository;

    @Override
    public Project createProject(Project project) {
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
