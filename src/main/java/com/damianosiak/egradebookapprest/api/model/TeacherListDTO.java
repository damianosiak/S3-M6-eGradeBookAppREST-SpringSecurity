package com.damianosiak.egradebookapprest.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class TeacherListDTO {
    private List<TeacherDTO> teacherList;
}
