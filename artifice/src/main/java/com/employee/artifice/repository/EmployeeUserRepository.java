package com.employee.artifice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.artifice.model.EmployeeUser;

public interface EmployeeUserRepository extends JpaRepository<EmployeeUser,Long> {
    EmployeeUser findByEmail(String email);

    // EmployeeUser findByRole(EmployeeUser.Role role);

    EmployeeUser findFirstByRole(EmployeeUser.Role role); // ✅ for single user
    List<EmployeeUser> findByRole(EmployeeUser.Role role); // ✅ for list/search
    List<EmployeeUser> findByEmailContainingIgnoreCase(String email);
    Long countByRole(EmployeeUser.Role role);
    List<EmployeeUser> findByEmployeeDetails_EmployeeNameContainingIgnoreCase(String name);

}
