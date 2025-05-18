package com.employee.artifice.service;

import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.model.UserPrincipal;
import com.employee.artifice.repository.EmployeeUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    EmployeeUserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        EmployeeUser user = repository.findByEmail(username);

        if(user == null){
            System.out.println("User not found");
            throw new UsernameNotFoundException("User Not Found !!");
        }
        return new UserPrincipal(user);
    }
}
