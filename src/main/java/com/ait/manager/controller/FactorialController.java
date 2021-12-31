package com.ait.manager.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ait.manager.model.Factorial;
import com.ait.manager.service.factorial.FactorialServiceImpl;

@RestController
public class FactorialController {
	@Autowired 
	FactorialServiceImpl factorialServiceImpl;
	
	@GetMapping("/factorials/list-factorial")
	public ResponseEntity<Iterable<Factorial>> listFactorial(){
		return new ResponseEntity<>(factorialServiceImpl.findAll(),HttpStatus.OK);
	}
	
	@GetMapping("/factorials/factorial-hashtag/{factorial_hashtag}")
	public ResponseEntity<Optional<Factorial>> findByFactorialHashtag(@PathVariable String factorial_hashtag){
		return new ResponseEntity<>(factorialServiceImpl.findByFactorialHashtag(factorial_hashtag),HttpStatus.OK);
	}
}
