package com.employee.artifice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.artifice.model.EmployeeDetails;

public interface EmployeeDetailsRepository extends JpaRepository<EmployeeDetails,Long> {

    Optional<EmployeeDetails> findByUserEmail(String email);
    Optional<EmployeeDetails> findByUserId(Long userId);
    Optional<List<EmployeeDetails>> findByCurrentLocation(String currentLocation);
}
