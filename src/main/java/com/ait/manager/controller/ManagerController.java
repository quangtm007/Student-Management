package com.ait.manager.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class ManagerController {

	private String getPrincipal() {
		String userName = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof UserDetails) {
			userName = ((UserDetails) principal).getUsername();
		} else {
			userName = principal.toString();
		}
		return userName;
	}

	@GetMapping("/login")
	public ModelAndView login() {
		return new ModelAndView("login");
	}

	@GetMapping("/doctor")
	@PreAuthorize("hasAnyAuthority('カウンセラー')")
	public ModelAndView homePageDoctor() {
		return new ModelAndView("doctor/doctor");
	}

	@GetMapping("/teacher")
	@PreAuthorize("hasAnyAuthority('先生')")
	public ModelAndView homePageTeacher() {
		return new ModelAndView("teacher/teacher");
	}

	@GetMapping("/parent")
	@PreAuthorize("hasAnyAuthority('家族')")
	public ModelAndView homePageParent() {
		return new ModelAndView("parent/parent");
	}

	@GetMapping("/student")
	@PreAuthorize("hasAnyAuthority('学生')")
	public ModelAndView homePageStudent() {
		return new ModelAndView("student/student");
	}

	@GetMapping(value = "/logout")
	public ModelAndView Logout(HttpServletRequest request, HttpServletResponse response) {

		Cookie jwtCookieRemove = new Cookie("JWT", "");
		jwtCookieRemove.setMaxAge(0);
		response.addCookie(jwtCookieRemove);
		return new ModelAndView("logincssjs");
	}
}