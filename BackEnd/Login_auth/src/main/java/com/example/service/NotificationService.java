package com.example.service;

import com.example.entity.Application;
import com.example.entity.Notification;
import com.example.repository.ApplicationRepository;
import com.example.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class NotificationService {

	@Autowired 
	private EmailService emailService;
	
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    /**
     * Creates a notification only for the students who have actually applied
     * to this company — not for every student in the system.
     */
    public void notifyApplicantsOfCompany(String companyName, String type, String title, String message) {
        List<Application> applications = applicationRepository.findByCompanyIgnoreCase(companyName);

        Set<String> applicantEmails = applications.stream()
                .map(Application::getEmail)
                .collect(Collectors.toSet());

        for (String email : applicantEmails) {
            Notification notification = new Notification();
            notification.setRecipientEmail(email);
            notification.setType(type);
            notification.setTitle(title);
            notification.setMessage(message);
            notification.setCompanyName(companyName);
            
            notificationRepository.save(notification);

            // Send real email to the applicant
            try {
                emailService.sendEmail(email, title, message);
            } catch (Exception ex) {
                System.err.println(
                    "Failed to send email to " + email + ": " + ex.getMessage()
                );
            }
            
        }
    }

    public List<Notification> getMyNotifications(String email) {
        return notificationRepository.findByRecipientEmailOrderByCreatedAtDesc(email);
    }

    public void markAsRead(Long id) {
        notificationRepository.findById(id).ifPresent(n -> {
            n.setRead(true);
            notificationRepository.save(n);
        });
    }

    public void markAllAsRead(String email) {
        List<Notification> list = notificationRepository.findByRecipientEmailOrderByCreatedAtDesc(email);
        list.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(list);
    }

    public void delete(Long id) {
        notificationRepository.deleteById(id);
    }
}