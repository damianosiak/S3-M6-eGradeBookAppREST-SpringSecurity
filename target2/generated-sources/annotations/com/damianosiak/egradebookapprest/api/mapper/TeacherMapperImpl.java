package com.damianosiak.egradebookapprest.api.mapper;

import com.damianosiak.egradebookapprest.api.model.TeacherDTO;
import com.damianosiak.egradebookapprest.domain.Teacher;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2020-11-24T21:06:10+0100",
    comments = "version: 1.4.1.Final, compiler: javac, environment: Java 15.0.1 (Oracle Corporation)"
)
public class TeacherMapperImpl implements TeacherMapper {

    @Override
    public TeacherDTO teacherToTeacherDTO(Teacher teacher) {
        if ( teacher == null ) {
            return null;
        }

        TeacherDTO teacherDTO = new TeacherDTO();

        return teacherDTO;
    }
}
