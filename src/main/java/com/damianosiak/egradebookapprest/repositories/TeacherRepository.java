package com.damianosiak.egradebookapprest.repositories;

import com.damianosiak.egradebookapprest.domain.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> getByTeacherLastName(String teacherLastName);
}
