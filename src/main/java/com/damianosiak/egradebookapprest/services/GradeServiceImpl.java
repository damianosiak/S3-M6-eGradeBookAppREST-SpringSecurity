package com.damianosiak.egradebookapprest.services;

import com.damianosiak.egradebookapprest.api.mapper.GradeMapper;
import com.damianosiak.egradebookapprest.api.model.GradeDTO;
import com.damianosiak.egradebookapprest.domain.Grade;
import com.damianosiak.egradebookapprest.repositories.GradeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GradeServiceImpl implements GradeService{
    GradeRepository gradeRepository;
    GradeMapper gradeMapper;

    public GradeServiceImpl(GradeRepository gradeRepository, GradeMapper gradeMapper) {
        this.gradeRepository = gradeRepository;
        this.gradeMapper = gradeMapper;
    }

    @Override
    public List<GradeDTO> getAllGrades(){
        return gradeRepository.findAll()
                .stream()
                .map(gradeMapper::gradeToGradeDTO)
                .collect(Collectors.toList());
    }

    @Override
    public GradeDTO getGradeByGradeId(Long gradeId){
        return gradeMapper.gradeToGradeDTO(gradeRepository.findById(gradeId).get());
    }

    @Override
    public List<GradeDTO> getGradeByGradeValue(Integer gradeValue){
        return gradeRepository.getByGradeValue(gradeValue)
                .stream()
                .map(gradeMapper::gradeToGradeDTO)
                .collect(Collectors.toList());
    }

    @Override
    public GradeDTO createNewGrade(GradeDTO gradeDTO){
        Grade grade = gradeMapper.gradeDTOtoGrade(gradeDTO);
        Grade savedGrade = gradeRepository.save(grade);
        return gradeMapper.gradeToGradeDTO(savedGrade);
    }

    @Override
    public GradeDTO updateGrade(Long gradeId, GradeDTO gradeDTO){
        Grade grade = gradeMapper.gradeDTOtoGrade(gradeDTO);
        grade.setGradeId(gradeId);
        Grade savedGrade = gradeRepository.save(grade);
        return gradeMapper.gradeToGradeDTO(savedGrade);
    }

    @Override
    public void deleteGradeByGradeId(Long gradeId){
        gradeRepository.deleteById(gradeId);
    }
}
