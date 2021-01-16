package com.damianosiak.egradebookapprest.controllers;

import com.damianosiak.egradebookapprest.api.model.GradeDTO;
import com.damianosiak.egradebookapprest.api.model.GradeListDTO;
import com.damianosiak.egradebookapprest.api.model.TeacherListDTO;
import com.damianosiak.egradebookapprest.services.GradeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/grade/")
@CrossOrigin()
public class GradeController {
    private final GradeService gradeService;

    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @GetMapping
    public ResponseEntity<GradeListDTO> getAllGrades(){
        return new ResponseEntity<GradeListDTO>(new GradeListDTO(gradeService.getAllGrades()),HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<GradeDTO> getGradeById(@PathVariable Long id){
        return new ResponseEntity<GradeDTO>(gradeService.getGradeByGradeId(id),HttpStatus.OK);
    }

    @GetMapping("findByGradeValue/{gradeValue}")
    public ResponseEntity<GradeListDTO> getGradeByValue(@PathVariable Integer gradeValue){
        return new ResponseEntity<GradeListDTO>(new GradeListDTO(gradeService.getGradeByGradeValue(gradeValue)),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<GradeDTO> createNewGrade(@RequestBody GradeDTO gradeDTO){
        return new ResponseEntity<GradeDTO>(gradeService.createNewGrade(gradeDTO),HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<GradeDTO> updateGrade(@PathVariable Long id, @RequestBody GradeDTO gradeDTO){
        return new ResponseEntity<GradeDTO>(gradeService.updateGrade(id,gradeDTO),HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    @CrossOrigin()
    public ResponseEntity<Void> deleteGrade(@PathVariable Long id){
        gradeService.deleteGradeByGradeId(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
