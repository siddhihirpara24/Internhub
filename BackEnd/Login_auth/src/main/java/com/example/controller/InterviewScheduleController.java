package com.example.controller;

import com.example.dto.InterviewScheduleDto;
import com.example.entity.InterviewSchedule;
import com.example.service.InterviewScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview-schedule")
@CrossOrigin(origins = "*") // Allows React to connect
public class InterviewScheduleController {

    @Autowired
    private InterviewScheduleService scheduleService;

    // Handles the POST request to save the schedule (Add Interview Form)
    @PostMapping
    public ResponseEntity<?> addSchedule(@RequestBody InterviewScheduleDto dto) {
        try {
            InterviewSchedule savedSchedule = scheduleService.addSchedule(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSchedule);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add interview schedule. Reason: " + e.getMessage());
        }
    }

    // Handles the GET request to fetch all schedules (React Table)
    @GetMapping
    public ResponseEntity<?> getAllSchedules() {
        try {
            List<InterviewSchedule> schedules = scheduleService.getAllSchedules();
            return ResponseEntity.ok(schedules);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch schedules. Reason: " + e.getMessage());
        }
    }
    
    // Handles the GET request for a specific interview by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getScheduleById(@PathVariable Long id) {
        try {
            InterviewSchedule schedule = scheduleService.getScheduleById(id);
            return ResponseEntity.ok(schedule);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Failed to fetch schedule details: " + e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSchedule(@PathVariable Long id, @RequestBody InterviewScheduleDto dto) {
        try {
            InterviewSchedule updatedSchedule = scheduleService.updateSchedule(id, dto);
            return ResponseEntity.ok(updatedSchedule);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update schedule: " + e.getMessage());
        }
    }

    // Handles the DELETE request (Trash Can Button)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long id) {
        try {
            scheduleService.deleteSchedule(id);
            return ResponseEntity.ok("Deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete schedule. Reason: " + e.getMessage());
        }
    }
}