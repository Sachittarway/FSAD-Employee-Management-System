package com.employee.artifice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.artifice.model.ResourceRequest;
import com.employee.artifice.repository.ResourceRequestRepository;

@Service
public class ResourceRequestServiceImpl implements ResourceRequestService{

    @Autowired
    ResourceRequestRepository resourceRequestRepository;

    @Override
    public ResourceRequest createResourceRequest(ResourceRequest resourceRequest) {
        return resourceRequestRepository.save(resourceRequest);
    }

    @Override
    public List<ResourceRequest> getAllResourceRequests() {
        return resourceRequestRepository.findAll();
    }

    @Override
    public List<ResourceRequest> getRequestsByManagerEmail(String managerEmail) {
        return resourceRequestRepository.findByManagerEmail(managerEmail);
    }

    @Override
    public List<ResourceRequest> getRequestsByEmployeeEmail(String employeeEmail) {
        return resourceRequestRepository.findByEmployeeEmail(employeeEmail);
    }
}
