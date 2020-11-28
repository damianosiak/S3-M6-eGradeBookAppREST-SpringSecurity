package com.damianosiak.egradebookapprest.api.mapper;

import com.damianosiak.egradebookapprest.api.model.TeacherDTO;
import com.damianosiak.egradebookapprest.domain.Teacher;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TeacherMapperTest {
    TeacherMapper teacherMapper = TeacherMapper.INSTANCE;


    @Test
    void teacherToTeacherDTO() {
        //given
        Teacher teacher = new Teacher();
        teacher.setTeacherId(1L);
        teacher.setTeacherFirstName("Damian");
        teacher.setTeacherLastName("Osiak");

        //when
        TeacherDTO teacherDTO = teacherMapper.teacherToTeacherDTO(teacher);

        //then
        System.out.println(teacherDTO);
    }
}