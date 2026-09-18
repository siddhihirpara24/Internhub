package com.example.service;

import com.example.dto.InterviewScheduleDto;
import com.example.entity.Company;
import com.example.entity.InterviewSchedule;
import com.example.repository.CompanyRepository;
import com.example.repository.InterviewScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.repository.ApplicationRepository;

import java.util.List;

@Service
public class InterviewScheduleService {

	@Autowired 
	private ApplicationRepository applicationRepository;
	
    @Autowired
    private InterviewScheduleRepository scheduleRepository;

    @Autowired
    private CompanyRepository companyRepository;
    
    @Autowired
    private NotificationService notificationService;   // ← new field

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
        
        InterviewSchedule saved = scheduleRepository.save(schedule);
        try
        {
        	// ← new: notify only students who applied to this company
        	String title = "Interview Scheduled — " + company.getCompanyName();
        	String message = String.format(
        			"A %s round interview has been scheduled on %s at %s (%s). Venue: %s. Duration: %s.",
        			dto.getInterviewRound(), dto.getInterviewDate(), dto.getInterviewTime(),
        			dto.getInterviewMode(), dto.getVenue(), dto.getDuration()
        			);
        	 int applicantCount =
                     applicationRepository
                             .findByCompanyIgnoreCase(company.getCompanyName())
                             .size();

             System.out.println(
                     "Interview scheduled for '"
                             + company.getCompanyName()
                             + "' — notifying "
                             + applicantCount
                             + " applicant(s)."
             );
             
             notificationService.notifyApplicantsOfCompany(company.getCompanyName(), "Interview", title, message);
        } catch (Exception ex) {

            System.err.println(
                    "Failed to create notifications for company '"
                            + company.getCompanyName()
                            + "': "
                            + ex.getMessage()
            );

            ex.printStackTrace();
        }

        return saved;
        // 3. Save to database
//        return scheduleRepository.save(schedule);
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