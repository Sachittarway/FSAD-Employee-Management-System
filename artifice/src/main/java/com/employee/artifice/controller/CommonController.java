package com.employee.artifice.controller;

import com.employee.artifice.dto.PasswordChangeRequest;
import com.employee.artifice.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/common")
@CrossOrigin(origins = "*")
public class CommonController {

    @Autowired
    CommonService commonService;


    @PostMapping("/updatePassword")
    public String updatePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        return commonService.updatePassword(passwordChangeRequest);
    }
    
}
