package com.damianosiak.egradebookapprest.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GradeListDTO {
    private List<GradeDTO> gradeList;
}
