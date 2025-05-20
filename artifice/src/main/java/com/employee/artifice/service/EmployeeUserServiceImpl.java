package com.employee.artifice.service;

import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.repository.EmployeeUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import java.util.*;

@Service
public class EmployeeUserServiceImpl implements EmployeeUserService{

    @Autowired
    EmployeeUserRepository repository;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Override
    public EmployeeUser createUser(EmployeeUser user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return repository.save(user);
    }

    @Override
    public List<EmployeeUser> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public Optional<EmployeeUser> getUserById(Long id) {
        return repository.findById(id);
    }

    @Override
    public String verify(EmployeeUser user) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));

        if(authentication.isAuthenticated()){
            return jwtService.generateToken(user.getEmail());
        }
        return "Fail";
    }

    @Override
    public String registerAdmin(EmployeeUser user) {
        //first check if user is already present or already a admin user is their
        EmployeeUser existingUser = repository.findByEmail(user.getEmail());
        if(existingUser != null){
            return "User already exists";
        }
        EmployeeUser adminUser = repository.findByRole(EmployeeUser.Role.ADMIN);
        if (adminUser != null) {
            return "Admin user already exists";
        }
        //if not then create a new user
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole(EmployeeUser.Role.ADMIN);
        repository.save(user);
        return "Admin user created successfully";
    }

    @Override
    public String getRoleByEmail(String email) {
        EmployeeUser user = repository.findByEmail(email);
        return user != null ? user.getRole().toString() : "UNKNOWN";
    }

    @Override
    public List<Map<String, Object>> getAllEmployeesList() {
        List<EmployeeUser> users = repository.findAll();
        List<Map<String, Object>> employees = new ArrayList<>();
        for (EmployeeUser user : users) {
            Map<String, Object> emp = new HashMap<>();
            emp.put("id", user.getId());
            if (user.getEmployeeDetails() != null) {
                emp.put("name", user.getEmployeeDetails().getEmployeeName());
            } else {
                emp.put("name", null);
            }
            emp.put("email", user.getEmail());
            emp.put("role", user.getRole().name());
            employees.add(emp);
        }
        return employees;
    }

    @Override
    public String getUserIdByEmail(String email) {
        return repository.findByEmail(email).getId().toString();
    }
}
