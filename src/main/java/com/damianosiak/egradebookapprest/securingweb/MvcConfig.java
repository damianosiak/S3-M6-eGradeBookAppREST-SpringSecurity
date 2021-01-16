package com.damianosiak.egradebookapprest.securingweb;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/home").setViewName("home");
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/hello").setViewName("hello");
        registry.addViewController("/menu").setViewName("index");
        registry.addViewController("/login").setViewName("login");

        registry.addViewController("/subjects").setViewName("Subject/index");
        registry.addViewController("/subjects/new").setViewName("Subject/subjectCREATE");
        registry.addViewController("/subjects/update").setViewName("Subject/subjectUPDATE");
        registry.addViewController("/subjects/view").setViewName("Subject/subjectVIEW");

        registry.addViewController("/teachers").setViewName("Teacher/index");
        registry.addViewController("/teachers/new").setViewName("Teacher/teacherCREATE");
        registry.addViewController("/teachers/update").setViewName("Teacher/teacherUPDATE");
        registry.addViewController("/teachers/view").setViewName("Teacher/teacherVIEW");
        registry.addViewController("/teachers/delete").setViewName("Teacher/teacherDELETE");

        registry.addViewController("/grades").setViewName("Grade/index");
        registry.addViewController("/grades/new").setViewName("Grade/gradeCREATE");
        registry.addViewController("/grades/update").setViewName("Grade/gradeUPDATE");
        registry.addViewController("/grades/view").setViewName("Grade/gradeVIEW");
        registry.addViewController("/grades/delete").setViewName("Grade/gradeDELETE");

        registry.addViewController("/students").setViewName("Student/index");
        registry.addViewController("/students/new").setViewName("Student/studentCREATE");
        registry.addViewController("/students/update").setViewName("Student/studentUPDATE");
        registry.addViewController("/students/delete").setViewName("Student/studentDELETE");
        registry.addViewController("/students/view").setViewName("Student/studentVIEW");
        registry.addViewController("/students/grades").setViewName("Student/studentGRADES");
        //registry.addViewController("Bootstrap/bootstraps").setViewName("/Bootstrap/bootstrap.bundle.min.js");
        //registry.addViewController("Bootstrap/bootstrapc").setViewName("/Bootstrap/bootstrap.min.css");
    }

}
