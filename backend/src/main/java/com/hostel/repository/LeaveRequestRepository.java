package com.hostel.repository;

import com.hostel.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer> {
    List<LeaveRequest> findByStudentId(Integer studentId);
    List<LeaveRequest> findByStatus(String status);
    List<LeaveRequest> findByStudentIdAndStatus(Integer studentId, String status);
}
