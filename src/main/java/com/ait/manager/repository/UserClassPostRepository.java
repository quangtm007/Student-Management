package com.ait.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ait.manager.model.UserClassPost;

import javax.transaction.Transactional;

@Repository
public interface UserClassPostRepository extends JpaRepository<UserClassPost, Long>{
	@Query(nativeQuery = true, value="INSERT INTO user_class_post(user_id,class_id,post_id) VALUES (?1,?2,?3)")
	UserClassPost saveUserClassPost(Long user_id, Long class_id, Long post_id);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "DELETE FROM user_class_post WHERE post_id = ?")
	void deleteFindByPostId(Long id);
}

