package com.example.service;

import com.example.dto.ApplicationAdminResponse;
import com.example.dto.ApplyRequest;
import com.example.entity.AcademicDetails;
import com.example.entity.Application;
import com.example.repository.AcademicDetailsRepository;
import com.example.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import com.example.entity.Registration; 
import com.example.repository.UserRepository;

@Service
public class ApplicationService {

	@Autowired 
	private UserRepository userRepository;
	
    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private AcademicDetailsRepository academicDetailsRepository;

    public String apply(String email, ApplyRequest request) {
        // A placed student cannot apply to any further company
        boolean alreadyPlaced = applicationRepository.findByEmail(email).stream()
                .anyMatch(app -> "Selected".equalsIgnoreCase(app.getOverallStatus()));
        if (alreadyPlaced) {
            return "You are already placed and cannot apply for further internships.";
        }

        boolean alreadyApplied = applicationRepository
                .findByEmailAndCompanyAndRole(email, request.getCompany(), request.getRole())
                .isPresent();

        if (alreadyApplied) {
            return "Already applied";
        }

        Application app = new Application();
        app.setEmail(email);
        app.setEnrollmentNumber(request.getEnrollmentNumber());
        app.setFullName(request.getFullName());
        app.setHometown(request.getHometown());
        app.setCategory(request.getCategory());
        app.setCompany(request.getCompany());
        app.setRole(request.getRole());
        app.setAppliedDate(LocalDate.now());

        applicationRepository.save(app);
        return "Applied successfully";
    }

    public List<Application> getMyApplications(String email) {
        return applicationRepository.findByEmail(email);
    }

    // ---- Admin-facing list (Applied Students / Placed Students pages) ----
    public List<ApplicationAdminResponse> getAllApplicationsForAdmin() {
        List<Application> applications = applicationRepository.findAll();
        List<ApplicationAdminResponse> result = new ArrayList<>();

        for (Application app : applications) {
            ApplicationAdminResponse dto = new ApplicationAdminResponse();
            dto.setId(app.getId());
            dto.setEmail(app.getEmail());
            dto.setEnrollmentNumber(app.getEnrollmentNumber());
            dto.setFullName(app.getFullName());
            dto.setCompany(app.getCompany());
            dto.setRole(app.getRole());
            dto.setAppliedDate(app.getAppliedDate() != null ? app.getAppliedDate().toString() : "");
            dto.setAptitudeStatus(app.getAptitudeStatus());
            dto.setTechnicalStatus(app.getTechnicalStatus());
            dto.setHrStatus(app.getHrStatus());
            dto.setOverallStatus(app.getOverallStatus());

            AcademicDetails details = academicDetailsRepository.findByEmail(app.getEmail()).orElse(null);
            if (details != null) {
                dto.setDepartment(details.getDepartment());
                dto.setSemester(details.getSemester());
                dto.setPhotoPath(details.getPhotoPath());
                dto.setMobileNumber(details.getMobileNumber());
            }
            
            Registration registration = userRepository.findByEmail(app.getEmail()).orElse(null);
            if (registration != null) {
                dto.setStudentId(registration.getId());
            }

            result.add(dto);
        }
        return result;
    }

    // ---- Admin-facing update (Applied Students round management) ----
    public Application updateRoundStatus(Long applicationId, String round, String result) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        switch (round.toLowerCase()) {
            case "aptitude" -> app.setAptitudeStatus(result);
            case "technical" -> app.setTechnicalStatus(result);
            case "hr" -> app.setHrStatus(result);
        }

        if ("Fail".equalsIgnoreCase(app.getAptitudeStatus())
                || "Fail".equalsIgnoreCase(app.getTechnicalStatus())
                || "Fail".equalsIgnoreCase(app.getHrStatus())) {
            app.setOverallStatus("Rejected");
        } else if ("Pass".equalsIgnoreCase(app.getAptitudeStatus())
                && "Pass".equalsIgnoreCase(app.getTechnicalStatus())
                && "Pass".equalsIgnoreCase(app.getHrStatus())) {
            app.setOverallStatus("Selected");
        } else {
            app.setOverallStatus("Under Review");
        }

        return applicationRepository.save(app);
    }
}



//package com.example.service;
//
//import com.example.dto.ApplyRequest;
//import com.example.entity.Application;
//import com.example.repository.ApplicationRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import java.time.LocalDate;
//import java.util.List;
//
//@Service
//public class ApplicationService {
//
//    @Autowired
//    private ApplicationRepository applicationRepository;
//
//    public String apply(String email, ApplyRequest request) {
//        boolean alreadyApplied = applicationRepository
//                .findByEmailAndCompanyAndRole(email, request.getCompany(), request.getRole())
//                .isPresent();
//
//        if (alreadyApplied) {
//            return "Already applied";
//        }
//
//        Application app = new Application();
//        app.setEmail(email);
//        app.setEnrollmentNumber(request.getEnrollmentNumber());
//        app.setFullName(request.getFullName());
//        app.setHometown(request.getHometown());
//        app.setCategory(request.getCategory());
//        app.setCompany(request.getCompany());
//        app.setRole(request.getRole());
//        app.setAppliedDate(LocalDate.now());
//
//        applicationRepository.save(app);
//        return "Applied successfully";
//    }
//
//    public List<Application> getMyApplications(String email) {
//        return applicationRepository.findByEmail(email);
//    }
//
//    // ---- Admin-facing update (used later by an Admin panel) ----
//    public Application updateRoundStatus(Long applicationId, String round, String result) {
//        Application app = applicationRepository.findById(applicationId)
//                .orElseThrow(() -> new RuntimeException("Application not found"));
//
//        switch (round.toLowerCase()) {
//            case "aptitude" -> app.setAptitudeStatus(result);
//            case "technical" -> app.setTechnicalStatus(result);
//            case "hr" -> app.setHrStatus(result);
//        }
//
//        // auto-derive overall status
//        if ("Fail".equalsIgnoreCase(app.getAptitudeStatus())
//                || "Fail".equalsIgnoreCase(app.getTechnicalStatus())
//                || "Fail".equalsIgnoreCase(app.getHrStatus())) {
//            app.setOverallStatus("Rejected");
//        } else if ("Pass".equalsIgnoreCase(app.getAptitudeStatus())
//                && "Pass".equalsIgnoreCase(app.getTechnicalStatus())
//                && "Pass".equalsIgnoreCase(app.getHrStatus())) {
//            app.setOverallStatus("Selected");
//        } else {
//            app.setOverallStatus("Under Review");
//        }
//
//        return applicationRepository.save(app);
//    }
//}