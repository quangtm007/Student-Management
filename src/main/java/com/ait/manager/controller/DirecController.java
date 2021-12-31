package com.ait.manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.ait.manager.model.Event;
import com.ait.manager.model.Post;
import com.ait.manager.model.User;
import com.ait.manager.service.event.EventService;
import com.ait.manager.service.post.PostService;
import com.ait.manager.service.user.UserService;

@Controller
public class DirecController {
	
	@Autowired
	private  PostService  postServive;
	
	@Autowired
	private  EventService  eventServive;
	
	@Autowired
	private  UserService  userService;

	@RequestMapping( value ="/post/edit/{id}" , method = RequestMethod.GET)
	public String editPost( Model model , @PathVariable("id") long id) {
		
		Post post   =  postServive.findById(id).get();
		     
		Iterable<Event> events = eventServive.findAll();
		
		model.addAttribute("post", post);
		model.addAttribute("events", events);
        return  "post/edit" ;
    }
	
	@GetMapping( value ="/student/detail/{id}")
	public ModelAndView showInfoStudent( @PathVariable("id") long id) {
		User user   =  userService.findById(id).get();
        return new ModelAndView("students/student","user",user) ;
    }

	@GetMapping(value = "/chart")
	@PreAuthorize("hasAnyAuthority('カウンセラー','家族','先生')")
	public ModelAndView showChart() {
		return new ModelAndView("chart/chart");
	}
}
