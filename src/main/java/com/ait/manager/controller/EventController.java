package com.ait.manager.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ait.manager.model.Event;
import com.ait.manager.service.event.EventServiceImpl;

@RestController
public class EventController {
	@Autowired
	private EventServiceImpl eventServiceImpl;
	
	@GetMapping("/event/list-event")
	public ResponseEntity<Iterable<Event>> getAllEvent(){
		return new ResponseEntity<>(eventServiceImpl.findAll(),HttpStatus.OK);
	}

}
