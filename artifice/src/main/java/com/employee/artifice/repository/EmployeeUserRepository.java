package com.employee.artifice.repository;

import com.employee.artifice.model.EmployeeUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeUserRepository extends JpaRepository<EmployeeUser,Long> {
    EmployeeUser findByEmail(String email);

    EmployeeUser findByRole(EmployeeUser.Role role);
}
