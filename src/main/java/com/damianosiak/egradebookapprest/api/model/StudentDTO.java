package com.damianosiak.egradebookapprest.api.model;

import com.damianosiak.egradebookapprest.domain.Grade;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class StudentDTO {
    private Long studentId;
    private String studentFirstName;
    private String studentLastName;
    private Set<Grade> studentGrades = new HashSet<>();
}
