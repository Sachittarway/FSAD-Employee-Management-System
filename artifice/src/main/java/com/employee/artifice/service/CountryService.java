package com.employee.artifice.service;

import com.employee.artifice.model.Country;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CountryService {

    public List<Country> postAllCountries(List<Country> countries);
    public List<Country> getAllCountries();
}
