package com.employee.artifice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee.artifice.dto.DashboardCountsDTO;
import com.employee.artifice.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/counts")
    public ResponseEntity<DashboardCountsDTO> getDashboardCounts() {
        DashboardCountsDTO counts = dashboardService.getDashboardCounts();
        return ResponseEntity.ok(counts);
    }
}