package com.example.service;

import com.example.dto.CompanyDto;
import com.example.entity.Company;
import com.example.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public Company addCompany(CompanyDto dto) {
        Company company = new Company();
        
        // Map DTO to Entity
        company.setCompanyName(dto.getCompanyName());
        company.setLocation(dto.getLocation());
        company.setWebsite(dto.getWebsite());
        company.setEstablishmentYear(dto.getEstablishmentYear());
        company.setInternshipRole(dto.getInternshipRole());
        company.setInternshipDuration(dto.getInternshipDuration());
        company.setMonthlyStipend(dto.getMonthlyStipend());
        company.setCtcPackage(dto.getPackageAmount()); // Mapping 'packageAmount' to 'ctcPackage'
        company.setRequiredSkills(dto.getRequiredSkills());
        
        company.setHrName(dto.getHrName());
        company.setHrMobile(dto.getHrMobile());
        company.setHrEmail(dto.getHrEmail());
        
        company.setRound1(dto.getRound1());
        company.setRound2(dto.getRound2());
        company.setRound3(dto.getRound3());
        
        // 👇 FIX: Default Registration Status for new companies to prevent [null] in DB
        company.setRegistrationStatus("Inactive");
        
        return companyRepository.save(company);
    }
    
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }
    
    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }

    public Company updateCompany(Long id, CompanyDto companyDto) {
        // 1. Find the existing company in the database
        Company existingCompany = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
        
        // 2. Update all the basic fields
        existingCompany.setCompanyName(companyDto.getCompanyName());
        existingCompany.setLocation(companyDto.getLocation());
        existingCompany.setWebsite(companyDto.getWebsite()); 
        existingCompany.setEstablishmentYear(companyDto.getEstablishmentYear()); 
        existingCompany.setInternshipRole(companyDto.getInternshipRole());
        existingCompany.setInternshipDuration(companyDto.getInternshipDuration());
        existingCompany.setMonthlyStipend(companyDto.getMonthlyStipend());
        existingCompany.setCtcPackage(companyDto.getPackageAmount()); 
        existingCompany.setRequiredSkills(companyDto.getRequiredSkills());

        existingCompany.setHrName(companyDto.getHrName());
        existingCompany.setHrMobile(companyDto.getHrMobile());
        existingCompany.setHrEmail(companyDto.getHrEmail());
        
        // 3. Update Interview Rounds
        existingCompany.setRound1(companyDto.getRound1());
        existingCompany.setRound2(companyDto.getRound2());
        existingCompany.setRound3(companyDto.getRound3());
        
        // 4. Update Registration details safely
        // 👇 FIX: This safety check ensures we don't accidentally overwrite an "Active" company with nulls when editing basic details
        if (companyDto.getRegistrationStatus() != null && !companyDto.getRegistrationStatus().isEmpty()) {
            existingCompany.setRegistrationStartDate(companyDto.getRegistrationStartDate());
            existingCompany.setRegistrationEndDate(companyDto.getRegistrationEndDate());
            existingCompany.setRegistrationStatus(companyDto.getRegistrationStatus());
        }

        // 5. Save the updated company back to the database
        return companyRepository.save(existingCompany);
    }
    
    public Company updateRegistration(Long id, CompanyDto dto) {
        // 1. Find the company by ID
        Company existingCompany = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
                
        // 2. Only update the registration fields
        existingCompany.setRegistrationStartDate(dto.getRegistrationStartDate());
        existingCompany.setRegistrationEndDate(dto.getRegistrationEndDate());
        existingCompany.setRegistrationStatus(dto.getRegistrationStatus());
        
        // 3. Save it to the database
        return companyRepository.save(existingCompany);
    }

    public Company getCompanyById(Long id) {
        return companyRepository.findById(id).orElseThrow(() -> new RuntimeException("Company not found"));
    }
}