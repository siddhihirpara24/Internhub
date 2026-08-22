package com.example.controller;

import com.example.dto.CompanyDto;
import com.example.entity.Company;
import com.example.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
@CrossOrigin(origins = "*") // Allows React frontend to make requests without CORS errors
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    // We use ResponseEntity<?> so we can return a Company on success, or a String on error
    @PostMapping("/add")
    public ResponseEntity<?> addCompany(@RequestBody CompanyDto companyDto) {
        try {
            // 1. Try to save the company to the database
            Company savedCompany = companyService.addCompany(companyDto);
            
            // 2. If successful, return the saved company data with a 201 (CREATED) status
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCompany);
            
        } catch (Exception e) {
            // 3. If it fails, print the exact error in your Eclipse console so you can debug
            e.printStackTrace();
            
            // 4. Send a clean error message back to your React frontend
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add company. Reason: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCompanies() {
        try {
            // 1. Fetch all companies from the database
            List<Company> companies = companyService.getAllCompanies();
            
            // 2. Return the list with a 200 (OK) status
            return ResponseEntity.ok(companies);
            
        } catch (Exception e) {
            // 3. Handle any database errors
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch companies. Reason: " + e.getMessage());
        }
    }
    
 // 1. DELETE Company
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    // 2. ACTIVATE / DEACTIVATE Registration
    // ACTIVATE / DEACTIVATE Registration
    @PutMapping("/{id}/registration")
    public ResponseEntity<?> updateRegistration(@PathVariable Long id, @RequestBody CompanyDto dto) {
        try {
            Company updatedCompany = companyService.updateRegistration(id, dto);
            return ResponseEntity.ok(updatedCompany);
        } catch (Exception e) {
            e.printStackTrace(); // This will print the exact error in your Eclipse console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update registration. Reason: " + e.getMessage());
        }
    }
    
    // UPDATE FULL COMPANY DETAILS
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCompany(@PathVariable Long id, @RequestBody CompanyDto companyDto) {
        try {
            Company updatedCompany = companyService.updateCompany(id, companyDto);
            return ResponseEntity.ok(updatedCompany);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update company. Reason: " + e.getMessage());
        }
    }

    // 3. GET SINGLE COMPANY (For your View/Edit pages later)
    @GetMapping("/{id}")
    public ResponseEntity<?> getCompanyById(@PathVariable Long id) {
        Company company = companyService.getCompanyById(id);
        return ResponseEntity.ok(company);
    }
}