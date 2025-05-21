package com.employee.artifice.service;

import com.employee.artifice.dto.PasswordChangeRequest;
import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.repository.EmployeeUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CommonServiceImpl implements CommonService{

    @Autowired
    EmployeeUserService employeeUserService;

    @Autowired
    EmployeeUserRepository repository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Override
    public String updatePassword(PasswordChangeRequest passwordChangeRequest) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        EmployeeUser user = employeeUserService.getAllUsers()
                .stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst()
                .orElse(null);
        if (user != null) {
            user.setPassword(encoder.encode(passwordChangeRequest.getNewPassword()));
            repository.save(user);
            return "Password updated successfully";
        }
        return "User not found";
    }
}
