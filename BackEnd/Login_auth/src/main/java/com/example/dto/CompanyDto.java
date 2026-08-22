package com.example.dto;

public class CompanyDto {
    private String companyName;
    private String location;
    private String website;
    private Integer establishmentYear;
    private String internshipRole;
    private String internshipDuration;
    private String monthlyStipend;
    private String packageAmount; // Maps from React's "package"
    private String requiredSkills;
    private String hrName;
    private String hrMobile;
    private String hrEmail;
    private String round1;
    private String round2;
    private String round3;
    private String registrationStartDate;
    private String registrationEndDate;
    private String registrationStatus = "Inactive"; // Default value
    
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
	// --- Generate Getters and Setters here ---
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

    public String getPackageAmount() { return packageAmount; }
    public void setPackageAmount(String packageAmount) { this.packageAmount = packageAmount; }

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