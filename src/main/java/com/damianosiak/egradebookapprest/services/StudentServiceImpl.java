package com.damianosiak.egradebookapprest.services;

import com.damianosiak.egradebookapprest.api.mapper.StudentMapper;
import com.damianosiak.egradebookapprest.api.model.StudentDTO;
import com.damianosiak.egradebookapprest.domain.Student;
import com.damianosiak.egradebookapprest.repositories.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService{
    StudentRepository studentRepository;
    StudentMapper studentMapper;

    public StudentServiceImpl(StudentRepository studentRepository, StudentMapper studentMapper) {
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
    }

    @Override
    public List<StudentDTO> getAllStudents(){
        return studentRepository.findAll()
        .stream()
        .map(studentMapper::studentToStudentDTO)
        .collect(Collectors.toList());
    }

    @Override
    public StudentDTO getStudentByStudentId(Long studentId){
        return studentMapper.studentToStudentDTO(studentRepository.findById(studentId).get());
    }

    @Override
    public List<StudentDTO> getStudentByStudentLastName(String studentLastName){
        return studentRepository.findByStudentLastName(studentLastName)
                .stream()
                .map(studentMapper::studentToStudentDTO)
                .collect(Collectors.toList());
    }

    @Override
    public StudentDTO createNewStudent(StudentDTO studentDTO){
        Student student = studentMapper.studentDTOtoStudent(studentDTO);
        Student savedStudent = studentRepository.save(student);
        return studentMapper.studentToStudentDTO(savedStudent);
    }

    @Override
    public StudentDTO updateStudent(Long studentId, StudentDTO studentDTO){
        Student student = studentMapper.studentDTOtoStudent(studentDTO);
        student.setStudentId(studentId);
        Student savedStudent = studentRepository.save(student);
        return studentMapper.studentToStudentDTO(savedStudent);
    }

    @Override
    public void deleteStudentByStudentId(Long studentId){
        studentRepository.deleteById(studentId);
    }
}
