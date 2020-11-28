package com.damianosiak.egradebookapprest.api.model;

import lombok.Data;

@Data
public class TeacherDTO {
    private Long teacherId;
    private String teacherFirstName;
    private String teacherLastName;
}
