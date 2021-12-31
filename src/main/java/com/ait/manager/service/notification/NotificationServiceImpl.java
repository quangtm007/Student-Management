package com.ait.manager.service.notification;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ait.manager.model.Notification;
import com.ait.manager.repository.NotificationRepository;

@Service
public class NotificationServiceImpl implements NotificationService{
	@Autowired
	private NotificationRepository notificationRepository;
	
	@Override
	public Iterable<Notification> findAll() {
		// TODO Auto-generated method stub
		return notificationRepository.findAll();
	}

	@Override
	public Optional<Notification> findById(Long id) {
		// TODO Auto-generated method stub
		return notificationRepository.findById(id);
	}

	@Override
	public Notification save(Notification t) {
		// TODO Auto-generated method stub
		return notificationRepository.save(t);
	}

	@Override
	public void remove(Long id) {
		// TODO Auto-generated method stub
		notificationRepository.deleteById(id);
	}

	@Override
	public Iterable<Notification> listCommentByPostIdAndUserId(Long post_id, Long user_id) {
		// TODO Auto-generated method stub
		return notificationRepository.listCommentByPostIdAndUserId(post_id, user_id);
	}


	private List<Long> listCommentByPostIdAndCommentId(Long post_id, Long cmt_id) {
		return notificationRepository.listCommentByPostIdAndCommentId(post_id,cmt_id);
	}

	@Override
	public void insertEntity(Notification notification){
		List<Long> list = listCommentByPostIdAndCommentId(notification.getPost_id(), notification.getCmt_id());
		if(list.size() == 0){
			save(notification);
			return;
		}
		if(list.contains(notification.getUser_id())){
			return;
		}
		save(notification);
	}

	@Override
	public void deleteByCommentId(Long id) {
		// TODO Auto-generated method stub
		notificationRepository.deleteByCommentId(id);
	}

	@Override
	public void deleteByPostId(Long id) {
		notificationRepository.deleteByPostId(id);
	}
}
