package com.example.controller;

import com.example.dto.FacultyStudentResponse;
import com.example.service.FacultyStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class FacultyStudentController {

    @Autowired
    private FacultyStudentService facultyStudentService;

    // Gets all students for your table!
    @GetMapping
    public List<FacultyStudentResponse> getAllStudents() {
        return facultyStudentService.getAllStudents();
    }

    // Gets a single student when you click "View" or "Edit"
    @GetMapping("/{id}")
    public FacultyStudentResponse getStudentById(@PathVariable Long id) {
        return facultyStudentService.getStudentById(id);
    }

    // Deletes a student when you click "Delete"
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        facultyStudentService.deleteStudent(id);
    }
}