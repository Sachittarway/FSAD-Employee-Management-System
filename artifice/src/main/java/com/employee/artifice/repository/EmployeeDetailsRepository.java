package com.employee.artifice.repository;

import com.employee.artifice.model.EmployeeDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeDetailsRepository extends JpaRepository<EmployeeDetails,Long> {
}
