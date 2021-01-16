package com.damianosiak.egradebookapprest.controllers;

import com.damianosiak.egradebookapprest.api.model.SubjectDTO;
import com.damianosiak.egradebookapprest.api.model.SubjectListDTO;
import com.damianosiak.egradebookapprest.services.SubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin()
@RequestMapping("api/subject/")
public class SubjectController {
    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    public ResponseEntity<SubjectListDTO> getAllSubjects(){
        return new ResponseEntity<SubjectListDTO>(new SubjectListDTO(subjectService.getAllSubjects()), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<SubjectDTO> getSubjectById(@PathVariable Long id){
        return new ResponseEntity<SubjectDTO>(subjectService.getSubjectBySubjectId(id),HttpStatus.OK);
    }

    @GetMapping("findBySubjectName/{subjectName}")
    public ResponseEntity<SubjectListDTO> getSubjectByName(@PathVariable String subjectName){
        return new ResponseEntity<SubjectListDTO>(new SubjectListDTO(subjectService.getSubjectBySubjectName(subjectName)),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SubjectDTO> createNewSubject(@RequestBody SubjectDTO subjectDTO){
        return new ResponseEntity<SubjectDTO>(subjectService.createNewSubject(subjectDTO),HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<SubjectDTO> updateSubject(@PathVariable Long id, @RequestBody SubjectDTO subjectDTO){
        return new ResponseEntity<SubjectDTO>(subjectService.updateSubject(id, subjectDTO),HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id){
        subjectService.deleteSubjectBySubjectId(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
