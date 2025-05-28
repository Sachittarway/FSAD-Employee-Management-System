package com.employee.artifice.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.employee.artifice.dto.GetEmployeeList;
import org.springframework.stereotype.Service;

import com.employee.artifice.dto.CreateUser;
import com.employee.artifice.dto.GetEmployeeList;
import com.employee.artifice.model.EmployeeUser;

@Service
public interface EmployeeUserService {
    public EmployeeUser createUser(CreateUser user);
    public List<EmployeeUser> getAllUsers();
    public Optional<EmployeeUser> getUserById(Long id);

    public String verify(EmployeeUser user);

    String getRoleByEmail(String email);

    public List<GetEmployeeList> getAllEmployeesList();

    public String getUserIdByEmail(String email);

    Long countAllEmployees();
    Long countManagers();
    
    List<GetEmployeeList> searchUsers(Long id, String email, String roleStr, String employeeName);


    public List<GetEmployeeList> getEmployeeListByRole (String role);

}
