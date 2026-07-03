package com.hostel.repository;

import com.hostel.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
    List<Complaint> findByStudentId(Integer studentId);
    List<Complaint> findByStatus(String status);
    List<Complaint> findByStudentIdAndStatus(Integer studentId, String status);
}
