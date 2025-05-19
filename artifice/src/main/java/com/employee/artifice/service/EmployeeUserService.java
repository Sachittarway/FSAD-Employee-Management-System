package com.employee.artifice.service;

import com.employee.artifice.model.EmployeeUser;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public interface EmployeeUserService {
    public EmployeeUser createUser(EmployeeUser user);
    public List<EmployeeUser> getAllUsers();
    public Optional<EmployeeUser> getUserById(Long id);

    public String verify(EmployeeUser user);

    String registerAdmin(EmployeeUser user);

    String getRoleByEmail(String email);
}
