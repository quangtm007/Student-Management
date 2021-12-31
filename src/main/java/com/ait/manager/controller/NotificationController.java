package com.ait.manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ait.manager.model.Notification;
import com.ait.manager.service.notification.NotificationServiceImpl;

import java.util.List;

@RestController
public class NotificationController {
	@Autowired
	private NotificationServiceImpl notificationServiceImpl;

	@PostMapping("/notifications/insert")
	public ResponseEntity<Notification> insertEntity(@RequestBody Notification notification){
		notificationServiceImpl.insertEntity(notification);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/notifications/list-comment/{post_id}/{user_id}")
	public ResponseEntity<Iterable<Notification>> listEntity(@PathVariable Long post_id, @PathVariable Long user_id){
		return new ResponseEntity<>(notificationServiceImpl.listCommentByPostIdAndUserId(post_id, user_id),HttpStatus.OK);
	}

	@DeleteMapping("/notifications/delete/{id}")
	public void deleteByCommentId(@PathVariable Long id){
		notificationServiceImpl.deleteByCommentId(id);
	}

	@DeleteMapping("/notifications/delete-post/{id}")
	public void deleteByPostId(@PathVariable Long id){
		notificationServiceImpl.deleteByPostId(id);
	}
}
