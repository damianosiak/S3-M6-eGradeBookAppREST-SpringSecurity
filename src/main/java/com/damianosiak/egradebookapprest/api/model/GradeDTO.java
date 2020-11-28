package com.damianosiak.egradebookapprest.api.model;

import com.damianosiak.egradebookapprest.domain.Teacher;
import lombok.Data;

@Data
public class GradeDTO {
    private Long gradeId;
    private Integer gradeValue;
    private String gradeDescription;
    private Teacher gradeTeacher;
}
