package com.example.service;

import com.example.dto.FacultyStudentResponse;
import com.example.entity.AcademicDetails;
import com.example.entity.Registration;
import com.example.repository.AcademicDetailsRepository;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FacultyStudentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AcademicDetailsRepository academicDetailsRepository;

    public List<FacultyStudentResponse> getAllStudents() {
        List<Registration> users = userRepository.findAll();
        List<FacultyStudentResponse> responseList = new ArrayList<>();

        for (Registration user : users) {
            AcademicDetails details = academicDetailsRepository.findByEmail(user.getEmail())
                    .orElse(new AcademicDetails());
            
            responseList.add(mapToResponse(user, details));
        }
        return responseList;
    }

    public FacultyStudentResponse getStudentById(Long id) {
        Registration user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        AcademicDetails details = academicDetailsRepository.findByEmail(user.getEmail())
                .orElse(new AcademicDetails());

        return mapToResponse(user, details);
    }

    public void deleteStudent(Long id) {
        Registration user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        academicDetailsRepository.findByEmail(user.getEmail())
                .ifPresent(details -> academicDetailsRepository.delete(details));
                
        userRepository.delete(user);
    }

    private FacultyStudentResponse mapToResponse(Registration user, AcademicDetails details) {
        FacultyStudentResponse dto = new FacultyStudentResponse();
        
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setEnrollmentNumber(user.getEnrollmentNumber());
        
        dto.setMobileNumber(details.getMobileNumber());
        dto.setDepartment(details.getDepartment());
        dto.setSemester(details.getSemester());
        dto.setGender(details.getGender());
        dto.setDivision(details.getDivision());
        dto.setCgpaSem1(details.getCgpaSem1());
        dto.setCgpaSem2(details.getCgpaSem2());
        dto.setBacklog(details.getBacklog());
        dto.setHometown(details.getHometown());
        dto.setAddress(details.getAddress());
        dto.setPhotoPath(details.getPhotoPath());
        dto.setResumePath(details.getResumePath());
        
        return dto;
    }
}