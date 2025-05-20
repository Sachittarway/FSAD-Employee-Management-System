package com.employee.artifice.controller;

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
    public String updatePassword(@RequestBody String newPassword) {
        return commonService.updatePassword(newPassword);
    }
    
}
