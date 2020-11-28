package com.damianosiak.egradebookapprest.controllers;

import com.damianosiak.egradebookapprest.api.model.TeacherDTO;
import com.damianosiak.egradebookapprest.api.model.TeacherListDTO;
import com.damianosiak.egradebookapprest.services.TeacherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/teacher/")
public class TeacherController {

    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping
    public ResponseEntity<TeacherListDTO> getAllTeachers(){
        return new ResponseEntity<TeacherListDTO>(new TeacherListDTO(teacherService.getAllTeachers()),HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<TeacherDTO> getTeacherById(@PathVariable Long id){
        return new ResponseEntity<TeacherDTO>(teacherService.getTeacherByTeacherId(id),HttpStatus.OK);
    }

    @GetMapping("findByTeacherLastName/{teacherLastName}")
    public ResponseEntity<TeacherListDTO> getTeacherByLastName(@PathVariable String teacherLastName){
        return new ResponseEntity<TeacherListDTO>(new TeacherListDTO(teacherService.getTeacherByTeacherLastName(teacherLastName)),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TeacherDTO> createNewTeacher(@RequestBody TeacherDTO teacherDTO){
        return new ResponseEntity<TeacherDTO>(teacherService.createNewTeacher(teacherDTO),HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<TeacherDTO> updateTeacher(@PathVariable Long id, @RequestBody TeacherDTO teacherDTO){
        return new ResponseEntity<TeacherDTO>(teacherService.updateTeacher(id, teacherDTO),HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id){
        teacherService.deleteTeacherByTeacherId(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
