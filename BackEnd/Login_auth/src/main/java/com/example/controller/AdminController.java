package com.example.controller;

import com.example.dto.ApplicationAdminResponse;
import com.example.entity.Application;
import com.example.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/applications")
    public List<ApplicationAdminResponse> getAllApplications() {
        return applicationService.getAllApplicationsForAdmin();
    }

    @PutMapping("/applications/{id}/status")
    public Application updateStatus(@PathVariable Long id,
                                     @RequestParam String round,
                                     @RequestParam String result) {
        return applicationService.updateRoundStatus(id, round, result);
    }
}


//package com.example.controller;
//
//import com.example.entity.Application;
//import com.example.service.ApplicationService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/admin")
//public class AdminController {
//
//    @Autowired
//    private ApplicationService applicationService;
//
//    @PutMapping("/applications/{id}/status")
//    public Application updateStatus(@PathVariable Long id,
//                                     @RequestParam String round,
//                                     @RequestParam String result) {
//        return applicationService.updateRoundStatus(id, round, result);
//    }
//}