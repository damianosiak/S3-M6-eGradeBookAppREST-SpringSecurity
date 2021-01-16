package com.damianosiak.egradebookapprest.controllers;

import com.damianosiak.egradebookapprest.api.model.StudentDTO;
import com.damianosiak.egradebookapprest.api.model.StudentListDTO;
import com.damianosiak.egradebookapprest.services.StudentService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin()
@RequestMapping("api/student/")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<StudentListDTO> getAllStudents(){
        return new ResponseEntity<StudentListDTO>(new StudentListDTO(studentService.getAllStudents()), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id){
        return new ResponseEntity<StudentDTO>(studentService.getStudentByStudentId(id),HttpStatus.OK);
    }

    @GetMapping("findyByStudentLastName/{studentLastName}")
    public ResponseEntity<StudentListDTO> getStudentByLastName(@PathVariable String studentLastName){
        return new ResponseEntity<StudentListDTO>(new StudentListDTO(studentService.getStudentByStudentLastName(studentLastName)),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<StudentDTO> createNewStudent(@RequestBody StudentDTO studentDTO){
        return new ResponseEntity<StudentDTO>(studentService.createNewStudent(studentDTO),HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id, @RequestBody StudentDTO studentDTO){
        return new ResponseEntity<StudentDTO>(studentService.updateStudent(id,studentDTO),HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id){
        studentService.deleteStudentByStudentId(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
