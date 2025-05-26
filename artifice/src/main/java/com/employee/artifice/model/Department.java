package com.employee.artifice.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    Long id;
    
    @Column(name="department_name")
    String department_name;

    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<EmployeeDetails> users;

    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Project> projects;

}
