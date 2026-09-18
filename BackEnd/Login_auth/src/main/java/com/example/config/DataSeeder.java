package com.example.config;

import com.example.entity.Faculty;
import com.example.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Runs once every time the backend starts.
 * If no "Admin" faculty account exists yet in this machine's database,
 * it creates one automatically — so Faculty Login works out of the box
 * without needing to call /api/faculty/register manually first.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private FacultyRepository facultyRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Default faculty/admin login credentials
    private static final String DEFAULT_USERNAME = "Admin";
    private static final String DEFAULT_PASSWORD = "Admin@123";

    @Override
    public void run(String... args) {
        if (facultyRepository.findByUsername(DEFAULT_USERNAME).isEmpty()) {
            Faculty admin = new Faculty();
            admin.setUsername(DEFAULT_USERNAME);
            admin.setPassword(passwordEncoder.encode(DEFAULT_PASSWORD));
            facultyRepository.save(admin);
            System.out.println("Default faculty login created -> username: " + DEFAULT_USERNAME + " / password: " + DEFAULT_PASSWORD);
        } else {
            System.out.println("Faculty login '" + DEFAULT_USERNAME + "' already exists — skipping seed.");
        }
    }
}
