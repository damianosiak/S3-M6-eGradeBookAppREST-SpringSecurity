package com.damianosiak.egradebookapprest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class EgradebookapprestApplication {

    public static void main(String[] args) {
        SpringApplication.run(EgradebookapprestApplication.class, args);
    }

}
