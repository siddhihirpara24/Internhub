package com.example.dto;

public class InterviewScheduleDto {
    
    private Long companyId;
    private String interviewRound;
    private String interviewDate;
    private String interviewTime;
    private String duration;
    private String interviewMode;
    private String venue;

    // --- Getters and Setters ---
    
    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getInterviewRound() { return interviewRound; }
    public void setInterviewRound(String interviewRound) { this.interviewRound = interviewRound; }

    public String getInterviewDate() { return interviewDate; }
    public void setInterviewDate(String interviewDate) { this.interviewDate = interviewDate; }

    public String getInterviewTime() { return interviewTime; }
    public void setInterviewTime(String interviewTime) { this.interviewTime = interviewTime; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getInterviewMode() { return interviewMode; }
    public void setInterviewMode(String interviewMode) { this.interviewMode = interviewMode; }

    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }
}