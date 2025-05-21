package com.employee.artifice.service;

import com.employee.artifice.dto.PasswordChangeRequest;
import org.springframework.stereotype.Service;

@Service
public interface CommonService {

    public String updatePassword(PasswordChangeRequest passwordChangeRequest);
}
