package com.damianosiak.egradebookapprest.services;

import com.damianosiak.egradebookapprest.api.mapper.TeacherMapper;
import com.damianosiak.egradebookapprest.api.model.TeacherDTO;
import com.damianosiak.egradebookapprest.domain.Teacher;
import com.damianosiak.egradebookapprest.repositories.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherServiceImpl implements TeacherService{
    TeacherRepository teacherRepository;
    TeacherMapper teacherMapper;

    public TeacherServiceImpl(TeacherRepository teacherRepository, TeacherMapper teacherMapper) {
        this.teacherRepository = teacherRepository;
        this.teacherMapper = teacherMapper;
    }

    @Override
    public List<TeacherDTO> getAllTeachers() {
        return teacherRepository.findAll()
                .stream()
                .map(teacherMapper::teacherToTeacherDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TeacherDTO getTeacherByTeacherId(Long teacherId) {
        return teacherMapper.teacherToTeacherDTO(teacherRepository.findById(teacherId).get());
    }

    @Override
    public List<TeacherDTO> getTeacherByTeacherLastName(String teacherLastName) {
        return teacherRepository.getByTeacherLastName(teacherLastName)
                .stream()
                .map(teacherMapper::teacherToTeacherDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TeacherDTO createNewTeacher(TeacherDTO teacherDTO){
        Teacher teacher = teacherMapper.teacherDTOtoTeacher(teacherDTO);
        Teacher savedTeacher = teacherRepository.save(teacher);
        return teacherMapper.teacherToTeacherDTO(savedTeacher);
    }

    @Override
    public TeacherDTO updateTeacher(Long teacherId, TeacherDTO teacherDTO){
        Teacher teacher = teacherMapper.teacherDTOtoTeacher((teacherDTO));
        teacher.setTeacherId(teacherId);
        Teacher savedTeacher = teacherRepository.save(teacher);
        return teacherMapper.teacherToTeacherDTO(savedTeacher);
    }

    @Override
    public void deleteTeacherByTeacherId(Long teacherId){
        teacherRepository.deleteById(teacherId);
    }
}
