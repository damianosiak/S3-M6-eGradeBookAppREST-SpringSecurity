package com.damianosiak.egradebookapprest.api.mapper;

import com.damianosiak.egradebookapprest.api.model.GradeDTO;
import com.damianosiak.egradebookapprest.domain.Grade;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface GradeMapper {
    GradeMapper INSTANCE = Mappers.getMapper(GradeMapper.class);

    GradeDTO gradeToGradeDTO(Grade grade);

    Grade gradeDTOtoGrade(GradeDTO gradeDTO);
}
