package com.damianosiak.egradebookapprest.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectId;
    private String subjectName;
    @ManyToOne
    private Teacher subjectTeacher;
}
