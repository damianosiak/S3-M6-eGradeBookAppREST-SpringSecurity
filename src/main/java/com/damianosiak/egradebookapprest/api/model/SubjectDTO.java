package com.damianosiak.egradebookapprest.api.model;

import com.damianosiak.egradebookapprest.domain.Teacher;
import lombok.Data;

@Data
public class SubjectDTO {
    private Long subjectId;
    private String subjectName;
    private Teacher subjectTeacher;
}
