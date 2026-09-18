package com.example.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.dto.OptOutRequestDto;
import com.example.entity.AcademicDetails;
import com.example.entity.OptOutRequest;
import com.example.entity.Registration;
import com.example.repository.AcademicDetailsRepository;
import com.example.repository.OptOutRequestRepository;
import com.example.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OptOutRequestService {

    private final UserRepository registrationRepository;

    private final AcademicDetailsRepository academicDetailsRepository;

    private final OptOutRequestRepository optOutRequestRepository;


    // =========================================================
    // GET STUDENT DETAILS
    // Login thayela student na email thi details fetch karse
    // =========================================================

    public Map<String, Object> getStudentDetails(String email) {

        // Registration table mathi student fetch
        Registration registration = registrationRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student registration details not found"
                        )
                );


        // Academic details table mathi student fetch
        AcademicDetails academicDetails = academicDetailsRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student academic details not found"
                        )
                );


        // Frontend ne mokalva mate data
        Map<String, Object> data = new HashMap<>();


        // Registration table
        data.put("studentName", registration.getName());

        data.put(
                "enrollmentNo",
                registration.getEnrollmentNumber()
        );

        data.put(
                "email",
                registration.getEmail()
        );

        data.put(
                "mobile",
                registration.getMobileNumber()
        );


        // Academic Details table
        data.put(
                "department",
                academicDetails.getDepartment()
        );

        data.put(
                "semester",
                academicDetails.getSemester()
        );


        return data;
    }


    // =========================================================
    // SAVE OPT-OUT REQUEST
    // Frontend mathi only reason + detailedReason aavse
    // registrationId ane academicId backend automatic lese
    // =========================================================

    @Transactional
    public OptOutRequest saveRequest(
            String email,
            OptOutRequestDto dto) {


        // 1. Registration table mathi student fetch
        Registration registration = registrationRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student registration details not found"
                        )
                );


        // 2. Academic details table mathi student fetch
        AcademicDetails academicDetails =
                academicDetailsRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student academic details not found"
                                )
                        );


        // 3. Check student already submitted ke nahi
        if (optOutRequestRepository
                .existsByRegistrationId(registration.getId())) {

            throw new RuntimeException(
                    "Opt-out request already submitted"
            );
        }


        // 4. New Opt-Out object
        OptOutRequest request = new OptOutRequest();


        // Registration table mathi ID automatic
        request.setRegistrationId(
                registration.getId()
        );


        // Academic table mathi ID automatic
        request.setAcademicId(
                academicDetails.getId()
        );


        // 5. Frontend mathi aavela only 2 fields
        request.setReason(
                dto.getReason()
        );

        request.setDetailedReason(
                dto.getDetailedReason()
        );


        // 6. opt_out table ma save
        return optOutRequestRepository.save(request);
    }
    
    // ==========================================================
    // GET ALL OPT-OUT REQUESTS (FOR FACULTY PANEL)
    // ==========================================================
    public List<Map<String, Object>> getAllOptOutRequests() {
        List<OptOutRequest> optOuts = optOutRequestRepository.findAll();
        List<Map<String, Object>> responseList = new java.util.ArrayList<>();

        for (OptOutRequest opt : optOuts) {
            Map<String, Object> map = new HashMap<>();
            
            // Fetch from database
            Optional<Registration> regOpt = registrationRepository.findById(opt.getRegistrationId());
            Optional<AcademicDetails> acadOpt = academicDetailsRepository.findById(opt.getAcademicId());

            // 🌟 FIXED: Even if Registration or Academic details are missing from the DB, DON'T hide the row!
            Registration reg = regOpt.orElse(null);
            AcademicDetails acad = acadOpt.orElse(null);

            map.put("id", opt.getId());
            
            // Safely get data. If it's missing in DB, it shows "Unknown"
            map.put("studentName", reg != null ? reg.getName() : "Unknown (ID missing)");
            map.put("email", reg != null ? reg.getEmail() : "Unknown Email");
            
            // NOTE: Make sure to use your correct getter name here! (e.g. getEnrollmentNumber() or getEnrollmentNo())
            map.put("enrollmentNo", reg != null && reg.getEnrollmentNumber() != null ? reg.getEnrollmentNumber() : "-");
            
            map.put("department", acad != null && acad.getDepartment() != null ? acad.getDepartment() : "-");
            map.put("semester", acad != null && acad.getSemester() != null ? acad.getSemester() : "-");
            
            map.put("reason", opt.getReason());
            map.put("detailedReason", opt.getDetailedReason());
            
            responseList.add(map);
        }
        return responseList;
    }
    
    // ==========================================================
    // DELETE OPT-OUT REQUEST
    // ==========================================================
    public void deleteRequest(Long id) {
        if (!optOutRequestRepository.existsById(id)) {
            throw new RuntimeException("Opt-Out request not found!");
        }
        optOutRequestRepository.deleteById(id);
    }
    
    public boolean hasOptedOut(String email) {
        Registration registration = registrationRepository.findByEmail(email).orElse(null);
        if (registration == null) {
            return false;
        }
        return optOutRequestRepository.existsByRegistrationId(registration.getId());
    }
}