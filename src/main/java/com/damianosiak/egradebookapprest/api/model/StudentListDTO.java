package com.damianosiak.egradebookapprest.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class StudentListDTO {
    private List<StudentDTO> studentList;
}
