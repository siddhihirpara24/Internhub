package com.example.repository;

import com.example.entity.InterviewSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewScheduleRepository extends JpaRepository<InterviewSchedule, Long> {
}