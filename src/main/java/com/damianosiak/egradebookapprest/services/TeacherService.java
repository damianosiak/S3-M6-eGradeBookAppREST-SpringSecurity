package com.damianosiak.egradebookapprest.services;

import com.damianosiak.egradebookapprest.api.model.TeacherDTO;
import com.damianosiak.egradebookapprest.domain.Teacher;

import java.util.List;

public interface TeacherService {
    List<TeacherDTO> getAllTeachers();
    TeacherDTO getTeacherByTeacherId(Long teacherId);
    List<TeacherDTO> getTeacherByTeacherLastName(String teacherLastName);
    TeacherDTO createNewTeacher(TeacherDTO teacherDTO);
    TeacherDTO updateTeacher(Long teacherId, TeacherDTO teacherDTO);
    void deleteTeacherByTeacherId(Long teacherId);
}
