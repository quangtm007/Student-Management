package com.ait.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ait.manager.model.Notification;

import java.util.List;

import javax.transaction.Transactional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>{
	@Query(nativeQuery = true, value = "SELECT * FROM notifications where post_id = ?1 and user_id = ?2")
	Iterable<Notification> listCommentByPostIdAndUserId(Long post_id, Long user_id);
	
	@Query(nativeQuery = true, value = "SELECT user_id FROM notifications where post_id = ?1 and cmt_id = ?2")
	List<Long> listCommentByPostIdAndCommentId(Long post_id, Long cmt_id);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "DELETE FROM notifications WHERE post_id = ?")
	void deleteByPostId(Long id);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "DELETE FROM notifications WHERE cmt_id = ?")
	void deleteByCommentId(Long id);
}
