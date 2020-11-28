package com.damianosiak.egradebookapprest.api.mapper;


import com.damianosiak.egradebookapprest.api.model.TeacherDTO;
import com.damianosiak.egradebookapprest.domain.Teacher;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TeacherMapper {
    TeacherMapper INSTANCE = Mappers.getMapper(TeacherMapper.class);

    TeacherDTO teacherToTeacherDTO(Teacher teacher);

    Teacher teacherDTOtoTeacher(TeacherDTO teacherDTO);
}
