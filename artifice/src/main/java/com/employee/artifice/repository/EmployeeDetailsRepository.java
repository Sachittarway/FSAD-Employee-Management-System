package com.employee.artifice.repository;

import com.employee.artifice.model.EmployeeDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeDetailsRepository extends JpaRepository<EmployeeDetails,Long> {

    Optional<EmployeeDetails> findByUserEmail(String email);

    Optional<List<EmployeeDetails>> findByCurrentLocation(String currentLocation);
}
