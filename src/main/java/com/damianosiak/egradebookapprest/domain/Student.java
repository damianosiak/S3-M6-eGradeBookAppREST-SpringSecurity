package com.damianosiak.egradebookapprest.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;
    private String studentFirstName;
    private String studentLastName;
    @OneToMany
    private Set<Grade> studentGrades = new HashSet<>();
}
