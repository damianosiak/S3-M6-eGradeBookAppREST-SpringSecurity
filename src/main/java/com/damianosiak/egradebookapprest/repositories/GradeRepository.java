package com.damianosiak.egradebookapprest.repositories;

import com.damianosiak.egradebookapprest.domain.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> getByGradeValue(Integer gradeValue);
}
