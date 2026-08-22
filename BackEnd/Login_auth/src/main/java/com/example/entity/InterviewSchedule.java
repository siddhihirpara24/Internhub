package com.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "interview_schedules")
public class InterviewSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interview_id") // Explicitly names the column in PostgreSQL/MySQL
    private Long interviewId;

    // Links the Schedule directly to the Company table
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String interviewRound;

    @Column(nullable = false)
    private String interviewDate;

    @Column(nullable = false)
    private String interviewTime;

    @Column(nullable = false)
    private String duration;

    @Column(nullable = false)
    private String interviewMode;

    @Column(nullable = false)
    private String venue;

    // --- Getters and Setters ---
    
    public Long getInterviewId() { return interviewId; }
    public void setInterviewId(Long interviewId) { this.interviewId = interviewId; }

    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }

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