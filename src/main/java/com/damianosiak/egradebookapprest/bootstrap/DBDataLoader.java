package com.damianosiak.egradebookapprest.bootstrap;

import com.damianosiak.egradebookapprest.domain.Grade;
import com.damianosiak.egradebookapprest.domain.Student;
import com.damianosiak.egradebookapprest.domain.Subject;
import com.damianosiak.egradebookapprest.domain.Teacher;
import com.damianosiak.egradebookapprest.repositories.GradeRepository;
import com.damianosiak.egradebookapprest.repositories.StudentRepository;
import com.damianosiak.egradebookapprest.repositories.SubjectRepository;
import com.damianosiak.egradebookapprest.repositories.TeacherRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DBDataLoader implements CommandLineRunner {
    TeacherRepository teacherRepository;
    SubjectRepository subjectRepository;
    GradeRepository gradeRepository;
    StudentRepository studentRepository;

    public DBDataLoader(TeacherRepository teacherRepository, SubjectRepository subjectRepository, GradeRepository gradeRepository, StudentRepository studentRepository){
        this.teacherRepository = teacherRepository;
        this.subjectRepository = subjectRepository;
        this.gradeRepository = gradeRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Teacher teacher = new Teacher();
        teacher.setTeacherFirstName("Marcin");
        teacher.setTeacherLastName("Lasak");
        teacherRepository.save(teacher);

        Subject subject = new Subject();
        subject.setSubjectName("Computer-Science");
        subject.setSubjectTeacher(teacher);
        subjectRepository.save(subject);

        Grade grade1 = new Grade();
        grade1.setGradeValue(5);
        grade1.setGradeDescription("Zaliczenie przedmiotu o nazwie Laboratoria Programowania");
        grade1.setGradeTeacher(teacher);
        Grade grade2 = new Grade();
        grade2.setGradeValue(5);
        grade2.setGradeDescription("Zaliczenie przedmiotu o nazwie Wyklad Programowania");
        grade2.setGradeTeacher(teacher);
        gradeRepository.save(grade1);
        gradeRepository.save(grade2);

        Student student = new Student();
        student.setStudentFirstName("Damian");
        student.setStudentLastName("Osiak");
        student.getStudentGrades().add(grade1);
        student.getStudentGrades().add(grade2);
        studentRepository.save(student);

        System.out.println("Data loaded to DB");
        //System.out.println(student);
    }
}
