package com.employee.artifice.service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.employee.artifice.dto.GetEmployeeList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.employee.artifice.dto.CreateUser;
import com.employee.artifice.model.EmployeeDetails;
import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.repository.EmployeeDetailsRepository;
import com.employee.artifice.repository.EmployeeUserRepository;

@Service
public class EmployeeUserServiceImpl implements EmployeeUserService{

    @Autowired
    EmployeeUserRepository repository;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JWTService jwtService;

    @Autowired
    EmployeeDetailsRepository employeeDetailsRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Override
    public EmployeeUser createUser(CreateUser user) {

        EmployeeUser newUser = new EmployeeUser();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(encoder.encode(user.getPassword()));
        newUser.setRole(EmployeeUser.Role.valueOf(user.getRole().toUpperCase()));
        EmployeeUser savedUser = repository.save(newUser);

        EmployeeDetails details = new EmployeeDetails();
        details.setEmployeeName(user.getName());
        details.setUser(savedUser);
        employeeDetailsRepository.save(details);

        return savedUser;
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
        EmployeeUser adminUser = (EmployeeUser) repository.findByRole(EmployeeUser.Role.ADMIN);
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
    public List<GetEmployeeList> getAllEmployeesList() {
        List<EmployeeUser> users = repository.findAll();
        List<GetEmployeeList> employeeList = new ArrayList<>();
        for (EmployeeUser user : users) {
            GetEmployeeList employee = new GetEmployeeList();
            employee.setEmployeeId(user.getId());
            employee.setEmployeeEmail(user.getEmail());
            employee.setEmployeeRole(user.getRole().toString());
            employee.setEmployeePosition(user.getEmployeeDetails() != null ? user.getEmployeeDetails().getPosition() : "N/A");
            if (user.getEmployeeDetails() != null) {
                employee.setEmployeeName(user.getEmployeeDetails().getEmployeeName());
            } else {
                employee.setEmployeeName(" ");
            }
            employeeList.add(employee);
        }
        return employeeList;
    }
    
    @Override
public List<EmployeeUser> searchUsers(Long id, String email, String roleStr, String employeeName) {
    List<EmployeeUser> users;

    // Filter by ID first if present
    if (id != null) {
        Optional<EmployeeUser> user = repository.findById(id);
        users = user.map(List::of).orElse(List.of());
    } else if (email != null) {
        users = repository.findByEmailContainingIgnoreCase(email);
    } else if (roleStr != null) {
        try {
            EmployeeUser.Role role = EmployeeUser.Role.valueOf(roleStr.toUpperCase());
            users = repository.findByRole(role);
        } catch (IllegalArgumentException e) {
            users = List.of(); // Invalid role
        }
    } else {
        users = repository.findAll(); // No filters
    }

    // Now filter by employeeName if provided
    if (employeeName != null && !employeeName.isEmpty()) {
        users = users.stream()
                .filter(user -> user.getEmployeeDetails() != null &&
                        user.getEmployeeDetails().getEmployeeName() != null &&
                        user.getEmployeeDetails().getEmployeeName().toLowerCase().contains(employeeName.toLowerCase()))
                .toList();
    }

    return users;
}

    @Override
    public String getUserIdByEmail(String email) {
        return repository.findByEmail(email).getId().toString();
    }
}
