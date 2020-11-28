package com.damianosiak.egradebookapprest.services;

import com.damianosiak.egradebookapprest.api.mapper.SubjectMapper;
import com.damianosiak.egradebookapprest.api.model.SubjectDTO;
import com.damianosiak.egradebookapprest.domain.Subject;
import com.damianosiak.egradebookapprest.repositories.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectServiceImpl implements SubjectService{
    SubjectRepository subjectRepository;
    SubjectMapper subjectMapper;

    public SubjectServiceImpl(SubjectRepository subjectRepository, SubjectMapper subjectMapper) {
        this.subjectRepository = subjectRepository;
        this.subjectMapper = subjectMapper;
    }

    @Override
    public List<SubjectDTO> getAllSubjects(){
        return subjectRepository.findAll()
                .stream()
                .map(subjectMapper::subjectToSubjectDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SubjectDTO getSubjectBySubjectId(Long subjectId){
        return subjectMapper.subjectToSubjectDTO(subjectRepository.findById(subjectId).get());
    }

    @Override
    public List<SubjectDTO> getSubjectBySubjectName(String subjectName){
        return subjectRepository.getBySubjectName(subjectName)
                .stream()
                .map(subjectMapper::subjectToSubjectDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SubjectDTO createNewSubject(SubjectDTO subjectDTO){
        Subject subject = subjectMapper.subjectDTOtoSubject(subjectDTO);
        Subject savedSubject = subjectRepository.save(subject);
        return subjectMapper.subjectToSubjectDTO(savedSubject);
    }

    @Override
    public SubjectDTO updateSubject(Long subjectId, SubjectDTO subjectDTO){
        Subject subject = subjectMapper.subjectDTOtoSubject(subjectDTO);
        subject.setSubjectId(subjectId);
        Subject savedSubject =subjectRepository.save(subject);
        return subjectMapper.subjectToSubjectDTO(savedSubject);
    }

    @Override
    public void deleteSubjectBySubjectId(Long subjectId){
        subjectRepository.deleteById(subjectId);
    }
}
