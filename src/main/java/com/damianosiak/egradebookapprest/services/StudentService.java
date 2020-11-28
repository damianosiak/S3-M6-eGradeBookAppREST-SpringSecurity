package com.damianosiak.egradebookapprest.services;

import com.damianosiak.egradebookapprest.api.model.StudentDTO;

import java.util.List;

public interface StudentService {
    List<StudentDTO> getAllStudents();
    StudentDTO getStudentByStudentId(Long studentId);
    List<StudentDTO> getStudentByStudentLastName(String studentLastName);
    StudentDTO createNewStudent(StudentDTO studentDTO);
    StudentDTO updateStudent(Long studentId, StudentDTO studentDTO);
    void deleteStudentByStudentId(Long studentId);
}
