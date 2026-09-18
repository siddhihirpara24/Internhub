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

import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import java.io.ByteArrayOutputStream;
import java.util.LinkedHashMap;
import java.util.Map;


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

    
    public byte[] generateStudentPdf(Long id) {
        FacultyStudentResponse student = getStudentById(id);
        try {
            Document document = new Document();
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font labelFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11);
            Font valueFont = FontFactory.getFont(FontFactory.HELVETICA, 11);

            Paragraph title = new Paragraph("InternHub — Student Detail Report", titleFont);
            title.setSpacingAfter(4f);
            document.add(title);

            Paragraph subtitle = new Paragraph(
                    "Generated on: " + java.time.LocalDate.now(),
                    FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 10));
            subtitle.setSpacingAfter(16f);
            document.add(subtitle);

            Map<String, String> fields = new LinkedHashMap<>();
            fields.put("Student ID", String.valueOf(student.getId()));
            fields.put("Name", nullSafe(student.getName()));
            fields.put("Email", nullSafe(student.getEmail()));
            fields.put("Enrollment Number", nullSafe(student.getEnrollmentNumber()));
            fields.put("Mobile Number", nullSafe(student.getMobileNumber()));
            fields.put("Department", nullSafe(student.getDepartment()));
            fields.put("Semester", nullSafe(student.getSemester()));
            fields.put("Division", nullSafe(student.getDivision()));
            fields.put("Gender", nullSafe(student.getGender()));
            fields.put("CGPA (Sem 1)", nullSafe(student.getCgpaSem1()));
            fields.put("CGPA (Sem 2)", nullSafe(student.getCgpaSem2()));
            fields.put("Backlog", nullSafe(student.getBacklog()));
            
            fields.put("Skill 1", nullSafe(student.getSkill1()));
            fields.put("Skill 2", nullSafe(student.getSkill2()));
            
            fields.put("Hometown", nullSafe(student.getHometown()));
            fields.put("Address", nullSafe(student.getAddress()));

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{1.3f, 2f});

            for (Map.Entry<String, String> entry : fields.entrySet()) {
                PdfPCell labelCell = new PdfPCell(new Paragraph(entry.getKey(), labelFont));
                labelCell.setPadding(6f);
                labelCell.setBorderColor(new java.awt.Color(220, 220, 220));

                PdfPCell valueCell = new PdfPCell(new Paragraph(entry.getValue(), valueFont));
                valueCell.setPadding(6f);
                valueCell.setBorderColor(new java.awt.Color(220, 220, 220));

                table.addCell(labelCell);
                table.addCell(valueCell);
            }

            document.add(table);
            document.add(new Paragraph(" "));
            document.add(new Chunk("This report was generated automatically from the InternHub database."));

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate student PDF: " + e.getMessage(), e);
        }
    }

    private String nullSafe(String value) {
        return (value == null || value.isBlank() || value.equalsIgnoreCase("null")) ? "-" : value;
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
        
        dto.setSkill1(details.getSkill1());
        dto.setSkill2(details.getSkill2());
        
        dto.setAddress(details.getAddress());
        dto.setPhotoPath(details.getPhotoPath());
        dto.setResumePath(details.getResumePath());
        
        return dto;
    }
}