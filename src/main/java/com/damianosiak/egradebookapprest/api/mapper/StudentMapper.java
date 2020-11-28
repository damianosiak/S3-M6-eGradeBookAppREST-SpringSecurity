package com.damianosiak.egradebookapprest.api.mapper;

import com.damianosiak.egradebookapprest.api.model.StudentDTO;
import com.damianosiak.egradebookapprest.domain.Student;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface StudentMapper {
    StudentMapper INSTANCE = Mappers.getMapper(StudentMapper.class);

    StudentDTO studentToStudentDTO(Student student);

    Student studentDTOtoStudent(StudentDTO studentDTO);
}
