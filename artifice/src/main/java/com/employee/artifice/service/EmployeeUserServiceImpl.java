package com.employee.artifice.service;
import java.util.*;

import com.employee.artifice.dto.GetEmployeeList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.employee.artifice.dto.CreateUser;
import com.employee.artifice.dto.GetEmployeeList;
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

    /*
        1. Method to create an Employee
        2. It checks if the user already exists by email.
        3. It checks if an admin user already exists when trying to create a new admin user.
        4. It saves the new user and creates an EmployeeDetails entry for them.
        5. Initially name is set in Employee Details as it is passed from payload.
    */
    @Override
    public EmployeeUser createUser(CreateUser user) {
        // Check if user already exists
        EmployeeUser existingUser = repository.findByEmail(user.getEmail());
        if (existingUser != null) {
            throw new RuntimeException("User already exists with email: " + user.getEmail());
        }
        // Check if role as admin already exists
        if(Objects.equals(user.getRole(), "ADMIN")) {
            EmployeeUser adminUser = (EmployeeUser) repository.findByRole(EmployeeUser.Role.ADMIN);
            if (adminUser != null && user.getRole().equalsIgnoreCase("ADMIN")) {
                throw new RuntimeException("Admin user already exists");
            }
        }
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
    public Long countAllEmployees() {
        return repository.count();
    }

    @Override
    public Long countManagers() {
        return repository.countByRole(EmployeeUser.Role.MANAGER);
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

    private GetEmployeeList toGetEmployeeList(EmployeeUser user) {
        Long id = user.getId();
        String name = (user.getEmployeeDetails() != null) ? user.getEmployeeDetails().getEmployeeName() : null;
        String email = user.getEmail();
        String role = (user.getRole() != null) ? user.getRole().name() : null;
        String position = null; // Add logic if needed

        return new GetEmployeeList(id, name, email, role, position);
    }
    
    @Override
    public List<GetEmployeeList> searchUsers(Long id, String email, String roleStr, String employeeName) {
        List<EmployeeUser> users;

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
                users = List.of();
            }
        } else {
            users = repository.findAll();
        }

        // Filter by employeeName if present
        if (employeeName != null && !employeeName.isEmpty()) {
            users = users.stream()
                    .filter(user -> user.getEmployeeDetails() != null &&
                            user.getEmployeeDetails().getEmployeeName() != null &&
                            user.getEmployeeDetails().getEmployeeName().toLowerCase().contains(employeeName.toLowerCase()))
                    .toList();
        }

    return users.stream()
                .map(this::toGetEmployeeList)
                .toList();
}

    @Override
    public String getUserIdByEmail(String email) {
        return repository.findByEmail(email).getId().toString();
    }

    @Override
    public List<GetEmployeeList> getEmployeeListByRole (String role){
        List<EmployeeUser> users = repository.findByRole(EmployeeUser.Role.valueOf(role.toUpperCase()));
        List<GetEmployeeList> employeeList = new ArrayList<>();
        for (EmployeeUser user : users) {
            GetEmployeeList employee = new GetEmployeeList();
            employee.setEmployeeId(user.getId());
            employee.setEmployeeName(user.getEmployeeDetails() != null ? user.getEmployeeDetails().getEmployeeName() : "N/A");
            employee.setEmployeeEmail(user.getEmail());
            employee.setEmployeeRole(user.getRole().toString());
            employee.setEmployeePosition(user.getEmployeeDetails() != null ? user.getEmployeeDetails().getPosition() : "N/A");
            employeeList.add(employee);
        }
        return employeeList;
    }
}
