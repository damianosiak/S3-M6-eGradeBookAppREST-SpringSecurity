package com.damianosiak.egradebookapprest.services;

import com.damianosiak.egradebookapprest.api.model.SubjectDTO;
import com.damianosiak.egradebookapprest.api.model.TeacherDTO;
import com.damianosiak.egradebookapprest.domain.Subject;

import java.util.List;

public interface SubjectService {
    List<SubjectDTO> getAllSubjects();
    SubjectDTO getSubjectBySubjectId(Long subjectId);
    List<SubjectDTO> getSubjectBySubjectName(String subjectName);
    SubjectDTO createNewSubject(SubjectDTO subjectDTO);
    SubjectDTO updateSubject(Long subjectId, SubjectDTO subjectDTO);
    void deleteSubjectBySubjectId(Long subjectId);
}
