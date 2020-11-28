package com.damianosiak.egradebookapprest.repositories;

import com.damianosiak.egradebookapprest.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByStudentLastName(String studentLastName);
}
