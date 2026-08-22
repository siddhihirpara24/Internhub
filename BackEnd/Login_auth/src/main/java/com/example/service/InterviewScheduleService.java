package com.example.service;

import com.example.dto.InterviewScheduleDto;
import com.example.entity.Company;
import com.example.entity.InterviewSchedule;
import com.example.repository.CompanyRepository;
import com.example.repository.InterviewScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewScheduleService {

    @Autowired
    private InterviewScheduleRepository scheduleRepository;

    @Autowired
    private CompanyRepository companyRepository;

    public InterviewSchedule addSchedule(InterviewScheduleDto dto) {
        // 1. Fetch the full company entity from database using the companyId sent by React
        Company company = companyRepository.findById(dto.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + dto.getCompanyId()));

        // 2. Map the incoming DTO to our new Entity
        InterviewSchedule schedule = new InterviewSchedule();
        schedule.setCompany(company); // This links the tables!
        schedule.setInterviewRound(dto.getInterviewRound());
        schedule.setInterviewDate(dto.getInterviewDate());
        schedule.setInterviewTime(dto.getInterviewTime());
        schedule.setDuration(dto.getDuration());
        schedule.setInterviewMode(dto.getInterviewMode());
        schedule.setVenue(dto.getVenue());

        // 3. Save to database
        return scheduleRepository.save(schedule);
    }

    // Needed for your React Table to fetch all schedules
    public List<InterviewSchedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    // Needed for your React Trash Can icon to delete schedules
    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }
    
    // Fetch a single schedule by ID for the View Page
    public InterviewSchedule getScheduleById(Long id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview Schedule not found with id: " + id));
    }
    
    public InterviewSchedule updateSchedule(Long id, InterviewScheduleDto dto) {
        InterviewSchedule existingSchedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview Schedule not found with id: " + id));

        Company company = companyRepository.findById(dto.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + dto.getCompanyId()));

        existingSchedule.setCompany(company);
        existingSchedule.setInterviewRound(dto.getInterviewRound());
        existingSchedule.setInterviewDate(dto.getInterviewDate());
        existingSchedule.setInterviewTime(dto.getInterviewTime());
        existingSchedule.setDuration(dto.getDuration());
        existingSchedule.setInterviewMode(dto.getInterviewMode());
        existingSchedule.setVenue(dto.getVenue());

        return scheduleRepository.save(existingSchedule);
    }
}