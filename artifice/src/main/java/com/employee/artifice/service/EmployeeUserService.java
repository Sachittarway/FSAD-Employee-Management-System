package com.employee.artifice.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.employee.artifice.dto.CreateUser;
import com.employee.artifice.model.EmployeeUser;

@Service
public interface EmployeeUserService {
    public EmployeeUser createUser(CreateUser user);
    public List<EmployeeUser> getAllUsers();
    public Optional<EmployeeUser> getUserById(Long id);

    public String verify(EmployeeUser user);

    String registerAdmin(EmployeeUser user);

    String getRoleByEmail(String email);

    public List<Map<String, Object>> getAllEmployeesList();

    public String getUserIdByEmail(String email);

    List<EmployeeUser> searchUsers(Long id, String email, String role, String employeeName);

}
