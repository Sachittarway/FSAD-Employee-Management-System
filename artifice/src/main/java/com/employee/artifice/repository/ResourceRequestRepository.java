package com.employee.artifice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.artifice.model.ResourceRequest;

public interface ResourceRequestRepository extends JpaRepository<ResourceRequest, Long> {
    
    List<ResourceRequest> findByManagerEmail(String managerEmail);

    List<ResourceRequest> findByEmployeeEmail(String managerEmail);

    Long countByAccept(Boolean accept);

}
