package com.ait.manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ait.manager.service.classes.ClassServiceImpl;

@RestController
public class ClassController {

	@Autowired
	private ClassServiceImpl classServiceImpl;

	@GetMapping("/class/list-class")
	public ResponseEntity<Iterable<com.ait.manager.model.Class>> getAllListClass() {
		return new ResponseEntity<>(classServiceImpl.findAll(), HttpStatus.OK);
	}
}
