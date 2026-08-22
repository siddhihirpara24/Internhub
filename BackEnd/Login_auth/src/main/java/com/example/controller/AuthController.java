package com.example.controller;

import com.example.dto.*;
/**/
import org.springframework.http.ResponseEntity;
/**/
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return userService.loginAndSendOtp(request);
    }
    
    @PostMapping("/verify-otp")
    public AuthResponse verifyOtp(@RequestBody OtpVerifyRequest request) {
        return userService.verifyOtp(request);
    }
    
    /*
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody OtpVerifyRequest request) {
        return userService.verifyOtp(request);
    }
    */
    
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody ForgotPasswordRequest request) {
        return userService.forgotPasswordSendOtp(request.getEmail());
    }
    

//    /**/
//    @PostMapping("/register")
//    public ResponseEntity<String> register(@Valid @RequestBody LoginRequest request) {
//        return ResponseEntity.ok(authService.registerUser(request));
//    }
//    /**/
//    @PostMapping("/register")
//    public String register(@RequestBody RegisterRequest request) {
//        return userService.register(request);
//    }
//
//    @PostMapping("/login")
//    public String login(@RequestBody LoginRequest request) {
//        return userService.loginAndSendOtp(request);
//    }
//
//    @PostMapping("/verify-otp")
//    public String verifyOtp(@RequestBody OtpVerifyRequest request) {
//        return userService.verifyOtp(request);
//    }
}
