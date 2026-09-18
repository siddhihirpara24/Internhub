package com.example.controller;

import com.example.entity.Application;
import com.example.repository.ApplicationRepository;
import com.example.repository.OptOutRequestRepository;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
public class StatsController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OptOutRequestRepository optOutRequestRepository;

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {
        List<Application> applications = applicationRepository.findAll();

        long registered = userRepository.count();
        long applied = applications.size();
        long aptitudePass = applications.stream().filter(a -> "Pass".equalsIgnoreCase(a.getAptitudeStatus())).count();
        long technicalPass = applications.stream().filter(a -> "Pass".equalsIgnoreCase(a.getTechnicalStatus())).count();
        long hrPass = applications.stream().filter(a -> "Pass".equalsIgnoreCase(a.getHrStatus())).count();
        long placed = applications.stream().filter(a -> "Selected".equalsIgnoreCase(a.getOverallStatus())).count();
        long rejected = applications.stream().filter(a -> "Rejected".equalsIgnoreCase(a.getOverallStatus())).count();
        long waiting = Math.max(applied - placed - rejected, 0);
        long optedOut = optOutRequestRepository.count();

        Map<String, Long> companyWiseApplications = applications.stream()
                .filter(a -> a.getCompany() != null)
                .collect(Collectors.groupingBy(Application::getCompany, Collectors.counting()));

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("registered", registered);
        result.put("applied", applied);
        result.put("aptitudePass", aptitudePass);
        result.put("technicalPass", technicalPass);
        result.put("hrPass", hrPass);
        result.put("placed", placed);
        result.put("rejected", rejected);
        result.put("waiting", waiting);
        result.put("optedOut", optedOut);
        result.put("companyWiseApplications", companyWiseApplications);
        return result;
    }
}