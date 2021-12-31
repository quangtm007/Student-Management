package com.ait.manager.controller;

import java.util.Optional;

import com.ait.manager.model.dto.CustomDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ait.manager.model.Post;
import com.ait.manager.model.PostDetail;
import com.ait.manager.service.postdetail.PostDetailServiceImpl;

@RestController
public class PostDetailController {
	@Autowired
	private PostDetailServiceImpl postDetailServiceImpl;
	
	@PostMapping("/postDetail/insert")
	public ResponseEntity<PostDetail> createEntity(@RequestBody PostDetail postDetail){
		postDetailServiceImpl.insertPostDetail(postDetail);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/postDetail/delete/{id}")
	public void deleteByCommentId(@PathVariable Long id){
		postDetailServiceImpl.deleteFindByCommentId(id);
	}

	@DeleteMapping("/postDetail/delete-post/{id}")
	public void deleteByPostId(@PathVariable Long id){
		postDetailServiceImpl.deleteFindByPostId(id);
	}

	@DeleteMapping("/postDetail/delete-post-detail/{cmt_id}/{post_id}")
	public void deleteByCommentIdAndPostId(@PathVariable Long cmt_id, @PathVariable Long post_id){
		postDetailServiceImpl.deleteFindByCommentIdAndPostId(cmt_id,post_id);
	}

	@GetMapping("/postDetail/count-factorial/{factorial_id}/{user_id}")
	public int countFactorial(@PathVariable Long factorial_id, @PathVariable Long user_id){
		return postDetailServiceImpl.countFactorial(factorial_id,user_id);
	}

	@GetMapping("/postDetail/total-factorial/{user_id}")
	public int totalFactorial(@PathVariable Long user_id){
		return postDetailServiceImpl.totalFactorial(user_id);
	}

	@GetMapping("/postDetail/count-factorial-class/{factorial_id}/{user_id}/{class_id}")
	public int countFactorialByClass(@PathVariable Long factorial_id,@PathVariable Long user_id,@PathVariable Long class_id){
		return postDetailServiceImpl.countFactorialByClass(factorial_id,user_id,class_id);
	}

	@GetMapping("/postDetail/list-factorial/{class_id}/{factorial_name}/{user_id}")
	public ResponseEntity<Iterable<CustomDTO>> listSearch(@PathVariable Long class_id, @PathVariable String factorial_name, @PathVariable Long user_id){
		return new ResponseEntity<>(postDetailServiceImpl.listSearchByClass(class_id,factorial_name,user_id),HttpStatus.OK);
	}

	@GetMapping("/postDetail/list-event/{factorial_name}/{user_id}")
	public ResponseEntity<Iterable<CustomDTO>> listSearchByHashtagAndUser( @PathVariable String factorial_name, @PathVariable Long user_id){
		return new ResponseEntity<>(postDetailServiceImpl.listSearchByHashtagAndUser(factorial_name,user_id),HttpStatus.OK);
	}
}
