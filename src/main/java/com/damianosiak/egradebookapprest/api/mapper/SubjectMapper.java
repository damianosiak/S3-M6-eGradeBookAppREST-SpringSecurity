package com.damianosiak.egradebookapprest.api.mapper;

import com.damianosiak.egradebookapprest.api.model.SubjectDTO;
import com.damianosiak.egradebookapprest.domain.Subject;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SubjectMapper {
    SubjectMapper INSTANCE = Mappers.getMapper(SubjectMapper.class);

    SubjectDTO subjectToSubjectDTO(Subject subject);

    Subject subjectDTOtoSubject(SubjectDTO subjectDTO);
}
