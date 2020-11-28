package com.damianosiak.egradebookapprest.repositories;

import com.damianosiak.egradebookapprest.domain.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> getBySubjectName(String subjectName);
}
