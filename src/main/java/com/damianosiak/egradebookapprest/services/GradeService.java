package com.damianosiak.egradebookapprest.services;

import com.damianosiak.egradebookapprest.api.model.GradeDTO;

import java.util.List;

public interface GradeService {
    List<GradeDTO> getAllGrades();
    GradeDTO getGradeByGradeId(Long gradeId);
    List<GradeDTO> getGradeByGradeValue(Integer gradeValue);
    GradeDTO createNewGrade(GradeDTO gradeDTO);
    GradeDTO updateGrade(Long gradeId, GradeDTO gradeDTO);
    void deleteGradeByGradeId(Long gradeId);
}
