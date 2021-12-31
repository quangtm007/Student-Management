package com.ait.manager.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.ait.manager.model.User;
import com.ait.manager.security.UserPrincipal;
import com.ait.manager.service.role.RoleServiceImpl;
import com.ait.manager.service.user.UserServiceImpl;

@RestController
public class UserController {

	@Autowired
	UserServiceImpl userService;

	@Autowired
	RoleServiceImpl roleService;

	private String getPrincipal() {
		String userName = "";
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			userName = ((UserDetails) principal).getUsername();
		} else {
			userName = principal.toString();
		}
		return userName;
	}

	@GetMapping("/user/create")
	public ModelAndView createForm() {
		return new ModelAndView("dashboard/user/create");
	}

	@GetMapping("/user/getUser")
	public ResponseEntity<UserPrincipal> getUserByUsername() {
		return new ResponseEntity<>(userService.findByUsername(getPrincipal()), HttpStatus.OK);
	}

	@GetMapping("/user/{id}")
	public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id) {
		Optional<User> optional = userService.findById(id);
		return new ResponseEntity<>(optional, HttpStatus.OK);
	}

	@GetMapping("/user-deleted")
	public ModelAndView getDeletedUsersForm() {
		return new ModelAndView("dashboard/user/deleted");
	}

	@PostMapping("/user/create")
	public ResponseEntity<User> createNewUser(@RequestBody User user) {
		user.setRole(roleService.findById(user.getRole().getId()).get());
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

}
