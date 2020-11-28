package com.damianosiak.egradebookapprest.api.mapper;

import com.damianosiak.egradebookapprest.api.model.SubjectDTO;
import com.damianosiak.egradebookapprest.domain.Subject;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SubjectMapperTest {
    SubjectMapper subjectMapper = SubjectMapper.INSTANCE;

    @Test
    void subjectToSubjectDTO() {
        //given
        Subject subject = new Subject();
        subject.setSubjectName("Computer Science");

        //when
        SubjectDTO subjectDTO = subjectMapper.subjectToSubjectDTO(subject);

        //then
        System.out.println(subjectDTO);
    }
}