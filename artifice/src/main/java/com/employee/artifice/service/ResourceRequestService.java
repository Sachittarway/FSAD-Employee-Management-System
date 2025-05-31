package com.employee.artifice.service;

import java.util.List;

import com.employee.artifice.model.ResourceRequest;

public interface ResourceRequestService {

    public ResourceRequest createResourceRequest(ResourceRequest resourceRequest);

    public List<ResourceRequest> getAllResourceRequests();

    public List<ResourceRequest> getRequestsByManagerEmail(String managerEmail);

    public List<ResourceRequest> getRequestsByEmployeeEmail(String managerEmail);

    public ResourceRequest updateRequestStatus(Long requestId);

}
