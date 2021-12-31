package com.ait.manager.controller;

import com.ait.manager.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ait.manager.model.UserClassPost;
import com.ait.manager.service.userclasspost.UserClassPostServiceImpl;

import java.util.Optional;

@RestController
public class UserClassPostController {
	@Autowired

	private UserClassPostServiceImpl userClassPostServiceImpl;

	@PostMapping("/user-class-post/insert")
	public ResponseEntity<UserClassPost> creatEntity(@RequestBody UserClassPost userClassPost) {
		return new ResponseEntity<>(userClassPostServiceImpl.save(userClassPost), HttpStatus.CREATED);
	}

	@DeleteMapping("/user-class-post/delete/{id}")
	public ResponseEntity<UserClassPost> deletePost(@PathVariable Long id){
		Optional<UserClassPost> post = userClassPostServiceImpl.findById(id);
		if (!post.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		userClassPostServiceImpl.remove(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@DeleteMapping("/user-class-post/delete-post/{id}")
	public void deleteByPostId(@PathVariable Long id){
		userClassPostServiceImpl.deleteFindByPostId(id);
	}

}
