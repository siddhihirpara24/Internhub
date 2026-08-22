package com.example.service;

import com.example.security.JwtUtil;

import com.example.dto.*;
import com.example.entity.*;
import com.example.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {
	
	@Autowired
	private LoginHistoryRepository loginHistoryRepository;
	
	@Autowired
	private JwtUtil jwtUtil;
	
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // ---------- REGISTER ----------
    public String register(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return "Passwords do not match";
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }
        if (userRepository.existsByEnrollmentNumber(request.getEnrollmentNumber())) {
            return "Enrollment number already registered";
        }

        Registration user = new Registration();
        user.setName(request.getName());
        user.setEnrollmentNumber(request.getEnrollmentNumber());
        user.setEmail(request.getEmail());
        user.setMobileNumber(request.getMobileNumber());
        user.setPassword(encoder.encode(request.getPassword())); // hash password

        userRepository.save(user);
        return "Registration successful";
    }

    // ---------- LOGIN STEP 1: check email & password, send OTP ----------
    /**/
    @Transactional
    /**/
    public String loginAndSendOtp(LoginRequest request) {
        Optional<Registration> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return "Email not found";
        }

        Registration user = userOpt.get();

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            return "Incorrect password";
        }

        // generate 6-digit OTP
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        // remove old OTPs for this email
        otpRepository.deleteByEmail(user.getEmail());

        OtpVerification otpEntity = new OtpVerification();
        otpEntity.setEmail(user.getEmail());
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        otpRepository.save(otpEntity);
        
        try {
            emailService.sendOtpEmail(user.getEmail(), otp);
        } catch (Exception e) {
            return "Failed to send OTP. Please check your connection and try again.";
        }

        return "OTP_SENT";
    }

    // ---------- LOGIN STEP 2: verify OTP ----------
    
    @Transactional
    public AuthResponse verifyOtp(OtpVerifyRequest request) 
    {
        Optional<OtpVerification> otpOpt =
                otpRepository.findTopByEmailOrderByIdDesc(request.getEmail());

        if (otpOpt.isEmpty()) {
            return new AuthResponse("No OTP found. Please login again", null, null);
        }

        OtpVerification otpEntity = otpOpt.get();

        if (otpEntity.getExpiryTime().isBefore(LocalDateTime.now())) {
            return new AuthResponse("OTP expired", null, null);
        }

        if (!otpEntity.getOtp().equals(request.getOtp())) {
            return new AuthResponse("Invalid OTP", null, null);
        }

        otpRepository.deleteByEmail(request.getEmail());

        LoginHistory history = new LoginHistory();
        history.setEmail(request.getEmail());
        history.setLoginTime(LocalDateTime.now());
        loginHistoryRepository.save(history);

        Registration user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        return new AuthResponse("LOGIN_SUCCESS", token, user.getRole());
    }
//    @Transactional
//    public String verifyOtp(OtpVerifyRequest request) {
//        Optional<OtpVerification> otpOpt =
//                otpRepository.findTopByEmailOrderByIdDesc(request.getEmail());
//
//        if (otpOpt.isEmpty()) {
//            return "No OTP found. Please login again";
//        }
//
//        OtpVerification otpEntity = otpOpt.get();
//
//        if (otpEntity.getExpiryTime().isBefore(LocalDateTime.now())) {
//            return "OTP expired";
//        }
//
//        if (!otpEntity.getOtp().equals(request.getOtp())) {
//            return "Invalid OTP";
//        }
//
//        otpRepository.deleteByEmail(request.getEmail());
//        return "LOGIN_SUCCESS";
//    }
    
 // ---------- FORGOT PASSWORD: check email, send OTP ----------
    @Transactional
    public String forgotPasswordSendOtp(String email) {
        Optional<Registration> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return "Email not found";
        }

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpRepository.deleteByEmail(email);

        OtpVerification otpEntity = new OtpVerification();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        otpRepository.save(otpEntity);

        emailService.sendOtpEmail(email, otp);
        return "OTP_SENT";
    }

}
