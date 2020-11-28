package com.damianosiak.egradebookapprest.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gradeId;
    private Integer gradeValue;
    private String gradeDescription;
    @ManyToOne
    private Teacher gradeTeacher;
}
