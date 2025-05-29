package com.employee.artifice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.employee.artifice.model.PreEmploymentDetails;

@Repository
public interface PreEmploymentDetailsRepository extends JpaRepository<PreEmploymentDetails, Long> {
    List<PreEmploymentDetails> findByEmployee_User_Id(Long userId);
}