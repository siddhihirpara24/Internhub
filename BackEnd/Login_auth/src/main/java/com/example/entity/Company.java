package com.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Company Information
    @Column(nullable = false)
    private String companyName;
    
    @Column(nullable = false)
    private String location;
    
    private String website;
    private Integer establishmentYear;
    
    @Column(nullable = false)
    private String internshipRole;
    
    @Column(nullable = false)
    private String internshipDuration;
    
    private String monthlyStipend;
    
    @Column(name = "ctc_package") // package is a reserved keyword in Java
    private String ctcPackage; 
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String requiredSkills;

    // HR Information
    @Column(nullable = false)
    private String hrName;
    
    @Column(nullable = false)
    private String hrMobile;
    
    @Column(nullable = false)
    private String hrEmail;

    // Interview Round Configuration
    @Column(nullable = false)
    private String round1;
    
    @Column(nullable = false)
    private String round2;
    
    @Column(nullable = false)
    private String round3;
    
    private String registrationStartDate;
    private String registrationEndDate;
    private String registrationStatus = "Inactive"; // Default value

    // Default Constructor
    public Company() {}

    // --- Generate Getters and Setters ---
    
    public String getRegistrationStartDate() {
		return registrationStartDate;
	}

	public void setRegistrationStartDate(String registrationStartDate) {
		this.registrationStartDate = registrationStartDate;
	}

	public String getRegistrationEndDate() {
		return registrationEndDate;
	}

	public void setRegistrationEndDate(String registrationEndDate) {
		this.registrationEndDate = registrationEndDate;
	}

	public String getRegistrationStatus() {
		return registrationStatus;
	}

	public void setRegistrationStatus(String registrationStatus) {
		this.registrationStatus = registrationStatus;
	}

	public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public Integer getEstablishmentYear() { return establishmentYear; }
    public void setEstablishmentYear(Integer establishmentYear) { this.establishmentYear = establishmentYear; }

    public String getInternshipRole() { return internshipRole; }
    public void setInternshipRole(String internshipRole) { this.internshipRole = internshipRole; }

    public String getInternshipDuration() { return internshipDuration; }
    public void setInternshipDuration(String internshipDuration) { this.internshipDuration = internshipDuration; }

    public String getMonthlyStipend() { return monthlyStipend; }
    public void setMonthlyStipend(String monthlyStipend) { this.monthlyStipend = monthlyStipend; }

    public String getCtcPackage() { return ctcPackage; }
    public void setCtcPackage(String ctcPackage) { this.ctcPackage = ctcPackage; }

    public String getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(String requiredSkills) { this.requiredSkills = requiredSkills; }

    public String getHrName() { return hrName; }
    public void setHrName(String hrName) { this.hrName = hrName; }

    public String getHrMobile() { return hrMobile; }
    public void setHrMobile(String hrMobile) { this.hrMobile = hrMobile; }

    public String getHrEmail() { return hrEmail; }
    public void setHrEmail(String hrEmail) { this.hrEmail = hrEmail; }

    public String getRound1() { return round1; }
    public void setRound1(String round1) { this.round1 = round1; }

    public String getRound2() { return round2; }
    public void setRound2(String round2) { this.round2 = round2; }

    public String getRound3() { return round3; }
    public void setRound3(String round3) { this.round3 = round3; }
}