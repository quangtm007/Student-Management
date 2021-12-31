package com.ait.manager.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


import com.ait.manager.model.Event;
import com.ait.manager.model.Post;
import com.ait.manager.model.Status;
import com.ait.manager.model.User;
import com.ait.manager.model.dto.PostDTO;
import com.ait.manager.model.dto.PostParam;
import com.ait.manager.model.dto.SearchDTO;
import com.ait.manager.model.dto.StudentDTO;
import com.ait.manager.security.UserPrincipal;

import com.ait.manager.service.event.EventServiceImpl;
import com.ait.manager.service.post.PostServiceImpl;
import com.ait.manager.service.user.UserServiceImpl;

@RestController


public class PostController {

	@Autowired
	private PostServiceImpl postServiceImpl;

	@Autowired
	private EventServiceImpl eventServiceImpl;

	@Autowired
	private UserServiceImpl userServiceImpl;
	
	@GetMapping("/posts/list-post")
	public ResponseEntity<Iterable<PostDTO>> listPost(){
		return new ResponseEntity<>(postServiceImpl.allListPost(),HttpStatus.OK);
	}
	
	@GetMapping("/posts/list-post-by-parent/{id}")
	public ResponseEntity<Iterable<PostDTO>> listPostByParent(@PathVariable Long id){
		return new ResponseEntity<>(postServiceImpl.AllStudentByParentID(id),HttpStatus.OK);
	}

	@GetMapping("/create-post")
	@PreAuthorize("hasAnyAuthority('学生')")
	public ModelAndView pageCreatePost() {
		return new ModelAndView("post/create");
	}

	@PostMapping("/posts/insert-post")
	@PreAuthorize("hasAnyAuthority('学生')")
	public ResponseEntity<Post> createPost(@RequestBody Post post) {
		Event event = eventServiceImpl.findById(post.getEvent().getEvent_id()).get();
		post.setEvent(event);
		User user = userServiceImpl.findById(post.getUser().getId()).get();
		post.setUser(user);

		Long x = post.getEvent().getEvent_id();
		System.out.println(x);
		post.setStatus(Status.未確認);

		return new ResponseEntity<>(postServiceImpl.save(post), HttpStatus.CREATED);
	}

	@GetMapping("/posts/student-detail/{id}")
	public ResponseEntity<Iterable<StudentDTO>> listStudentDetail(@PathVariable Long id) {

		return new ResponseEntity<>(postServiceImpl.listStudentDetail(id), HttpStatus.OK);
	}
	
	@GetMapping("/posts/student-detail")
	@PreAuthorize("hasAnyAuthority('カウンセラー')")
	public ModelAndView doctorPageStudentDetail() {
        return new ModelAndView("doctor/studentDetail");
    }
	
	@GetMapping("/posts/student-detail-teacher")
	@PreAuthorize("hasAnyAuthority('先生')")
	public ModelAndView teacherPageStudentDetail() {
        return new ModelAndView("teacher/studentDetail");
    }
	
	@GetMapping("/posts/student-detail-parent")
	@PreAuthorize("hasAnyAuthority('家族')")
	public ModelAndView parentPageStudentDetail() {
        return new ModelAndView("parent/childParent");
    }
	
	@GetMapping("/posts/post-detail")
	public ModelAndView pagePostDetail() {
        return new ModelAndView("student/postDetail");
    }
	
	@DeleteMapping("/posts/change-status/{id}")
	public ResponseEntity<Post> changeStatus(@PathVariable Long id){
		Optional<Post> post = postServiceImpl.findById(id);
        if (!post.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        postServiceImpl.changeStatus(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PutMapping("/posts/comment-exist/{id}")
	public ResponseEntity<Post> changeStatusCommentExits(@PathVariable Long id){
		Optional<Post> post = postServiceImpl.findById(id);
		if (!post.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		if (post.get().getStatus() == Status.未確認) {
			postServiceImpl.changeStatusCommentExist(id);
		}
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/posts/student-post/{id}") 
	public ResponseEntity<StudentDTO> studentResponse(@PathVariable Long id){
		return new ResponseEntity<>(postServiceImpl.studentFindPostById(id).get(),HttpStatus.OK); 
	}	
	
	@GetMapping("/posts/post-detail/{id}")
	public ResponseEntity<Optional<Post>> postDetailEntity(@PathVariable Long id){
		Optional<Post> postOptional = postServiceImpl.postDetail(id);
		return new ResponseEntity<>(postOptional,HttpStatus.OK);
	}

	@DeleteMapping("/posts/supend/{id}")
	@PreAuthorize("hasAnyAuthority('学生')")
	public ResponseEntity<Post> deleteEmpEntity(@PathVariable(required = true) Long id) {
		Optional<Post> postOptional = postServiceImpl.findById(id);
		if (!postOptional.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		postServiceImpl.remove(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PutMapping("/posts/edit")
	@PreAuthorize("hasAnyAuthority('学生')")
	public ResponseEntity<Boolean> editPost(@RequestBody PostParam param) {
		Optional<Post> opn = postServiceImpl.findById(param.getId());
		if (opn.isPresent()) {
			Post p = opn.get();
			param.update(p);
			postServiceImpl.save(p);
			return new ResponseEntity<>(true, HttpStatus.OK);
		}
		return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
	}

	@GetMapping("/posts/search")
	public ResponseEntity<Iterable<SearchDTO>> searchEvents(@RequestParam long eventId, @RequestParam long classId,
			@RequestParam(required = false) String status, @RequestParam(required = false) String status2 , @RequestParam(required = false) String status3) {

		Status s = null;
		if (status != null) {
			s = Status.valueOf(status);
		}
		Status s2 = null;
		if (status2 != null) {
			s2 = Status.valueOf(status2);
		}
		Status s3 = null;
		if(status3 != null) {
			s3 = Status.valueOf(status3);
		}

		String userName = PrincipalUtils.getLoggedUserName();
		UserPrincipal up = userServiceImpl.findByUsername(userName);

		long userId = up.getUserId();
		Iterable<SearchDTO> events = postServiceImpl.searchEvents(userId, eventId, classId, s, s2,s3);

		return new ResponseEntity<>(events, HttpStatus.OK);
	}
}
