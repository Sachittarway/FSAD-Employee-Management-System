package com.employee.artifice.service;

import com.employee.artifice.model.EmployeeDetails;
import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.repository.EmployeeDetailsRepository;
import com.employee.artifice.repository.EmployeeUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeDetailsServiceImpl implements EmployeeDetailsService{

    @Autowired
    EmployeeDetailsRepository detailsRepository;

    @Autowired
    EmployeeUserRepository userRepository;

    @Override
    public EmployeeDetails createDetails(EmployeeDetails details) {
        Optional<EmployeeUser> user = userRepository.findById(details.getUser().getId());
        if (user.isPresent()) {
            return detailsRepository.save(details);
        }else{
            throw new RuntimeException("User not found with id: " + details.getUser().getId());
        }
    }


    @Override
    public List<EmployeeDetails> getAllDetails() {
        return detailsRepository.findAll();
    }

    @Override
    public Optional<EmployeeDetails> getDetailsById(Long id) {
        return detailsRepository.findById(id);
    }
}
