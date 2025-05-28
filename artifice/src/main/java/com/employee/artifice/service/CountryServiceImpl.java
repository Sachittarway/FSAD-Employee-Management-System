package com.employee.artifice.service;

import com.employee.artifice.model.Country;
import com.employee.artifice.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    CountryRepository countryRepository;

    @Override
    public List<Country> postAllCountries(List<Country> countries) {
        return countryRepository.saveAll(countries);
    }

    @Override
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }
}
