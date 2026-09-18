package com.example.controller;

import com.example.dto.FacultyStudentResponse;

import com.example.service.FacultyStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
    
    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> downloadStudentPdf(@PathVariable Long id) {
        byte[] pdfBytes = facultyStudentService.generateStudentPdf(id);
        FacultyStudentResponse student = facultyStudentService.getStudentById(id);

        String safeName = (student.getEnrollmentNumber() != null ? student.getEnrollmentNumber() : "student")
                .replaceAll("[^a-zA-Z0-9_-]", "_");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", safeName + "_report.pdf");

        return ResponseEntity.ok().headers(headers).body(pdfBytes);
    }
}