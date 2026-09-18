package com.example.dto;

public class ApplicationAdminResponse {

    private Long id;
    private String email;
    private String enrollmentNumber;
    private String fullName;
    private String company;
    private String role;
    private String appliedDate;

    private String aptitudeStatus;
    private String technicalStatus;
    private String hrStatus;
    private String overallStatus;

    private String department;
    private String semester;
    private String photoPath;
    private String mobileNumber;
    private Long studentId; // the actual Registration/student ID, for the "View" button
    
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getEnrollmentNumber() { return enrollmentNumber; }
    public void setEnrollmentNumber(String enrollmentNumber) { this.enrollmentNumber = enrollmentNumber; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getAppliedDate() { return appliedDate; }
    public void setAppliedDate(String appliedDate) { this.appliedDate = appliedDate; }
    public String getAptitudeStatus() { return aptitudeStatus; }
    public void setAptitudeStatus(String aptitudeStatus) { this.aptitudeStatus = aptitudeStatus; }
    public String getTechnicalStatus() { return technicalStatus; }
    public void setTechnicalStatus(String technicalStatus) { this.technicalStatus = technicalStatus; }
    public String getHrStatus() { return hrStatus; }
    public void setHrStatus(String hrStatus) { this.hrStatus = hrStatus; }
    public String getOverallStatus() { return overallStatus; }
    public void setOverallStatus(String overallStatus) { this.overallStatus = overallStatus; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
    public String getPhotoPath() { return photoPath; }
    public void setPhotoPath(String photoPath) { this.photoPath = photoPath; }
    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
}