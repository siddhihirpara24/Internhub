package com.example.service;

import com.example.dto.*;

import com.example.entity.*;
import com.example.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;

@Service
public class AcademicService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AcademicDetailsRepository academicDetailsRepository;

    public AcademicDetailsResponse getAcademicDetails(String email) {
        Registration user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        AcademicDetails details = academicDetailsRepository.findByEmail(email)
                .orElse(new AcademicDetails());

        return buildResponse(user, details);
    }

    public AcademicDetailsResponse saveAcademicDetails(String email, AcademicDetailsRequest request) {
        Registration user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        AcademicDetails details = academicDetailsRepository.findByEmail(email)
                .orElse(new AcademicDetails());

        details.setEmail(email);
        details.setDepartment(request.getDepartment());
        details.setSemester(request.getSemester());
        details.setMobileNumber(request.getMobileNumber());
        details.setGender(request.getGender());
        details.setDivision(request.getDivision());
        details.setCgpaSem1(request.getCgpaSem1());
        details.setCgpaSem2(request.getCgpaSem2());
        details.setBacklog(request.getBacklog());
        details.setHometown(request.getHometown());
        details.setAddress(request.getAddress());

        academicDetailsRepository.save(details);

        return buildResponse(user, details);
    }

    private AcademicDetailsResponse buildResponse(Registration user, AcademicDetails d) {
        int percentage = calculatePercentage(user,d);
        return new AcademicDetailsResponse(
                user.getName(),
                user.getEmail(),
                user.getEnrollmentNumber(),
                d.getDepartment(),
                d.getSemester(),
                d.getMobileNumber(),
                d.getGender(),
                d.getDivision(),
                d.getCgpaSem1(),
                d.getCgpaSem2(),
                d.getBacklog(),
                d.getHometown(),
                d.getAddress(),
                percentage,
                d.getResumePath(), d.getPhotoPath()
        );
    }

    private int calculatePercentage(Registration user, AcademicDetails d) {
        String[] fields = {
        		user.getName(), user.getEmail(), user.getEnrollmentNumber(), d.getDepartment(), 
                d.getSemester(), d.getMobileNumber(), d.getGender(), d.getDivision(), d.getCgpaSem1(), 
                d.getCgpaSem2(),  d.getBacklog(), d.getHometown(), d.getAddress(),
                d.getResumePath(), d.getPhotoPath()
                
        };
        int filled = 0;
        for (String f : fields) {
            if (f != null && !f.isBlank()) filled++;
        }
        return (int) Math.round((filled / (double) fields.length) * 100);
    }
    
    public AcademicDetailsResponse uploadResume(String email, MultipartFile file) throws IOException {
        return storeFile(email, file, "resumes", true);
    }

    public AcademicDetailsResponse uploadPhoto(String email, MultipartFile file) throws IOException {
        return storeFile(email, file, "photos", false);
    }

    private AcademicDetailsResponse storeFile(String email, MultipartFile file, String folder, boolean isResume) throws IOException {
        Registration user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        AcademicDetails details = academicDetailsRepository.findByEmail(email)
                .orElse(new AcademicDetails());
        details.setEmail(email);

        String uploadDir = "uploads/" + folder + "/";
        Files.createDirectories(Paths.get(uploadDir));

        String filename = email.replace("@", "_") + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        String relativePath = "/uploads/" + folder + "/" + filename;
        if (isResume) {
            details.setResumePath(relativePath);
        } else {
            details.setPhotoPath(relativePath);
        }

        academicDetailsRepository.save(details);
        return buildResponse(user, details);
    }
    
    public ProfileResponse getProfile(String email) {
        Registration user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        AcademicDetails details = academicDetailsRepository.findByEmail(email)
                .orElse(new AcademicDetails());

        return new ProfileResponse(user.getName(), details.getPhotoPath());
    }
}